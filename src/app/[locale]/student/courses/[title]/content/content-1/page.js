"use client";
import Image from "next/image";
import code from "../../../../../../../../public/assets/images/code-example.png";
import Link from "next/link";
import { useState } from "react";
import { commentData } from "@/data/mockComment";
import CommentDrawer from "@/components/comment/CommentDrawer";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const LessonContent = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <main>
      <p onClick={showDrawer} className="flex justify-end items-center cursor-pointer">
        <ChevronLeftIcon className="h-5 w-5 text-gray-500 "/>
        123 Comments
      </p>
      <CommentDrawer commentData={commentData} open={open} onClose={onClose} />

      <div className="w-full pt-5 px-6 flex-col flex">
        <h1>Environment</h1>
        <p className="pt-9">
          JavaScript ភាគច្រើនដំណើរការនៅក្នុងកម្មវិធីរុករកតាមអ៊ីនធឺណិត
          ឬដោយប្រើកម្មវិធីបន្ទាត់ពាក្យបញ្ជា node.js ។ នៅក្នុងការ ណែនាំនេះ
          យើងនឹងប្រើប្រាស់ប្រអប់ខ្សាច់ដែលមានមូលដ្ឋានលើបណ្តាញដែលបានបង្កប់សម្រាប់ឧទាហរណ៍របស់យើង។
          ទោះ យ៉ាងណាក៏ដោយ ប្រសិនបើអ្នកចង់រៀបចំបរិស្ថាននៅលើកុំព្យូទ័ររបស់អ្នក
          ហើយប្រើកម្មវិធីនិពន្ធអត្ថបទ ឬដែលអ្នកចូលចិត្ត
          ខាងក្រោមនេះជាជម្រើសមួយចំនួន។
        </p>
        <p className="pt-3">
          មិនចាំបាច់រៀបចំបរិយាកាសក្នុងតំបន់សម្រាប់ការណែនាំនេះទេ
          ដូច្នេះសូមកុំភ្លេចទៅផ្នែកបន្ទាប់ ប្រភេទ។
        </p>
        <h5 className="pt-4 mb-5">ឯកសារ HTML</h5>
        <p>
          វិធីសាមញ្ញបំផុតដើម្បីចាប់ផ្តើមជាមួយបរិស្ថានមូលដ្ឋានគឺដោយបង្កើតឯកសារ
          HTML នៅលើកុំព្យូទ័ររបស់អ្នក។ បង្កើតឯកសារ example.html
          នៅកន្លែងណាមួយនៅលើកុំព្យូទ័ររបស់អ្នក
          បើកវានៅក្នុងកម្មវិធីនិពន្ធកូដដែលអ្នកចូលចិត្តហើយបិទភ្ជាប់ក្នុង
          កូដខាងក្រោម៖
        </p>
        <Image
          src={code}
          alt="code example"
          className="pt-3"
          style={{ width: "100" }}
        />
        <div className="flex mt-16 justify-end">
          <Link href={"/student/courses/HTML/content/quiz"}>
            <button
              type="button"
              className={`  flex items-center primaryButton text-white lg:flex bg-gradient-primary  focus:ring-4 focus:outline-none  rounded-3xl px-5 py-[6px]  text-center `}
            >
              Quiz
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
    </main>
  );
};

export default LessonContent;
