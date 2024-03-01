import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNewSubmissionContext } from "@/context/newSubmissionContext";
import { apiServices } from "@/services/api.services";
import { resultColors } from "@/constants";
import { Skeleton } from "./ui/skeleton";

export default function Console({testCase}:{testCase:string[]}) {
  const { newSubmission, setNewSubmission } = useNewSubmissionContext();
  const [tab, setTab] = useState("test-cases");
  const [codeRunning, setCodeRunning] = useState(false);
  useEffect(() => {
    //get submision status
    if (newSubmission) {
      setTab("output");
      if (newSubmission.status == "pending" && newSubmission.id) {
        setCodeRunning(true);
        const interval = setInterval(() => {
          apiServices.getSubmissionStatus(newSubmission.id).then((d) => {
            if (d.status == "completed") {
              setNewSubmission(d);
              setCodeRunning(false);
              clearTimeout(interval);
            }
          });
        }, 500);
        return () => clearInterval(interval);
      }
    }
  }, [newSubmission]);
  return (
    <div className="flex-1 rounded-md bg-[#282828] p-3">
      <Tabs value={tab}>
        <TabsList>
          <TabsTrigger value="test-cases" onClick={() => setTab("test-cases")}>
            Test Cases
          </TabsTrigger>
          <TabsTrigger value="output" onClick={() => setTab("output")}>
            Result
          </TabsTrigger>
        </TabsList>
        <TabsContent value="test-cases">
          {" "}
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <h1 className="text-base">Inputs: {testCase[0]}</h1>
            </div>
            <div className="flex gap-2 items-center">
              <h1 className="text-base">Output: {testCase[1]}</h1>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="output">
          {newSubmission?.status === "completed" && (
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <h1 className="text-base">Result:</h1>
                <p className={newSubmission.result&&resultColors[newSubmission.result]}>
                  {newSubmission.result}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <h1 className="text-base">Output: {newSubmission.output}</h1>
                <p className="text-green-400"></p>
              </div>
            </div>
          )}
          {!newSubmission && (
            <div className="flex items-center justify-center">
              <p className="text-neutral-500">Run your code</p>
            </div>
          )}

          {codeRunning && (
            <div className="space-y-2 pt-2">
              <Skeleton className="w-[200px] h-[25px]" />
              <Skeleton className="w-[300px] h-[25px]" />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
