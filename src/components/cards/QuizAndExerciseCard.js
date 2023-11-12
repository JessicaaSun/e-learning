
import React from "react";
import { useTranslations } from "next-intl";

const QuizAndExerciseCard = ({ course }) => {
    const t = useTranslations();

  return (
    <div className="lg:mx-20 mt-16 sm:mx-10 gap-5 max-sm:mx-4 flex max-sm:flex-wrap justify-between">
      <div
        className="md:w-[49%] max-sm:flex-wrap max-sm:w-full sm:w-full md:flex-nowrap p-10 primaryButton text-white bg-gradient-primary rounded-3xl "
      >
        <div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            {t("Exercises")}
          </h1>
        </div>
        <p className="mb-3 font-light text-[18px]">
          {t("Test your skill with doing")} {course?.title}{" "}
          {t("exercise and see your result now")}
        </p>
        <div className="pt-8">
          <hr className=" text-white"></hr>
        </div>
      </div>
      <div
        className="md:w-[49%] max-sm:flex-wrap max-sm:w-full sm:w-full md:flex-nowrap p-10 secondaryButton text-white bg-gradient-secondary rounded-3xl "
      >
        <div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            {t("Quizzes")}
          </h1>
        </div>
        <p className="mb-3 font-light text-[18px]">
          {t("Test your skill with doing")} {course?.title}{" "}
          {t("quiz and see your result now")}
        </p>
        <div className="pt-8">
          <hr className=" text-white"></hr>
        </div>
      </div>
    </div>
  );
};

export default QuizAndExerciseCard;
