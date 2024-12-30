import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Question({ questions, questionIndex, handleAnswer }) {
  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-center">
            {questions?.questions[questionIndex].question}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {questions?.questions[questionIndex].answers.map((answer) => (
            <Button
              key={answer.id}
              variant="outline"
              onClick={() =>
                handleAnswer({
                  questionId: questions?.questions[questionIndex].id,
                  answerId: answer.id,
                })
              }
              className="hover:bg-black hover:text-white"
            >
              {answer.answer}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
