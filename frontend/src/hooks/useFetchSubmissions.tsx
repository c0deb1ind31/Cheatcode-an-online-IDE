import { useEffect, useState } from "react";
import { apiServices } from "@/services/api.services";
export default function useFetchSubmissions(
  problem_id: number,
  refetch?: boolean
) {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });
  useEffect(() => {
      if(problem_id){setState((prev) => ({ ...prev, loading: true }));
      apiServices
        .getProblemSubmissions(problem_id)
        .then((d) => setState((prev) => ({ ...prev, loading: false, data: d })))
        .catch((err) => {
          console.log(err);
          setState((prev) => ({ ...prev, loading: false, error: err }));
        });}
  }, [refetch,problem_id]);

  return state;
}
