import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { buttonShadow } from "@/common/colors";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useCheckIfCompleteQuery } from "@/store/features/userProgress/userProgressApiSlice";
import Loading from "@/app/[locale]/loading";

const CourseDetailHeader = ({ course, section }) => {
  const t = useTranslations();
  const { data: user, isLoading: loadingUser } = useGetUserQuery();
  const { data: isCompleted, isLoading: loadingCompleted } = useCheckIfCompleteQuery(
    user?.data?.id,
    course?.id
  );

  return (
    <div className="flex justify-between flex-col max-sm:justify-center lg:px-20 sm:px-10 max-sm:px-6 top-0 pt-16 max-sm:pt-10 bg-[#fafafa] w-full max-sm:pb-16 pb-24 ">
      <div className="flex items-center justify-between max-sm:flex-col">
        <div className="sm:hidden mb-5">
          <Image
            priority={false}
            width={200}
            height={200}
            src={course?.image}
            alt="course title"
          />
        </div>
        <div className="md:w-[60%] sm:w-full max-sm:w-full  ">
          <h1 className="text-[45px] max-sm:text-[36px] max-sm:leading-[45px] max-md:text-[40px] max-md:leading-[50px] leading-[58px] ">
            {course?.title} Course
          </h1>
          <div className="flex max-sm:mt-3 gap-5">
            <div className="flex gap-[5px]">
              <p>{course?.level?.name}</p>
              <svg
                className="mt-[2px] w-[14px]"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 10.3422C0 9.6714 0.559644 9.12761 1.25 9.12761H3.75C4.44036 9.12761 5 9.6714 5 10.3422V16.4151C5 17.0859 4.44036 17.6297 3.75 17.6297H1.25C0.559644 17.6297 0 17.0859 0 16.4151V10.3422Z"
                  fill="#3D5CFF"
                />
                <path
                  d="M7.5 5.48384C7.5 4.81305 8.05964 4.26926 8.75 4.26926H11.25C11.9404 4.26926 12.5 4.81305 12.5 5.48385V16.4151C12.5 17.0859 11.9404 17.6297 11.25 17.6297H8.75C8.05964 17.6297 7.5 17.0859 7.5 16.4151V5.48384Z"
                  fill="#3D5CFF"
                />
                <path
                  d="M15 1.84008C15 1.16928 15.5596 0.625488 16.25 0.625488H18.75C19.4404 0.625488 20 1.16928 20 1.84008V16.4151C20 17.0859 19.4404 17.6297 18.75 17.6297H16.25C15.5596 17.6297 15 17.0859 15 16.4151V1.84008Z"
                  fill="#3D5CFF"
                />
              </svg>
            </div>

            <div className="flex gap-[5px]">
              <p>
                {course?.requiredTime} {t("hours")}
              </p>
              <svg
                className="mt-[2px] w-[14px]"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="9" r="9" fill="#E73B7B" />
                <path
                  d="M9 4V8.68629L12 12"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex gap-[5px]">
              <p>
                {course?.lesson} {t("lessons")}
              </p>
              <svg
                className="mt-1 w-[16px]"
                height="17"
                viewBox="0 0 23 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.14571 1.10495C7.37147 0.37194 4.89156 0.012871 1.57143 0.000123024C1.25831 -0.00355814 0.95133 0.0754504 0.691431 0.226613C0.478104 0.351386 0.303477 0.519608 0.182911 0.716482C0.0623455 0.913357 -0.000465713 1.13285 2.59966e-06 1.35566V13.513C2.59966e-06 14.3348 0.675717 14.9548 1.57143 14.9548C5.06147 14.9548 8.56232 15.237 10.6592 16.952C10.6879 16.9756 10.7239 16.9913 10.7629 16.9973C10.8018 17.0033 10.8419 16.9992 10.8783 16.9857C10.9146 16.9721 10.9455 16.9496 10.9671 16.9209C10.9887 16.8923 11.0002 16.8587 11 16.8245V2.49958C11.0001 2.40293 10.9762 2.3074 10.9299 2.21942C10.8837 2.13145 10.8161 2.0531 10.7319 1.98966C10.2516 1.63435 9.71803 1.33676 9.14571 1.10495V1.10495Z"
                  fill="#3ADE87"
                />
                <path
                  d="M22.3067 0.225492C22.0467 0.0746246 21.7398 -0.00398533 21.4269 0.000155575V0.000155575C18.1073 0.0129105 15.6279 0.370473 13.854 1.10558C13.2818 1.33709 12.7482 1.63426 12.2676 1.98907C12.1835 2.05266 12.1162 2.13108 12.07 2.21908C12.0238 2.30708 12 2.40262 12 2.49927V16.8328C12 16.8657 12.0112 16.8979 12.0322 16.9253C12.0532 16.9527 12.0831 16.9742 12.1181 16.9869C12.1532 16.9997 12.1918 17.0032 12.2291 16.997C12.2664 16.9909 12.3008 16.9753 12.328 16.9523C13.5883 15.8681 15.8002 14.9617 21.4288 14.9621C21.8455 14.9621 22.2452 14.8187 22.5398 14.5636C22.8345 14.3085 23 13.9624 23 13.6016V1.35685C23.0006 1.13348 22.9376 0.913426 22.8167 0.716113C22.6958 0.5188 22.5207 0.3503 22.3067 0.225492Z"
                  fill="#3ADE87"
                />
              </svg>
            </div>
          </div>
          <p className="text-[18px] mt-7 max-md:text-[16px] leading-[27px] ">
            {course?.description}
          </p>

          {isCompleted?.data === true && user !== undefined ? (
            <Link href="/student/certificate">
              <p className="text-app-primary font-medium pt-8 max-sm:pt-5">
                {t("View your certificate!")}
              </p>
            </Link>
          ) : (
            <p className="text-app-primary font-medium pt-8 max-sm:pt-5">
              {t("Complete this course to get your certificate!")}
            </p>
          )}
        </div>

        <div className="max-sm:hidden pr-10 lg:pr-0">
          <Image
            width={330}
            height={330}
            src={course?.image}
            alt="course title"
          />
        </div>
      </div>

      <div className="sm:pb-5 max-sm:pt-4 max-sm:pb-12 flex justify-start max-sm:flex-col max-sm:gap-3 sm:gap-4 lg:gap-7">
        {user === undefined ? (
          <Link key={course?.id} href={`/auth/login`}>
            <button
              type="button"
              style={{ boxShadow: `${buttonShadow.primary}` }}
              className={`  flex items-center text-white lg:flex bg-gradient-primary px-4 lg:px-7 focus:ring-4 focus:outline-none  rounded-3xl py-2  text-center `}
            >
              {t("Start Learning")}
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
        ) : (
          <Link
            key={course?.id}
            href={`/student/courses/${course?.title.toLowerCase()}/${
              section[0]?.lessons[0].uuid
            }/${section[0]?.lessons[0].contents[0]?.uuid}`}
          >
            <button
              type="button"
              style={{ boxShadow: `${buttonShadow.primary}` }}
              className={`  flex items-center text-white lg:flex bg-gradient-primary px-4 lg:px-7 focus:ring-4 focus:outline-none  rounded-3xl py-2  text-center `}
            >
              {t("Start Learning")}
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
        )}

        <Link href={"/student/code-playground/front-end"}>
          <button
            type="button"
            className={` flex items-center secondaryButton text-white lg:flex bg-gradient-secondary  focus:ring-4 focus:outline-none  rounded-3xl px-4 lg:px-7 py-2  text-center `}
          >
            {t("Explore Playground")}
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
    </div>
  );
};

export default CourseDetailHeader;
