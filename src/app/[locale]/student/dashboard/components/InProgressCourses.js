import ProgressCardCourse from "@/components/cards/ProgressCardCourse";
import React from "react";
import { userProgress } from "@/data/mockUserProgress";
import { useTranslations } from "next-intl";
import { courseCardStyle } from "@/common/courseCardStyle";
import Image from "next/image";
import NextButton from "@/components/icons/NextButton";
import Link from "next/link";
import { buttonShadow } from "@/common/colors";

const InProgressCourses = ({ inProgressCourseData, completedCourse }) => {
  // Slice the courseData array to only include the first two objects
  const limitedCourseData = userProgress.slice(0, 2);

  const inProgressNotFull = inProgressCourseData?.filter((e) => e?.courseCompletionPercentage<100);
  const t = useTranslations();
  return (
    <div
      className={`flex gap-8 lg:pt-0 pt-6 lg:flex-row max-sm:flex-col items-center ${
        inProgressCourseData?.length <= 0 ? "justify-center" : "justify-between"
      }  lg:px-6 px-0 flex-wrap`}
    >
    {inProgressNotFull?.length > 0 ? (
        <div className="flex sm:flex-col max-sm:flex-col md:flex-row w-full items-center justify-between">
          <div className=" flex max-sm:flex-row flex-wrap gap-6">
            {inProgressNotFull?.map((e, index) => (
              <Link
                className="no-underline"
                key={index}
                href={`/student/courses/${e.courseName?.toLowerCase()}`}
              >
                <ProgressCardCourse
                  key={index}
                  lessonRead={e?.contentCompleted}
                  quizzesCompleted={e?.quizzesCompleted}
                  exercise={0}
                  exercisesCompleted={0}
                  quiz={e?.totalQuiz}
                  bgColor={courseCardStyle[index]?.bgColor}
                  btnColor={courseCardStyle[index]?.btnColor}
                  btnShadow={courseCardStyle[index]?.btnShadow}
                  level={e?.level?.name}
                  image={e?.courseImage}
                  title={e?.courseName}
                  overAllPercentage={e?.courseCompletionPercentage}
                  lesson={e?.totalLesson}
                  requiredTime={e?.requiredTime}
                  // description={e.course.description}
                />
              </Link>
            ))}
          </div>
          <Link href={"/student/courses/in-progress"}>
            <button
              type="button"
              style={{ boxShadow: `${buttonShadow.primary}` }}
              className={`mt-3 h-[35px] flex items-center text-white bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-7 py-2  text-center `}
            >
              {t("View all")}
              <span>
                <NextButton />
              </span>
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center justify-between">
          <Image
            src="/assets/images/empty-box.png"
            alt="Empty Box"
            width={180}
            height={180}
          />
          <h4 className="text-center font-normal mt-9">
            {t("No courses in progress")}
          </h4>
        </div>
      )}
    </div>
  );
};

export default InProgressCourses;
