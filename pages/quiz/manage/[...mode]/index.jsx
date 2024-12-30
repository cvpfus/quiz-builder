import ManageLayout from "@/components/manage-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAddQuiz } from "@/hooks/use-add-quiz";
import { toast } from "@/hooks/use-toast";
import { Check, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { useUpdateQuiz } from "@/hooks/use-update-quiz";
import { useAddQuestion } from "@/hooks/use-add-question";
import { useUpdateQuestions } from "@/hooks/use-update-questions";
import { useUpdateAnswers } from "@/hooks/use-update-answers";
import equal from "deep-equal";
import { useDeleteQuestion } from "@/hooks/use-delete-question";
import { useGetQuiz } from "@/hooks/use-get-quiz";
import { useQueryClient } from "@tanstack/react-query";

export const getServerSideProps = async (context) => {
  const { mode } = context.query;

  if (mode && !mode.includes("edit") && !mode.includes("create")) {
    return { notFound: true };
  }

  if (mode && mode.includes("edit") && mode.length === 1) {
    return { notFound: true };
  }

  const id = mode.length > 1 ? mode[1] : null;

  if (!id) {
    return {
      props: {},
    };
  }

  return {
    props: { id },
  };
};

const createEmptyQuestion = () => ({
  question: "",
  answers: createEmptyAnswers(),
});

const createEmptyAnswers = () =>
  Array.from({ length: 4 }, () => ({
    answer: "",
    is_correct: false,
  }));

export default function CreateQuizPage({ id }) {
  const { data: quizData } = useGetQuiz(id);

  const [questions, setQuestions] = useState([createEmptyQuestion()]);

  const [title, setTitle] = useState("");

  const { mutateAsync: addQuiz } = useAddQuiz();
  const { mutateAsync: updateQuiz } = useUpdateQuiz();
  const { mutateAsync: addQuestion } = useAddQuestion();
  const { mutateAsync: updateQuestions } = useUpdateQuestions();
  const { mutateAsync: updateAnswers } = useUpdateAnswers();
  const { mutateAsync: deleteQuestion } = useDeleteQuestion();

  const queryClient = useQueryClient();

  const router = useRouter();

  useEffect(() => {
    if (quizData) {
      setTitle(quizData.title);
      setQuestions(
        quizData?.questions?.length > 0
          ? structuredClone(quizData.questions)
          : [createEmptyQuestion()]
      );
    }
  }, [quizData]);

  useEffect(() => {
    handleUpdatedAnswers();
  }, [questions]);

  const handleUpdatedQuestions = async () => {
    const updatedQuestions = questions
      .filter((question) => {
        if (!question.id) {
          return false;
        }

        return (
          question.question !==
          quizData.questions.find((q) => q.id === question.id)?.question
        );
      })
      .map((question) => ({
        id: question.id,
        question: question.question,
        quiz_id: question.quiz_id,
      }));

    if (updatedQuestions.length > 0) {
      await updateQuestions({
        id,
        questions: updatedQuestions,
      });
    }
  };

  const handleUpdatedAnswers = async () => {
    const updatedAnswers = questions
      .filter((question) => {
        if (!question.id) {
          return false;
        }

        return !equal(
          question,
          quizData.questions.find((q) => q.id === question.id)
        );
      })
      .flatMap((q) => q.answers)
      .map((a) => ({
        id: a.id,
        answer: a.answer,
        is_correct: a.is_correct,
        question_id: a.question_id,
      }));

    if (updatedAnswers.length > 0) {
      await updateAnswers({
        answers: updatedAnswers,
      });
    }
  };

  const handleMultipleSave = async ({ isAddQuestion = false } = {}) => {
    const lastQuestion = questions[questions.length - 1];

    let quizId;

    if (title) {
      if (!id) {
        const data = await addQuiz({ title });

        quizId = data.id;

        router.push(`/quiz/manage/create/${data.id}`, undefined, {
          scroll: false,
        });
      }

      console.log("lastQuestion", Object.assign({}, lastQuestion));

      if (!lastQuestion.id && !!lastQuestion.question) {
        await addQuestion(
          {
            quiz_id: quizData?.id || quizId,
            question: lastQuestion.question,
          },
          {
            onSuccess: (data) => {
              setQuestions((questions) => {
                const newQuestions = [...questions];
                newQuestions[newQuestions.length - 1].id = data.id;
                newQuestions[newQuestions.length - 1].quiz_id = id;

                newQuestions[newQuestions.length - 1].answers =
                  data.answers.map((a, idx) => ({
                    id: a.id,
                    is_correct: a.is_correct,
                    answer:
                      newQuestions[newQuestions.length - 1].answers[idx].answer,
                    question_id: a.question_id,
                  }));

                return isAddQuestion
                  ? [...newQuestions, createEmptyQuestion()]
                  : [...newQuestions];
              });
            },
          }
        );
      }
    }

    if (title && id) {
      if (title !== quizData.title) {
        await updateQuiz({ id, title });
      }

      await handleUpdatedQuestions();
    }
  };

  const handleSaveDraft = async () => {
    try {
      if (!title && !id) {
        toast({
          title: "Error",
          description: "Title is required",
          variant: "destructive",
        });
        return;
      }

      await handleMultipleSave();

      toast({
        title: "Success",
        description: "Draft saved",
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddQuestion = async () => {
    try {
      const lastQuestion = questions[questions.length - 1];

      if (!title && !lastQuestion.question && !id) {
        toast({
          title: "Error",
          description: "Title and question are required",
          variant: "destructive",
        });
        return;
      }

      if (title && !lastQuestion.question && !id) {
        toast({
          title: "Error",
          description: "Question is required",
          variant: "destructive",
        });
        return;
      }

      if (!title && !!lastQuestion.question && !id) {
        toast({
          title: "Error",
          description: "Title is required",
          variant: "destructive",
        });
        return;
      }

      const isAllQuestionsHaveId = questions.every((q) => q.id);

      if (isAllQuestionsHaveId) {
        setQuestions((questions) => [...questions, createEmptyQuestion()]);
      }

      await handleMultipleSave({ isAddQuestion: true });
    } catch (error) {
      console.log("error", error);

      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleChangeQuestion = (index, question) => {
    setQuestions((questions) => {
      const newQuestions = [...questions];
      newQuestions[index].question = question;
      return newQuestions;
    });
  };

  const handleChangeAnswer = (index, answerIndex, answer) => {
    setQuestions((questions) => {
      const newQuestions = [...questions];
      newQuestions[index].answers[answerIndex].answer = answer;
      return newQuestions;
    });
  };

  const handleDeleteQuestion = async (id) => {
    deleteQuestion(id, {
      onSuccess: () => {
        if (questions.length === 1) {
          setQuestions([createEmptyQuestion()]);
          return;
        }

        setQuestions((questions) =>
          questions.filter((question) => question.id !== id)
        );

        toast({
          title: "Success",
          description: "Question deleted",
        });
      },
    });
  };

  const handleMarkAnswer = (answers, answerId) => {
    const newAnswers = answers.map((a) => ({
      ...a,
      is_correct: a.id === answerId,
    }));

    updateAnswers(
      {
        answers: newAnswers,
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries(["quiz", id]);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create new quiz</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Title of the quiz"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
          />

          {questions.map((question, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Question {i + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteQuestion(question.id)}
                    disabled={!question.id}
                  >
                    <Trash2 />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Label htmlFor={`question-${i}`} className="italic">
                  Question
                </Label>
                <Input
                  id={`question-${i}`}
                  placeholder="Question"
                  value={question.question}
                  onChange={(e) => handleChangeQuestion(i, e.target.value)}
                />
                <Label className="italic">Answers</Label>
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={`${i}-${j}`} className="flex items-center gap-2">
                    <Input
                      placeholder={`Answer ${j + 1}`}
                      disabled={question.question.length === 0}
                      value={questions[i].answers[j]?.answer || ""}
                      onChange={(e) => handleChangeAnswer(i, j, e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className={`${!question.id ? "hidden" : ""}`}
                      onClick={() =>
                        handleMarkAnswer(
                          questions[i].answers,
                          questions[i].answers[j].id
                        )
                      }
                    >
                      {question.answers[j]?.is_correct ? (
                        <Check className="text-green-600" />
                      ) : (
                        <X className="text-red-600" />
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
          <Button onClick={handleAddQuestion}>
            <Plus />
            <span>Add question</span>
          </Button>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-2">
        <Button onClick={handleSaveDraft}>Save Draft</Button>
        <Button>Publish</Button>
      </div>
    </div>
  );
}

CreateQuizPage.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;
