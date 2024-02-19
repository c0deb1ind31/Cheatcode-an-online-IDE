import { useEffect, useState } from "react";
import { apiServices } from "@/services/api.services";
import { ProblemType } from "@/types";
export default function useFetchProblem(problem_id: number) {
  const [state, setState] = useState<{
    loading: boolean;
    data: ProblemType | null;
    error: string | null;
  }>({
    loading: false,
    data: null,
    error: null,
  });
  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    apiServices
      .getProblem(problem_id)
      .then((d) => setState((prev) => ({ ...prev, loading: false, data: d })))
      .catch((err) => {
        console.log(err);
        setState((prev) => ({ ...prev, loading: false, error: err }));
      });
  }, [problem_id]);

  return state;
}
