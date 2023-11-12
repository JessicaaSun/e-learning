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
import { exampleData } from "@/data/mockExample";
import { courseData } from "@/data/mockCourse";
import { useTranslations } from "next-intl";
import { useGetCoursesQuery } from "@/store/features/course/courseApiSlice";
import { useSelector } from "react-redux";
import Loading from "../../loading";
import { selectIsGlobalLoading } from "@/store/features/auth/authSlice";
import { useGetSectionQuery } from "@/store/features/section/sectionApiSlice";
import { useState } from "react";
import CurriculumTable from "@/components/curriculum-table/CurriculumTable";
const Tutorials = ({ params }) => {
  const t = useTranslations();

  const { data: responseCourses, isLoading: loadingCourses } =
    useGetCoursesQuery("");
  const courses = responseCourses?.data.list;
  const loading = useSelector(selectIsGlobalLoading);

  const tutorial = courses?.filter(
    (t) => t.title.toLowerCase() == params.title
  )[0];

  const { data: responseSections, isLoading: loadingSections } =
    useGetSectionQuery(tutorial?.id);
  const sections = responseSections?.data?.list;

  if (loadingCourses || loadingSections) {
    // Handle case when tutorial is not found
    return <Loading />;
  }

  return (
    <main className="mb-[72px] max-sm:mb-0 sm:mb-0 flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <section className="flex max-sm:flex-col  sm:px-[60px] lg:px-[70px] lg:justify-between justify-center items-center bg-[#fafafa] pt-10 max-sm:pt-7 w-full lg:pb-32 md:pb-16 max-sm:pb-[70px]">
        <div className="sm:hidden">
          <Image
            priority={false}
            width={200}
            height={200}
            src={tutorial?.image}
            alt="course title"
          />
        </div>
        <div className="max-sm:px-8  py-20 max-sm:py-8 ">
          <h1 className="text-[45px] max-sm:text-[36px] max-sm:leading-[45px] max-md:text-[40px] max-md:leading-[50px] leading-[58px] pb-5">
            {tutorial?.title} Tutorial
          </h1>
          <p className="text-[18px] max-md:text-[16px] leading-[27px] ">
            {tutorial?.description}
          </p>

          <div className="mt-5 max-sm:mt-7">
            <ul className="flex max-sm:gap-2 gap-4 max-sm:justify-between max-sm:flex-wrap">
              <a href="/" className="flex">
                <div className="mr-2 max-sm:mr-1">
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 13.375C9.8912 13.375 9.78429 13.3466 9.68984 13.2926L4.21875 10.1656C4.17121 10.1382 4.11728 10.1238 4.06238 10.1238C4.00749 10.1238 3.95357 10.1383 3.90605 10.1658C3.85853 10.1932 3.81909 10.2328 3.79169 10.2803C3.7643 10.3279 3.74992 10.3818 3.75 10.4367V13.375C3.74991 13.4866 3.77967 13.5961 3.8362 13.6923C3.89273 13.7884 3.97397 13.8677 4.07148 13.9219L9.69648 17.0469C9.78933 17.0985 9.89379 17.1255 10 17.1255C10.1062 17.1255 10.2107 17.0985 10.3035 17.0469L15.9285 13.9219C16.026 13.8677 16.1073 13.7884 16.1638 13.6923C16.2203 13.5961 16.2501 13.4866 16.25 13.375V10.4367C16.2501 10.3818 16.2357 10.3279 16.2083 10.2803C16.1809 10.2328 16.1415 10.1932 16.094 10.1658C16.0464 10.1383 15.9925 10.1238 15.9376 10.1238C15.8827 10.1238 15.8288 10.1382 15.7812 10.1656L10.3102 13.2926C10.2157 13.3466 10.1088 13.375 10 13.375Z"
                      fill="url(#paint0_linear_0_1)"
                    />
                    <path
                      d="M19.3719 6.44137C19.3719 6.44137 19.3719 6.43825 19.3719 6.43708C19.3618 6.33801 19.3281 6.24279 19.2738 6.15935C19.2194 6.07591 19.1459 6.00667 19.0594 5.95739L10.3094 0.957388C10.2149 0.903399 10.108 0.875 9.99921 0.875C9.89041 0.875 9.7835 0.903399 9.68905 0.957388L0.939052 5.95739C0.843421 6.01206 0.763941 6.09104 0.708661 6.18633C0.653382 6.28161 0.624268 6.38981 0.624268 6.49997C0.624268 6.61012 0.653382 6.71832 0.708661 6.81361C0.763941 6.90889 0.843421 6.98787 0.939052 7.04254L9.68905 12.0425C9.7835 12.0965 9.89041 12.1249 9.99921 12.1249C10.108 12.1249 10.2149 12.0965 10.3094 12.0425L18.0078 7.64372C18.0197 7.63685 18.0332 7.63324 18.0469 7.63325C18.0607 7.63326 18.0742 7.6369 18.0861 7.64379C18.0979 7.65069 18.1078 7.66059 18.1146 7.67251C18.1215 7.68443 18.125 7.69794 18.125 7.71169V13.3574C18.125 13.6937 18.3836 13.9824 18.7199 13.9992C18.8044 14.0033 18.8889 13.9901 18.9682 13.9606C19.0474 13.9311 19.1199 13.8857 19.1811 13.8274C19.2424 13.769 19.2912 13.6988 19.3245 13.6211C19.3578 13.5433 19.375 13.4596 19.375 13.375V6.49997C19.3749 6.48039 19.3739 6.46084 19.3719 6.44137Z"
                      fill="url(#paint1_linear_0_1)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_0_1"
                        x1="10"
                        y1="10.1238"
                        x2="10"
                        y2="17.1255"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#8B9EFF" />
                        <stop offset="1" stopColor="#3D5CFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_0_1"
                        x1="9.99963"
                        y1="0.875"
                        x2="9.99963"
                        y2="13.9999"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#8B9EFF" />
                        <stop offset="1" stopColor="#3D5CFF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="hover:underline hover:duration-300 flex hover:text-app-lightPrimary">
                  {t("Courses")}
                </p>
              </a>
              <a href="" className="flex">
                <div className="mr-2 max-sm:mr-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4656 3.9375H14.6282C14.6273 3.9375 14.6265 3.93783 14.6259 3.93843C14.6253 3.93902 14.625 3.93982 14.625 3.94066V14.625C14.625 14.9234 14.7435 15.2095 14.9545 15.4205C15.1655 15.6315 15.4516 15.75 15.75 15.75C16.0484 15.75 16.3345 15.6315 16.5455 15.4205C16.7565 15.2095 16.875 14.9234 16.875 14.625V5.34691C16.875 4.97311 16.7265 4.61462 16.4622 4.35031C16.1979 4.08599 15.8394 3.9375 15.4656 3.9375Z"
                      fill="#E73B7B"
                    />
                    <path
                      d="M13.5 14.625V2.53125C13.5 2.34658 13.4636 2.16372 13.393 1.9931C13.3223 1.82249 13.2187 1.66746 13.0881 1.53688C12.9575 1.4063 12.8025 1.30272 12.6319 1.23204C12.4613 1.16137 12.2784 1.125 12.0938 1.125H2.53125C2.15829 1.125 1.8006 1.27316 1.53688 1.53688C1.27316 1.8006 1.125 2.15829 1.125 2.53125V14.9062C1.125 15.4284 1.33242 15.9292 1.70163 16.2984C2.07085 16.6676 2.57161 16.875 3.09375 16.875H15.1471C15.1524 16.875 15.1577 16.874 15.1626 16.872C15.1675 16.87 15.172 16.867 15.1758 16.8633C15.1795 16.8595 15.1825 16.855 15.1845 16.8501C15.1865 16.8452 15.1875 16.8399 15.1875 16.8346C15.1875 16.8257 15.1845 16.8171 15.1791 16.8102C15.1737 16.8032 15.1662 16.7981 15.1576 16.7959C14.6818 16.6654 14.2619 16.3823 13.9625 15.9901C13.6631 15.598 13.5006 15.1184 13.5 14.625ZM3.375 4.5C3.375 4.35082 3.43426 4.20774 3.53975 4.10225C3.64524 3.99676 3.78832 3.9375 3.9375 3.9375H6.1875C6.33668 3.9375 6.47976 3.99676 6.58525 4.10225C6.69074 4.20774 6.75 4.35082 6.75 4.5V6.75C6.75 6.89918 6.69074 7.04226 6.58525 7.14775C6.47976 7.25324 6.33668 7.3125 6.1875 7.3125H3.9375C3.78832 7.3125 3.64524 7.25324 3.53975 7.14775C3.43426 7.04226 3.375 6.89918 3.375 6.75V4.5ZM10.6875 14.0625H3.95332C3.65063 14.0625 3.39082 13.8298 3.3757 13.5271C3.37204 13.451 3.38385 13.375 3.41043 13.3037C3.43701 13.2323 3.4778 13.1671 3.53033 13.112C3.58286 13.0568 3.64603 13.0129 3.71602 12.983C3.78601 12.953 3.86136 12.9375 3.9375 12.9375H10.6717C10.9744 12.9375 11.2342 13.1702 11.2493 13.4729C11.253 13.549 11.2411 13.625 11.2146 13.6963C11.188 13.7677 11.1472 13.8329 11.0947 13.888C11.0421 13.9432 10.979 13.9871 10.909 14.017C10.839 14.047 10.7636 14.0625 10.6875 14.0625ZM10.6875 11.8125H3.95332C3.65063 11.8125 3.39082 11.5798 3.3757 11.2771C3.37204 11.201 3.38385 11.125 3.41043 11.0537C3.43701 10.9823 3.4778 10.9171 3.53033 10.862C3.58286 10.8068 3.64603 10.7629 3.71602 10.733C3.78601 10.703 3.86136 10.6875 3.9375 10.6875H10.6717C10.9744 10.6875 11.2342 10.9202 11.2493 11.2229C11.253 11.299 11.2411 11.375 11.2146 11.4463C11.188 11.5177 11.1472 11.5829 11.0947 11.638C11.0421 11.6932 10.979 11.7371 10.909 11.767C10.839 11.797 10.7636 11.8125 10.6875 11.8125ZM10.6875 9.5625H3.95332C3.65063 9.5625 3.39082 9.32977 3.3757 9.02707C3.37204 8.95101 3.38385 8.87501 3.41043 8.80365C3.43701 8.7323 3.4778 8.66708 3.53033 8.61196C3.58286 8.55684 3.64603 8.51295 3.71602 8.48296C3.78601 8.45297 3.86136 8.43751 3.9375 8.4375H10.6717C10.9744 8.4375 11.2342 8.67023 11.2493 8.97293C11.253 9.04899 11.2411 9.12499 11.2146 9.19635C11.188 9.2677 11.1472 9.33292 11.0947 9.38804C11.0421 9.44316 10.979 9.48705 10.909 9.51704C10.839 9.54703 10.7636 9.56249 10.6875 9.5625ZM10.6875 7.3125H8.45332C8.15063 7.3125 7.89082 7.07977 7.8757 6.77707C7.87204 6.70101 7.88385 6.62501 7.91043 6.55365C7.93701 6.4823 7.9778 6.41708 8.03033 6.36196C8.08286 6.30684 8.14603 6.26295 8.21602 6.23296C8.28601 6.20297 8.36136 6.18751 8.4375 6.1875H10.6717C10.9744 6.1875 11.2342 6.42023 11.2493 6.72293C11.253 6.79899 11.2411 6.87499 11.2146 6.94635C11.188 7.0177 11.1472 7.08292 11.0947 7.13804C11.0421 7.19316 10.979 7.23705 10.909 7.26704C10.839 7.29703 10.7636 7.31249 10.6875 7.3125ZM10.6875 5.0625H8.45332C8.15063 5.0625 7.89082 4.82977 7.8757 4.52707C7.87204 4.45102 7.88385 4.37501 7.91043 4.30365C7.93701 4.2323 7.9778 4.16708 8.03033 4.11196C8.08286 4.05684 8.14603 4.01295 8.21602 3.98296C8.28601 3.95297 8.36136 3.93751 8.4375 3.9375H10.6717C10.9744 3.9375 11.2342 4.17023 11.2493 4.47293C11.253 4.54899 11.2411 4.62499 11.2146 4.69635C11.188 4.7677 11.1472 4.83292 11.0947 4.88804C11.0421 4.94316 10.979 4.98705 10.909 5.01704C10.839 5.04703 10.7636 5.06249 10.6875 5.0625Z"
                      fill="url(#paint0_linear_222_1840)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_222_1840"
                        x1="8.15625"
                        y1="1.125"
                        x2="8.15625"
                        y2="16.875"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#EC81A9" />
                        <stop offset="1" stopColor="#E73B7B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="hover:underline hover:duration-300 hover:text-app-lightSecondary">
                  {t("Tutorials")}
                </p>
              </a>
              <a href="" className="flex">
                <div className="mr-2 max-sm:mr-[2px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_222_1849)">
                      <path
                        d="M0 6.42857C0 5.22846 0 4.6284 0.217987 4.17002C0.409734 3.76682 0.715695 3.439 1.09202 3.23356C1.51984 3 2.0799 3 3.2 3H14.8C15.9201 3 16.4802 3 16.908 3.23356C17.2843 3.439 17.5903 3.76682 17.782 4.17002C18 4.6284 18 5.22846 18 6.42857V14.5714C18 15.7715 18 16.3716 17.782 16.83C17.5903 17.2332 17.2843 17.561 16.908 17.7664C16.4802 18 15.9201 18 14.8 18H3.2C2.0799 18 1.51984 18 1.09202 17.7664C0.715695 17.561 0.409734 17.2332 0.217987 16.83C0 16.3716 0 15.7715 0 14.5714V6.42857Z"
                        fill="url(#paint0_linear_222_1849)"
                      />
                      <path
                        d="M4 7.28571L7 10.5L4 13.7143M8 13.7143H14M3.2 18H14.8C15.9201 18 16.4802 18 16.908 17.7664C17.2843 17.561 17.5903 17.2332 17.782 16.83C18 16.3716 18 15.7715 18 14.5714V6.42857C18 5.22846 18 4.6284 17.782 4.17002C17.5903 3.76682 17.2843 3.439 16.908 3.23356C16.4802 3 15.9201 3 14.8 3H3.2C2.0799 3 1.51984 3 1.09202 3.23356C0.715695 3.439 0.409734 3.76682 0.217987 4.17002C0 4.6284 0 5.22846 0 6.42857V14.5714C0 15.7715 0 16.3716 0.217987 16.83C0.409734 17.2332 0.715695 17.561 1.09202 17.7664C1.51984 18 2.07989 18 3.2 18Z"
                        stroke="#F7F7F7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_222_1849"
                        x1="9"
                        y1="3"
                        x2="9"
                        y2="18"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FAE28F" />
                        <stop offset="1" stopColor="#F6CF45" />
                      </linearGradient>
                      <clipPath id="clip0_222_1849">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="hover:underline hover:duration-300 hover:text-app-lightAddition">
                  Code Playground
                </p>
              </a>
            </ul>
          </div>
        </div>
        <div className="max-sm:hidden">
          <Image
            priority={false}
            width={330}
            height={330}
            src={tutorial?.image}
            alt="course title"
          />
        </div>
      </section>

      <section className="flex  max-sm:px-6 px-9 lg:max-w-[100%] lg:min-w-[100%] justify-center  mt-10 z-[2] relative bottom-[100px] md:bottom-[120px]">
        {/* <div className="flex lg:max-w-[100%] lg:min-w-[100%] justify-center z-[2] relative "> */}
          <div className="bg-white rounded-2xl shadow-md w-[90%] lg:w-[90%]	">
            <Tabs value={sections[0].uuid} orientation="vertical">
              <div className="border-r-2 rounded-tl-2xl rounded-bl-2xl bg-blue-50">
                <TabsHeader
                  def
                  className=" lg:w-80 text-left rounded-tl-2xl bg-blue-50 mb-44"
                >
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
                      {section?.lessons?.map((lesson) => (
                        // console.log("lesson",lesson?.contents[0]?.uuid
                        // )

                        <Link
                          key={lesson?.uuid}
                          href={`/tutorials/${(tutorial?.title).toLowerCase()}/${lesson?.uuid
                            }/${lesson?.contents[0]?.uuid}`}
                        >
                          <p className="border-b-2 py-5">{lesson?.title}</p>
                        </Link>

                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        {/* </div> */}
      </section>
    </main>
  );
};
export default Tutorials;