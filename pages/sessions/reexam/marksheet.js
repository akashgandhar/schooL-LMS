import React, { useEffect, useState, useCallback } from "react";
import { useMarkSheet } from "./contexts/marksheetContext";
import { useExam } from "./contexts/context";
import { UseMarkSheetStream } from "./hooks/GetData";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Marksheet() {
  const {
    markSheet,
    setMarkSheet,
    selectedStudentId,
    setSelectedStudentId,
    selectedClassName,
    setSelectedClassName,
    selectedSectionName,
    setSelectedSectionName,
    selectedExam,
    setSelectedExam,
    lastUpdated,
    setLastUpdated,
    subjects,
    setSubjects,
    student: s,
    setStudent,
    subjectDetails,
    setSubjectDetails,
    onChangeMarkSheet,
    GetSubjectDetails,
    SubjectsIntersection,
    GetStudentDetails,
    UpdateMarks,
    UpdateCoActivities,
  } = useMarkSheet();

  // console.log(subjectDetails.sort((a, b) => {
  //   const nameA = a.Name.toUpperCase(); // ignore upper and lowercase
  //   const nameB = b.Name.toUpperCase(); // ignore upper and lowercase
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  //   return 0;
  // }));

  const { data: marksheet, isLoading } = UseMarkSheetStream(
    selectedStudentId,
    selectedExam
  );

  // const { UpdateMarks, lastUpdated } = useExam();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // console.log("marksheet", marksheet);

  const date = lastUpdated ? new Date(lastUpdated) : new Date();

  const hours = date?.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the time as a string
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const CalculateRemarks = (grade) => {
    if (grade === "A1") {
      return "Outstanding";
    } else if (grade === "A2") {
      return "Excellent";
    } else if (grade === "B1") {
      return "Very good";
    } else if (grade === "B2") {
      return "Good";
    } else if (grade === "C1") {
      return "Average";
    } else if (grade === "C2") {
      return "Satisfactory";
    } else if (grade === "D") {
      return "Needs Improvement";
    } else if (grade === "E") {
      return "Essential Repeat";
    } else if (grade === "Abs") {
      return "Absent";
    }
  };

  const CalculateGrade = (percentage) => {
    // console.log("percentage", percentage);
    if (percentage >= 90) {
      return "A1";
    } else if (percentage >= 80) {
      return "A2";
    } else if (percentage >= 70) {
      return "B1";
    } else if (percentage >= 60) {
      return "B2";
    } else if (percentage >= 50) {
      return "C1";
    } else if (percentage >= 40) {
      return "C2";
    } else if (percentage >= 33) {
      return "D";
    } else {
      return "E";
    }
  };

  const CalculateGrandTotal = () => {
    return (
      parseFloat(
        marksheet?.Term_1?.reduce((a, b) => a + parseFloat(b.Theory || 0), 0) ||
          0
      ) +
      parseFloat(
        marksheet?.Term_1?.reduce(
          (a, b) => a + parseFloat(b.Practical || 0),
          0
        ) || 0
      ) +
      parseFloat(
        marksheet?.Term_2?.reduce((a, b) => a + parseFloat(b.Theory || 0), 0) ||
          0
      ) +
      parseFloat(
        marksheet?.Term_2?.reduce(
          (a, b) => a + parseFloat(b.Practical || 0),
          0
        ) || 0
      )
    );
  };

  // console.log(s);

  const [result, setResult] = useState(0);

  const MarkResult = useCallback(() => {
    var res = 0;
    subjectDetails.map((e) => {
      const term1 =
        marksheet?.Term_1?.find((subject) => subject.Name === e.Name)?.Theory ||
        0;
      const term2 =
        marksheet?.Term_2?.find((subject) => subject.Name === e.Name)?.Theory ||
        0;

      console.log(term1, term2, e.MMT);

      const percent =
        ((parseFloat(term1) + parseFloat(term2)) / (e.MMT * 2)) * 100;

      if (percent >= 33) {
        res = res + 1;
      }
    });

    setResult(res);
  }, [subjectDetails, marksheet]);

  // console.log(result);

  useEffect(() => {
    MarkResult();
  }, [MarkResult, marksheet]);

  console.log(result);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className=" gap-5 h-[41cm] flex flex-col justify-between items-center">
      {/* Last Updated : {formattedTime || ""} */}
      <center ref={componentRef} className="w-full py-7 ">
        {/* {JSON.stringify(lastUpdated)} */}
        <div className="flex bg-no-repeat bg-center">
          <div className="w-full  items-center flex justify-center">
            <div id="print" className="py-5 h-[29.7cm] w-[1024px]  ">
              <div className=" align-middle flex  flex-col justify-center items-center h-auto border-[#ff7d23] mx-auto border text-[12pt] outline-offset-4 outline-double outline-[#ff7d23]">
                <div className="h-auto w-full col-span-9 pb-5 mt-5 flex justify-between">
                  <div className="flex justify-center items-center flex-col">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=7ca8a823-a8a0-4316-8b80-3bbdb6e994f7"
                      className="float-left ml-8 h-28 mt-2 mix-blend-color-burn"
                    />

                    <span className="ml-8 leading-none mt-2 w-28 text-red-500 font-serif font-bold">
                      Affiliation No
                      <br /> 2132393
                    </span>
                  </div>

                  <div className="ml-5 float-right ">
                    <center
                      className="float-left"
                      style={{ lineHeight: "0.5" }}
                    >
                      <span
                        className="text-[#993300] font-bold font-serif text-[48px]"
                        style={{ lineHeight: "1.2", letterSpacing: "2px" }}
                      >
                        M J PUBLIC SCHOOL
                      </span>
                      <br />
                      <span className="text-[28px] font-bold -mt-1 font-serif text-red-500">
                        RAYA ROAD SADABAD HATHRAS
                      </span>
                      <br />
                      <span
                        className="font-bold text-[20px] -mt-1 font-serif text-red-500"
                        style={{ lineHeight: "2" }}
                      >
                        Affiliated to C.B.S.E. New Delhi
                      </span>
                      {/* <div className="font-bold text-2xl italic mt-2 ml-2 w-fit px-2 border-2 border-black bg-white rounded-2xl"> */}
                      <div className="pt-0.5 mt-3 uppercase text-red-500 text-[35px] font-bold  font-serif ">
                        <span className="">MARKS STATEMENT</span>
                      </div>
                      {/* </div> */}
                    </center>
                  </div>
                  <div className="flex flex-col">
                    <img
                      src="/cbseimg.jpg"
                      className="float-right ml-7 mt-2 mr-8 h-28"
                    />
                    <span className="mr-8 mt-2 ml-7 w-28 leading-none text-red-500 font-serif font-bold">
                      School Code
                      <br /> 60978
                    </span>
                  </div>
                </div>

                <table class="w-[95%] mb-4 ">
                  <tbody class="bg-white text-[16px] font-bold ">
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td class="px-1 w-[160px]  py-1 border-2 border-black">
                        ADMISSION NO:
                      </td>
                      <td class="px-1 w-[328px] py-1 border-2 border-black">
                        {s.Sr_Number}
                      </td>
                      <td class="px-1 py-1 w-[150px] border-2 border-black">
                        BOARD REG.:
                      </td>
                      <td class="px-1 py-1 w-[150px] border-2  border-black">
                        <input
                          placeholder={
                            isLoading ? "Loading..." : marksheet?.BoardReg || ""
                          }
                          onChange={(event) => {
                            UpdateMarks(
                              "BoardReg",
                              event.target.value,
                              "BoardReg",
                              selectedStudentId
                            );
                          }}
                          className="w-full p-1 placeholder:text-[#b8121d]"
                        />
                      </td>
                      <td rowSpan={4} class="px-1  py-3  border-2 border-black">
                        <img
                          src={
                            s.Image ||
                            "https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/male-placeholder-image.jpeg?alt=media&token=961e8ee4-206e-416a-a320-fbc6ff4fb63a"
                          }
                          className="w-40 object-fill h-40 mx-auto"
                        />
                        {/* {s.Gender === "Male" ? (
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/male-placeholder-image.jpeg?alt=media&token=961e8ee4-206e-416a-a320-fbc6ff4fb63a"
                            className="w-40 object-cover h-40 mx-auto"
                          />
                        ) : (
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/pl.jpg?alt=media&token=79512227-2a66-4c12-89a1-6fcea4375422"
                            className="w-40 object-cover h-40 mx-auto"
                          />
                        )} */}
                      </td>
                    </tr>
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td class="px-1 w-[160px]  py-1 border-2 border-black">
                        STUDENT'S NAME:{" "}
                      </td>
                      <td class="px-1 w-[328px] py-1 border-2 border-black">
                        {s.name}
                      </td>
                      <td class="px-1 py-1 w-[150px] border-2 border-black">
                        CLASS/SECTION:{" "}
                      </td>
                      <td class="px-1 py-1 w-[150px] border-2 border-black">
                        {s.Class} / {s.Section}
                      </td>
                    </tr>
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td class="px-1 w-[160px]  py-1 border-2 border-black">
                        FATHER'S NAME:{" "}
                      </td>
                      <td class="px-1 w-[328px] py-1 border-2 border-black">
                        {s.Father_Name}
                      </td>
                      <td class="px-1 py-1 w-[150px] border-2 border-black">
                        ROLL NO:{" "}
                      </td>
                      <td class="px-1 py-1 w-[150px] border-2 border-black">
                        <input
                          placeholder={
                            isLoading ? "Loading..." : marksheet?.Roll_No || ""
                          }
                          onChange={(event) => {
                            UpdateMarks(
                              "Roll_No",
                              event.target.value,
                              "Roll_No",
                              selectedStudentId
                            );
                          }}
                          className="w-full p-1 placeholder:text-[#b8121d]"
                        />
                      </td>
                    </tr>
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td class="px-1 w-[160px]  py-1 border-2 border-black">
                        MOTHER'S NAME:{" "}
                      </td>
                      <td class="px-1 w-[328px] py-1 border-2 border-black">
                        {s.Mother_Name}
                      </td>
                      <td class="px-1 py-1 w-[150px] border-2 border-black">
                        DOB:{" "}
                      </td>
                      <td class="px-1 py-1 w-[150px] border-2 border-black">
                        {s.Date_Of_Birth}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="w-[95%] mt-1 mb-4">
                  <thead class="bg-white text-[16px]  font-bold ">
                    <tr class="text-[#000000] text-center h-[44px] font-serif text-[15px]">
                      <td
                        rowSpan={4}
                        class="px-1 w-[53px]  py-1 border-2 border-black"
                      >
                        SUBJECT CODE
                      </td>
                      <td
                        rowSpan={4}
                        class="px-1 w-[160px] py-1 border-2 border-black"
                      >
                        SUBJECT
                      </td>
                      <td
                        colSpan={5}
                        class="px-1 py-1 w-[150px] border-2 border-black"
                      >
                        TERM I (
                        {/* {subjectDetails.reduce((a, b) => a + b.MMT, 0) +
                          subjectDetails.reduce((a, b) => a + b.MMP, 0)}{" "} */}
                        50 MARKS )
                      </td>
                      <td
                        colSpan={5}
                        class="px-1 py-1 w-[150px] border-2 border-black"
                      >
                        TERM II (
                        {/* {subjectDetails.reduce((a, b) => a + b.MMT, 0) +
                          subjectDetails.reduce((a, b) => a + b.MMP, 0)}{" "} */}
                        50 MARKS)
                      </td>
                      <td
                        rowSpan={4}
                        class="px-1 w-[80px] py-3  border-2 border-black"
                      >
                        GRAND TOTAL (100 MARKS)
                      </td>
                    </tr>
                    <tr class=" text-center h-[100px] font-serif text-[15px]">
                      <td
                        colSpan={2}
                        class="px-1 py-1 w-[160px] border-2 border-black"
                      >
                        {["X", "IX", "XI", "XII"].includes(s.Class)
                          ? "THEORY"
                          : "UT"}
                      </td>
                      <td
                        colSpan={2}
                        class="px-1 py-1 w-[160px] border-2 border-black"
                      >
                        {["X", "IX", "XI", "XII"].includes(s.Class)
                          ? "PRACTICAL / IA"
                          : "Internal Assessment"}
                      </td>
                      <td
                        rowSpan={2}
                        class="px-1 py-1 w-[100px] text-[15px]   border-2 border-black"
                      >
                        TOTAL{" "}
                      </td>
                      <td
                        colSpan={2}
                        class="px-1 py-1 w-[160px] border-2 border-black"
                      >
                        {["X", "IX", "XI", "XII"].includes(s.Class)
                          ? "THEORY"
                          : "UT"}
                      </td>
                      <td
                        colSpan={2}
                        class="px-1 py-1 w-[160px] border-2 border-black"
                      >
                        {["X", "IX", "XI", "XII"].includes(s.Class)
                          ? "PRACTICAL / IA"
                          : "Internal Assessment"}
                      </td>
                      <td
                        rowSpan={2}
                        class="px-1 py-1 text-[15px] w-[100px] border-2 border-black"
                      >
                        TOTAL{" "}
                      </td>
                    </tr>
                    <tr class="font-serif text-center h-[44px] text-[13px]">
                      <td class="px-1 py-1  border-2 border-black">MM</td>
                      <td class="px-1 py-1  border-2 border-black">OBT</td>
                      <td class="px-1 py-1  border-2 border-black">MM</td>
                      <td class="px-1 py-1  border-2 border-black">OBT</td>
                      <td class="px-1 py-1  border-2 border-black">MM</td>
                      <td class="px-1 py-1  border-2 border-black">OBT</td>
                      <td class="px-1 py-1  border-2 border-black">MM</td>
                      <td class="px-1 py-1  border-2 border-black">OBT</td>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectDetails
                      .sort((a, b) => {
                        const nameA = a.Name.trim().toUpperCase(); // ignore upper and lowercase
                        const nameB = b.Name.trim().toUpperCase(); // ignore upper and lowercase
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((e, index) => {
                        // MarkResult(e.MMT, e.Name);
                        return (
                          <tr
                            key={index}
                            className="text-[12px] font-bold text-center"
                          >
                            <td class="px-1  py-1 border-2 border-black">
                              {e.Name.match(/\((\d+)\)/)?.[1]}
                            </td>
                            <td class="px-1   py-1 border-2 border-black">
                              {e.Name.replace(/\(\d+\)/, "")}
                            </td>
                            <td class="px-1   py-1 border-2 border-black">
                              {e.MMT}
                            </td>
                            <td class="px-1 py-1 border-2 border-black">
                              <input
                                placeholder={
                                  isLoading
                                    ? "Loading..."
                                    : marksheet && marksheet.Term_1
                                    ? marksheet?.Term_1?.find(
                                        (subject) => subject.Name === e.Name
                                      )?.Theory || "0"
                                    : ""
                                }
                                onChange={(event) => {
                                  if (event.target.value > e.MMT) {
                                    alert(
                                      "Marks cannot be greater than Maximum Marks"
                                    );
                                    return;
                                  }
                                  UpdateMarks(
                                    e.Name,
                                    event.target.value,
                                    "Term1T",
                                    selectedStudentId
                                  );
                                }}
                                className="w-7 p-1 placeholder:text-black"
                              />
                            </td>
                            <td class="px-1   py-1 border-2 border-black">
                              {e.MMP}
                            </td>
                            <td class="px-1 py-1 border-2 border-black">
                              <input
                                placeholder={
                                  isLoading
                                    ? "Loading..."
                                    : marksheet && marksheet.Term_1
                                    ? marksheet?.Term_1?.find(
                                        (subject) => subject.Name === e.Name
                                      )?.Practical || "0"
                                    : ""
                                }
                                onChange={(event) => {
                                  if (event.target.value > e.MMP) {
                                    alert(
                                      "Marks cannot be greater than Maximum Marks"
                                    );
                                    return;
                                  }
                                  UpdateMarks(
                                    e.Name,
                                    event.target.value,
                                    "Term1P",
                                    selectedStudentId
                                  );
                                }}
                                className="w-7 p-1 placeholder:text-black"
                              />
                            </td>
                            <td class="px-1   py-1 border-2 border-black">
                              {parseFloat(
                                marksheet?.Term_1?.find(
                                  (subject) => subject.Name === e.Name
                                )?.Practical || "0"
                              ) +
                                parseFloat(
                                  marksheet?.Term_1?.find(
                                    (subject) => subject.Name === e.Name
                                  )?.Theory || "0"
                                )}
                            </td>
                            <td class="px-1   py-1 border-2 border-black">
                              {e.MMT}
                            </td>
                            <td class="px-1   py-1 border-2 border-black">
                              <input
                                placeholder={
                                  isLoading
                                    ? "Loading..."
                                    : marksheet && marksheet.Term_2
                                    ? marksheet?.Term_2?.find(
                                        (subject) => subject.Name === e.Name
                                      )?.Theory || "0"
                                    : ""
                                }
                                onChange={(event) => {
                                  if (event.target.value > e.MMT) {
                                    alert(
                                      "Marks cannot be greater than Maximum Marks"
                                    );
                                    return;
                                  }
                                  UpdateMarks(
                                    e.Name,
                                    event.target.value,
                                    "Term2T",
                                    selectedStudentId
                                  );
                                }}
                                className="w-7 p-1 placeholder:text-black"
                              />
                            </td>
                            <td class="px-1   py-1 border-2 border-black">
                              {e.MMP}
                            </td>
                            <td class="px-1   py-1 border-2 border-black">
                              <input
                                placeholder={
                                  isLoading
                                    ? "Loading..."
                                    : marksheet && marksheet.Term_2
                                    ? marksheet?.Term_2?.find(
                                        (subject) => subject.Name === e.Name
                                      )?.Practical || "0"
                                    : ""
                                }
                                onChange={(event) => {
                                  if (event.target.value > e.MMP) {
                                    alert(
                                      "Marks cannot be greater than Maximum Marks"
                                    );
                                    return;
                                  }
                                  UpdateMarks(
                                    e.Name,
                                    event.target.value,
                                    "Term2P",
                                    selectedStudentId
                                  );
                                }}
                                className=" w-7 p-1 placeholder:text-black"
                              />
                            </td>
                            <td class="px-1   py-1 border-2 border-black">
                              {parseFloat(
                                marksheet?.Term_2?.find(
                                  (subject) => subject.Name === e.Name
                                )?.Practical || "0"
                              ) +
                                parseFloat(
                                  marksheet?.Term_2?.find(
                                    (subject) => subject.Name === e.Name
                                  )?.Theory || "0"
                                )}
                            </td>
                            <td class="px-1   py-1 border-2 border-black">
                              {parseFloat(
                                marksheet?.Term_2?.find(
                                  (subject) => subject.Name === e.Name
                                )?.Practical || "0"
                              ) +
                                parseFloat(
                                  marksheet?.Term_2?.find(
                                    (subject) => subject.Name === e.Name
                                  )?.Theory || "0"
                                ) +
                                parseFloat(
                                  marksheet?.Term_1?.find(
                                    (subject) => subject.Name === e.Name
                                  )?.Practical || "0"
                                ) +
                                parseFloat(
                                  marksheet?.Term_1?.find(
                                    (subject) => subject.Name === e.Name
                                  )?.Theory || "0"
                                )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                <table class="w-[95%] mt-1 mb-4">
                  <tbody class="bg-white text-[16px] text-left font-bold ">
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td
                        colSpan={2}
                        class="px-1 text-center text-[18px] font-serif py-1 border-2 border-black"
                      >
                        CO-SCHOLASTIC AREAS (ON 3 POINT GRADING SCALE)
                      </td>
                    </tr>
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td class="px-1 w-1/2 py-1 border-2 border-black">
                        Work Education
                      </td>
                      <td class="px-1  py-1 border-2 border-black">
                        <input
                          placeholder={
                            isLoading ? "Loading..." : marksheet?.work || "0"
                          }
                          onChange={(event) => {
                            UpdateCoActivities(
                              "work",
                              event.target.value,
                              selectedStudentId
                            );
                          }}
                          className="appearance-none w-5 placeholder:text-[#b8121d]"
                        />
                      </td>
                    </tr>
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td class="px-1   py-1 border-2 border-black">
                        General Studies
                      </td>
                      <td class="px-1  py-1 border-2 border-black">
                        <input
                          placeholder={
                            isLoading ? "Loading..." : marksheet?.art || "0"
                          }
                          onChange={(event) => {
                            UpdateCoActivities(
                              "art",
                              event.target.value,
                              selectedStudentId
                            );
                          }}
                          className="appearance-none w-5 placeholder:text-[#b8121d]"
                        />
                      </td>
                    </tr>
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td class="px-1   py-1 border-2 border-black">
                        Health & Physical Education
                      </td>
                      <td class="px-1  py-1 border-2 border-black">
                        <input
                          placeholder={
                            isLoading ? "Loading..." : marksheet?.health || "0"
                          }
                          onChange={(event) => {
                            UpdateCoActivities(
                              "health",
                              event.target.value,
                              selectedStudentId
                            );
                          }}
                          className="appearance-none w-5 placeholder:text-[#b8121d]"
                        />
                      </td>
                    </tr>
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td class="px-1 py-1 border-2 border-black">
                        Discipline
                      </td>
                      <td class="px-1  py-1 border-2 border-black">
                        <input
                          placeholder={
                            isLoading
                              ? "Loading..."
                              : marksheet?.discipline || "0"
                          }
                          onChange={(event) => {
                            UpdateCoActivities(
                              "discipline",
                              event.target.value,
                              selectedStudentId
                            );
                          }}
                          className="appearance-none placeholder:text-[#b8121d] w-5"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="w-[95%] mt-1 mb-4">
                  <tbody class="bg-white text-[16px] text-center font-serif font-bold ">
                    <tr class="text-[#3cb60c]  h-[44px] text-[15px]">
                      <td
                        colSpan={3}
                        class="px-1 text-center text-[18px] font-serif py-1 border-2 border-black"
                      >
                        FINAL RESULT
                      </td>
                    </tr>
                    <tr class="text-[#3cb60c]  h-[44px] text-[15px]">
                      <td class="px-1 w-1/3 py-1 border-2 border-black">
                        TOTAL MARKS OBTAINED
                      </td>
                      <td class="px-1 w-1/3 py-1 border-2 border-black">
                        PERCENTAGE
                      </td>
                      <td class="px-1 w-1/3 py-1 border-2 border-black">
                        FINAL GRADE
                      </td>
                    </tr>
                    <tr class="text-[#3cb60c]  h-[44px] text-[15px]">
                      <td class="px-1 w-1/3 py-1 border-2 border-black">
                        {CalculateGrandTotal()}/{" "}
                        {subjectDetails.reduce((a, b) => a + b.MMT, 0) * 2 +
                          subjectDetails.reduce((a, b) => a + b.MMP, 0) * 2}
                      </td>
                      <td class="px-1 w-1/3 py-1 border-2 border-black">
                        {(
                          (CalculateGrandTotal() /
                            (subjectDetails.reduce((a, b) => a + b.MMT, 0) * 2 +
                              subjectDetails.reduce((a, b) => a + b.MMP, 0) *
                                2)) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                      <td class="px-1 w-1/3 py-1 border-2 border-black">
                        {CalculateGrade(
                          (
                            (CalculateGrandTotal() /
                              (subjectDetails.reduce((a, b) => a + b.MMT, 0) *
                                2 +
                                subjectDetails.reduce((a, b) => a + b.MMP, 0) *
                                  2)) *
                            100
                          ).toFixed(2)
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="w-[95%] mt-1 mb-8">
                  <tbody class="bg-white text-[16px] text-center font-serif font-bold ">
                    <tr class="  h-[44px] text-[15px]">
                      <td class="px-1 w-[20%] font-normal py-1 border-2 border-black">
                        Attendance{" "}
                      </td>
                      <td class="px-1 w-[30%] py-1 border-2 border-black">
                        <input
                          placeholder={
                            isLoading
                              ? "Loading..."
                              : marksheet?.Attendance || ""
                          }
                          onChange={(event) => {
                            UpdateCoActivities(
                              "Attendance",
                              event.target.value,
                              selectedStudentId
                            );
                          }}
                          className="w-20 p-1 placeholder:text-[#b8121d]"
                        />
                      </td>
                      <td class="px-1 w-[20%] font-normal py-1 border-2 border-black">
                        Result{" "}
                      </td>
                      <td class="px-1 w-[30%] py-1 border-2 border-black">
                        {result < 5 ? "FAIL" : "PASS"}
                        {/* {CalculateGrade(
                          (
                            (CalculateGrandTotal() /
                              (subjectDetails.reduce((a, b) => a + b.MMT, 0) *
                                2 +
                                subjectDetails.reduce((a, b) => a + b.MMP, 0) *
                                  2)) *
                            100
                          ).toFixed(2)
                        ) === "E" ||
                        CalculateGrade(
                          (
                            (CalculateGrandTotal() /
                              (subjectDetails.reduce((a, b) => a + b.MMT, 0) *
                                2 +
                                subjectDetails.reduce((a, b) => a + b.MMP, 0) *
                                  2)) *
                            100
                          ).toFixed(2)
                        ) === "Abs"
                          ? "FAIL"
                          : "PASS"} */}
                      </td>
                    </tr>
                    <tr class=" h-[44px] text-[15px]">
                      <td class="px-1 w-[20%] font-normal py-1 border-2 border-black">
                        Class Teacher Remarks
                      </td>
                      <td class="px-1 w-[30%] py-1 text-[#b8121d] border-2 border-black">
                        {CalculateRemarks(
                          CalculateGrade(
                            (
                              (CalculateGrandTotal() /
                                (subjectDetails.reduce((a, b) => a + b.MMT, 0) *
                                  2 +
                                  subjectDetails.reduce(
                                    (a, b) => a + b.MMP,
                                    0
                                  ) *
                                    2)) *
                              100
                            ).toFixed(2)
                          )
                        )}

                        {/* <input
                          placeholder={
                            isLoading
                              ? "Loading..."
                              : marksheet?.CTRemarks || ""
                          }
                          onChange={(event) => {
                            UpdateCoActivities(
                              "CTRemarks",
                              event.target.value,
                              selectedStudentId
                            );
                          }}
                          className="w-full p-1 placeholder:text-[#b8121d]"
                        /> */}
                      </td>
                      <td class="px-1 w-[20%] py-1 font-normal border-2 border-black">
                        {" "}
                        New Seesion Begins on{" "}
                      </td>
                      <td class="px-1 w-[30%] py-1 border-2 border-black">
                        {" "}
                        01-04-2024
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex w-[95%] justify-between mb-5  mx-5">
                  <td colspan="3" className="border-t-2 border-black py-2">
                    Signature of Class Teacher
                  </td>

                  <td colspan="4" className="border-t-2 border-black py-2">
                    <div>Sign of Principal with school seal </div>
                  </td>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </center>

      <div className="flex justify-center items-center">
        <button
          onClick={handlePrint}
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 my-60 text-center mr-2 mb-2"
        >
          Print
        </button>
      </div>
    </div>
  );
}
