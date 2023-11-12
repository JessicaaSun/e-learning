"use client";
import React from "react";
import { Progress, Tabs, theme } from "antd";
import { courseData } from "@/data/mockCourse";
import InProgressCourses from "./components/InProgressCourses";
import CompletedCourses from "./components/CompletedCourses";
import { useTranslations } from "next-intl";
import CourseCard from "@/components/cards/CourseCard";
import Link from "next/link";
import { setCurrentUser } from "@/store/features/auth/authSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "antd";
import {
  useGetInProgressCoursesQuery,
  useGetCompletedCoursesQuery,
} from "@/store/features/userProgress/userProgressApiSlice";
import { courseCardStyle } from "@/common/courseCardStyle";
import { useGetCoursesQuery } from "@/store/features/course/courseApiSlice";
import Loading from "../../loading";
import Image from "next/image";
import NextButton from "@/components/icons/NextButton";
import { getSession } from "next-auth/react";
const { useBreakpoint } = Grid;

const DashboardPage = () => {
  const t = useTranslations();
  const screens = useBreakpoint();
  const limitedCourseData = courseData.slice(0, 3);

  // user
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();
  const data = useSelector((state) => state);
  // console.log("data", data);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isSuccess) {
  //     // console.log("user", user);
  //     dispatch(setCurrentUser(user));
  //   }
  // }, [dispatch, isSuccess, user]);

  //  course
  const { data: coursesResponse, isLoading: coursesLoading } =
    useGetCoursesQuery(3);
  const courses = coursesResponse?.data?.list;

  // in progress course
  const { data: inProgressCourseResponse, isLoading: InProgressLoading } =
    useGetInProgressCoursesQuery(user?.data?.id);
  const inProgressCourses = inProgressCourseResponse?.data;

  const { data: completedCourseResponse, isLoading: completedCourseLoading } =
    useGetCompletedCoursesQuery(user?.data?.id);
  const completedCourse = completedCourseResponse?.data;

  if (
    InProgressLoading ||
    coursesLoading ||
    completedCourseLoading ||
    isLoading
  ) {
    return <Loading />;
  }

  const hasInProgress = inProgressCourses?.length > 0;
  var today = new Date();
  var curHr = today.getHours();
  let greetingText = "";

  if (curHr < 12) {
    greetingText = t("Good Morning");
  } else if (curHr < 18) {
    greetingText = t("Good Afternoon");
  } else {
    greetingText = t("Good Evening");
  }

  const items = [
    {
      key: "1",
      label: <div className="text-[18px]">{t("In Progress")}</div>,
      children: (
        <InProgressCourses
          completedCourse={completedCourse}
          inProgressCourseData={inProgressCourses}
        />
      ),
    },
    {
      key: "2",
      label: <div className="text-[18px]">{t("Completed")}</div>,
      children: <CompletedCourses completedCourseData={completedCourse} />,
    },
  ];
  return (
    <div className="mt-28 mb-20 ">
      <section className="md:px-16 max-sm:px-10 sm:px-10 w-full">
        <div className=" sm:ms-9 max-sm:ms-0 mb-10">
          <h1 className="max-sm:text-[32px] max-sm:leading-[47px] max-md:text-[40px] max-md:leading-[50px] text-4xl font-bold">
            {greetingText},{" "}
            <span className="text-app-primary">{user?.data?.username}</span>
            {/* <span className="text-app-primary">{googleUser?.user?.name}</span>
            <span className="text-app-primary">{githubUser?.user?.name}</span> */}
          </h1>
          <p className="mt-4 text-lg">
            {hasInProgress
              ? t("You're doing great, continue your learning now")
              : t("Start learning to code and shape your skill with us")}
          </p>
        </div>

        {/* card */}
        <div className="flex max-sm:flex-wrap lg:flex-nowrap sm:flex-col lg:flex-row max-sm:flex-col sm:flex-wrap gap-7 mb-20">
          <div
            className="lg:w-[40%] primaryButton flex justify-between flex-col max-sm:p-7 max-sm:flex-wrap  max-sm:w-full sm:w-full md:flex-nowrap lg:p-10 sm:p-7 text-white bg-gradient-primary rounded-2xl "
          >
            <div>
              <div>
                <h1 className="mb-2 text-4xl font-bold tracking-tight">
                  {hasInProgress
                    ? inProgressCourses[inProgressCourses.length - 1]
                        ?.courseName
                    : courses[0].title}
                </h1>
              </div>
              <p className="mb-3 font-light text-[18px]">
                {hasInProgress
                  ? inProgressCourses[inProgressCourses.length - 1]
                      ?.courseCompletionPercentage < 100
                    ? `នៅសល់ត្រឹមតែ ${
                        100 -
                        inProgressCourses[inProgressCourses.length - 1]
                          ?.courseCompletionPercentage
                      }% ទៀតប៉ុណ្ណោះដើម្បីបញ្ចប់មេរៀនមួយនេះ។ រៀនបន្តឥឡូវនេះ!`
                    : `អបអរសាទរ! អ្នកបានបញ្ចប់វគ្គសិក្សា ${
                        inProgressCourses[inProgressCourses.length - 1]
                          ?.courseName
                      }។ ពិតជាធ្វើបានល្អណាស់ បន្តអភិវឌ្ឍន៍ការសេរសេរកូដអ្នកបន្តទៀត!`
                  : courses[0].description}
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center pt-8 font-medium text-center text-white  rounded-lg hover:text-pink-200"
            >
              {hasInProgress
                ? inProgressCourses[inProgressCourses.length - 1]
                    ?.courseCompletionPercentage < 100
                  ? t("Continue Learning")
                  : "រៀនវគ្កសិក្សាថ្មី"
                : t("Start Learning")}

              <NextButton />
            </a>
          </div>
          {hasInProgress ? (
            <div className="lg:w-[56%] md:flex-wrap md:w-full max-sm:flex-wrap max-sm:w-full shadow-md lg:p-10 sm:p-7 max-sm:p-7 text-black bg-[#fafafa] rounded-2xl ">
              <div className="flex justify-between w-full flex-wrap items-center">
                <div className="flex max-sm:pr-4  max-sm:pb-4 sm:pr-4 lg:pr-0 flex-col sm:w-[65%] max-sm:w-[100%] max-sm:justify-center max-sm:items-center gap-2 justify-between">
                  <div className="w-full">
                    <p className="font-medium  w-full">
                      {
                        inProgressCourses[inProgressCourses.length - 1]
                          ?.contentCompleted
                      }{" "}
                      {t("Lessons read")}
                    </p>
                    <Progress
                      percent={Math.round(
                        inProgressCourses[inProgressCourses.length - 1]
                          ?.lessonReadPercentage
                      )}
                      style={{ width: "100%" }}
                      showInfo={false}
                      size={["", 20]}
                      status="active"
                      strokeColor={{ from: "#fae28f", to: "#f6cf45" }}
                    />
                  </div>
                  {/* <div className="w-full">
                    <p className="font-medium ">0 {t("Exercises completed")}</p>
                    <Progress
                      percent={0}
                      size={["", 20]}
                      showInfo={false}
                      style={{ width: "100%" }}
                      status="active"
                      strokeColor={{ "0%": "#EC81A9", "100%": "#e73b7b" }}
                    />
                  </div> */}
                  <div className="w-full">
                    <p className="font-medium ">
                      {
                        inProgressCourses[inProgressCourses.length - 1]
                          ?.quizzesCompleted
                      }{" "}
                      {t("Quizzes completed")}
                    </p>
                    <Progress
                      size={["", 20]}
                      percent={Math.round(
                        inProgressCourses[inProgressCourses.length - 1]
                          ?.quizTakenPercentage
                      )}
                      showInfo={false}
                      style={{ width: "100%" }}
                      status="active"
                      strokeColor={{ "0%": "#88ebb7", "100%": "#3ade87" }}
                    />
                  </div>
                </div>
                <Progress
                  type="circle"
                  size={180}
                  strokeWidth={10}
                  percent={
                    inProgressCourses[inProgressCourses.length - 1]
                      ?.courseCompletionPercentage
                  }
                  strokeColor={{ "0%": "#EC81A9", "100%": "#e73b7b" }}
                />
              </div>
            </div>
          ) : (
            <div className="lg:w-[56%] md:flex-wrap md:w-full max-sm:flex-wrap max-sm:w-full shadow-md px-7 py-3 text-black bg-[#fafafa] rounded-2xl ">
              <div className="flex max-sm:flex-col justify-between w-full items-center">
                <h3 className="w-[60%] max-sm:w-full">
                  {t(
                    "Enroll into a course an track your learning with our progress tracking feature"
                  )}
                </h3>
                <div className="w-[40%] max-sm:w-full">
                  <Image
                    src="/assets/images/diagram.png"
                    width={300}
                    height={300}
                    alt="diagram image"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* My Course */}

      <section className="py-12  flex-wrap w-full max-sm:px-10 sm:px-10 md:px-16 lg:px-20 flex bg-[#fafafa]">
        <div className="flex w-full flex-wrap flex-col">
          <h3 className="text-4xl max-sm:text-[32px] max-sm:leading-[47px] max-md:text-[40px] max-md:leading-[50px] font-bold mb-9">
            {t("My Course")}
          </h3>
          <div className="w-full">
            <Tabs
              tabPosition={screens.lg ? "left" : "top"}
              defaultActiveKey="1"
              items={items}
            />
          </div>
        </div>
      </section>

      {/* More Courses */}
      <section className="pt-14 p-7 w-full max-sm:px-10 sm:px-10 md:px-16 lg:px-20 flex">
        <div className="flex w-full flex-col">
          <div className="flex max-sm:flex-col mb-5 justify-between">
            <h3 className="text-4xl font-bold max-sm:text-[32px] max-sm:leading-[47px] max-md:text-[40px] max-md:leading-[50px] mb-9">
              {t("More Course")}
            </h3>
            {/* <Link
              href={"/student/courses/all"}
              className="text-app-primary cursor-pointer sm:hidden max-sm:hidden justify-center items-center flex"
            >
              {t("All Courses")} <NextButton />
            </Link> */}
          </div>
          <div className="w-full">
            <div className="flex justify-center flex-wrap lg:gap-6 max-sm:gap-4 sm:gap-4">
              {courses.map((course, index) => (
                <Link
                  href={`/courses/${course.title.toLowerCase()}`}
                  key={course.uuid}
                >
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
              <Link
                href={"/student/courses/all"}
                className="text-app-primary md:hidden cursor-pointer max-sm:hidden justify-center items-center flex"
              >
                {t("All Courses")} <NextButton />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
