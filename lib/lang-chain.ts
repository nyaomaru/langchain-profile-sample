import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';

const prompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    'You are an assistant that answers questions based on a user profile.',
  ],
  [
    'human',
    `
Here is the profile of Nyaomaru:

{profile}

Question: {question}

Based on the above profile information, please answer the question as accurately as possible.
  `,
  ],
]);

export function makeProfileChain(apiKey: string) {
  const chat = new ChatOpenAI({
    openAIApiKey: apiKey,
    temperature: 0.3,
  });

  return RunnableSequence.from([prompt, chat]);
}
