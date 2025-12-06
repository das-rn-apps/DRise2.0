import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IQuestion, ISubmitQuizPayload } from "../utils/types";
import { useQuizStore } from "../store/quizStore";
import { useUIStore } from "../store/uiStore";

const Quiz: React.FC = () => {
    const { quizId } = useParams<{ quizId: string }>();

    // Zustand store
    const {
        currentQuiz,
        fetchQuizById,
        submitQuizAnswers,
        loading
    } = useQuizStore();

    const showToast = useUIStore((s) => s.showToast);

    // Local selected answers
    const [answers, setAnswers] = useState<Record<number, number[]>>({});

    // Load Quiz
    useEffect(() => {
        if (!quizId) return;
        fetchQuizById(quizId);
    }, [quizId, fetchQuizById]);

    const toggleOption = (qIndex: number, oIndex: number) => {
        setAnswers((prev) => {
            const prevArr = prev[qIndex] || [];
            const exists = prevArr.includes(oIndex);

            return {
                ...prev,
                [qIndex]: exists
                    ? prevArr.filter((x) => x !== oIndex)
                    : [...prevArr, oIndex]
            };
        });
    };

    const handleSubmit = async () => {
        if (!currentQuiz || !quizId) return;

        const payload: ISubmitQuizPayload = {
            quizId,
            answers: Object.entries(answers).flatMap(
                ([qIndex, selectedIndexes]) => {
                    const question = currentQuiz.questions[Number(qIndex)];

                    return selectedIndexes.map((oi) => ({
                        questionId: question._id,
                        selected: question.options[oi]
                    }));
                }
            )
        };

        const result = await submitQuizAnswers(quizId, payload);

        if (!result) {
            showToast("Failed to submit quiz.", "error");
            return;
        }

        showToast("Quiz submitted successfully!", "success");
    };

    if (loading || !currentQuiz)
        return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">{currentQuiz.title}</h2>

            <div className="space-y-6">
                {currentQuiz.questions.map((q: IQuestion, qi: number) => (
                    <div
                        key={q._id}
                        className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 space-y-4"
                    >
                        <div className="font-medium text-gray-900">
                            {qi + 1}. {q.question}
                        </div>

                        <div className="grid gap-3">
                            {q.options.map((option, oi) => (
                                <label
                                    key={oi}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer
                                    ${answers[qi]?.includes(oi)
                                            ? "bg-indigo-100 border-indigo-300"
                                            : "bg-gray-50 border-gray-200"
                                        }
                                    hover:bg-indigo-50 transition-all duration-200`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={answers[qi]?.includes(oi) || false}
                                        onChange={() => toggleOption(qi, oi)}
                                        className="accent-indigo-600 w-4 h-4"
                                    />
                                    <span className="text-gray-800">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-full font-medium shadow-md hover:scale-105 transition-transform duration-200"
                >
                    Submit Quiz
                </button>
            </div>
        </div>
    );
};

export default Quiz;
