import React from "react";
// @ts-ignore
import ExercisePage from "../../components/ExercisePage.jsx";

// 如果你在这个文件里没用 useExerciseLogic，可以删掉下面这行
// import { useExerciseLogic } from "../hooks/useExerciseLogic.js";

const Exercise = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#fef5fa' }}>
      <ExercisePage />
    </div>
  );
};

export default Exercise; 