import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkDown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { useRemark } from "react-remark";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Icon } from "@iconify/react";

import "./styles.css";
import { Button } from "../ui/button";
export default function QuestionView() {
  const question = `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.
  
  You may assume that each input would have exactly one solution, and you may not use the same element twice.
  
  You can return the answer in any order.

  ## Example 1:

Input: nums = [2,7,11,15], target = 9

Output: [0,1]

Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].


## Example 2:

Input: nums = [3,2,4], target = 6

Output: [1,2]

## Example 3:

Input: nums = [3,3], target = 6

Output: [0,1]


## Constraints:
* 2 <= nums.length <= 104
* -109 <= nums[i] <= 109
* -109 <= target <= 109
* Only one valid answer exists.


`;
  const [reactContent, setMarkdownSource] = useRemark();

  useEffect(() => {
    setMarkdownSource(question);
  }, []);
  return (
    <div className="flex-1 h-full bg-[#282828] rounded-md p-4  overflow-hidden">
      <Tabs
        defaultValue="my-submissions"
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
            {" "}
            <Icon icon="mdi:clock-outline" />
            <span> All Submissions</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="description"
          className="w-full flex-1 overflow-scroll"
        >
          <div className="w-full space-y-4  bg-blue ">
            <h3 className="text-2xl">1. Two Sum</h3>
            <div className="flex gap-2">
              <Badge>Easy</Badge>
              <Badge>Microsoft</Badge>
            </div>
            <div className="reset-styles space-y-4">
              {/* {reactContent} */}
              <MarkDown>{question}</MarkDown>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="my-submissions" className="w-full">
          <SubmissionsTable userSubmission={true} />
        </TabsContent>
        <TabsContent value="all-submissions" className="w-full">
          <SubmissionsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SubmissionsTable({ userSubmission = false }) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="w-full">
      {!showCode ? (
        <Table>
          <TableHeader className="">
            <TableRow className="">
              {!userSubmission && <TableHead>Username</TableHead>}
              <TableHead>Submission Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Runtime</TableHead>
              <TableHead>Memory</TableHead>
              <TableHead>Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {!userSubmission && (
                <TableCell className="font-medium">rhutik</TableCell>
              )}

              <TableCell className="font-medium w-[200px]">
                2 hours ago
              </TableCell>
              <TableCell className="font-medium text-green-400">
                Accepted
              </TableCell>
              <TableCell>
                <Badge>Python</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:clock-outline" />
                  <span>10ms</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols-light:memory-outline" fontSize={24} />
                  <span>10mb</span>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => setShowCode(true)}
                  variant={"outline"}
                  className="dark:bg-[#1A1A1A]"
                >
                  <Icon icon="gravity-ui:code" fontSize={20} color="white" />
                </Button>
              </TableCell>
            </TableRow>
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
                value={"print(1)"}
                language={"python"}
                data-color-mode="dark"
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
