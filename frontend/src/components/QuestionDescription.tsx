import { Badge } from "./ui/badge";
import MarkDown from "react-markdown";


type QuestionDescriptionType = {
  questionId: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  questionDesc: string;
};

export default function QuestionDescription({
  questionId,
  title,
  difficulty,
  questionDesc,
}: QuestionDescriptionType) {
  const difficultyColor = {
    easy: "dark:bg-green-500 dark:text-white",
    medium: "dark:bg-yellow-500 dark:text-white",
    hard: "dark:bg-red-600 dark:text-white",
  };
  return (
    <div className="w-full space-y-4  bg-blue ">
      <h3 className="text-2xl">
        {questionId}. {title}
      </h3>
      <div className="flex gap-2">
        <Badge className={difficultyColor[difficulty]}>{difficulty}</Badge>
        <Badge>Microsoft</Badge>
      </div>
      <div className="reset-styles space-y-4">
        <MarkDown>{questionDesc}</MarkDown>
      </div>
    </div>
  );
}
