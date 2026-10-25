"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  FaCircleQuestion,
  FaFlask,
  FaInbox,
  FaRegCircleUser,
} from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";

const LINKS = [
  { label: "Dashboard", path: "/dashboard", icon: AiOutlineDashboard },
  { label: "Courses", path: "/dashboard", icon: LiaBookSolid },
  { label: "Calendar", path: "/calendar", icon: IoCalendarOutline },
  { label: "Inbox", path: "/inbox", icon: FaInbox },
  { label: "Labs", path: "/labs", icon: FaFlask },
  { label: "History", path: "/history", icon: IoCalendarOutline },
  {
    label: "Help",
    path: "/labs",
    icon: FaCircleQuestion,
    id: "wd-ai-nav-help",
    shortcut: true,
  },
] as const;

export default function KambazNavigation() {
  const pathname = usePathname() ?? "";
  const accountActive = pathname === "/account" || pathname.startsWith("/account/");

  return (
    <nav
      id="wd-kambaz-navigation"
      className="fixed bottom-0 top-0 z-20 hidden w-[120px] bg-black md:block"
    >
      <a
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
        rel="noreferrer"
        className="block bg-black py-3 text-center"
      >
        <Image
          src="/images/NEU.png"
          width={75}
          height={75}
          alt="Northeastern University"
          className="mx-auto"
        />
      </a>
      <Link
        href="/account"
        id="wd-account-link"
        className={`block py-3 text-center text-sm no-underline ${
          accountActive ? "bg-white text-red-600" : "bg-black text-white"
        }`}
      >
        <FaRegCircleUser
          className={`inline-block text-3xl ${
            accountActive ? "text-red-600" : "text-white"
          }`}
        />
        <br />
        Account
      </Link>
      {LINKS.map(({ label, path, icon: Icon, ...options }) => {
        const linkId = "id" in options ? options.id : `wd-${label.toLowerCase()}-link`;
        const active =
          !("shortcut" in options) &&
          (label === "Courses"
            ? pathname.startsWith("/courses/")
            : label === "Dashboard"
              ? pathname === path
              : pathname === path || pathname.startsWith(`${path}/`));

        return (
          <Link
            key={label}
            href={path}
            id={linkId}
            className={`block py-3 text-center text-sm no-underline ${
              active ? "bg-white text-red-600" : "bg-black text-white"
            }`}
          >
            <Icon className="inline-block text-3xl text-red-600" />
            <br />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
