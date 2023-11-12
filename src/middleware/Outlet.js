"use client";

import { selectCurrentToken, selectCurrentUser } from "@/store/features/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { use } from "react";
import { useSelector } from "react-redux";

export default function Outlet({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  console.log("token", token);
    // console.log("user", user);

//   if (pathname === "/welcome" && token) {
//     return children;
//   } else if (pathname === "/welcome" && !token) {
//     alert("Unauthorized");
//     router.push("/auth/login");
//   } 
  return children;
}
