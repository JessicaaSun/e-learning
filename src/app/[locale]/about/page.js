"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import aboutus from "../../../../public/assets/images/aboutUs.jpg";
import jessicaImg from "../../../../public/assets/developers/Sun Jessica.jpg";
import thairongImg from "../../../../public/assets/developers/Seng Thairong.jpg";
import vichhaiImg from "../../../../public/assets/developers/Chhanny Vichhai.jpg";
import samboleapImg from "../../../../public/assets/developers/Sovattana Samboleap.jpg";
import chhanvalitImg from "../../../../public/assets/developers/Thon Chhavalit-1.jpg";
import sreynuonImg from "../../../../public/assets/developers/Vean Sreynuon.jpg";
import bunthongImg from "../../../../public/assets/developers/Rorn Buthong.jpg";
import { useTranslations } from "next-intl";

function Card(props) {
  return (
    <div className=" bg-white rounded-lg">
      <div className="flex flex-col items-center pb-10">
        <Image
          className="h-28 w-28 object-cover mb-3 rounded-full"
          src={props.img}
          alt="developer image"
        />
        <h5 className="mb-1 text-2xl max-sm:text-sm text-center font-medium text-gray-900 dark:text-white">
          {props.name}
        </h5>
        <span className="text-sm max-sm:text-xs text-center text-gray-500 dark:text-gray-400">
          {props.job}
        </span>
      </div>
    </div>
  );
}

export default function AboutUs() {
  const [progressWidth, setProgressWidth] = useState(20);
  const t = useTranslations();
  const settings = {
    className: "center",
    infinite: false,
    slidesToShow: 3,
    swipeToSlide: true,
    nextArrow: <NextIcon />,
    prevArrow: <PrevIcon />,
    afterChange: (index) => {
      setProgressWidth((100 / 5) * (index + 1));
    },
  };
  return (
    <div>
      {/* About ISTADemy */}
      <div className="bg-white mb-[72px]">
        <div className="mx-auto justify-center items-center pt-10 px-20 flex flex-wrap  bg-white">
          <div className="mb-2 flex w-full lg:w-1/2" data-aos="fade-right">
            <Image
              alt="Hero Illustration"
              loading="eager"
              width={500}
              height={500}
              decoding="async"
              data-nimg="1"
              className="w-[60%]"
              src={aboutus}
            />
          </div>
          <div className="flex w-full lg:w-1/2">
            <div className="max-w-2xl" data-aos="fade-left">
              <h1 className="lg:text-start font-bold mb-2 text-gray-800 text-xl text-center sm:text-3xl lg:text-4xl xl:text-5xl ">
                {t("About ISTADemy")}
              </h1>
              <p className="py-5 text-center lg:text-start text-gray-500 lg:text-lg xl:text-xl ">
                {t(
                  "Unlock the Power of Coding with ISTADemy: Where Khmer-speaking learners excel in the digital world!"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our History */}
      <div className="mx-auto p-10 md:px-6 bg-purple-100">
        <section className="text-center lg:ps-36 lg:pe-36 lg:pt-16 lg:pb-16" data-aos="zoom-in">
          <h1 className="mb-10 text-xl lg:mb-14 text-center lg:text-4xl  font-bold">
            {t("Our History")}
          </h1>
          <p style={{lineHeight: "35px"}} className="pb-10 text-base lg:text-lg xl:text-xl  text-gray-500">
            {t(
              "When we started ISTADemy our goal was to give people the ability to learn the skills they’d need to succeed in the 21st century We set out to create a new interactive way of learning making it engaging flexible and accessible for as many people as possible Since then we have helped millions of people worldwide unlock modern technical skills and reach their full potential through code"
            )}{" "}
          </p>
        </section>
      </div>

      {/* Our Mission */}
      <div className="mx-auto p-10 md:px-6 bg-pink-100">
        <section className="text-center lg:ps-36 lg:pe-36 lg:pt-16 lg:pb-16" data-aos="zoom-out">
          <h1 className="mb-10 text-lg pt-8 lg:mb-14 lg:text-4xl md:text-3xl text-center  font-bold">
            {t("Our Mission")}
          </h1>
          <p style={{lineHeight: "35px"}} className="pb-10 text-base lg:text-lg xl:text-xl  text-gray-500">
            {t(
              "We want to create a world where anyone can build something meaningful with technology and everyone has the learning tools resources and opportunities to do so Code contains a world of possibilities — all that’s required is the curiosity and drive to learn At ISTADemy we are committed to empowering all people regardless of where they are in their coding journeys to continue to learn grow and make an impact on the world around them"
            )}
          </p>
        </section>
      </div>

      {/* ISTADemy Teams */}
      <div className="md:pt-5 p-5 mx-auto w-full xl:px-0 lg:flex md:flex justify-center items-center flex-wrap bg-white mb-40">
        <div className="flex justify-center items-center lg:w-1/3 md:w-2/3 w-full lg:p-10 ">
          <div className="max-w-2xl lg:ms-10">
            <h1 className="lg:mb-5 text-lg lg:text-4xl py-5  font-bold text-gray-800 sm:text-4xl md:text-4xl ">
            {t("ISTADemy Team")}
            </h1>
            <p style={{lineHeight: "35px"}} className="text-center lg:text-start mb-10 text-base  text-gray-500 lg:text-lg xl:text-xl">
              {t("Our Team description")}
            </p>
          </div>
        </div>
        <div className="lg:mt-28 md:pt-10 lg:w-2/3 md:w-2/3 w-full">
          <div className="w-[100%] lg:w-[750px] sm:w-[100%]">
            <Slider {...settings}>
              <div>
                <Card
                  className={styles.image}
                  img={jessicaImg}
                  name="Sun Jessica"
                  job="Front-end developer"
                />
              </div>
              <div>
                <Card
                  img={thairongImg}
                  name="Seng Thairong"
                  job="Front-end developer"
                />
              </div>
              <div>
                <Card
                  img={vichhaiImg}
                  name="Chhanny Vichhai"
                  job="Web Design"
                />
              </div>
              <div>
                <Card
                  img={samboleapImg}
                  name="Sovattana Samboleap"
                  job="Back-end developer"
                />
              </div>
              <div>
                <Card
                  img={chhanvalitImg}
                  name="Thon Chhavalit"
                  job="Back-end developer"
                />
              </div>
              <div>
                <Card img={sreynuonImg} name="Sreynuon Vean" job="Web Design" />
              </div>
              <div>
                <Card img={bunthongImg} name="Bunthong Ran" job="Web Design" />
              </div>
            </Slider>
            {/* <div className={styles.progress}>
              <div
                style={{ width: `${progressWidth}%` }}
                className={styles.progressFill}
              ></div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const PrevIcon = ({ onClick }) => {
  return (
    <div
      className={styles.slickIcons}
      style={{ bottom: "-5rem", left: "2rem" }}
    >
      <RiArrowLeftSLine className={styles.slickIconsLeft} onClick={onClick} />
    </div>
  );
};

const NextIcon = ({ onClick }) => {
  return (
    <div
      className={styles.slickIcons}
      style={{ bottom: "-5rem", left: "7rem" }}
    >
      <RiArrowRightSLine className={styles.slickIconsRight} onClick={onClick} />
    </div>
  );
};
