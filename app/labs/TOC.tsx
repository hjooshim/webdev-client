"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/labs", id: "wd-home-link", label: "Home", active: () => false, external: false },
  { href: "/labs/lab1", id: "wd-toc-lab1", label: "Lab 1", active: (pathname: string) => pathname.endsWith("/lab1") || pathname.includes("/lab1/"), external: false },
  { href: "/labs/lab2", id: "wd-toc-lab2", label: "Lab 2", active: (pathname: string) => pathname.includes("/lab2"), external: false },
  { href: "/labs/lab3", id: "wd-toc-lab3", label: "Lab 3", active: (pathname: string) => pathname.includes("/lab3"), external: false },
  { href: "/labs/lab4", id: "wd-toc-lab4", label: "Lab 4", active: (pathname: string) => pathname.includes("/lab4"), external: false },
  { href: "/labs/lab5", id: "wd-toc-lab5", label: "Lab 5", active: (pathname: string) => pathname.includes("/lab5"), external: false },
  { href: "/", id: "wd-kambaz-link", label: "Kambaz", active: () => false, external: false },
  { href: "https://github.com/hjooshim/webdev-client", id: "wd-github", label: "GitHub", active: () => false, external: true },
  { href: "/book/ch1", id: "wd-toc-book-link", label: "Chapter 1", active: () => false, external: false },
  { href: "https://kambaz.dev/book/ch3", id: "wd-book-ch3-link", label: "Book Ch3", active: () => false, external: true },
];

const activeStyle = {
  backgroundColor: "#2563eb",
  color: "white",
  borderRadius: "4px",
  padding: "2px 8px",
  textDecoration: "none",
};

export default function TOC() {
  const pathname = usePathname() ?? "";
  return (
    <div id="wd-toc">
      <strong id="wd-toc-name">Hyunjoo Shim</strong>
      <ul>
        {LINKS.map((link) => {
          const active = link.active(pathname);
          const attributes = {
            id: link.id,
            style: active ? activeStyle : undefined,
            "aria-current": active ? ("page" as const) : undefined,
          };
          return (
            <li key={link.id}>
              {link.external ? (
                <a href={link.href} {...attributes} target={link.id === "wd-github" ? "_blank" : undefined} rel={link.id === "wd-github" ? "noreferrer" : undefined}>
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} {...attributes}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
