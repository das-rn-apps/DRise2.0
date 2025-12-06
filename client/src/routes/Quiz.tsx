import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, submitQuiz } from "../api/quiz";
import type { IQuiz, IQuizResult } from "../utils/types";

const Quiz: React.FC = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState<IQuiz>();
    const [answers, setAnswers] = useState<Record<number, number[]>>({});

    useEffect(() => {
        (async () => {
            if (!quizId) return;
            const res = await getQuiz(quizId);
            setQuiz(res.data || null);
        })();
    }, [quizId]);

    const toggleOption = (qIndex: number, oIndex: number) => {
        setAnswers((prev) => {
            const prevArr = prev[qIndex] || [];
            const exists = prevArr.includes(oIndex);
            return { ...prev, [qIndex]: exists ? prevArr.filter((x) => x !== oIndex) : [...prevArr, oIndex] };
        });
    };

    const handleSubmit = async () => {
        if (!quizId) return;
        const payload: IQuizResult = {
            answers: Object.entries(answers).map(([questionIndex, selectedOptionIndexes]) => ({
                questionIndex: Number(questionIndex),
                selectedOptionIndexes,
            })),
        };
        await submitQuiz(quizId, payload);
        alert("Submitted");
    };

    if (!quiz) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">{quiz.title}</h2>

            <div className="space-y-6">
                {quiz.questions.map((q: any, qi: number) => (
                    <div key={qi} className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 space-y-4">
                        <div className="font-medium text-gray-900">{qi + 1}. {q.text}</div>
                        <div className="grid gap-3">
                            {q.options.map((o: any, oi: number) => (
                                <label
                                    key={oi}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer
                                    ${answers[qi]?.includes(oi) ? "bg-indigo-100 border-indigo-300" : "bg-gray-50 border-gray-200"}
                                    hover:bg-indigo-50 transition-all duration-200`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={(answers[qi] || []).includes(oi)}
                                        onChange={() => toggleOption(qi, oi)}
                                        className="accent-indigo-600 w-4 h-4"
                                    />
                                    <span className="text-gray-800">{o.text}</span>
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
