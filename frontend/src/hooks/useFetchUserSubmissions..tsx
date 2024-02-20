import { useEffect, useState } from "react";
import { apiServices } from "@/services/api.services";
export default function useFetchUserSubmissions(
  problem_id: number,
  user_id: string,
  refetch?: boolean
) {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });
  useEffect(() => {
    if (problem_id&& user_id) {
      setState((prev) => ({ ...prev, loading: true }));
      apiServices
        .getProblemUserSubmissions(user_id, problem_id)
        .then((d) => setState((prev) => ({ ...prev, loading: false, data: d })))
        .catch((err) => {
          console.log(err);
          setState((prev) => ({ ...prev, loading: false, error: err }));
        });
    }
  }, [refetch, problem_id, user_id]);

  return state;
}
