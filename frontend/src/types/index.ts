export type SubmissionsType = {
  code_lang?: string;
  execution_time_ms?: string;
  id: string;
  inputs?: [];
  memory_usage_in_mb?: string;
  message?: string;
  output?: string;
  problem?: number;
  result?: "Accepted" | "Rejected" | "Runtime Error";
  status?: "pending" | "completed";
  submission_code?: string;
  submission_type?: "run" | "submit";
  submitted_at?: string;
  user?: string;
};

export type ProblemType = {
  created_at: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  id: number;
  test_input: string;
  test_output: string;
  title: string;
  user: string;
};
