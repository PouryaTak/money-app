"use client";
import { HomeIcon, PieChartIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Icon from "@/components/ui/icons";

const links = [
  {
    title: "Home",
    href: "/",
    icon: "Home",
  },
  {
    title: "Chart",
    href: "/chart",
    icon: "PieChart",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <ul className="w-full p-3 grid grid-flow-col">
      {links.map((i) => {
        const isActive = pathname === i.href;
        return (
          <li key={i.title} className={isActive ? 'text-orange-500': ''}>
            <Link
              href={i.href}
              className="flex flex-col items-center justify-center gap-2"
            >
              <Icon name={i.icon} />
              <span className="text-sm">{i.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
