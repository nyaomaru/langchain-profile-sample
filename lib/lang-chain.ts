import { ChatOpenAI } from '@langchain/openai';
import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { OpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';

/**
 * Constructs and executes a LangChain pipeline that answers a question
 * based on user profile data stored in a local JSON file.
 *
 * The process includes:
 * 1. Loading and parsing `profile.json` into documents.
 * 2. Creating an in-memory vector store using OpenAI embeddings.
 * 3. Retrieving relevant context from the profile based on the input question.
 * 4. Composing a chat prompt and invoking the OpenAI chat model with that context.
 *
 * @param apiKey - Your OpenAI API key.
 * @param question - The natural language question to ask about the profile.
 * @returns A Promise that resolves to a `ChatMessage` containing the model's answer.
 */
export async function makeProfileQAChain(apiKey: string, question: string) {
  // Step 1: Load profile.json
  const loader = new JSONLoader('data/profile.json');
  const docs = await loader.load();

  // Step 2: Vector store
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: apiKey })
  );

  // Step 3: Retrieve context
  const retriever = vectorStore.asRetriever();
  const relevantDocs = await retriever.invoke(question);
  const context = relevantDocs.map((doc) => doc.pageContent).join('\n');

  // Step 4: Prompt and model
  const model = new ChatOpenAI({ openAIApiKey: apiKey, temperature: 0.3 });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      'You are an assistant that answers questions based on user profile context.',
    ],
    ['human', `Here is some context:\n{context}\n\nQuestion: {question}`],
  ]);

  const chain = RunnableSequence.from([prompt, model]);

  return chain.invoke({ question, context });
}
