"use client";

import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Grid, Tag } from "antd";

const { useBreakpoint } = Grid;

export default function ContentSideBar({
  sections,
  isTutorial,
  drawerClass,
  isOpen,
  course,
  handleToggle,
}) {
  const screens = useBreakpoint();
  return (
    <div
      // className={`${
      //   isOpen ? "translate-x-0" : "-translate-x-full"
      // } transition-transform flex flex-col`}
      style={{
        top: "64px",
        height: "100vh", // Adjust the height as needed
        overflowY: "auto",
        overflowX: "hidden", // Prevent X-axis scrolling for the sidebar
        position: "sticky",
      }}
      className={`${
        isOpen ? "shadow-xl shadow-blue-gray-900/5 max-w-[20rem]" : "max-w-0"
      } `}
    >
      <Card
        className={`w-full ${isTutorial ? "p-4" : "px-4 pb-4 pt-5"} ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform flex flex-col ${drawerClass}`}
      >
        <div className="">
          <List className="">
            {sections?.map((e) => (
              <div key={e?.uuid}>
                <Typography color="blue-gray" className="mr-auto font-medium">
                  {e?.title}
                </Typography>
                {e?.lessons &&
                  e?.lessons?.map((lesson) => (
                    <Link
                      key={lesson?.uuid}
                      href={`${
                        isTutorial ? "/tutorials/" : "/student/courses/"
                      }${(course?.title).toLowerCase()}/${lesson?.uuid}/${
                        lesson?.contents[0]?.uuid
                      }`}
                    >
                      <ListItem>
                        <Typography
                          color="blue-gray"
                          className="mr-auto font-normal"
                        >
                          {lesson?.title}
                        </Typography>
                      </ListItem>
                    </Link>
                  ))}
              </div>
            ))}
          </List>
        </div>
      </Card>
      <div
        style={{
          position: "fixed",
          top: "78px",
          left: isOpen ? "21rem" : "1rem",
          zIndex: 9999,
        }}
      >
        <button className="focus:outline-none pe-4" onClick={handleToggle}>
          {isOpen ? (
            <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
}
