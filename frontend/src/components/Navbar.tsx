"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./DarkMode";
import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/store/features/hooks/hooks";
import { Button } from "./ui/button";
import { removeUser } from "@/lib/store/features/users/usersSlice";
import { deleteCookie, getCookie } from 'cookies-next';

// Define the type for the product
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function Navbar() {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem('token')
  };

  return (
    <nav className="flex items-center justify-between mb-[3vh] shadow-md shadow-orange-500">
      <div className="w-auto h-[5vw] ml-5">
        <Link href={"/"}>
          <div className="h-full w-full flex items-center justify-center">
            <Logo />
            <span className="text-xl font-semibold uppercase tracking-tight text-orange-500">
              Dear Book
            </span>
          </div>
        </Link>
      </div>
      <div className="border-b border-slate-800">
        <input
          type="text"
          placeholder="Search Books..."
          className="bg-transparent focus:outline-none py-1 px-4"
        />
      </div>
      <div className="mr-6 flex items-center justify-between gap-3">
        <ThemeToggle />

        { token ? (
          <Button
            onClick={handleLogout}
            className="h-8 rounded-md border border-white px-4 py-1 text-sm font-medium text-white bg-orange-500  transition-all hover:border-orange-500 hover:text-orange-500 hover:bg-black active:scale-95"
          >
            Logout
          </Button>
        ) : (
          <div>
            <Link
              href={"/signin"}
              className="h-8 rounded-md border border-orange-500 px-4 py-1 text-sm font-medium text-orange-500 transition-all hover:border-white hover:text-white hover:bg-orange-500 active:scale-95"
            >
              Signin
            </Link>

            <Link
              href={"/signup"}
              className="h-8 rounded-md border border-white px-4 py-1 text-sm font-medium text-white bg-orange-500  transition-all hover:border-orange-500 hover:text-orange-500 hover:bg-black active:scale-95"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

function Logo() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width="64"
        height="64"
      >
        {/* Hexagon Shape */}
        <polygon points="32,8 48,18 48,46 32,56 16,46 16,18" fill="#FB923C" />
        {/* Opened Book */}
        <g fill="#FFF">
          <path d="M22 24h8v16h-8z" />
          <path d="M34 24h8v16h-8z" />
          <path d="M22 24l10-6 10 6" />
          <path d="M22 40l10 6 10-6" />
        </g>
      </svg>
    </>
  );
}
