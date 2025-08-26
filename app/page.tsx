'use client';

import React from 'react';
import Link from 'next/link';
import { AiFillRobot } from 'react-icons/ai';
import { useAuth } from "@clerk/nextjs";

// Main Page Component
export default function Page() {
  return (
    <div className="poppins bg-slate-50 h-full">
      <Navbar />
    </div>
  );
}

// Navbar Component
function Navbar() {
  return (
    <nav className="flex p-6 px-28 max-sm:mt-9 items-center justify-around max-sm:flex-col">
      <Logo />
      <NavigationLinks />
      <Buttons />
    </nav>
  );
}

// Navigation Links Component
function NavigationLinks() {
  return (
    <div className="flex gap-4">
      <a href="#home" className="hover:text-gray-900 text-slate-500">Home</a>
      <a href="#product" className="hover:text-gray-900 text-slate-500">Features</a>
      <a href="#solutions" className="hover:text-gray-900 text-slate-500">Pricing</a>
    </div>
  );
}

// Logo Component
function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-9 h-9 bg-purple-600 rounded-md flex items-center justify-center">
        <AiFillRobot className="text-white text-[19px]" />
      </div>
      <h1 className="text-[20px] flex gap-1">
        <span className="font-bold text-purple-600">AI</span>
        <span className="font-light text-slate-600">Verse</span>
      </h1>
    </div>
  );
}

// Authentication Buttons Component
function Buttons() {
  const { userId, isLoaded } = useAuth();

  // Show a loading state while Clerk is checking the auth status
  if (!isLoaded) {
    return (
      <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
        <button className="p-2 bg-gray-200 rounded-md">Loading...</button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
      {userId ? (
        // If user is logged in, show Dashboard button
        <Link href="/dashboard">
          <button className="max-sm:w-full text-sm border border-orange-600 text-white bg-orange-600 hover:bg-orange-700 p-[8px] rounded-md">
            Dashboard
          </button>
        </Link>
      ) : (
        // If user is logged out, show Sign In and Sign Up buttons
        <>
          <Link href="/sign-in">
            <button className="max-sm:w-full text-sm border border-orange-600 text-orange-600 p-[8px] rounded-md">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="max-sm:w-full text-sm border border-orange-600 text-white bg-orange-600 hover:bg-orange-700 p-[8px] rounded-md">
              Sign Up
            </button>
          </Link>
        </>
      )}
    </div>
  );
}