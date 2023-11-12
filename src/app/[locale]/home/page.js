"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import WhyCard from "./components/WhyCard";
import PopularCourseCard from "./components/PopularCourseCard";
import FeedBackCard from "./components/FeedBackCard";
import { useGetCoursesQuery } from "@/store/features/course/courseApiSlice";
import { courseCardStyle } from "@/common/courseCardStyle";
import { useSelector } from "react-redux";
import Loading from "../loading";
import { selectIsGlobalLoading } from "@/store/features/auth/authSlice";
import CourseCard from "@/components/cards/CourseCard";
import Link from "next/link";
import "../home/components/style/style.css"

const HomePage = () => {
	const t = useTranslations();
	const {
		data: responseCourses,
		isLoading: loadingCourses,
		isError: errorCourse,
	} = useGetCoursesQuery("");
	const courses = responseCourses?.data.list;

	// console.log(courses);
	const loading = useSelector(selectIsGlobalLoading);
	if (loading || loadingCourses) {
		return <Loading />;
	}

	return (
		<main className="text-app-text mb-[72px] max-sm:mb-0 flex min-h-screen flex-col items-center justify-between overflow-hidden">
			<section className="flex items-center justify-center mx-[90px] gap-10 pb-20 pt-10">
				<div className="md:w-[60%] sm:w-full mt-9 ">
					{" "}
					<h1 className="text-[45px] max-sm:text-[36px] max-sm:leading-[45px] max-md:text-[40px] max-md:leading-[50px] leading-[58px] pb-5">
						{t("Learn to Code For Free With")}
						<span className="text-app-primary">&nbsp;ISTADemy</span>
					</h1>
					<p className=" max-md:text-[16px] text-[20px] leading-[30px] ">
						{t(
							"Unlock your coding potential at ISTADemy Learn practice and connect with a vibrant community of coding enthusiasts"
						)}
					</p>
					<button
						type="button"
						className={`text-base xl:text-[18px] primaryButton font-medium mt-10  text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl xl:px-8 px-7 xl:py-3 py-2  text-center `}
					>
						<Link href={"/auth/login"}>{t("Get Started")}</Link>
					</button>
				</div>
				<div className=" sm:hidden max-sm:hidden md:flex md:w-[40%] md:h-full">
					<Image
						className="loopAnimationhomepageImage"
						alt="hero-image"
						src={"/assets/images/hero.jpg"}
						priority={false}
						width={516}
						height={490}
						style={{ width: "100%", height: "100%" }}
					/>
				</div>
			</section>
			<section className="flex-col items-center flex px-[40px] w-full bg-[#ecefff] py-20 max-sm:py-16 justify-center justify-items-center">
				<div data-aos="fade-down">
					<h1 className="text-center max-sm:text-[36px] max-sm:leading-[47px] max-md:text-[40px] max-md:leading-[50px] leading-[58px]">
						{t("Why ISTADemy?")}
					</h1>
				</div>

				<div className="pt-14 max-sm:pt-9 justify-center flex-wrap gap-8 flex" data-aos="fade-up">
					<WhyCard
						bg="bg-gradient-secondary"
						title={t("Interactive Exercises and Quizzes")}
						description={t(
							"Dynamic interactive exercises reinforcing core concepts"
						)}
						icon={
							<svg
								width="50"
								height="51"
								className="ms-3"
								viewBox="0 0 50 51"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M0 6.4918C0 3.04367 2.49132 0.240234 5.55556 0.240234H19.4444V12.7434C19.4444 14.4723 20.6858 15.8691 22.2222 15.8691H33.3333V28.1476L25.7986 36.6263C24.9045 37.6324 24.2795 38.8827 23.9757 40.26L22.3524 47.5763C22.1528 48.4749 22.1962 49.4127 22.4653 50.2625H5.55556C2.49132 50.2625 0 47.4591 0 44.0109V6.4918ZM33.3333 12.7434H22.2222V0.240234L33.3333 12.7434ZM47.7257 23.2636L48.9757 24.6702C50.3299 26.194 50.3299 28.6653 48.9757 30.1989L46.4236 33.0707L40.2604 26.1354L42.8125 23.2636C44.1667 21.7398 46.3628 21.7398 47.7257 23.2636ZM27.0747 40.9731L38.2899 28.3527L44.4531 35.2881L33.2378 47.8986C32.8819 48.2991 32.4392 48.5824 31.9444 48.7192L26.7274 50.1844C26.25 50.3211 25.7552 50.1648 25.408 49.7741C25.0608 49.3834 24.9219 48.8266 25.0434 48.2894L26.3455 42.4187C26.467 41.8717 26.7188 41.3638 27.0747 40.9633V40.9731Z"
									fill="white"
								/>
							</svg>
						}
					/>
					<WhyCard
						bg="bg-gradient-accent"
						title={t("Earn Certificate")}
						description={t(
							"Obtain official course certificate by completing the course"
						)}
						icon={
							<svg
								width="51"
								height="50"
								viewBox="0 0 51 50"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M0.900391 3.73047C0.636719 3.33984 0.5 2.87109 0.5 2.40234C0.5 1.07422 1.57422 0 2.90234 0H13.5762C14.6699 0 15.6953 0.576172 16.252 1.51367L22.9414 12.6563C18.2344 13.252 14.0254 15.4492 10.8906 18.7012L0.900391 3.73047ZM50.0898 3.73047L40.1094 18.7012C36.9746 15.4492 32.7656 13.252 28.0586 12.6563L34.748 1.51367C35.3145 0.576172 36.3301 0 37.4238 0H48.0977C49.4258 0 50.5 1.07422 50.5 2.40234C50.5 2.87109 50.3633 3.33984 50.0996 3.73047H50.0898ZM8.3125 32.8125C8.3125 28.2541 10.1233 23.8824 13.3466 20.6591C16.5699 17.4358 20.9416 15.625 25.5 15.625C30.0584 15.625 34.4301 17.4358 37.6534 20.6591C40.8767 23.8824 42.6875 28.2541 42.6875 32.8125C42.6875 37.3709 40.8767 41.7426 37.6534 44.9659C34.4301 48.1892 30.0584 50 25.5 50C20.9416 50 16.5699 48.1892 13.3466 44.9659C10.1233 41.7426 8.3125 37.3709 8.3125 32.8125ZM26.3203 23.5449C25.9883 22.8613 25.0215 22.8613 24.6797 23.5449L22.4922 27.9785C22.3555 28.252 22.1016 28.4375 21.8086 28.4766L16.9062 29.1895C16.1543 29.2969 15.8613 30.2148 16.3984 30.752L19.9434 34.209C20.1582 34.4238 20.2559 34.7168 20.207 35.0195L19.3672 39.8926C19.2402 40.6348 20.0215 41.2109 20.6953 40.8594L25.0703 38.5547C25.334 38.418 25.6562 38.418 25.9199 38.5547L30.2949 40.8594C30.9688 41.2109 31.75 40.6445 31.623 39.8926L30.7832 35.0195C30.7344 34.7266 30.832 34.4238 31.0469 34.209L34.5918 30.752C35.1387 30.2246 34.8359 29.3066 34.084 29.1895L29.1914 28.4766C28.8984 28.4375 28.6348 28.2422 28.5078 27.9785L26.3203 23.5449Z"
									fill="white"
								/>
							</svg>
						}
					/>
					<WhyCard
						bg="bg-gradient-primary"
						title={t("Learn at your own pace")}
						description={t(
							"Learn at your own pace without time constraints or limitations"
						)}
						icon={
							<svg
								width="47"
								height="55"
								viewBox="0 0 47 55"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1.95833 54.8333C1.43895 54.8333 0.940842 54.627 0.573583 54.2598C0.206324 53.8925 0 53.3944 0 52.875V4.42216C0.00014011 3.90906 0.134678 3.40494 0.390219 2.96C0.64576 2.51506 1.01339 2.14481 1.45651 1.88612C2.9375 1.02568 5.92151 0 11.75 0C16.3043 0 21.3985 1.80044 25.8928 3.38792C29.5121 4.66695 32.9306 5.875 35.25 5.875C38.2358 5.86584 41.1898 5.26254 43.9401 4.10026C44.275 3.95889 44.6397 3.90259 45.0017 3.93638C45.3636 3.97017 45.7116 4.093 46.0145 4.29392C46.3175 4.49484 46.566 4.76761 46.738 5.0879C46.9099 5.40819 46.9999 5.76606 47 6.12958V32.9783C46.9995 33.4542 46.8603 33.9196 46.5995 34.3177C46.3386 34.7157 45.9674 35.029 45.5312 35.2194C44.4652 35.6857 40.573 37.2083 35.25 37.2083C32.2954 37.2083 28.5941 36.3344 24.6762 35.4079C20.2724 34.3675 15.7193 33.2917 11.75 33.2917C7.23727 33.2917 4.92766 33.9746 3.91667 34.4067V52.875C3.91667 53.3944 3.71034 53.8925 3.34308 54.2598C2.97582 54.627 2.47772 54.8333 1.95833 54.8333Z"
									fill="white"
								/>
							</svg>
						}
					/>
				</div>
			</section>
			<section className=" max-sm:flex-col  items-center flex justify-between px-[40px] pt-16 max-sm:pt-12 max-sm:pb-16 pb-20">
				<div className=" md:flex md:w-[40%] md:h-full" data-aos="fade-right">
					<Image
						alt="code playground"
						src={"/assets/images/playground.png"}
						width={458}
						height={458}
						style={{ width: "100%" }}
					/>
				</div>
				<div className="md:w-[50%] text-center max-sm:w-full sm:w-full mt-9 mr-4" data-aos="fade-left">
					<h1 className=" max-sm:text-[36px] max-sm:leading-[45px] max-md:text-[40px] max-md:leading-[50px] leading-[58px] pb-5">
						Code Playground
					</h1>
					<p className="text-[18px] max-md:text-[16px] leading-[27px] ">
						{t(
							"With our online code editor, you can practice code and view the result in your browser"
						)}
					</p>
					<div className="w-100% flex justify-center">
						<button
							type="button"
							className={`text-base font-medium mt-10  text-white lg:flex bg-gradient-primary primaryButton focus:ring-4 focus:outline-none  rounded-3xl px-7 py-2  text-center `}
						>
							<Link href={"/code-playground/front-end"}>
								{t("Explore Playground")}
							</Link>
						</button>
					</div>
				</div>
			</section>
			<section className="w-full bg-[#ffe6ef]">
				<div className="w-full flex-col left-0 right-0 flex items-center  mb-10 max-sm:mb-0 max-sm:py-16 py-20">
					<h1 className="pb-16 max-sm:pb-12">{t("Popular Course")}</h1>
					<div className="flex justify-center items-center gap-8 px-8 flex-col">
						{courses?.map((course, index) => (
							<div key={course.uuid} data-aos="fade-up"
							data-aos-duration="2000">
								<div className="max-sm:hidden flex justify-center items-center">
									<PopularCourseCard
										image={course.image}
										title={course.title}
										level={course?.level?.name}
										// lesson={course.lesson}
										btnColor={courseCardStyle[index]?.btnColor}
										btnShadow={courseCardStyle[index]?.btnShadow}
										requiredTime={course.requiredTime}
										description={course.description}
									/>
								</div>
								<div className="sm:hidden">
									<CourseCard
										description={course.description}
										bgColor={courseCardStyle[index]?.bgColor}
										btnColor={courseCardStyle[index]?.btnColor}
										btnShadow={courseCardStyle[index]?.btnShadow}
										level={course?.level?.name}
										requiredTime={course.requiredTime}
										image={course.image}
										title={course.title}
									/>
								</div>
							</div>
						))}
					</div>

					<button
						type="button"
						className={` mt-10 flex primaryButton items-center text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-7 py-2  text-center `}
					>
						<Link href={"/courses"}>{t("View all course")}</Link>
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
				</div>
			</section>
			<section className="w-[92%] mt-20 max-sm:mt-0 max-sm:w-[100%]">
				<div className=" flex-col items-center flex w-full rounded-[30px] max-sm:rounded-[15px] bg-[#ecefff] py-20 max-sm:py-16 px-10 justify-center ">
					<h1 className=" max-sm:text-[36px] max-sm:leading-[47px] max-md:text-[40px] max-md:leading-[50px] leading-[58px] text-center">
						{t("What our")}
						<span className="text-app-secondary">
							&nbsp;{t("students")}&nbsp;
						</span>
						{t("say?")}
					</h1>
					<div className="pt-10 flex-wrap gap-7 justify-center flex flex-row" data-aos="zoom-in">
						<FeedBackCard
							avatar="/assets/images/pfp6.jpeg"
							name="Jasper Sky"
							width="lg:w-[48%] sm:w-[80%]"
							feedback="ខ្ញុំបានប្រើប្រាស់វេបសាយ ISTADemy នេះហើយខ្ញុំសង្កេតឃើញថាវាល្អសម្រាប់សិស្សានុសិស្សអាចរៀន ធ្វើសំណួរ​ លំហាត់ ដើម្បីពង្រឹងសមត្ថភាពរបស់ខ្លួន។"
						/>
						<FeedBackCard
							avatar="/assets/images/pfp1.jpeg"
							name="Emilia"
							width="lg:w-[48%] sm:w-[80%]"
							feedback="This is so practical and I learned so much in 6 months! Definitely beats sitting passively in my CS class"
						/>
						<FeedBackCard
							avatar="/assets/images/pfp2.jpeg"
							name="Sreynea Nea"
							width="lg:w-[48%] sm:w-[80%]"
							feedback="This is so practical and I learned so much in 6 months! Definitely beats sitting passively in my CS class"
						/>
						<FeedBackCard
							avatar="/assets/images/pfp5.jpeg"
							name="Ling Ling"
							width="lg:w-[48%] sm:w-[80%]"
							feedback={t(
								"This is so practical and I learned so much in 6 months! Definitely beats sitting passively in my CS class"
							)}
						/>
					</div>
				</div>
			</section>
		</main>
	);

};

export default HomePage;
