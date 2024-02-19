import { useEffect, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNewSubmissionContext } from "@/context/newSubmissionContext";
import { apiServices } from "@/services/api.services";
import { MoonLoader } from "react-spinners";
export default function Editor({problemId}:{problemId:number}) {
  const default_code = {
    python: `class solution:\n    def code(inputs):\n        return answer `,
    javascript: `function solution(input) {\n  return;\n}`,
  };
  const [code, setCode] = useState(default_code.python);
  const [codeLang, setCodeLang] = useState<"python" | "javascript">("python");

  const { setNewSubmission } = useNewSubmissionContext();
  const [sumbitted, setSubmitted] = useState(true);
  useEffect(() => {
    setCode(default_code[codeLang]);
  }, [codeLang]);

  function handleReset() {
    setCode(default_code[codeLang]);
  }
  function handleExecutionClick(type: "run" | "submit") {
    setSubmitted(false);
    apiServices
      .submitSolution(
        "61420d1c-81ab-4f7d-8b19-df34d57ba673",
        problemId,
        codeLang,
        code,
        type
      )
      .then((res) => {
        if (res.submission_id) {

          setNewSubmission({ id: res.submission_id, status: "pending" });
          setSubmitted(true);
        }
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(true);
      });
  }
  return (
    <div className="flex-2 flex flex-col rounded-md bg-[#282828] w-tc-editor-var overflow-hidden p-2">
      <div className="flex justify-between">
        <Select
          defaultValue="python"
          onValueChange={(val: "python" | "javascript") => setCodeLang(val)}
        >
          <SelectTrigger className="w-[180px] dark:bg-[#333333]">
            <SelectValue placeholder="Select a Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Language</SelectLabel>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">Javascript</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="dark:bg-[#424242] dark:hover:bg-[#42424]"
          variant={"outline"}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      <div className="flex-1 max-h-[300px] overflow-scroll">
        <CodeEditor
          minHeight={300}
          value={code}
          language={codeLang}
          data-color-mode="dark"
          placeholder="Please enter JS code."
          onChange={(evn) => setCode(evn.target.value)}
          style={{
            backgroundColor: "#282828",
            fontSize: 16,
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </div>
      <div className="self-end flex gap-2">
        <Button
          variant="outline"
          className="dark:bg-zinc-600 dark:hover:bg-zinc-700 "
          onClick={() => handleExecutionClick("run")}
          disabled={sumbitted!==true}
        >
          {!sumbitted ? <MoonLoader color="white" size={15} /> : "Run"}
        </Button>
        <Button
          variant="outline"
          className="dark:bg-green-600 dark:hover:bg-green-700"
          onClick={() => handleExecutionClick("submit")}
          disabled={sumbitted!==true}
        >
          {!sumbitted ? <MoonLoader color="white" size={15} /> : "Submit"}
        </Button>
      </div>
    </div>
  );
}
