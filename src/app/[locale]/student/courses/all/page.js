"use client";
import CourseCard from "@/components/cards/CourseCard";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import Loading from "../../../loading";
import { selectIsGlobalLoading } from "@/store/features/auth/authSlice";
import { useGetCoursesQuery } from "@/store/features/course/courseApiSlice";
import { courseCardStyle } from "@/common/courseCardStyle";

const CoursesPage = () => {
  const t = useTranslations();
  const {
    data: responseCourses,
    isLoading: loadingCourses,
    isError: errorCourse,
  } = useGetCoursesQuery("");
  const courses = responseCourses?.data.list;

  // console.log("67876 Here are the courses : ", courses)
  // console.log(courses);
  const loading = useSelector(selectIsGlobalLoading);
  if (loading || loadingCourses) {
    return <Loading />;
  }

  return (
    <main className="pb-[72px] mt-[90px] flex items-center flex-col justify-center">
      <h2 className="mb-8">{t("Courses")}</h2>
      <div className="flex justify-center flex-wrap gap-6">
        {courses?.map((course, index) => (
          <Link href={`/student/courses/${(course.title).toLowerCase()}`} key={course.uuid}>
            <CourseCard
              description={course.description}
              bgColor={courseCardStyle[index]?.bgColor}
              btnColor={courseCardStyle[index]?.btnColor}
              btnShadow={courseCardStyle[index]?.btnShadow}
              level={course?.level?.name}
              requiredTime={course.requiredTime}
              image={course.image}
              title={course.title}

             lesson={course?.totalLesson}
            />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default CoursesPage;
