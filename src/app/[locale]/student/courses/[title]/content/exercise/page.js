"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const exercise = {
  prompt:
    "ប្រើ HTML Tags ដែលត្រឹមត្រូវដើម្បីធ្វើអោយពាក្យ 'អង្គវត្ត' ក្លាយជាដិត(bold)",
  exercise:
    "<p>សៀមរាបគឺជាតំបន់ទេសចរណ៍ដ៏ល្បីនៅកម្ពុជា។ ដោយនៅខេត្តនេះមានប្រាសាទបុរាណជាច្រើន ក្នុងនោះមានប្រាសាទ ______ អង្គវត្ត ______, ដែលមានភាពអច្ឆារិយ សាងសង់ដោយបុព្វបុរសខ្មែរតាំងពីយូរលង់ណាស់មកហើយ។</p>",
  correctAnswer: "<strong></strong> <b></b>",
};

export default function Exercise() {
  const [selected, setSelected] = useState();
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const checkAnswer = () => {
    const correctAnswers = exercise.correctAnswer.toLowerCase();
    setIsCorrect(correctAnswers.includes(userAnswer.toLowerCase()));
    setIsSubmitted(true);
  };

  return (
    <main className="bg-[#fafafa] min-h-screen flex pt-10 md:px-32 sm:px-10 pb-20 ms-[288px] flex-col">
      <div className="w-full">
        <h2 className="mb-10">Tags Exercise</h2>
        <div className="w-full">
          <p>{exercise.prompt}</p>
          <div className="mt-8 text-lg bg-gradient-primary-to-right rounded-md shadow text-white w-full p-8">
            {exercise.exercise}
            <div>
              <input
                type="text"
                className="bg-white mt-5 rounded-md ring-0 border-none text-black h-10 w-1/2"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            </div>
          </div>
        </div>
        {isSubmitted && (
          <h5
            className={`mt-4 ${isCorrect ? "text-green-500" : "text-red-500"} `}
          >
            {isCorrect ? "The answer is correct!" : "The answer is incorrect!"}
          </h5>
        )}
        <div className="flex mt-16 justify-between">
          <Link href={"/student/courses/HTML/content/quiz"}>
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
              Quiz
            </button>
          </Link>
          <button
            type="button"
            onClick={checkAnswer}
            className={`flex items-center primaryButton text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
          >
            {isSubmitted && isCorrect ? (
              <div className="flex items-center">
                <p className="me-2">Next</p>
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
            ) : (
              <p>Submit</p>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
