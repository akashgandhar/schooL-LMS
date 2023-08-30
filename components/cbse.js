import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Link from "next/link";

export default function Cbse() {
  const data = [
    {
      id: 1,
      title: "NAME OF THE SCHOOL",
      result: "M J PUBLIC SCHOOL",
    },
    {
      id: 2,
      title: "AFFILIATION NO(IF APPLICABLE)",
      result: "2132393",
    },
    {
      id: 3,
      title: "SCHOOL CODE( IF APPLICABLE)",
      result: "60978",
    },
    {
      id: 4,
      title: "COMPLETE ADDRESS WITH PIN CODE",
      result: "M J PUBLIC SCHOOL, RAYA ROAD SADABAD, HATHRAS, UP-281306",
    },
    {
      id: 5,
      title: "PRINCIPAL NAME AND QUALIFICATION",
      result: "Mr Mahendra Pal Singh, Principal, M.A., B.Ed",
    },
    {
      id: 6,
      title: "SCHOOL EMAIL ID",
      result: "mjpssadabad.cbse@gmail.com",
    },
    {
      id: 7,
      title: "CONTACT DETAILS( LAND LINE /MOBILE)",
      result: "7579924876; 9675454842; 8279450848",
    },
  ];

  const documents = [
    {
      id: 1,
      title:
        "COPIES OF AFFILIATION / UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION IF ANY",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Affliation.pdf?alt=media&token=31a1d77f-b631-4c0e-be6d-a615cd600f05",
    },
    {
      id: 2,
      title:
        "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE AS APPLICABLE",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Society%20Registration.pdf?alt=media&token=df922333-0b96-4df4-ad6f-c5ff8178a460",
    },
    {
      id: 3,
      title:
        "COPY OF NUMBER NO OBJECTION CERTIFICATE (NOC) ISSUED IF APPLICABLE BY THE STATE GOVERNMENT / UT",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/NOC.pdf?alt=media&token=86bf42f1-83a4-4294-bb67-05e7c0a5aa6a",
    },
    {
      id: 4,
      title:
        "COPIES OF RECOGNISED RECOGNITION CERTIFICATE UNDER RTE ACT 2009 AND ITS RENEWAL IF APPLICABLE",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/RTE%20Certificate.pdf?alt=media&token=cea25949-61b1-49b4-a8d7-055dd7f8603c",
    },
    {
      id: 5,
      title:
        "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Building%20Sefty%20certificate%20.pdf?alt=media&token=3eb3e8d4-9cd0-4685-a73b-a12abd90dbf8",
    },
    {
      id: 6,
      title:
        "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Fire%20Certificate.pdf?alt=media&token=f0408c33-0e76-4f91-b858-6df0cdeec7ec",
    },
    {
      id: 7,
      title:
        "COPY OF DEO THE CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATION OR SELF CERTIFICATION BY SCHOOL",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/DEO%20Certificate%20.pdf?alt=media&token=6420c02b-ce26-4dc2-83a4-893f77c3fce7",
    },
    {
      id: 8,
      title: "COPY OF VALID WATER, HEALTH AND SANITATION CERTIFICATE",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Health%2CWater%20and%20sanitation%20.pdf?alt=media&token=1a6e3e0d-0044-49d5-926e-58859a43b75e",
    },
  ];

  const academics = [
    {
      id: 1,
      title: "FEE STRUCTURE OF THE SCHOOL",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Fee_Structure.pdf?alt=media&token=f70eba44-2c0e-41a6-bff6-9d588346148b",
    },
    {
      id: 2,
      title: "ANNUAL ACADEMIC CALENDAR",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Academic%20Planner.pdf?alt=media&token=2b10d412-1aa3-45f4-b4e7-50f67bae1d6d",
    },
    {
      id: 3,
      title: "LIST OF SCHOOL MANAGEMENT COMMITTEE WITH BRACKET SMC",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/SMC.pdf?alt=media&token=a3d2af2b-d94c-40ec-a5df-6ffc8868541a",
    },
    {
      id: 4,
      title: "LIST OF PARENTS TEACHERS ASSOCIATION PTA MEMBERS",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/PTA.pdf?alt=media&token=81099162-52be-4137-ab1e-744bbca9f2fd",
    },
    {
      id: 5,
      title:
        "LAST THREE YEARS RESULTS OF THE BOARD EXAMINATION AS PER APPLICABILITY",
      link: "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Result.pdf?alt=media&token=18af3160-1a39-4304-8935-4dd0425602dd",
    },
  ];

  const results10 = [
    {
      id: 1,
      academicYear: "2022-23",
      totalStudents: 47,
      appearedStudents: 47,
      passPercentage: "100%",
      remarks: "---",
    },
    {
      id: 2,
      academicYear: "2021-22",
      totalStudents: 55,
      appearedStudents: 53,
      passPercentage: "96.36%",
      remarks: "2 Failed",
    },
    {
      id: 3,
      academicYear: "2020-21",
      totalStudents: 45,
      appearedStudents: 45,
      passPercentage: "100%",
      remarks: "---",
    },
  ];
  const results12 = [
    {
      id: 1,
      academicYear: "2022-23",
      totalStudents: 37,
      appearedStudents: 35,
      passPercentage: "94.59%",
      remarks: "2 Failed",
    },
    {
      id: 2,
      academicYear: "2021-22",
      totalStudents: 31,
      appearedStudents: 28,
      passPercentage: "90.32%",
      remarks: "1 Absent",
    },
    {
      id: 3,
      academicYear: "2020-21",
      totalStudents: 23,
      appearedStudents: 19,
      passPercentage: "100%",
      remarks: "4 Failed",
    },
  ];

  const staffDetails = [
    { id: 1, title: "PRINCIPAL", count: "01" },
    {
      id: 2,
      title: "TOTAL NO OF TEACHERS",
      teachers: [
        { category: "PGT", count: "12" },
        { category: "TGT", count: "15" },
        { category: "PRT", count: "15" },
      ],
    },
    {
      id: 3,
      title: "TEACHERS SECTION RATIO",
      ratio: "1:1.5",
      teachers: "42",
      sections: "24",
    },
    { id: 4, title: "DETAILS OF SPECIAL EDUCATOR", count: "01" },
    { id: 5, title: "DETAILS OF COUNSELLOR AND WELLNESS TEACHER", count: "01" },
  ];

  const infrastructure = [
    {
      id: 1,
      title: "TOTAL CAMPUS AREA OF THE SCHOOL (IN SQUARE METRE)",
      value: "2.5 Acre",
    },
    {
      id: 2,
      title: "NO AND SIZE OF THE CLASSROOMS (IN SQUARE METRE)",
      value: "26 Rooms-46 m2 and 10 Rooms-36 m2",
    },
    {
      id: 3,
      title:
        "NO AND SIZE OF LABORATORY IS INCLUDING COMPUTER LAB (IN SQUARE METRE)",
      value: "3 Labs-56 m2 and 1 computer labs-56 m2",
    },
    { id: 4, title: "INTERNET FACILITY (Y/N)", value: "Yes" },
    {
      id: 5,
      title: "NUMBER OF GIRLS TOILETS",
      value: "Toilets – 12 ; Urinals- 20",
    },
    {
      id: 6,
      title: "NUMBER OF BOYS TOILETS",
      value: "Toilets – 15 ; Urinals-24",
    },
    {
      id: 7,
      title:
        "LINK OF YOUTUBE VIDEOS OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE OF THE SCHOOL",
      value: "https://www.youtube.com/watch?v=NH1sf_AHgKE",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center p-10 px-20 xl:px-60">
      <div className="h-24"></div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <span className="text-[10rem] font-extrabold font-serif text-red-600">
            CBSE
          </span>
        </div>
        <div>
          <img
            className="w-80"
            src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/cbse.png?alt=media&token=a3fc207c-cf1b-4d64-a179-9d472e13f16a"
          />
        </div>
      </div>
      <div className="w-full">
        <span className="text-6xl">
          Mandatory <br />
          Disclosure
        </span>
      </div>

      <div className="border-2 w-full my-2 mt-20 "></div>
      <Link
        target="1"
        href="https://drive.google.com/file/d/10JuDERiSVKBQoFzOJIJQpjdS7qiJZdDk/view?usp=drive_link"
        className="w-full text-3xl font-bold text-red-600"
      >
        APPENDIX -IX (MANDATORY PUBLIC DISCLOSURE)
        <span className="text-xl underline">Click to view document</span>
      </Link>
      <div className="border-2 w-full mt-2"></div>

      <div className="w-full pt-10">
        <h1 className="text-4xl font-serif text-red-600">
          A. General Information
        </h1>
        {data.map((e, index) => {
          return (
            <h1
              className="flex justify-between text-justify my-4 font-semibold "
              key={index}
            >
              {e.id}. {e.title} : <span className="text-left">{e.result}</span>
            </h1>
          );
        })}
      </div>

      <div className="border-2 w-full my-10 "></div>

      <div className="w-full">
        <h1 className="text-4xl font-serif text-red-600">
          B. Documents and Information
        </h1>
        {documents.map((e, index) => {
          return (
            <h1 className="  my-4 font-semibold " key={index}>
              {e.id}. {e.title} (
              {
                <spam className="text-red-600 underline">
                  <Link target={1} href={e.link}>
                    Click to view document
                  </Link>
                </spam>
              }
              )
            </h1>
          );
        })}
      </div>
      <div className="border-2 w-full my-10 "></div>

      <div className="w-full">
        <h1 className="text-4xl font-serif text-red-600">
          C. RESULT AND ACADEMICS
        </h1>
        {academics.map((e, index) => {
          return (
            <h1 className="  my-4 font-semibold " key={index}>
              {e.id}. {e.title} (
              {
                <spam className="text-red-600 underline">
                  <Link target={1} href={e.link}>
                    Click to view document
                  </Link>
                </spam>
              }
              )
            </h1>
          );
        })}
      </div>

      <h1 className="text-slate-600 text-2xl font-semibold w-full py-10">
        Result CLASS : X
      </h1>
      <div className="w-full px-10">
        <table className="min-w-full border-2 border-gray-300 text-center">
          <thead>
            <tr>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                SN
              </th>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                Academic Year
              </th>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                Total Students
              </th>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                Appeared Students
              </th>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                Pass Percentage
              </th>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {results10.map((result) => (
              <tr key={result.id}>
                <td className="px-6 py-4 border-b-2">{result.id}</td>
                <td className="px-6 py-4 border-b-2">{result.academicYear}</td>
                <td className="px-6 py-4 border-b-2">{result.totalStudents}</td>
                <td className="px-6 py-4 border-b-2">
                  {result.appearedStudents}
                </td>
                <td className="px-6 py-4 border-b-2">
                  {result.passPercentage}
                </td>
                <td className="px-6 py-4 border-b-2">{result.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1 className="text-slate-600 text-2xl font-semibold w-full py-10">
        Result CLASS : XII
      </h1>
      <div className="w-full px-10 ">
        <table className="min-w-full border-2 border-gray-300 text-center">
          <thead>
            <tr>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                SN
              </th>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                Academic Year
              </th>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                Total Students
              </th>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                Appeared Students
              </th>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                Pass Percentage
              </th>
              <th className="px-6 py-4 border-b-2 font-medium text-black">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {results12.map((result) => (
              <tr key={result.id}>
                <td className="px-6 py-4 border-b-2">{result.id}</td>
                <td className="px-6 py-4 border-b-2">{result.academicYear}</td>
                <td className="px-6 py-4 border-b-2">{result.totalStudents}</td>
                <td className="px-6 py-4 border-b-2">
                  {result.appearedStudents}
                </td>
                <td className="px-6 py-4 border-b-2">
                  {result.passPercentage}
                </td>
                <td className="px-6 py-4 border-b-2">{result.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-2 w-full my-10 "></div>

      <div className="w-full">
        <h1 className="text-4xl font-serif text-red-600">
          D. STAFF (TEACHING)
        </h1>
        {staffDetails.map((e, index) => {
          if (e.id == 2) {
            return (
              <>
                <h1 className="  my-2 font-semibold " key={index}>
                  {e.id}. {e.title} : {e.count}
                </h1>
                {e.teachers.map((t, index) => {
                  return (
                    <h2 key={index} className="my-1 mx-5 font-semibold">
                      &bull; {t.category} : {t.count}
                    </h2>
                  );
                })}
              </>
            );
          } else if (e.id == 3) {
            return (
              <>
                <h1 className="  my-2 font-semibold " key={index}>
                  {e.id}. {e.title} : {e.ratio} (No. of Teachers : {e.teachers},
                  No. of Sections : {e.sections})
                </h1>
              </>
            );
          } else {
            return (
              <h1 className="  my-4 font-semibold " key={index}>
                {e.id}. {e.title} : {e.count}
              </h1>
            );
          }
        })}
      </div>

      <div className="border-2 w-full my-10 "></div>

      <div className="w-full pt-10">
        <h1 className="text-4xl font-serif text-red-600">
          D. SCHOOL INFRASTUCTURE
        </h1>
        {infrastructure.map((e, index) => {
          return (
            <h1
              className="flex justify-between text-justify my-4 font-semibold "
              key={index}
            >
              {e.id}. {e.title} : <span className="text-left">{e.value}</span>
            </h1>
          );
        })}
      </div>
    </div>
  );
}
