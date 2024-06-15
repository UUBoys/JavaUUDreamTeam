import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { CiHospital1 } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";

import { NavbarItem } from "@/Layout/Main/types";

const links: NavbarItem[] = [
  {
    id: 1,
    label: "Domů",
    href: "/",
    icon: <BiHomeAlt2 />,
  },
  {
    id: 2,
    label: "Nemocnice",
    href: "/hospitals",
    icon: <CiHospital1 />,
  },
  {
    id: 3,
    label: "Doktoři",
    href: "/doctors",
    icon: <FaUserDoctor />,
  },
];

const Navbar = () => {
  const { asPath, push } = useRouter();
  const [currentUrl, setCurrentUrl] = useState<string>();

  const handleLinkClick = (href: string) => {
    push(href);
  };

  useEffect(() => {
    setCurrentUrl(asPath);
  }, [asPath]);

  return (
    <div className="fixed left-[5%] top-0 mt-6 flex w-[90%] items-center justify-between rounded-md bg-white px-8 py-2 shadow-md">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h1 className="font-bold text-primary">DocO'Clock</h1>
      <div className="flex items-center gap-8">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => handleLinkClick(link.href)}
            className={clsx(
              "flex cursor-pointer flex-row items-center justify-center gap-2 rounded-[2px] border-b-2 border-b-transparent px-3 py-2 transition-all",
              currentUrl === link.href
                ? "!border-primary text-primary"
                : "text-gray-400 hover:!border-gray-400",
            )}
          >
            {link.icon}
            <p>{link.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
