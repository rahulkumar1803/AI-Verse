'use client';

import React from 'react';
import Link from 'next/link';
import { AiFillRobot } from 'react-icons/ai';
import { useAuth } from "@clerk/nextjs";

// Main Page Component
export default function Page() {
  return (
    <div className="min-h-screen w-full font-sans bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Unleash Your Creativity with
          <span className="bg-gradient-to-r from-purple-600 to-orange-500 text-transparent bg-clip-text"> AI Verse</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-8">
          Effortlessly generate high-quality content, from blog posts to social media updates, and save hours of work. Let our AI be your creative partner.
        </p>
        {/* The Buttons component is now used as the main Call to Action */}
        <Buttons />
      </main>
    </div>
  );
}

// Navbar Component
function Navbar() {
  return (
    <nav className="flex p-6 px-28 max-sm:mt-9 items-center justify-around max-sm:flex-col">
      <Logo />
      <Buttons />
    </nav>
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
          <button className="max-sm:w-full text-sm border border-purple-600 text-white bg-purple-600 hover:bg-purple-700 p-[8px] rounded-md">
            Dashboard
          </button>
        </Link>
      ) : (
        // If user is logged out, show Sign In and Sign Up buttons
        <>
          <Link href="/sign-in">
            <button className="max-sm:w-full text-sm border border-purple-600 text-white bg-purple-600 hover:bg-purple-700 p-[8px] rounded-md">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="max-sm:w-full text-sm border border-purple-600 text-white bg-purple-600 hover:bg-purple-700 p-[8px] rounded-md">
              Sign Up
            </button>
          </Link>
        </>
      )}
    </div>
  );
}