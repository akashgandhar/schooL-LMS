import React, { useState } from "react";

export default function StaffDetails() {
  const [sectionName, setSectionName] = useState("PGT");
  const [sections, setSections] = useState([
    "PGT",
    "TGT",
    "PRT",
    "Counsellor",
    "Special Educator",
    "Non Teaching Staff",
  ]);
  return (
    <div className="w-full flex flex-col items-center justify-center p-10 ">
      <div className="h-24"></div>
      <div className="flex flex-col items-center justify-center gap-1">
        <img
          src="/principle.jpg"
          alt="principle"
          className="h-96 w-96 border-2 object-cover"
        />
        <h1 className="text-2xl font-bold font-serif">Mahendra Pal Sing</h1>
      </div>

      <div className="flex justify-center h-20 border-y-4 w-full my-20 ">
        {sections.map((e, index) => {
          return (
            <div key={index}
              onClick={() => {
                setSectionName(e);
              }}
              className="w-60 hover:cursor-pointer hover:scale-105 border-black h-15 border-2 m-2 flex justify-center items-center"
            >
              <h1 className="font-bold text-2xl">{e}</h1>
            </div>
          );
        })}
      </div>

      <div className="w-full h-28 flex items-center justify-center text-4xl font-bold text-red-500 font-serif">
        <h1>{sectionName}s</h1>
      </div>

      <div className="grid grid-flow-col grid-cols-5 grid-rowa w-full border-y-2 p-5">
        <div className="flex flex-col items-center justify-center gap-1">
          <img
            src="/principle.jpg"
            alt="principle"
            className="h-72 w-72 border-2 object-cover"
          />
          <h1 className="text-2xl font-bold font-serif">Mahendra Pal Sing</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <img
            src="/principle.jpg"
            alt="principle"
            className="h-72 w-72 border-2 object-cover"
          />
          <h1 className="text-2xl font-bold font-serif">Mahendra Pal Sing</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <img
            src="/principle.jpg"
            alt="principle"
            className="h-72 w-72 border-2 object-cover"
          />
          <h1 className="text-2xl font-bold font-serif">Mahendra Pal Sing</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <img
            src="/principle.jpg"
            alt="principle"
            className="h-72 w-72 border-2 object-cover"
          />
          <h1 className="text-2xl font-bold font-serif">Mahendra Pal Sing</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <img
            src="/principle.jpg"
            alt="principle"
            className="h-72 w-72 border-2 object-cover"
          />
          <h1 className="text-2xl font-bold font-serif">Mahendra Pal Sing</h1>
        </div>
      </div>
    </div>
  );
}
