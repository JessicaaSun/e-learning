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

export default function SideNav({
  items,
  drawerClass,
  isOpen,
  handleToggle,
}) {
  const screens = useBreakpoint();
  return (
    <div className="flex">
      <Card
        className={
          `min-h-screen transition-transform -translate-x-full ${
            isOpen && "translate-x-0"
          } fixed top-0 left-0 z-10 w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5` +
          { drawerClass }
        }
      >
        <List className="h-full pt-20">
          {items.map((e) => (
            <Link key={e.title} href={e.path}>
              <ListItem>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  {e.title}
                </Typography>
              </ListItem>
            </Link>
          ))}
        </List>
      </Card>
      <div
        className="fixed top-20 z-10 max-sm:px-5 px-10"
        style={{ marginLeft: isOpen ? "280px" : "" }}
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
