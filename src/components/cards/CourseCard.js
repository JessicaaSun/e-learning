import React from 'react'
import Image from 'next/image'
const CourseCard =  ({
  image,
  title,
  description,
  btnColor,
  btnShadow,
  level,
  lesson,
  requiredTime,
  bgColor
}) => {
  return (
    <div>
      <div
      style={{ filter: "drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.06))" }}
      className=" w-[300px] flex flex-col items-center bg-white rounded-[20px] hover:scale-105 transition-all"
    >
    <div style={{
        borderRadius: "20px 20px 0 0",
        backgroundImage: bgColor
    }} className={`py-5 w-full flex justify-center items-center`}>
      <div className="w-[150px] flex justify-center items-center h-[150px]">
        <Image className="object-contain" width={150} height={150} alt="course-image" src={image} />
        {/* <p>{image}</p> */}
      </div>
      </div>
      <div className="px-6 pb-4">
        <h2 className="pb-1 pt-3 font-semibold text-[20px]">{title}</h2>
        <div className=" overflow-hidden max-h-[4rem]">
          <p className="line-clamp-3 text-[14px] text-blue-gray-800">{description}</p>
        </div>

        <hr className="mt-3"></hr>
        <div className="flex items-end mt-2 justify-between">
          <div>
          <div className="flex">
            <svg
              className="mt-[1px] w-[13px]"
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
            <p className="ps-2 text-[12px]">{level}</p>
          </div>
          <div className="flex ">
            <svg
              className=" w-[13px]"
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

            <p className="ps-2 text-[12px]">{requiredTime} ម៉ោង</p>
          </div>
          </div>
          <div className="flex ">
            <svg
              
              className="mt-[1px] w-[15px]"
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

            <p className="ps-2 text-[12px]">{lesson} មេរៀន</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CourseCard
