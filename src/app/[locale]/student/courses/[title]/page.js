"use client";
import Image from "next/image";
import {
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGetCoursesQuery } from "@/store/features/course/courseApiSlice";
import { useSelector } from "react-redux";
import { selectIsGlobalLoading } from "@/store/features/auth/authSlice";
import Loading from "@/app/[locale]/loading";
import { useGetSectionQuery } from "@/store/features/section/sectionApiSlice";
import QuizAndExerciseCard from "@/components/cards/QuizAndExerciseCard";
import RoadMapBar from "@/components/cards/RoadmapBar";
import CourseDetailHeader from "@/components/course/CourseDetailHeader";
import CurriculumTable from "@/components/curriculum-table/CurriculumTable";

const CourseDetailPage = ({ params }) => {
  const t = useTranslations();

  const { data: responseCourses, isLoading: loadingCourses } =
    useGetCoursesQuery("");
  const courses = responseCourses?.data.list;
  const loading = useSelector(selectIsGlobalLoading);

  const course = courses?.filter(
    (t) => t.title.toLowerCase() == params?.title
  )[0];

  const { data: responseSections, isLoading: loadingSections } =
    useGetSectionQuery(course?.id);
  const sections = responseSections?.data?.list;
  // console.log("Section", sections);

  if(loadingCourses || loadingSections) {
    return <Loading/>
  }
  return (
    <main className=" flex pb-[72px] flex-col">
    <section className="max-sm:pt-7 sm:pt-5">
        <CourseDetailHeader section={sections} course={course} />
      </section>

      <section className="flex lg:max-w-[100%] lg:min-w-[100%] justify-center mt-10 z-[2] relative bottom-[100px] ">
        {/* <div className="bg-white rounded-2xl shadow-md w-[90%] lg:w-[90%]	">
          <Tabs value={1} orientation="vertical">
            <div className="border-r-2 rounded-tl-2xl rounded-bl-2xl bg-blue-50">
              <TabsHeader className=" lg:w-80 text-left rounded-tl-2xl bg-blue-50 mb-44">
                {sections?.map((section) => (
                  <Tab
                    className="shadow-none place-items-start my-1 text-left bg-transparent "
                    key={section?.uuid}
                    value={section?.uuid}
                  >
                    <span>{section?.title}</span>
                  </Tab>
                ))}
              </TabsHeader>
            </div>

            <TabsBody>
              {sections?.map((section) => (
                <TabPanel
                  key={section?.uuid}
                  value={section?.uuid}
                  className="py-0 cursor-pointer"
                >
                  <div>
                    {section?.lessons?.map((lesson) => {
                      // console.log("lesson",lesson?.contents[0]?.uuid
                      // )
                      return (
                        <Link
                          key={lesson?.uuid}
                          href={`/student/courses/${(course?.title).toLowerCase()}/${
                            lesson?.uuid
                          }/${lesson?.contents[0]?.uuid}`}
                        >
                          <p className="border-b-2 py-5">{lesson?.title}</p>
                        </Link>
                      );
                    })}
                  </div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div> */}
        <CurriculumTable sections={sections} course={course}/>
      </section>

      <section>
        <RoadMapBar />
      </section>

      <section>
        <QuizAndExerciseCard course={course} />
      </section>
    </main>
  );
};
export default CourseDetailPage;
