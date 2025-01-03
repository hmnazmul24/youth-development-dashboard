"use client";

import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { branchLogoutAction } from "@/actions/auth";
import { useRouter } from "next/navigation";

const AdminNav = ({ role }: { role?: "USER" | "ADMIN" }) => {
  const router = useRouter();
  return (
    <div className="h-20 px-3 border-b-2 border-b-gray-500 bg-sky-500 flex items-center justify-between shadow-md ">
      <div className="flex items-center justify-center gap-3">
        <Image
          height={60}
          width={60}
          alt="main-logo"
          className=" drop-shadow-lg"
          src={"/logo.png"}
        />
        <div className="max-w-sm  text-[1.2 rem] text-[#ad3c03f7] font-bold">
          The Earn Way Youth Development Resource
        </div>
      </div>
      <div className="md:pr-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BsPersonCircle />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end">
            <Link href={"/"}>
              <DropdownMenuItem className="text-purple-500">
                Go to Home
              </DropdownMenuItem>
            </Link>
            {role === "ADMIN" && (
              <Link href={"/branch/dashboard/analytics"}>
                <DropdownMenuItem className="cursor-pointer text-green-500">
                  My Branch
                </DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={() => {
                branchLogoutAction();
                router.push("/");
              }}
            >
              logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AdminNav;
