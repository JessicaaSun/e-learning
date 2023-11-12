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

  if (loadingCourses || loadingSections) {
    // Handle case when tutorial is not found
    return <Loading />;
  }

  return (
    <main className=" flex pb-[72px] flex-col">
      <section>
        <CourseDetailHeader section={sections} course={course} />
      </section>

      <section className="flex lg:max-w-[100%] lg:min-w-[100%] justify-center mt-10 z-[2] relative bottom-[100px] ">
       <CurriculumTable course={course} sections={sections}/>
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
