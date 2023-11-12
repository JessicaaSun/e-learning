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
  Avatar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  PowerIcon,
  XMarkIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useRouter } from "next/navigation";
import { courseData } from "@/data/mockCourse";
// import profileImage from "../../../../public/assets/images/pfp.jpg"
import Image from "next/image";
import istademyLogo from "../../../../public/assets/logos/logo.png";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import { useDispatch } from "react-redux";
import { logout, setCurrentUser } from "@/store/features/auth/authSlice";
import { getSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useGetCoursesQuery } from "@/store/features/course/courseApiSlice";
import { fallBackAvatar } from "@/constants/fallBack";

export default function NavbarComponent() {
  const t = useTranslations();
  const [session, setSession] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getSession();
      setSession(response);
    };

    fetchData();
  }, []);
  // const {
  //   data:googleUser ,
  //   isLoading: googleLoading,
  //   error: errorGoogle
  // } =
  // useGetRequestUserGoogleQuery(session?.user?.email);
  // console.log(googleUser);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSession();
      setSession(response);
    };

    fetchData();
  }, []);

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();
  const dispatch = useDispatch();

  // const {
  //   data: githubUser,
  //   isLoading: githubLoading,
  //   error: errorGithub
  // } =
  // useGetRequestUserGithubQuery(session?.user?.email);

  // useEffect(() => {
  //   if (isSuccess) {
  // 	dispatch(setCurrentUser(user, githubUser, googleUser));
  //   }
  // }, [dispatch, isSuccess, user, githubUser, googleUser]);

  // 	function getUserDisplayImage() {
  // 		if (user && user.data && user.data.profile.url) {
  // 		  return user.data.profile.url;
  // 		} else if (googleUser && googleUser.data && googleUser.data.avatar) {
  // 		  return googleUser.data.avatar;
  // 		} else if(githubUser && githubUser.data && githubUser.data.avatar){
  // 			return githubUser.data.avatar
  // 		} else {
  // 		  return "https://istademy-api.istad.co/files/02106872-d605-406b-82dc-77c0cbe3a24a.png";
  // 		}
  // 	  }

  const [openNav, setOpenNav] = React.useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    dispatch(logout());
    signOut({ callbackUrl: "/" }); // Replace '/' with the desired callback URL after logout
    // Clear any additional local storage or perform other logout logic
    router.push("/");
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // profile menu component
  const profileMenuItems = [
    {
      label: "Setting",
      icon: Cog6ToothIcon,
      path: "/student/setting/account",
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      path: "/",
      onClick: handleSignOut,
    },
  ];

  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const [previewImage, setPreviewImage] = useState(null);

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="profile"
              className="border w-[36px] h-[36px] object-cover border-blue-500 p-0.5"
              src={
                user?.data?.profile?.url
                  ? user?.data?.profile?.url
                  : fallBackAvatar
              }
            />

            {/* end profile */}

            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon: Icon, path, onClick }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <Link key={label} href={path}>
                <MenuItem
                  onClick={onClick || closeMenu}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                >
                  {React.createElement(Icon, {
                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                  })}

                  <Typography
                    as="span"
                    variant="small"
                    className="font-normal"
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              </Link>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

  const navListItem = [
    {
      label: t("My Learning"),
      path: "/student/dashboard",
    },
    {
      label: t("Courses"),
      path: "/student/courses/all",
    },
    {
      label: t("Certificate"),
      path: "/student/certificate",
    },
  ];

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
      </List>
    );
  }

  return (
    <Navbar className="top-0 shadow-sm bg-white fixed z-50 lg:px-10 rounded-none py-2 max-w-full">
      <div className="flex items-center justify-between text-black">
        <Typography
          as="a"
          href="/"
          variant="h5"
          className="flex items-center mr-4 hover:text-app-primary cursor-pointer py-1.5 lg:ml-2"
        >
          <div className="pr-2">
            <Image
              src={"/assets/logos/logo.png"}
              width={64}
              height={64}
              alt="istademyLogo"
            />
          </div>
          <div className="mt-2 ms-2 max-sm:hidden">ISTADemy</div>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <LanguageSwitcher />
          <ProfileMenu />
        </div>
        <div className="lg:hidden items-center flex flex-row">
          <LanguageSwitcher />
          <ProfileMenu />
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
        <NavList />
      </Collapse>
    </Navbar>
  );
}
