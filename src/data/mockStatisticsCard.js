
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { BiUserPlus } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";

  export const statisticsCardsData = [
    {
      color: "blue",
      icon:HiUserGroup,
      title: "Total Students",
      value: "3,462",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "pink",
      icon: BsFillPersonPlusFill,
      title: "Total Enrolled Student",
      value: "2,300",
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "green",
      icon: FaBook,
      title: "Total Lessons",
      value: "34",
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
  ];
  
  export default statisticsCardsData;
  