'use client';

import React from 'react';
import Link from 'next/link';
import { AiFillRobot } from 'react-icons/ai';
import { useAuth } from "@clerk/nextjs";
import { BsGithub } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';


// Main Page Component
export default function Page() {
  return (
    <div className="poppins ">
      <div className="h-full  ">
        <Navbar />
      </div>

      <div>
        <Home />
      </div>
    </div>

  );
}

// Navbar Component
function Navbar() {
  return (
    <nav
  className="fixed top-0 left-0 w-full z-50 flex p-6 px-28 
             max-sm:mt-9 items-center justify-around max-sm:flex-col 
             bg-white/30 backdrop-blur-md shadow-md border-b border-white/20"
>
  <Logo />
  <Buttons />
</nav>

  );
}

// Navigation Links Component}

// Logo Component
function Logo() {
  return (
    <div className="flex gap-2 items-center">
      {/* Robot Icon Container */}
      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition">
        <AiFillRobot className="text-white text-[20px]" />
      </div>

      {/* Text */}
      <h1 className="text-[22px] flex gap-1 font-sans">
        <span className="font-extrabold bg-gradient-to-br from-violet-500 to-violet-700 bg-clip-text text-transparent">
          AI
        </span>
        <span className=" text-black font-semibold">Verse</span>
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
          <button className="max-sm:w-full px-6 py-3 bg-gradient-to-r from-violet-400 to-violet-700 text-white rounded-full shadow-lg hover:shadow-violet-600/50 hover:scale-105 transition">
            Dashboard
          </button>
        </Link>
      ) : (
        // If user is logged out, show Sign In and Sign Up buttons
        <>
          <Link href="/sign-in">
            <button className="max-sm:w-full px-6 py-3 bg-gradient-to-r from-violet-400 to-violet-700 text-white rounded-full shadow-lg hover:shadow-violet-600/50 hover:scale-105 transition">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="max-sm:w-full px-6 py-3 bg-gradient-to-r from-violet-400 to-violet-700 text-white rounded-full shadow-lg hover:shadow-violet-600/50 hover:scale-105 transition">
              Sign Up
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-300 to-slate-200 text-white pt-65 md:pt-24">

{/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-center 
                          items-center text-center px-6 py-12
                          rounded-t-3xl bg-gradient-to-br from-slate-300 to-slate-100
                          h-auto md:min-h-[70vh]">
        {/* Text Section */}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 
                         bg-gradient-to-r from-violet-400 to-violet-700 
                         bg-clip-text text-transparent">
            Welcome to Ai-Verse
          </h1>
          <p className="text-base md:text-lg max-w-2xl text-violet-600 mx-auto">
            Explore the future of{" "}
            <span className="text-violet-500 font-semibold">Artificial Intelligence</span>.
            Discover projects, insights, and a community passionate about AI innovations.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="AI Robot"
            className="w-48 sm:w-64 md:w-96 drop-shadow-lg hover:scale-105 transition"
          />
        </div>
      </section>


      {/* About Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-slate-100 to-slate-300 rounded-t-3xl shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-violet-500">About Ai-Verse</h2>
        <p className="max-w-3xl mx-auto text-lg text-violet-700">
          Ai-Verse is a hub for everything <span className="text-violet-400 font-semibold">AI</span>.
          From beginner-friendly guides to advanced projects, we provide resources
          and a platform to learn, build, and share AI-driven solutions.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-300 to-slate-100 rounded-t-3xl shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-12 text-violet-600">Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-slate-200 rounded-2xl shadow-md hover:shadow-violet-500/40 transition">
            <h3 className="text-xl font-semibold mb-4 text-violet-500">AI Projects</h3>
            <p className="text-violet-700">
              Explore hands-on projects to understand real-world applications of AI.
            </p>
          </div>
          <div className="p-6 bg-slate-200 rounded-2xl shadow-md hover:shadow-violet-600/40 transition">
            <h3 className="text-xl font-semibold mb-4 text-violet-600">Learning Resources</h3>
            <p className="text-violet-700">
              Access tutorials, blogs, and guides curated for beginners and experts.
            </p>
          </div>
          <div className="p-6 bg-slate-200 rounded-2xl shadow-md hover:shadow-violet-700/40 transition">
            <h3 className="text-xl font-semibold mb-4 text-violet-700">Templates</h3>
            <p className="text-violet-700">
              Custom-built template designed to inspire, simplify workflow, and deliver impactful results with style.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-slate-100 to-slate-300 rounded-t-3xl shadow-lg">
  {/* Heading */}
  <h2 className="text-4xl font-bold mb-6 text-violet-500">Explore Templates</h2>
  <p className="max-w-3xl mx-auto text-lg text-violet-700 mb-12">
    Choose from a variety of AI-powered templates to generate{" "}
    <span className="text-violet-600 font-semibold">content instantly</span>.
  </p>

  {/* Template Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
    {/* Card 1 */}
    <div className="p-6 bg-slate-200 rounded-2xl shadow-md hover:shadow-violet-300/50 hover:scale-105 transition">
      <h3 className="text-xl font-semibold text-violet-600 mb-3">Code Generator</h3>
      <p className="text-slate-600 text-sm">
        Generate clean and efficient code snippets for faster development.
      </p>
    </div>

    {/* Card 2 */}
    <div className="p-6 bg-slate-200 rounded-2xl shadow-md hover:shadow-violet-300/50 hover:scale-105 transition">
      <h3 className="text-xl font-semibold text-violet-600 mb-3">Blog Post</h3>
      <p className="text-slate-600 text-sm">
        Create engaging blog content in seconds with AI assistance.
      </p>
    </div>

    {/* Card 3 */}
    <div className="p-6 bg-slate-200 rounded-2xl shadow-md hover:shadow-violet-300/50 hover:scale-105 transition">
      <h3 className="text-xl font-semibold text-violet-600 mb-3">Post Title</h3>
      <p className="text-slate-600 text-sm">
        Generate catchy and impactful titles to grab audience attention.
      </p>
    </div>

    {/* Card 4 */}
    <div className="p-6 bg-slate-200 rounded-2xl shadow-md hover:shadow-violet-300/50 hover:scale-105 transition">
      <h3 className="text-xl font-semibold text-violet-600 mb-3">YouTube Hashtags</h3>
      <p className="text-slate-600 text-sm">
        Find trending hashtags to boost reach and visibility on YouTube.
      </p>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gradient-to-r from-slate-300 to-slate-100 text-violet-600">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-violet-700 font-semibold">Ai-Verse</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
