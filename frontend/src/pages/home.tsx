import Console from "@/components/Console";
import Editor from "@/components/Editor";
import NavBar from "@/components/NavBar";
import QuestionView from "@/components/QuestionSection";
import NewSubmissionContextProvider from "@/context/newSubmissionContext";
import useFetchProblem from "@/hooks/useFetchProblems";
// import axios from "axios";
// import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { data, loading, error } = useFetchProblem(1);

  const { isLoggedin } = useAuth();

  if(!isLoggedin) return <Navigate to={"/auth/login"}/>
  return (
    <div className="flex flex-col w-screen h-screen">
      <NavBar />
      <div className="flex-1 flex bg-blue bg-[#1A1A1A] gap-4 p-4 overflow-hidden">
        <NewSubmissionContextProvider>
          {loading && <Skeleton className="flex-1 rounded-md" />}
          {!loading && !error && data && <QuestionView problem={data} />}
          <div className="flex flex-col flex-1 h-full gap-4">
            {loading && <Skeleton className="flex-1 rounded-md" />}
            {!loading && !error && data && <Editor problemId={data.id} />}
            {loading && <Skeleton className="flex-1 rounded-md" />}
            {!loading && !error && data && (
              <Console testCase={[data.test_input, data.test_output]} />
            )}
          </div>
          {!loading && error && !data && (
            <div className="flex items-center justify-center h-full w-full">
              <h1 className="text-4xl ">Problem not found</h1>
            </div>
          )}
        </NewSubmissionContextProvider>
      </div>
    </div>
  );
}
