import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function Console() {
  return (
    <div className="flex-1 rounded-md bg-[#282828] p-3">
      <Tabs defaultValue="test-cases">
        <TabsList>
          <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
          <TabsTrigger value="output">Result</TabsTrigger>
        </TabsList>
        <TabsContent value="test-cases">dds</TabsContent>
        <TabsContent value="output">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <h1 className="text-base">Result:</h1>
              <p className="text-green-400">Accepted</p>
            </div>
            <div className="flex gap-2 items-center">
              <h1 className="text-base">Output:</h1>
              <p className="text-green-400"></p>
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
