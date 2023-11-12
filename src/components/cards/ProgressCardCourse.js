import React from "react";
import Image from "next/image";
import { Progress } from "antd";
import { useTranslations } from "next-intl";

const ProgressCardCourse = ({
  image,
  title,
  description,
  btnColor,
  btnShadow,
  lesson,
  quiz,
  exercise,
  lessonRead,
  exercisesCompleted,
  quizzesCompleted,
  level,
  requiredTime,
  bgColor,
  overAllPercentage,
}) => {
  const t = useTranslations();

  return (
    <div>
      <div
        style={{ filter: "drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.06))" }}
        className=" w-[300px] flex flex-col bg-white rounded-[20px]"
      >
        <div
          style={{
            borderRadius: "20px 20px 0 0",
            backgroundImage: bgColor,
          }}
          className={`py-3 w-full flex justify-center items-center`}
        >
          <div className="w-[150px] flex justify-center items-center h-[150px]">
            <Image
              className="object-contain w-[90%]"
              alt="course-image"
              src={image}
              width={140}
              height={140}
            />
          </div>
        </div>
        <div className="px-5 pb-4">
          <h2 className="pb-1 pt-3 font-semibold text-[20px]">{title}</h2>
          <div className="pb-3">
            <p>
              {lessonRead} {t("out of")} {lesson} {t("Lessons read")}
            </p>
            {/* <p>
              {exercisesCompleted} {t("out of")} {exercise}{" "}
              {t("Exercises completed")}
            </p> */}
            <p>
              {quizzesCompleted} {t("out of")} {quiz} {t("Quizzes completed")}
            </p>
          </div>
          <Progress percent={overAllPercentage} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProgressCardCourse;
