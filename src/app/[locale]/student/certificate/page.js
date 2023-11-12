"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CertificateTemplate from "@/components/certificate/CertificateTemplate";
import { useEffect, useState } from "react";
import CertificateTemplate2 from "@/components/certificate/CertificateTemplate2";
import CertificateTemplate3 from "@/components/certificate/CertificateTemplate3";
import Link from "next/link";
import { courseCardStyle } from "@/common/courseCardStyle";
import { useGetCompletedCoursesQuery } from "@/store/features/userProgress/userProgressApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ProgressCardCourse from "@/components/cards/ProgressCardCourse";
import CompletedCourses from "../dashboard/components/CompletedCourses";
import { useGetCertificateByUserIdQuery } from "@/store/features/certificate/certificateApiSlice";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useRouter } from "next/navigation";
import Loading from "../../loading";
import moment from "moment";
import { useGetInProgressCoursesQuery } from "@/store/features/userProgress/userProgressApiSlice";
import { buttonShadow } from "@/common/colors";

const CertificatePage = () => {
  const t = useTranslations();

  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []); 

  let formattedDate = moment().format("MMMM Do YYYY");   
  let formattedIssuedAtDate = moment().format('MMM Do YYYY, h:mm a');

  function getImageComponent(selectedOption) {
    // Map the selected option to the corresponding image component
    switch (selectedOption) {
      case "option1":
        return <CertificateTemplate />;
      case "option2":
        return <CertificateTemplate2 />;
      case "option3":
        return <CertificateTemplate3 />;
      default:
        return null;
    }
  }

  const { data: user, isLoading: loadingUser } = useGetUserQuery();

  const fetchCertificate = async ({
    username,
    course,
    template,
    downloadType,
    completedAt,
    issuedAt,
  }) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
      username,
      completedAt,
      template,
      downloadType,
      course,
      issuedAt,
    });
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      // redirect: "/",
    };
    try {
      const certificateData = await fetch(
        `https://photostad-api.istad.co/api/v1/generates`,
        requestOptions
      );
      return certificateData.json();
    } catch (error) {
      alert(error);
    }
  };

  const insertCertificate = async ({
    user,
    course,
    image,
    downloadUrl,
    dateEarned,
    downloadPdf,
  }) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
      user,
      course,
      image,
      downloadUrl,
      dateEarned,
      downloadPdf,
    });
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      // redirect: "/",
    };
    try {
      const insert = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}certificates`,
        requestOptions
      );
      return insert.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function checkIfExist({ userId, courseId }) {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}certificates/checkIfCertificateExist?userId=${userId}&courseId=${courseId}`
    );
    const res = await req.json();
    return res?.data;
  }

  const {
    data: responseCourses,
    isLoading: loadingCourses,
    isError: errorCourse,
  } = useGetInProgressCoursesQuery(user?.data?.id);
  const courses = responseCourses?.data;
  const inProgressNotFull = courses?.filter(
    (e) => e?.courseCompletionPercentage < 100
  );

  const { data: certificateCourses, isLoading: certificateLoading } =
    useGetCertificateByUserIdQuery(user?.data?.id);
  const certificatesRes = certificateCourses?.data;

  const { data: completedCourseResponse, isLoading: completedCourseLoading } =
    useGetCompletedCoursesQuery(user?.data?.id);
  const completedCourse = completedCourseResponse?.data;

  useEffect(() => {
    const getCertificate = async () => {
      completedCourse?.map(async (e) => {
        const check = await checkIfExist({
          userId: user?.data?.id,
          courseId: e?.courseId,
        });
        if (!check) {
          const certificateData = await fetchCertificate({
            username: user?.data?.username,
            course: e?.courseName,
            template: "certificate_template.png",
            downloadType: "SINGLE",
            completedAt: formattedDate,
            issuedAt: formattedIssuedAtDate,
          });
          const certificateDataPDF = await fetchCertificate({
            username: user?.data?.username,
            course: e?.courseName,
            template: "certificate_template.png",
            downloadType: "PDF",
            completedAt: formattedDate,
            issuedAt: formattedIssuedAtDate,
          });
          if (
            certificateData.status === true &&
            certificateDataPDF.status === true
          ) {
            await insertCertificate({
              user: user?.data?.id,
              course: e?.courseId,
              image: certificateData?.data?.url,
              downloadUrl: certificateData?.data?.downloadUrl,
              downloadPdf: certificateDataPDF?.data?.downloadUrl,
              dateEarned: formattedIssuedAtDate,
            });
          }
        }
      });
    };
    getCertificate();
  }, [
    completedCourse,
    formattedDate,
    formattedIssuedAtDate,
    user?.data?.id,
    user?.data?.username,
  ]);

  if (loadingCourses || certificateLoading || loadingUser) {
    return <Loading />;
  }
  return (
    // text-app-primary (color)
    <main className="text-app-text justify-center flex w-full min-h-screen flex-col overflow-hidden">
      <section className="flex max-sm:px-7 max-sm:flex-col sm:flex-col md:flex-row sm:px-9 md:px-14 lg:px-20  justify-center pb-20 pt-28 max-sm:pt-20">
        <div className="sm:w-full max-sm:w-tull md:w-[50%] mt-9 mr-4">
          <h1 className="text-[45px] max-sm:text-[32px] max-sm:leading-[45px] max-md:text-[40px] max-md:leading-[50px] leading-[58px] pb-5">
            {t("My Certificates")}
          </h1>
          <p className="text-[18px] max-md:text-[16px] leading-[27px]">
            {t(
              "Complete a course it receive a certificate upon your success completion, Celebrate your learning journey with us!"
            )}
          </p>
          <div className="flex max-sm:justify-between max-sm:space-x-3 space-x-6 ">
            {inProgressNotFull?.length > 0 && (
              <Link
                href={`/student/courses/${(inProgressNotFull[0]?.courseName).toLowerCase()}`}
              >
                <button
                  type="button"
                  className={`text-base font-medium primaryButton mt-10  text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-7 max-sm:px-5 py-2  text-center `}
                >
                  {t("Continue learning")} {inProgressNotFull[0]?.courseName}
                </button>
              </Link>
            )}

            <Link href={`/student/courses/all`}>
              <button
                type="button"
                style={{ boxShadow: `${buttonShadow.secondary}` }}
                className={`text-base font-medium mt-10  text-white lg:flex bg-gradient-secondary  focus:ring-4 focus:outline-none  rounded-3xl px-7 max-sm:px-5 py-2  text-center `}
              >
                {t("View Courses")}
              </button>
            </Link>
          </div>
        </div>
        <div className="md:w-[50%] max-sm:pt-7 sm:pt-7 md:pt-0 max-sm:w-full h-full relative">
          <Image
            alt="certificate-icon"
            src="/assets/images/official-certificate.png"
            width={500}
            height={500}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </section>

      <section className=" w-full flex-col lg:px-16 flex bg-[#ecefff] py-14 justify-center sm:px-6 max-sm:px-6 md:px-14 items-center">
        <h2 className="pb-7">{t("Completed Courses")}</h2>
        <div
          className={`flex gap-8 lg:pt-0 pt-6 w-full lg:flex-row max-sm:flex-col  items-center ${completedCourse?.length <= 0 ? "justify-center" : "justify-between"
            }  lg:px-6 px-0 flex-wrap`}
        >
          {completedCourse?.length > 0 ? (
            <div className="flex sm:flex-col max-sm:flex-col md:flex-row w-full items-center justify-between">
              <div className="flex max-sm:flex-row flex-wrap gap-6">
                {completedCourse?.map((e, index) => (
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
      </section>

      <section className="py-16 max-sm:py-10 w-full gap-7 flex-wrap flex flex-col items-center">
        {certificatesRes?.map((cer) => (
          <div
            key={cer?.uuid}
            className="w-full flex-wrap gap-5 max-sm:flex-col lg:flex-row sm:flex-col flex  justify-center items-center h-full"
          >
            <div>
              <Image
                src={cer.image}
                width={900}
                alt="certificate"
                height={900}
              />
            </div>
            <div className="flex md:flex-col gap-4 max-sm:flex-row sm:flex-row">
              <button
                onClick={() => window.open(cer.downloadPdf, "_blank")}
                className="px-4 py-2  bg-gradient-primary text-white rounded-lg shadow-md font-medium"
              >
                Download PDF
              </button>
              <button
                onClick={() => window.open(cer.downloadUrl, "_blank")}
                className="px-4 py-2 bg-gradient-secondary text-white rounded-lg shadow-md font-medium"
              >
                Download PNG
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
export default CertificatePage;
