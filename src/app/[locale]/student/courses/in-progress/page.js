"use client";
import CourseCard from "@/components/cards/CourseCard";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import Loading from "../../../loading";
import { selectIsGlobalLoading } from "@/store/features/auth/authSlice";
import {
  useGetInProgressCoursesQuery,
  useGetCompletedCoursesQuery,
} from "@/store/features/userProgress/userProgressApiSlice";
import { courseCardStyle } from "@/common/courseCardStyle";
import ProgressCardCourse from "@/components/cards/ProgressCardCourse";
import Image from "next/image";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";

const InProgressCourses = () => {
  const t = useTranslations();

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();

  const {
    data: responseCourses,
    isLoading: loadingCourses,
    isError: errorCourse,
  } = useGetInProgressCoursesQuery(user?.data?.id);
  const courses = responseCourses?.data;
  const inProgressNotFull = courses?.filter(
    (e) => e?.courseCompletionPercentage < 100
  );

  const { data: completedCourseRes } = useGetCompletedCoursesQuery(
    user?.data?.id
  );
  const completedCourse = completedCourseRes?.data;
  // console.log(courses);

  const loading = useSelector(selectIsGlobalLoading);
  if (isLoading || loading || loadingCourses) {
    return <Loading />;
  }

  return (
    <main className="pb-[72px] mt-[90px] flex items-center flex-col justify-center">
      <h2 className="mb-8">{t("In Progress")}</h2>
      {inProgressNotFull?.length > 0 ? (
        <div className="flex justify-center flex-wrap gap-6">
          {courses?.map((e, index) => (
            <>
              {e?.courseCompletionPercentage < 100 && (
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
              )}
            </>
          ))}
        </div>
      ) : (
        <div className="flex h-[60vh] flex-col items-center text-center justify-center">
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
    </main>
  );
};

export default InProgressCourses;
