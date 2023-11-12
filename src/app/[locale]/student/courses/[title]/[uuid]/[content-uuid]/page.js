"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { commentData } from "@/data/mockComment";
import CommentDrawer from "@/components/comment/CommentDrawer";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Loading from "@/app/[locale]/loading";
import { useGetCoursesQuery } from "@/store/features/course/courseApiSlice";
import { useSelector } from "react-redux";
import { selectIsGlobalLoading } from "@/store/features/auth/authSlice";
import { useGetSectionQuery } from "@/store/features/section/sectionApiSlice";
import { usePathname } from "next/navigation";
import HTMLReactParser from "html-react-parser";
import { Grid } from "antd";
import ContentSideBar from "@/components/common/ContentSidebar";
import QuizComponent from "../../components/QuizComponent";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useGetCommentQuery } from "@/store/features/comment/commentApiSlice";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import { CountComments } from "@/components/calculate/CountComment";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import ReactDOMServer from "react-dom/server";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { useGetCommentByLessonIdQuery } from "@/store/features/comment/commentApiSlice";
import { useGetLessonByUuidQuery } from "@/store/features/lesson/lessonApiSlice";
import useNavigationLessons from "@/components/calculate/NavigateEachLesson";
import NextButton from "@/components/icons/NextButton";
import PreviousButton from "@/components/icons/PreviousButton";
import { BASE_URL } from "@/lib/baseURL";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { buttonShadow } from "@/common/colors";
const { useBreakpoint } = Grid;

async function checkIfRead({ userId, contentId }) {
  const req = await fetch(
    `${BASE_URL}contentProgresses/isExist?userId=${userId}&contentId=${contentId}`
  );
  const res = await req.json();
  return res;
}

const setIsRead = async ({ userId, contentId, courseId }) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let raw = JSON.stringify({
    userId,
    contentId,
    courseId,
  });
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    // redirect: "/",
  };
  try {
    const get = await fetch(`${BASE_URL}contentProgresses`, requestOptions);
    return get.ok;
  } catch (error) {
    alert(error);
  }
};

const LessonContent = ({ params }) => {
  const pathname = usePathname();
  const screens = useBreakpoint();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(screens.xs ? false : true);

  useEffect(() => {
    screens.xs && setIsOpen(false);
  }, [screens.xs]);

  const { data: user } = useGetUserQuery();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // course
  const { data: responseCourses, isLoading: loadingCourses } =
    useGetCoursesQuery("");
  const courses = responseCourses?.data.list;
  const loading = useSelector(selectIsGlobalLoading);

  const course = courses?.filter(
    (t) => t.title.toLowerCase() == params?.title
  )[0];

  // section
  const { data: responseSections, isLoading: loadingSections } =
    useGetSectionQuery(course?.id);
  const sections = responseSections?.data?.list;

  // lesson
  const { data: responseLesson, isLoading: loadingLessons } =
    useGetLessonByUuidQuery(params?.uuid);
  const lesson = responseLesson?.data;

  // console.log("lesson", lesson);

  const { previousLesson, nextLesson } = useNavigationLessons(
    sections,
    params.uuid
  );

  // comment
  const { data: responseComment, isLoading: loadingComment } =
    useGetCommentQuery(lesson?.id);
  const comments = responseComment?.data.list;
  // console.log("comments", comments);

  if (loadingCourses || loadingSections || loadingLessons) {
    return <Loading />;
  }
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  let totalCommentLength = 0;

  // iterate over each top-level comment and count all comments
  if (comments?.length > 0) {
    for (let comment of comments) {
      totalCommentLength += CountComments(comment);
    }
  }

  return (
    <main className="flex mt-3 text-gray-900">
      <aside>
        <ContentSideBar
          isTutorial={false}
          isOpen={isOpen}
          course={course}
          handleToggle={handleToggle}
          sections={sections}
        />
      </aside>
      {loadingLessons ? (
        <div className={` flex w-full justify-center items-center`}>
          <Loading />
        </div>
      ) : (
        <div
          style={{
            // marginLeft: isOpen && !screens.xs ? "320px" : "",
            flex: "1",
            overflowY: "auto",
          }}
        >
          <div className="min-h-[100vh] mb-8 max-sm:pt-16 pt-20 lg:px-28 max-sm:px-7 px-12 flex-col flex">
            <p
              onClick={showDrawer}
              className="flex justify-end items-center cursor-pointer"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-500 " />
              {totalCommentLength}{" "}
              {totalCommentLength > 1 ? "Comments" : "Comment"}
            </p>

            <CommentDrawer
              lessonId={lesson?.id}
              user={user?.data}
              commentData={comments}
              open={open}
              onClose={onClose}
            />

            <div
              className={`lg:px-4 max-sm:px-2 pt-4 lg:pt-0 px-2`}
            >
              <div>
                {pathname.includes("content") ? (
                  <>
                    <h1 className="pb-8 leading-[50px]">{lesson?.title}</h1>
                    {lesson?.contents?.map((content) => {
                      return (
                        <div key={content?.uuid} className="md:text-[18px]">
                          {content?.isCode ? (
                            <CodeMirror
                              value={content?.content}
                              readOnly={true}
                              style={{ whiteSpace: "pre-wrap" }}
                              extensions={[html()]}
                            />
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: content?.content,
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div key={lesson?.quizzes[0]?.uuid}>
                      <QuizComponent
                        sections={sections}
                        quizId={lesson?.quizzes[0]?.id}
                        currentLessonUuid={params.uuid}
                        key={lesson?.quizzes[0]?.uuid}
                        correctOpt={lesson?.quizzes[0]?.quizOptions?.filter(
                          (e) => e?.isCorrected == true
                        )}
                        course={course}
                        userId={user?.data?.id}
                        lesson={lesson}
                        question={lesson?.quizzes[0]?.question}
                        options={lesson?.quizzes[0]?.quizOptions}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex mt-16 justify-between">
                <Link
                  className={` ${
                    (!previousLesson || pathname.includes("quiz")) && "hidden"
                  }`}
                  href={
                    previousLesson && previousLesson.quizzes[0]
                      ? `/student/courses/${course?.title.toLowerCase()}/${
                          previousLesson.uuid
                        }/${previousLesson.quizzes[0].uuid}`
                      : previousLesson
                      ? `/student/courses/${course?.title.toLowerCase()}/${
                          previousLesson.uuid
                        }/${previousLesson.contents[0].uuid}`
                      : ""
                  }
                >
                  <button
                    type="button"
                    style={{ boxShadow: `${buttonShadow.secondary}` }}
                    className={`flex items-center text-white lg:flex bg-gradient-secondary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
                  >
                    <span className="me-2">
                      <PreviousButton />
                    </span>
                    Previous
                  </button>
                </Link>
                {lesson?.quizzes?.length != 0 && !pathname.includes("quiz") ? (
                  <div>
                    <Link
                      href={`/student/courses/${(course?.title).toLowerCase()}/${
                        lesson?.uuid
                      }/${lesson?.quizzes[0]?.uuid}`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          const setContentIsRead = async () => {
                            const isRead = await checkIfRead({
                              userId: user?.data?.id,
                              contentId: lesson?.contents[0].id,
                            });
                            isRead === false &&
                              setIsRead({
                                userId: user?.data?.id,
                                courseId: course?.id,
                                contentId: lesson?.contents[0].id,
                              });
                          };
                          setContentIsRead();
                        }}
                        style={{ boxShadow: `${buttonShadow.primary}` }}
                        className={`flex items-center text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
                      >
                        Quiz
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
                ) : nextLesson && !pathname.includes("quiz") ? ( // Conditional rendering for the "Next" button
                  <Link
                    href={`/student/courses/${course?.title.toLowerCase()}/${
                      nextLesson.uuid
                    }/${nextLesson.contents[0]?.uuid}`}
                  >
                    <button
                      onClick={() => {
                        const setContentIsRead = async () => {
                          const isRead = await checkIfRead({
                            userId: user?.data?.id,
                            contentId: lesson?.contents[0].id,
                          });
                          isRead === false &&
                            setIsRead({
                              userId: user?.data?.id,
                              courseId: course?.id,
                              contentId: lesson?.contents[0].id,
                            });
                        };
                        setContentIsRead();
                      }}
                      type="button"
                      style={{ boxShadow: `${buttonShadow.primary}` }}
                      className={`flex items-center text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
                    >
                      Next
                      <span>
                        <NextButton />
                      </span>
                    </button>
                  </Link>
                ) : (
                  !nextLesson && (
                    <button
                      onClick={async () => {
                        const isRead = await checkIfRead({
                          userId: user?.data?.id,
                          contentId: lesson?.contents[0].id,
                        });
                        if (isRead === false) {
                          setIsRead({
                            userId: user?.data?.id,
                            courseId: course?.id,
                            contentId: lesson?.contents[0].id,
                          });
                          setShowConfetti(true);
                        }
                      }}
                      type="button"
                      style={{ boxShadow: `${buttonShadow.primary}` }}
                      className={`flex items-center text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
                    >
                      <Confetti
                        run={showConfetti}
                        width={width}
                        height={height}
                        recycle={false}
                      />
                      Complete
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default LessonContent;
