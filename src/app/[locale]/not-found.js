import React from "react";
import Image from "next/image";
import Link from "next/link";
import NextButton from "@/components/icons/NextButton";

const NotFound = () => {
  return (
    <section>
      <div className="h-screen flex text-center justify-center items-center flex-col">
        <div>
          <Image
            src={"/assets/notfound/404.png"}
            width={600}
            height={600}
            alt="404 image"
          />
        </div>
        <div className="flex text-gray-800 pt-7 flex-col">
          <h1 className="pb-5 max-sm:text-[24px]">Oppsie! Something&apos;s missing...</h1>
          <h4 className="max-sm:text-[18px]">
            The page you&apos;re looking for doesn&apos;t exist, isn&apos;t
            available or loading incorrectly.
          </h4>
        </div>
        <div>
          <Link href={"/"}>
            <button
              type="button"
              className={`text-base xl:text-[18px] primaryButton flex items-center justify-center font-medium mt-10  text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl xl:px-8 px-7 xl:py-3 py-2  text-center `}
            >
              Back to home
              <NextButton className="me-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
