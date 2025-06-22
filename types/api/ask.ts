type TokenUsage = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

type ResponseMetadata = {
  tokenUsage: TokenUsage;
  finish_reason: string;
  model_name: string;
};

type UsageMetadata = {
  output_tokens: number;
  input_tokens: number;
  total_tokens: number;
  input_token_details: Record<string, number>;
  output_token_details: Record<string, number>;
};

export type AskResponse = {
  result: {
    lc: number;
    type: string;
    id: string[];
    kwargs: {
      content: string;
      additional_kwargs: Record<string, unknown>;
      response_metadata: ResponseMetadata;
      id: string;
      tool_calls: unknown[];
      invalid_tool_calls: unknown[];
      usage_metadata: UsageMetadata;
    };
  };
};
