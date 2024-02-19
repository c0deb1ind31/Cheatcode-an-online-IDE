import { SubmissionsType } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";

const newSubmissionContext = createContext<{newSubmission:SubmissionsType|undefined,setNewSubmission:(e:SubmissionsType)=>void}>({
  newSubmission: undefined,
  setNewSubmission: () => {},
});

export default function NewSubmissionContextProvider({
  children,
}: PropsWithChildren) {
  const [newSubmission, setNewSubmission] = useState<undefined|SubmissionsType>(undefined);

  return (
    <newSubmissionContext.Provider value={{ newSubmission, setNewSubmission:(e:SubmissionsType)=>setNewSubmission(e) }}>
      {children}
    </newSubmissionContext.Provider>
  );
}

export const useNewSubmissionContext = () => useContext(newSubmissionContext);
