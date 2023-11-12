"use client";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { usePathname, useRouter } from "next/navigation";
import NotFound from "./not-found";

export const LayoutProvider = ({ children }) => {
  const pathname = usePathname();

  const shouldDisplayNavbar =
    !pathname.includes("/login") &&
    !pathname.includes("/signup") &&
    !pathname.includes("/student/") &&
    !pathname.includes("/sign-up-success") &&
    !pathname.includes("/admin") &&
    !pathname.includes("/code-playground/");
  const shouldDisplayFooter =
    !pathname.includes("/login") &&
    !pathname.includes("/tutorials/") &&
    !pathname.includes("/signup") &&
    !pathname.includes("/code-playground/") &&
    !pathname.includes("/sign-up-success") &&
    !pathname.includes("/content/") &&
    !pathname.includes("/admin") &&
    !pathname.includes("/student/setting") &&
    !pathname.startsWith("/student/courses");
    !pathname.startsWith("/en/student/courses");

  if (pathname.startsWith("/admin")) {
    return <NotFound />;
  }

  return (
    <>
      {shouldDisplayNavbar && <Navbar />}
      {children}
      {shouldDisplayFooter && <Footer />}
    </>
  );
  // }
};
