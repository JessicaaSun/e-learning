"use client";
import CourseCard from "@/components/cards/CourseCard";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import Loading from "../../../loading";
import { selectIsGlobalLoading } from "@/store/features/auth/authSlice";
import Image from "next/image";
import { courseCardStyle } from "@/common/courseCardStyle";
import { useGetCompletedCoursesQuery } from "@/store/features/userProgress/userProgressApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import ProgressCardCourse from "@/components/cards/ProgressCardCourse";

const CompletedCourses = () => {
  const t = useTranslations();

  const {
    data: user,
    isLoading,
  } = useGetUserQuery();

  const { data: completedCourseResponse, isLoading: completedCourseLoading } =
    useGetCompletedCoursesQuery(user?.data?.id);
  const completedCourse = completedCourseResponse?.data;

  const loading = useSelector(selectIsGlobalLoading);
  if (loading || completedCourseLoading || isLoading) {
    return <Loading />;
  }

  return (
    <main className="pb-[72px] mt-[90px] flex items-center flex-col justify-center">
      <h2 className="mb-8">{t("Completed")}</h2>
      {completedCourse?.length > 0 ? (
        <div className="flex justify-center flex-wrap gap-6">
          {completedCourse?.map((e, index) => (
            <Link
              href={`/student/courses/${e?.courseName?.toLowerCase()}`}
              key={index}
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
      ) : (
        <div className="flex h-[60vh] flex-col items-center text-center justify-center">
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
    </main>
  );
};

export default CompletedCourses;
