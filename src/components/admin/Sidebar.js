"use client";
import React, { useState } from "react";
import { Avatar, Dropdown, Sidebar } from "flowbite-react";
import { HiAcademicCap, HiChartPie, HiUser } from "react-icons/hi2";
import { BiBuoy } from "react-icons/bi";
import { FaNewspaper, FaSchool } from "react-icons/fa";
import {
  HiDocumentReport,
  HiOutlineLogout,
  HiViewBoards,
} from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { VscSettings } from "react-icons/vsc";
import { FaClipboardList, FaListUl, FaVoteYea } from "react-icons/fa";
import { IoMdColorFill, IoMdPeople } from "react-icons/io";
import {
  BsBookFill,
  BsFileEarmarkText,
  BsFillJournalBookmarkFill,
  BsFillMenuButtonFill,
  BsFillQuestionCircleFill,
  BsFilterSquareFill,
  BsKanbanFill,
  BsPenFill,
} from "react-icons/bs";

function AdminSidebar({ children }) {
  const active = "bg-gray-100 dark:bg-gray-700";
  const pathname = usePathname();
  const [drawerClass, setDrawerClass] = useState("left-0");
  const [drawer, setDrawer] = useState(false);
  const handleDrawer = () => {
    if (drawer) {
      setDrawer(false);
      setDrawerClass("left-64 lg:left-0");
    } else {
      setDrawer(true);
      setDrawerClass("left-0");
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={handleDrawer}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link href={"/admin/dashboard"} className="flex ml-2 md:mr-24">
                <Image
                  className="mr-3 w-full"
                  width={60}
                  height={60}
                  src="/assets/logos/logo.png"
                  alt="ISTADemy Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-app-primary">
                  ISTADemy
                </span>
              </Link>
            </div>

            <div className="flex">
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    alt="User settings"
                    img="/assets/images/pfp1.jpeg"
                    rounded={true}
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm"> Jessica Sun </span>
                  <span className="block truncate text-sm font-medium">
                    sunjessica05@gmail.com
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Link href="/admin/auth/login">
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </Link>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar
        aria-label="Sidebar with content separator example"
        className={
          "fixed top-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700 " +
          drawerClass
        }
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href={"/admin/dashboard"}
              as={Link}
              icon={HiChartPie}
              className={pathname.includes("dashboard") ? active : ""}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              href="/admin/students"
              as={Link}
              icon={IoMdPeople}
              className={pathname.includes("students") ? active : ""}
            >
              Students
            </Sidebar.Item>
            <Sidebar.Collapse icon={FaSchool} label="Academy">
              <Sidebar.Item
                href="/admin/courses"
                as={Link}
                icon={HiAcademicCap}
                className={pathname.includes("courses") ? active : ""}
              >
                Courses
              </Sidebar.Item>
              <Sidebar.Item
                href="/admin/sections"
                as={Link}
                icon={BsFillMenuButtonFill}
                className={pathname.includes("sections") ? active : ""}
              >
                Sections
              </Sidebar.Item>
              <Sidebar.Item
                href="/admin/lessons"
                as={Link}
                icon={BsBookFill}
                className={pathname.includes("lessons") ? active : ""}
              >
                Lessons
              </Sidebar.Item>
              <Sidebar.Item
                href="/admin/contents"
                as={Link}
                icon={FaNewspaper}
                className={pathname.includes("contents") ? active : ""}
              >
                Contents
              </Sidebar.Item>
              <Sidebar.Item
                href="/admin/exercises"
                as={Link}
                icon={BsPenFill}
                className={pathname.includes("exercises") ? active : ""}
              >
                Exercises
              </Sidebar.Item>
              <Sidebar.Item
                href="/admin/quizzes"
                as={Link}
                icon={BsKanbanFill}
                className={pathname.includes("quizzes") ? active : ""}
              >
                Quizzes
              </Sidebar.Item>
              <Sidebar.Item
                href="/admin/examples"
                as={Link}
                icon={BsFilterSquareFill}
                className={pathname.includes("examples") ? active : ""}
              >
                Examples
              </Sidebar.Item>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" as={Link} icon={HiUser}>
              Admin
            </Sidebar.Item>
            <Sidebar.Item href="/admin/question" as={Link} icon={VscSettings}>
              Setting
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <div className="p-4 lg:ml-64 mt-16 bg-[#fafafa]">{children}</div>
    </>
  );
}

export default AdminSidebar;
