# langchain-profile-sample

LangChain sample with Next.js

## Setup

If you try this sample, you need to create `.env` and set OpenAPI key.

If you want to run this sample locally, create a `.env.local` file in the project root and add your [OpenAI API key](https://platform.openai.com/account/api-keys):

```sh
# .env.local
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Then install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

## Customize

If you want to customize the profile used in the response, edit the following file: `./data/profile.json`
