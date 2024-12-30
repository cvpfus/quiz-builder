import Question from "@/components/question";
import Result from "@/components/result";
import { useGetQuestions } from "@/hooks/use-get-questions";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  return {
    props: { id },
  };
};

export default function TakeQuizPage({ id }) {
  const { data: questions, isLoading } = useGetQuestions(id);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = ({ questionId, answerId }) => {
    if (questions.questions.length === questionIndex + 1) {
      setIsFinished(true);
      setSelectedAnswers([...selectedAnswers, { questionId, answerId }]);
      return;
    }

    setSelectedAnswers([...selectedAnswers, { questionId, answerId }]);

    setQuestionIndex(questionIndex + 1);
  };

  return (
    <div
      className={`h-screen flex flex-col items-center w-full px-4 ${
        isFinished ? "" : "justify-center"
      }`}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {!isFinished && !isLoading && (
        <Question
          questions={questions}
          questionIndex={questionIndex}
          handleAnswer={handleAnswer}
        />
      )}
      {isFinished && <Result id={id} selectedAnswers={selectedAnswers} />}
    </div>
  );
}
