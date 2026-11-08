"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccountContext } from "./AccountContext";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useAccountContext();
  const links = currentUser
    ? [{ href: "/account/profile", label: "Profile" }]
    : [
        { href: "/account/signin", label: "Sign in" },
        { href: "/account/signup", label: "Sign up" },
      ];

  return (
    <div
      id="wd-account-navigation"
      className="wd list-group rounded-none text-lg"
    >
      {currentUser && (
        <p className="mb-3 text-sm">
          {currentUser.firstName} {currentUser.lastName}
        </p>
      )}
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`list-group-item border-0 ${pathname === href ? "active" : "text-red-600"}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
