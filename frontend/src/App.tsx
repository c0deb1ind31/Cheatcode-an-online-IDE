import { useState } from "react";

import "./App.css";

import "./components/IDECodeEditor";
import IDECodeEditor from "./components/IDECodeEditor";
import QuestionView from "./components/QuestionView/QuestionView";
import Console from "./components/Console";
import { ThemeProvider } from "./context/themeprovider";

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
      <div className="flex bg-blue w-screen h-screen bg-[#1A1A1A] gap-4 p-5">
        <QuestionView />
        <div className="flex flex-col flex-1 h-full gap-4">
          <IDECodeEditor />
          <Console />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
