import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Link from "next/link";

export default function Cbse() {
  const data = [
    {
      id: 1,
      title: "NAME OF THE SCHOOL",
      result: "DELHI PUBLIC SCHOOL",
    },
    {
      id: 2,
      title: "AFFILIATION NO(IF APPLICABLE)",
      result: "2130102",
    },
    {
      id: 3,
      title: "SCHOOL CODE( IF APPLICABLE)",
      result: "60038",
    },
    {
      id: 4,
      title: "COMPLETE ADDRESS WITH PIN CODE",
      result: "DELHI PUBLIC SCHOOL, MATHURA REFINERY NAGAR, MATHURA, UP-281006",
    },
    {
      id: 5,
      title: "PRINCIPAL NAME AND QUALIFICATION",
      result: "Mr Salender Singh, Principal, MA, B.Ed",
    },
    {
      id: 6,
      title: "SCHOOL EMAIL ID",
      result: "principal@dpsmrn.org",
    },
    {
      id: 7,
      title: "CONTACT DETAILS( LAND LINE /MOBILE)",
      result: "0565-2430170; 0565-2416159",
    },
  ];

  const documents = [
    {
      id: 1,
      title:
        "COPIES OF AFFILIATION / UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION IF ANY",
      link: "https://example.com/document1",
    },
    {
      id: 2,
      title:
        "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE AS APPLICABLE",
      link: "https://example.com/document2",
    },
    {
      id: 3,
      title:
        "COPY OF NUMBER NO OBJECTION CERTIFICATE (NOC) ISSUED IF APPLICABLE BY THE STATE GOVERNMENT / UT",
      link: "https://example.com/document3",
    },
    {
      id: 4,
      title:
        "COPIES OF RECOGNISED RECOGNITION CERTIFICATE UNDER RTE ACT 2009 AND ITS RENEWAL IF APPLICABLE",
      link: "https://example.com/document4",
    },
    {
      id: 5,
      title:
        "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE",
      link: "https://example.com/document5",
    },
    {
      id: 6,
      title:
        "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY",
      link: "https://example.com/document6",
    },
    {
      id: 7,
      title:
        "COPY OF DEO THE CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATION OR SELF CERTIFICATION BY SCHOOL",
      link: "https://example.com/document7",
    },
    {
      id: 8,
      title: "COPY OF VALID WATER, HEALTH AND SANITATION CERTIFICATE",
      link: "https://example.com/document8",
    },
  ];

  const academics = [
    {
      id: 1,
      title: "FEE STRUCTURE OF THE SCHOOL",
      link: "https://example.com/document1",
    },
    {
      id: 2,
      title: "ANNUAL ACADEMIC CALENDAR",
      link: "https://example.com/document2",
    },
    {
      id: 3,
      title: "LIST OF SCHOOL MANAGEMENT COMMITTEE WITH BRACKET SMC",
      link: "https://example.com/document3",
    },
    {
      id: 4,
      title: "LIST OF PARENTS TEACHERS ASSOCIATION PTA MEMBERS",
      link: "https://example.com/document4",
    },
    {
      id: 5,
      title:
        "LAST THREE YEARS RESULTS OF THE BOARD EXAMINATION AS PER APPLICABILITY",
      link: "https://example.com/document5",
    },
  ];

  const results10 = [
    {
      id: 1,
      academicYear: "2020-21",
      totalStudents: 144,
      appearedStudents: 143,
      passPercentage: "100%",
      remarks: "1 ABSENT",
    },
    {
      id: 2,
      academicYear: "2019-20",
      totalStudents: 131,
      appearedStudents: 131,
      passPercentage: "100%",
      remarks: "---",
    },
    {
      id: 3,
      academicYear: "2018-19",
      totalStudents: 119,
      appearedStudents: 119,
      passPercentage: "100%",
      remarks: "---",
    },
  ];
  const results12 = [
    {
      id: 1,
      academicYear: "2020-21",
      totalStudents: 144,
      appearedStudents: 143,
      passPercentage: "100%",
      remarks: "1 ABSENT",
    },
    {
      id: 2,
      academicYear: "2019-20",
      totalStudents: 131,
      appearedStudents: 131,
      passPercentage: "100%",
      remarks: "---",
    },
    {
      id: 3,
      academicYear: "2018-19",
      totalStudents: 119,
      appearedStudents: 119,
      passPercentage: "100%",
      remarks: "---",
    },
  ];

  const staffDetails = [
    { id: 1, title: "PRINCIPAL", count: "01" },
    {
      id: 2,
      title: "TOTAL NO OF TEACHERS",
      teachers: [
        { category: "PGT", count: "16" },
        { category: "TGT", count: "27" },
        { category: "PRT", count: "27" },
      ],
    },
    {
      id: 3,
      title: "TEACHERS SECTION RATIO",
      ratio: "1:1.5",
      teachers: "70",
      sections: "47",
    },
    { id: 4, title: "DETAILS OF SPECIAL EDUCATOR", count: "01" },
    { id: 5, title: "DETAILS OF COUNSELLOR AND WELLNESS TEACHER", count: "01" },
  ];

  const infrastructure = [
    { id: 1, title: 'TOTAL CAMPUS AREA OF THE SCHOOL (IN SQUARE METRE)', value: '4.5 Acre' },
    { id: 2, title: 'NO AND SIZE OF THE CLASSROOMS (IN SQUARE METRE)', value: '50 Rooms-43 m2  and 14 Rooms-30 m2' },
    { id: 3, title: 'NO AND SIZE OF LABORATORY IS INCLUDING COMPUTER LAB (IN SQUARE METRE)', value: '4 Labs-77 m2 and 2 computer labs-50 m2' },
    { id: 4, title: 'INTERNET FACILITY (Y/N)', value: 'Yes' },
    { id: 5, title: 'NUMBER OF GIRLS TOILETS', value: 'Toilets – 22 ; Urinals- 27' },
    { id: 6, title: 'NUMBER OF BOYS TOILETS', value: 'Toilets – 15 ; Urinals-23' },
    { id: 7, title: 'LINK OF YOUTUBE VIDEOS OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE OF THE SCHOOL', value: 'Add link here' }
  ];
  

  return (
    <div className="w-full flex flex-col items-center justify-center p-10 px-60">
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

      <div className="border-2 w-full mt-20 "></div>

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
                {e.teachers.map((t,index) => {
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
