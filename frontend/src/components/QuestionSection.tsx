import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Icon } from "@iconify/react";

import "../styles/styles.css";
import SubmissionsTable from "./SubmissionsTable";
import QuestionDescription from "./QuestionDescription";

import { useNewSubmissionContext } from "@/context/newSubmissionContext";
import useFetchSubmissions from "@/hooks/useFetchSubmissions";
import useFetchUserSubmissions from "@/hooks/useFetchUserSubmissions.";
import { Skeleton } from "./ui/skeleton";

import { ProblemType } from "@/types";

export default function QuestionView({ problem }: { problem: ProblemType }) {
  const { newSubmission } = useNewSubmissionContext();

  const { loading: allSubmissonLoading, data: allSubmissonData } =
    useFetchSubmissions(problem?.id, newSubmission?.status == "completed");
  const { loading: userSubmissonLoading, data: userSubmissonData } =
    useFetchUserSubmissions(
      problem?.id,
      import.meta.env.VITE_DB_USER_ID,
      newSubmission?.status == "completed"
    );

  return (
    <div className="flex-1 h-full bg-[#282828] rounded-md p-4  overflow-hidden">
      <Tabs
        defaultValue="description"
        className="h-full flex flex-col items-start"
      >
        <TabsList>
          <TabsTrigger value="description" className="gap-2">
            <Icon icon="material-symbols-light:description-outline" />
            <span>Description</span>
          </TabsTrigger>
          <TabsTrigger value="my-submissions" className="gap-2">
            <Icon icon="mdi:clock-outline" />
            <span> My Submissions</span>
          </TabsTrigger>
          <TabsTrigger value="all-submissions" className="gap-2">
            <Icon icon="mdi:clock-outline" />
            <span> All Submissions</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="description"
          className="w-full flex-1 overflow-scroll"
        >
          <QuestionDescription
            questionId={1}
            questionDesc={problem.description}
            difficulty={problem.difficulty}
            title={problem.title}
          />
        </TabsContent>
        <TabsContent
          value="my-submissions"
          className="w-full h-full overflow-scroll"
        >
          {!userSubmissonLoading && userSubmissonData ? (
            <SubmissionsTable
              userSubmission={true}
              submissions={userSubmissonData}
            />
          ) : (
            <Skeleton className="h-full w-full rounded-md" />
          )}
        </TabsContent>
        <TabsContent
          value="all-submissions"
          className="w-full h-full overflow-scroll"
        >
          {!allSubmissonLoading && allSubmissonData ? (
            <SubmissionsTable submissions={allSubmissonData} />
          ) : (
            <Skeleton className="h-full w-full rounded-md" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
