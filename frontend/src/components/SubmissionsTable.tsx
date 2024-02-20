import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { resultColors } from "@/constants";
import TimeAgo from 'javascript-time-ago'
import { twMerge } from "tailwind-merge"

// English.
import en from 'javascript-time-ago/locale/en'
import { SubmissionsType } from "@/types";

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')



interface SubUserType extends SubmissionsType{
  username?:string
}


type SubmissionsTableType = {
  userSubmission?: boolean;
  submissions: SubUserType[];
};

export default function SubmissionsTable({
  userSubmission = false,
  submissions,
}: SubmissionsTableType) {
  const [showCode, setShowCode] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<
    SubmissionsType | undefined
  >(undefined);

  function handleCodeView(submisson: SubmissionsType) {
    setSelectedSubmission(submisson);
    setShowCode(true);
  }
  return (
    <div className="w-full ">
      {!showCode ? (
        <Table>
          <TableHeader className="">
            <TableRow className="">
              {!userSubmission && <TableHead>Username</TableHead>}
              <TableHead>Submission Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Runtime(ms)</TableHead>
              <TableHead>Memory</TableHead>
              <TableHead>Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((sub:SubmissionsType) => (
              <TableRow key={sub.id}>
                {!userSubmission && (
                  <TableCell className="font-medium">rhutik</TableCell>
                )}

                <TableCell className="font-medium w-[150px]">
                  {sub.submitted_at&&timeAgo.format(new Date(sub.submitted_at))}
                </TableCell>
                <TableCell className={twMerge(["w-[150px]",sub.result&&resultColors[sub.result]])}>
                  {sub.result}
                </TableCell>
                <TableCell>
                  <Badge>{sub.code_lang}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:clock-outline" />
                    <span>{sub.execution_time_ms || "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="material-symbols-light:memory-outline"
                      fontSize={24}
                    />
                    <span>{sub.memory_usage_in_mb || "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleCodeView(sub)}
                    variant={"outline"}
                    className="dark:bg-[#1A1A1A]"
                  >
                    <Icon icon="gravity-ui:code" fontSize={20} color="white" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="w-full space-y-3">
          <Button
            variant={"ghost"}
            onClick={() => setShowCode(false)}
            className="flex items-center gap-2"
          >
            <Icon icon="ep:back" /> <span>back</span>
          </Button>
          <div className="w-full space-y-2 ">
            <div className="flex items-center gap-2">
              <Icon icon="gravity-ui:code" fontSize={20} color="white" />
              <h1>Source code</h1>
            </div>
            <div className="w-full min-h-[300px] border border-neutral-600  bg-[#1A1A1A] rounded-xl overflow-hidden relative p-4">
              <button className="absolute right-3 top-2 z-10">Copy</button>
              <CodeEditor
                contentEditable={false}
                value={selectedSubmission?.submission_code}
                language={selectedSubmission?.code_lang}
                style={{
                  backgroundColor: "#1A1A1A",
                  fontSize: 16,
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
