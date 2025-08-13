"use client";

import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useAppContext } from "@/app/AppContext";
import "quill/dist/quill.snow.css";
import { countWords } from "../LeftSection/LeftSection";

export default function RightSection() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const { quill, quillRef } = useQuill({ modules, theme: "snow" });

  const {
    windowWidthObject: { windowWidth },
    contentGeneratedObject: { contentGenerated },
  } = useAppContext();

  function escapeHTML(str: string) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }


  useEffect(() => {
    if (quill) {
      if (contentGenerated === "") {
        quill.setText(""); // Clear content
      } else {
        console.log("📥 Inserting generated content:", contentGenerated);
        const html = `<pre><code>${escapeHTML(contentGenerated)}</code></pre>`;
        quill.clipboard.dangerouslyPasteHTML(html);
      }
    }
  }, [quill, contentGenerated]);

  return (
    <div
      className={`p-5 py-6 flex-1 flex flex-col rounded-lg relative ${windowWidth <= 836 ? "w-full" : "w-1/2"
        }`}
    >
      <div className="flex items-center gap-1 justify-between">
        <h2 className="flex items-center gap-2">
          <IoDocumentTextOutline className="text-[19px] text-purple-600" />
          <div className="flex flex-col">
            <div className="text-[18px] text-slate-600 mt-[2px] text-center flex gap-1 font-semibold">
              <span className="hover:text-purple-600 cursor-pointer">
                Output
              </span>
            </div>
          </div>
        </h2>
      </div>

      <div className="text-slate-400 mt-12 text-[13px]">
        Below is the generated content. Feel free to edit and refine it further.
      </div>

      <div className="flex flex-col mt-3">
        <div ref={quillRef} style={{ height: "calc(100vh - 310px)" }} />
        <div className="flex justify-end mt-4">
          <span className="text-[12px] text-slate-400 text-end">
            {countWords(contentGenerated)} words generated
          </span>
        </div>
      </div>
    </div>
  );
}
