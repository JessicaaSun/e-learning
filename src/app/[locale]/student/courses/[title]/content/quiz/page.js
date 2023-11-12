"use client";
import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import Confetti from "react-confetti";
import Link from "next/link";
import Image from "next/image";
import useWindowSize from "react-use/lib/useWindowSize";

const plans = [
  {
    name: "Integer",
  },
  {
    name: "String",
  },
  {
    name: "Boolean",
  },
  {
    name: "Float",
  },
];

export default function QuizPage() {
  const [selected, setSelected] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsCorrect(userAnswer == "String");
  }, [userAnswer, setSelected]);

  const { width, height } = useWindowSize();

  return (
    <main className="bg-[#fafafa] min-h-screen max-h-screen flex pt-10 md:px-32 sm:px-10 ms-[288px] flex-col">
      {isSubmitted && isCorrect && (
        <Confetti width={width} height={height} recycle={false} />
      )}
      <div className=" w-full ">
        <h2 className="mb-10">ប្រភេទទិន្នន័យ(Datatype) Quiz</h2>
        <div className="w-full max-w-md mx-auto">
          <p>&#34;JavaScript&#34; គឺជា ___________</p>
          <RadioGroup
            className="pt-8"
            value={selected}
            onChange={(value) => {
              setSelected(value);
              setUserAnswer(value.name);
              setIsSubmitted(false);
              //   console.log("selected", selected)
              //   console.log("answer", userAnswer)
              //   console.log("correct", isCorrect)
            }}
          >
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-3">
              {plans.map((plan) => (
                <RadioGroup.Option
                  key={plan.name}
                  value={plan}
                  className={({ active, checked }) =>
                    `${active ? "ring-2 ring-opacity-60 ring-blue-400" : ""}
                  ${
                    checked
                      ? "bg-gradient-primary-to-right text-white"
                      : "bg-white"
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
                              {plan.name}
                            </RadioGroup.Label>
                            {/* <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span>
                              {plan.ram}/{plan.cpus}
                            </span>{" "}
                            <span aria-hidden="true">&middot;</span>{" "}
                            <span>{plan.disk}</span>
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
          <Link href={"/student/courses/HTML/content/content-1"}>
            <button
              type="button"
              className={`flex items-center primaryButton text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
            >
              <span className="me-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.414 8.34296L7.364 12.293C7.54616 12.4816 7.64695 12.7342 7.64467 12.9964C7.6424 13.2586 7.53723 13.5094 7.35182 13.6948C7.16641 13.8802 6.9156 13.9854 6.6534 13.9876C6.3912 13.9899 6.1386 13.8891 5.95 13.707L0.293 8.04996C0.199815 7.95731 0.125866 7.84715 0.0754042 7.72581C0.0249428 7.60448 -0.00103474 7.47437 -0.00103474 7.34296C-0.00103474 7.21155 0.0249428 7.08144 0.0754042 6.96011C0.125866 6.83877 0.199815 6.72861 0.293 6.63596L5.95 0.978959C6.04225 0.883449 6.15259 0.807267 6.2746 0.754858C6.3966 0.702449 6.52782 0.674863 6.6606 0.673709C6.79338 0.672555 6.92506 0.697857 7.04795 0.748137C7.17085 0.798418 7.2825 0.872671 7.37639 0.966564C7.47029 1.06046 7.54454 1.17211 7.59482 1.295C7.6451 1.4179 7.6704 1.54958 7.66925 1.68236C7.6681 1.81514 7.64051 1.94636 7.5881 2.06836C7.53569 2.19037 7.45951 2.30071 7.364 2.39296L3.414 6.34296L13 6.34296C13.2652 6.34296 13.5196 6.44832 13.7071 6.63585C13.8946 6.82339 14 7.07774 14 7.34296C14 7.60818 13.8946 7.86253 13.7071 8.05007C13.5196 8.2376 13.2652 8.34296 13 8.34296H3.414V8.34296Z"
                    fill="white"
                  />
                </svg>
              </span>
              Lesson
            </button>
          </Link>
          {isSubmitted && isCorrect ? (
            <Link href={"/student/courses/HTML/content/exercise"}>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(true);
                }}
                className={`flex items-center primaryButton text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
              >
                <div className="flex items-center">
                  <p>Exercise</p>
                  <span>
                    <svg
                      width="15"
                      height="14"
                      className="ms-3"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.086 5.65701L7.136 1.70701C6.95384 1.51841 6.85305 1.26581 6.85533 1.00361C6.8576 0.741412 6.96277 0.4906 7.14818 0.305192C7.33359 0.119784 7.5844 0.0146148 7.8466 0.0123364C8.1088 0.010058 8.3614 0.110852 8.55 0.29301L14.207 5.95001C14.3002 6.04266 14.3741 6.15282 14.4246 6.27416C14.4751 6.39549 14.501 6.5256 14.501 6.65701C14.501 6.78842 14.4751 6.91853 14.4246 7.03986C14.3741 7.1612 14.3002 7.27136 14.207 7.36401L8.55 13.021C8.45775 13.1165 8.34741 13.1927 8.2254 13.2451C8.1034 13.2975 7.97218 13.3251 7.8394 13.3263C7.70662 13.3274 7.57494 13.3021 7.45205 13.2518C7.32915 13.2016 7.2175 13.1273 7.12361 13.0334C7.02971 12.9395 6.95546 12.8279 6.90518 12.705C6.8549 12.5821 6.8296 12.4504 6.83075 12.3176C6.8319 12.1848 6.85949 12.0536 6.9119 11.9316C6.96431 11.8096 7.04049 11.6993 7.136 11.607L11.086 7.65701H1.5C1.23478 7.65701 0.98043 7.55165 0.792893 7.36412C0.605357 7.17658 0.5 6.92223 0.5 6.65701C0.5 6.39179 0.605357 6.13744 0.792893 5.9499C0.98043 5.76237 1.23478 5.65701 1.5 5.65701H11.086Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
              </button>
            </Link>
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
