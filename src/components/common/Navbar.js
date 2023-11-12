"use client";
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
} from "@material-tailwind/react";
import Loading from "@/app/[locale]/loading";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { courseData } from "@/data/mockCourse";
import { useTranslations } from "next-intl";
import Image from "next/image";
import istademyLogo from "../../../public/assets/logos/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useGetCoursesQuery } from "@/store/features/course/courseApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser, setCurrentUser } from "@/store/features/auth/authSlice";
import { useGetRequestUserGithubQuery, useGetRequestUserGoogleQuery, useGetUserQuery } from "@/store/features/user/userApiSlice";
import { getSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// nav list menu
const CodePlaygroundListMenuItems = [
  {
    title: "Front end",
    path: "front-end",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
  {
    title: "Java",
    path: "java",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];

function CodePlaygroundListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = CodePlaygroundListMenuItems.map(
    ({ title, description, path }) => (
      <Link href={`/code-playground/${path}`} key={title}>
        <MenuItem>
          <Typography className="font-normal">{title}</Typography>
        </MenuItem>
      </Link>
    )
  );

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography className="font-normal">
            <MenuItem className="hidden items-center gap-2 lg:flex rounded-full">
              Code Playground
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 lg:hidden">
        <Typography as="a" href="#" className="font-normal">
          Code Playground
        </Typography>
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}

export default function NavbarComponent() {
  const t = useTranslations();
  const [openNav, setOpenNav] = React.useState(false);

  const [session, setSession] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSession();
      setSession(response);
    };
  
    fetchData();
  }, []);
  
  // const { data: googleUser, isLoading: googleLoading, error: errorGoogle } =
  //   useGetRequestUserGoogleQuery(session?.user?.email);
  
  // console.log(googleUser);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSession();
      setSession(res);
    };
  
    fetchData();
  }, []);
  
  // const { data: githubUser, isLoading: githubLoading, error: errorGithub } =
  //   useGetRequestUserGithubQuery(session?.user?.email);
  
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserQuery();
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (isSuccess) {
        dispatch(setCurrentUser(user));
      }
    }, [dispatch, isSuccess, user]);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);


  const navListItem = [
    {
      label: t("Courses"),
      path: "/courses",
    },
  ];

  function TutorialListMenu() {
    const { data: responseCourses } = useGetCoursesQuery("");
    const courses = responseCourses?.data.list;

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const renderItems = courses?.map(({ title, description, uuid }) => (
      <Link href={`/tutorials/${title.toLowerCase()}`} key={uuid}>
        <MenuItem>
          <Typography className="font-normal">{title}</Typography>
        </MenuItem>
      </Link>
    ));

    return (
      <React.Fragment>
        <Menu open={isMenuOpen} handler={setIsMenuOpen}>
          <MenuHandler>
            <Typography className="font-normal">
              <MenuItem className="hidden items-center gap-2 lg:flex rounded-full">
                {t("Tutorials")}
                <ChevronDownIcon
                  strokeWidth={2}
                  className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                    }`}
                />
              </MenuItem>
            </Typography>
          </MenuHandler>
          <MenuList>
            <ul className="col-span-4 flex w-full flex-col gap-1">
              {renderItems}
            </ul>
          </MenuList>
        </Menu>
        <MenuItem className="flex items-center gap-2 lg:hidden">
          <Typography as="a" href="#" className="font-normal">
            {t("Tutorials")}
          </Typography>
        </MenuItem>
        <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
          {renderItems}
        </ul>
      </React.Fragment>
    );
  }

  function NavList() {
    const router = useRouter();

    return (
      <List className="mt-4 mb-6 p-0  lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
        {navListItem.map((item) => (
          <Link key={item.label} href={item.path}>
            <div className="font-normal">
              <ListItem className="flex hover:text-app-primary items-center rounded-full gap-2 py-2 pr-4">
                {item.label}
              </ListItem>
            </div>
          </Link>
        ))}
        <TutorialListMenu />
        {/* <ExampleListMenu /> */}
        <CodePlaygroundListMenu />
      </List>
    );
  }

  function ExampleListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const renderItems = courseData.map(({ title, description }) => (
      <Link href={`/examples/${title}`} key={title}>
        <MenuItem>
          <Typography className="font-normal">{title}</Typography>
        </MenuItem>
      </Link>
    ));

    return (
      <React.Fragment>
        <Menu open={isMenuOpen} handler={setIsMenuOpen}>
          <MenuHandler>
            <Typography className="font-normal">
              <MenuItem className="hidden items-center gap-2 lg:flex rounded-full">
                {t("Examples")}
                <ChevronDownIcon
                  strokeWidth={2}
                  className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                    }`}
                />
              </MenuItem>
            </Typography>
          </MenuHandler>
          <MenuList>
            <ul className="col-span-4 flex w-full flex-col gap-1">
              {renderItems}
            </ul>
          </MenuList>
        </Menu>
        <MenuItem className="flex items-center gap-2 lg:hidden">
          <Typography className="font-normal">{t("Examples")}</Typography>
        </MenuItem>
        <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
          {renderItems}
        </ul>
      </React.Fragment>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Navbar className="top-0 shadow-sm bg-white sticky z-40 lg:px-10 rounded-none py-2 max-w-full">
      <div className="flex items-center justify-between text-black">
        <Typography
          as="a"
          href="/"
          variant="h5"
          className="flex items-center mr-4 hover:text-app-primary cursor-pointer py-1.5 lg:ml-2"
        >
          <div className="pr-2">
            <Image src={istademyLogo} className="w-16" alt="istademyLogo" />
          </div>
          <div className="mt-2 ms-2">ISTADemy</div>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <LanguageSwitcher />
          {user === undefined ? (
            <div className="hidden gap-2 lg:flex">
              <Link href="/auth/login">
                <button
                  style={{
                    border: "2px solid #3c5cff",
                  }}
                  className="align-middle text-app-primary select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[6px] px-5 rounded-full hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                  type="button"
                >
                  Sign In
                </button>
              </Link>

              <Link href="/auth/signup">
                <button
                  className="align-middle select-none font-bold relative overflow-hidden text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-5 rounded-full bg-gradient-primary text-white shadow-md shadow-blue-500/20 hover:shadow-primary active:opacity-[0.85]"
                  type="button"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/student/dashboard">
                <button
                  className="align-middle select-none font-bold relative overflow-hidden text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-7 rounded-full bg-gradient-primary text-white shadow-md shadow-blue-500/20 hover:shadow-primary active:opacity-[0.85]"
                  type="button"
                >
                  <p>Go to Dashboard</p>
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="lg:hidden items-center flex flex-row">
          <LanguageSwitcher />
          <IconButton variant="text" onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="h-full overflow-auto">
          <NavList />
          <div className="lg:hidden">
            {user === undefined ? (
              <div className="flex justify-between mb-4 flex-nowrap items-center gap-2">
                <Link href="/auth/login">
                  <button
                    style={{
                      border: "2px solid #3c5cff",
                    }}
                    className="align-middle text-app-primary select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[6px] px-5 rounded-full hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                    type="button"
                  >
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button
                    className="align-middle select-none font-bold relative overflow-hidden text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-7 rounded-full bg-gradient-primary text-white shadow-md shadow-blue-500/20  hover:shadow-primary active:opacity-[0.85]"
                    type="button"
                  >
                    <p>Sign Up</p>
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex justify-center mb-4  items-center ">
                <Link href="/student/dashboard">
                  <button
                    className="align-middle select-none font-bold relative overflow-hidden text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-7 rounded-full bg-gradient-primary text-white shadow-md shadow-blue-500/20  hover:shadow-primary active:opacity-[0.85]"
                    type="button"
                  >
                    <p>{t("Go to Dashboard")}</p>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
