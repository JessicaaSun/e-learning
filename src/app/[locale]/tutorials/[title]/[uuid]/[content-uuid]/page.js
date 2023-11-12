"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import React from "react";
import { useGetCommentByLessonIdQuery } from "@/store/features/comment/commentApiSlice";
import { useGetLessonByUuidQuery } from "@/store/features/lesson/lessonApiSlice";
import useNavigationLessons from "@/components/calculate/NavigateEachLesson";
import PreviousButton from "@/components/icons/PreviousButton";
import NextButton from "@/components/icons/NextButton";

const { useBreakpoint } = Grid;

const LessonContent = ({ params }) => {
  const pathname = usePathname();
  const screens = useBreakpoint();
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

  const { previousLesson, nextLesson } = useNavigationLessons(
    sections,
    params.uuid
  );

  if (loadingCourses || loadingSections || loadingLessons) {
    return <Loading />;
  }
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <main className="flex text-gray-900">
      <aside>
        <ContentSideBar
          isTutorial={true}
          isOpen={isOpen}
          course={course}
          handleToggle={handleToggle}
          sections={sections}
        />
      </aside>
      <div
        style={{
          // marginLeft: isOpen && !screens.xs ? "320px" : "",
          flex: "1",
          overflowY: "auto",
        }}
      >
        <div className="min-h-[100vh] mb-8 pt-14 lg:px-28 max-sm:px-7 px-12 flex-col flex">
          <div className="lg:px-4 max-sm:px-2 pt-4 lg:pt-0 px-2">
            <div>
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
            </div>

            <div className="flex mt-16 justify-between">
              {previousLesson ? (
                <Link
                  href={`/tutorials/${course?.title.toLowerCase()}/${
                    previousLesson.uuid
                  }/${previousLesson.contents[0]?.uuid}`}
                >
                  <button
                    type="button"
                    className={`flex items-center secondaryButton text-white lg:flex bg-gradient-secondary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
                  >
                    <span className="me-2">
                      <PreviousButton />
                    </span>
                    Previous
                  </button>
                </Link>
              ) : (
                ""
              )}

              {nextLesson ? ( // Conditional rendering for the "Next" button
                <Link
                  href={`/tutorials/${course?.title.toLowerCase()}/${
                    nextLesson.uuid
                  }/${nextLesson.contents[0]?.uuid}`}
                >
                  <button
                    type="button"
                    className={`flex items-center primaryButton text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
                  >
                    Next
                    <span>
                      <NextButton />
                    </span>
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LessonContent;
