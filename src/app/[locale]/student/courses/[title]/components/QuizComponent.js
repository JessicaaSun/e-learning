"use client";
import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import Confetti from "react-confetti";
import Link from "next/link";
import Image from "next/image";
import useWindowSize from "react-use/lib/useWindowSize";
import { useMemo } from "react";
import PreviousButton from "@/components/icons/PreviousButton";
import NextButton from "@/components/icons/NextButton";
import useNavigationLessons from "@/components/calculate/NavigateEachLesson";
import { BASE_URL } from "@/lib/baseURL";

async function checkIfQuizTaken({ userId, quizId }) {
  const req = await fetch(
    `${BASE_URL}quizProgresses/isExist?userId=${userId}&quizId=${quizId}`
  );
  const res = await req.json();
  return res;
}

const setIsQuizTaken = async ({ userId, quizId, courseId }) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let raw = JSON.stringify({
    userId,
    quizId,
    courseId,
  });
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    // redirect: "/",
  };
  try {
    const get = await fetch(`${BASE_URL}quizProgresses`, requestOptions);
    return get.ok;
  } catch (error) {
    alert(error);
  }
};

export default function QuizComponent({
  lesson,
  question,
  currentLessonUuid,
  sections,
  correctOpt,
  course,
  options,
  userAns,
  userId,
  quizId,
}) {
  const [selected, setSelected] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsCorrect(userAnswer == correctOpt[0]?.choice);
  }, [userAnswer, setSelected, correctOpt]);

  const { width, height } = useWindowSize();

  const { previousLesson, nextLesson } = useNavigationLessons(
    sections,
    currentLessonUuid
  );

  return (
    <main className="flex-col">
      {isSubmitted && isCorrect && (
        <Confetti width={width} height={height} recycle={false} />
      )}
      <div className=" w-full ">
        <h2 className="mb-10">{lesson?.title} Quiz</h2>
        <div className="w-full max-w-md mx-auto">
          <p className=" text-lg">{question}</p>
          <RadioGroup
            className="pt-8"
            value={selected}
            onChange={(value) => {
              setSelected(value);
              setUserAnswer(value.choice);
              setIsSubmitted(false);
            }}
          >
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-3">
              {options?.map((opt) => (
                <RadioGroup.Option
                  key={opt?.choice}
                  value={opt}
                  className={({ active, checked }) =>
                    `${active ? "ring-2 ring-opacity-60 ring-blue-400" : ""}
                  ${
                    checked
                      ? "bg-gradient-primary-to-right text-white"
                      : "bg-[#F0F8FF]"
                  }
                    relative flex cursor-pointer rounded-2xl px-5 py-4 shadow focus:outline-none hover:bg-blue-100`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div>
                            <RadioGroup.Label
                              as="p"
                              value={selected}
                              className={`text-lg  ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {opt.choice}
                            </RadioGroup.Label>
                            {/* <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span>
                              {opt.ram}/{opt.cpus}
                            </span>{" "}
                            <span aria-hidden="true">&middot;</span>{" "}
                            <span>{opt.disk}</span>
                          </RadioGroup.Description> */}
                          </div>
                        </div>
                        {checked && !isSubmitted && (
                          <div className="w-[24px] h-[24px]">
                            <Image
                              src="/assets/images/radio-button.png"
                              alt="radio"
                              width={24}
                              height={24}
                            />
                          </div>
                        )}
                        {checked && isCorrect && isSubmitted && (
                          <div className="bg-green-500 rounded-full shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                        {checked && !isCorrect && isSubmitted && (
                          <div className="bg-red-500 p-[3px] rounded-full shrink-0 text-white">
                            <CrossIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        {/* <p>{isCorrect ? "Correct answer!" : "Wrong answer."}</p> */}
        <div className="flex mt-16 justify-between">
          <Link
            href={`/student/courses/${(course?.title).toLowerCase()}/${
              lesson?.uuid
            }/${lesson?.contents[0]?.uuid}`}
          >
            <button
              type="button"
              className={`flex items-center buttonSecondary text-white lg:flex bg-gradient-secondary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
            >
              <span className="me-2">
                <PreviousButton />
              </span>
              Lesson
            </button>
          </Link>
          {isSubmitted && isCorrect ? (
            nextLesson ? ( // Conditional rendering for the "Next" button
              <Link
                href={`/student/courses/${course?.title.toLowerCase()}/${
                  nextLesson.uuid
                }/${nextLesson.contents[0]?.uuid}`}
              >
                <button
                  onClick={async () => {
                    const isRead = await checkIfQuizTaken({
                      userId: userId,
                      quizId: quizId,
                    });

                    if (!isRead) {
                      setIsQuizTaken({
                        userId: userId,
                        courseId: course?.id,
                        quizId: quizId,
                      });
                    }
                  }}
                  type="button"
                  className={`flex items-center buttonPrimary text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
                >
                  Next
                  <span>
                    <NextButton />
                  </span>
                </button>
              </Link>
            ) : (
              ""
            )
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(true);
              }}
              className={`flex items-center primaryButton text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
            >
              <p>Submit</p>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-[17px] h-[17px]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#fff"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
