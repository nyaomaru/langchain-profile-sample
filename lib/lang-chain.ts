import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';

const prompt = new PromptTemplate({
  inputVariables: ['profile', 'question'],
  template: `
Here is the profile of Nyaomaru:

{profile}

Question: {question}

Based on the above profile information, please answer the question as accurately as possible.
`,
});

export function makeProfileChain(apiKey: string) {
  const chat = new ChatOpenAI({
    openAIApiKey: apiKey,
    temperature: 0.3,
  });

  return new LLMChain({
    llm: chat,
    prompt,
  });
}
