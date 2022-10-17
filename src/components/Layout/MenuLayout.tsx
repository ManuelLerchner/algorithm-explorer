import React from "react";

export default function MenuLayout({
  title,
  subtitle,
  subSubtitle,
  content,
}: {
  title: string;
  subtitle: string;
  subSubtitle?: string;
  content: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-around h-min w-full  flex-col lg:flex-row ">
      <div className="title max-w-xl h-fit lg:mr-12 text-center lg:text-left flex flex-col lg:items-start items-center my-4 dark:text-white ">
        <h1 className="text-5xl sm:text-6xl">{title}</h1>
        <h2 className="text-2xl my-8 sm:max-w-[90%]">{subtitle}</h2>
        {subSubtitle && (
          <h3 className="text-xl sm:max-w-[90%]">{subSubtitle}</h3>
        )}
      </div>
      {content}
    </div>
  );
}
