import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import CourseCard from "@/components/cards/CourseCard";
import { courseCardStyle } from "@/common/courseCardStyle";
import { buttonShadow } from "@/common/colors";
import ProgressCardCourse from "@/components/cards/ProgressCardCourse";

const CompletedCourses = ({ completedCourseData, noShowBtn = false }) => {
  const t = useTranslations();
  return (
    <div
      className={`flex gap-8 lg:pt-0 pt-6 w-full lg:flex-row max-sm:flex-col  items-center ${
        completedCourseData?.length <= 0 ? "justify-center" : "justify-between"
      }  lg:px-6 px-0 flex-wrap`}
    >
      {completedCourseData?.length > 0 ? (
        <div className="flex sm:flex-col max-sm:flex-col md:flex-row w-full items-center justify-between">
          <div className="flex max-sm:flex-row flex-wrap gap-6">
            {completedCourseData?.map((e, index) => (
              <Link
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
          <Link href={"/student/courses/completed"}>
            <button
              type="button"
              style={{ boxShadow: `${buttonShadow.primary}` }}
              className={`mt-3 ${
                noShowBtn && "hidden"
              } h-[35px] self-end flex items-center text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-7 py-2  text-center `}
            >
              {t("View all")}
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
            {t("You haven’t completed any course yet")}
          </h4>
        </div>
      )}
    </div>
  );
};

export default CompletedCourses;
