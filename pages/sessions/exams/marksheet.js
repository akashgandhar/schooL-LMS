import React, { use, useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import UserContext from "../../../components/context/userContext";
import { db } from "../../../firebase";

export default function MarkSheet() {
  const router = useRouter();
  const s = router.query;
  const a = useContext(UserContext);
  const [subjects, setSubjects] = useState([]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  const getSubjects = async () => {
    if (count1 < 2) {
      try {
        const docRef = collection(
          db,
          `/users/${a.user}/sessions/${a.session}/exams/${s.examName}/classes/${s.Class}/subjects`
        );
        const docSnap = await getDocs(docRef);
        var list = [];
        docSnap.forEach((doc) => {
          list.push(doc.data());
        });
        setSubjects(list);
        setCount1(count1 + 1);
      } catch (e) {
        alert(e.message);
      }
    }
  };

  const [marks, setMarks] = useState([]);

  const [examList, setExamList] = useState([]);

  const GetExamList = async () => {
    if (count2 < 3) {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/exams`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data().Name);
      });
      setExamList(list);
      setCount2(count2 + 1);
    }
  };

  const [subList, setSubList] = useState([]);

  const GetSubList = async (exam) => {
    if (count3 < 2) {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/exams/${exam}/classes/${s.Class}/subjects`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      // setSubList(list);
      setCount3(count3 + 1);
      return list;
      // console.log("run");
    }
  };
  // console.log(subList);
  // console.log(examList);
  const GetMarks = async (exam) => {
    const subs = await GetSubList(exam);
    // console.log("run");
    try {
      const list = {};

      subs.forEach(async (e) => {
        // console.log(1);
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/exams/${exam}/classes/${s.Class}/subjects/${e.Name}/students/`,
          s.Sr_Number
        );
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data());
        if (docSnap.exists()) {
          list[e.Name] = docSnap.data();
          // console.log(list);
        }
      });
      return list;
    } catch (e) {
      console.log("error" + e.message);
      return null; // or handle the error as needed
    }

    return null; // or handle the case when count is greater than or equal to 2
  };

  const fetchMarksForExams = async (examList) => {
    if (count < 3) {
      const results = {};

      for (const exam of examList) {
        const marks = await GetMarks(exam); // Assuming you have defined the GetMarks function
        // console.log(marks);
        if (marks !== null) {
          results[exam] = marks;
        }
      }
      setCount(count + 1);
      return results;
    }
  };

  const [results, setResults] = useState({});

  // console.log(results);
  


  useEffect(() => {
    getSubjects();
    GetExamList();
    GetSubList();

    fetchMarksForExams(examList)
      .then((results) => {
        setResults(results);
      })
      .catch((error) => {
        console.error(error);
      });
    // getMarks();
  }, [subjects, marks]);

  // console.log(results);

  return (
    <div className="flex gap-5 flex-col justify-center items-center">
      <center className="w-full py-7 ">
        <div className="flex  bg-no-repeat bg-center">
          <div
            ref={componentRef}
            className="w-full  items-center flex justify-center"
          >
            <div id="print" className="py-5 h-[29.7cm] w-[1024px]  ">
              <div className=" align-middle flex  flex-col justify-center items-center h-auto border-[#ff7d23] mx-auto border text-[12pt] outline-offset-4 outline-double outline-[#ff7d23]">
                <div className="h-auto w-full col-span-9 pb-5 mt-5 flex justify-between">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=7ca8a823-a8a0-4316-8b80-3bbdb6e994f7"
                    className="float-left ml-8 h-28 mt-2 mix-blend-color-burn"
                  />
                  <div className="ml-5  float-right ">
                    <center
                      className="float-left"
                      style={{ lineHeight: "0.5" }}
                    >
                      <span
                        className="text-[#993300] font-bold font-serif text-[48px]"
                        style={{ lineHeight: "1.2", letterSpacing: "-2px" }}
                      >
                        M J PUBLIC SCHOOL
                      </span>
                      <br />
                      <span className="text-[33px] font-bold -mt-1 font-serif text-red-500">
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
                        <span className="">MARK STATEMENT</span>
                      </div>
                      {/* </div> */}
                    </center>
                  </div>
                  <img
                    src="	https://mjpssadabad.in/mdls/report/cbse-logo.png"
                    className="float-right ml-7 mt-2 mr-8 h-28"
                  />
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
                      <td class="px-1 py-1 w-[150px] border-2 border-black">
                        BY BIRTH
                      </td>
                      <td rowSpan={4} class="px-1  py-3  border-2 border-black">
                        {s.Gender === "Male" ? (
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/male-placeholder-image.jpeg?alt=media&token=961e8ee4-206e-416a-a320-fbc6ff4fb63a"
                            className="w-40 object-cover h-40 mx-auto"
                          />
                        ) : (
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/pl.jpg?alt=media&token=79512227-2a66-4c12-89a1-6fcea4375422"
                            className="w-40 object-cover h-40 mx-auto"
                          />
                        )}
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
                        00
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
                        TERM I (50 MARKS)
                      </td>
                      <td
                        colSpan={5}
                        class="px-1 py-1 w-[150px] border-2 border-black"
                      >
                        TERM II (50 MARKS){" "}
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
                        PT 1 <br />&<br /> PT 2{" "}
                      </td>
                      <td
                        colSpan={2}
                        class="px-1 py-1 w-[160px] border-2 border-black"
                      >
                        TERM 1
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
                        PT 3 <br />&<br /> PT 4{" "}
                      </td>
                      <td
                        colSpan={2}
                        class="px-1 py-1 w-[160px] border-2 border-black"
                      >
                        TERM 2
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
                    {subjects.map((e, index) => {
                      return (
                        <tr
                          key={index}
                          className="text-[12px] font-bold text-center"
                        >
                          <td class="px-1  py-1 border-2 border-black">
                            {index + 1}
                          </td>
                          <td class="px-1   py-1 border-2 border-black">
                            {e.Name}
                          </td>
                          <td class="px-1   py-1 border-2 border-black">20</td>
                          <td class="px-1   py-1 border-2 border-black">00</td>
                          <td class="px-1   py-1 border-2 border-black">30</td>
                          <td class="px-1   py-1 border-2 border-black">00</td>
                          <td class="px-1   py-1 border-2 border-black">00</td>
                          <td class="px-1   py-1 border-2 border-black">20</td>
                          <td class="px-1   py-1 border-2 border-black">00</td>
                          <td class="px-1   py-1 border-2 border-black">30</td>
                          <td class="px-1   py-1 border-2 border-black">00</td>
                          <td class="px-1   py-1 border-2 border-black">00</td>
                          <td class="px-1   py-1 border-2 border-black">
                            0.00
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
                        <select className="appearance-none w-5">
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                        </select>
                      </td>
                    </tr>
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td class="px-1   py-1 border-2 border-black">
                        Art Education
                      </td>
                      <td class="px-1  py-1 border-2 border-black">
                        <select className="appearance-none w-5">
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                        </select>
                      </td>
                    </tr>
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td class="px-1   py-1 border-2 border-black">
                        Health & Physical Education
                      </td>
                      <td class="px-1  py-1 border-2 border-black">
                        <select className="appearance-none w-5">
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                        </select>
                      </td>
                    </tr>
                    <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                      <td class="px-1   py-1 border-2 border-black">
                        Discipline
                      </td>
                      <td class="px-1  py-1 border-2 border-black">
                        <select className="appearance-none w-5">
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                        </select>
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
                      <td class="px-1 w-1/3 py-1 border-2 border-black">00</td>
                      <td class="px-1 w-1/3 py-1 border-2 border-black">
                        0.00
                      </td>
                      <td class="px-1 w-1/3 py-1 border-2 border-black">Abs</td>
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
                        0/0{" "}
                      </td>
                      <td class="px-1 w-[20%] font-normal py-1 border-2 border-black">
                        Result{" "}
                      </td>
                      <td class="px-1 w-[30%] py-1 border-2 border-black">
                        Passed, Promoted to Class XII
                      </td>
                    </tr>
                    <tr class=" h-[44px] text-[15px]">
                      <td class="px-1 w-[20%] font-normal py-1 border-2 border-black">
                        Class Teacher Remarks
                      </td>
                      <td class="px-1 w-[30%] py-1 border-2 border-black">
                        Should work very hard
                      </td>
                      <td class="px-1 w-[20%] py-1 font-normal border-2 border-black">
                        {" "}
                        School Reopens on{" "}
                      </td>
                      <td class="px-1 w-[30%] py-1 border-2 border-black">
                        {" "}
                        3RD APRIL 2023
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
      <button
        onClick={handlePrint}
        class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 my-60 text-center mr-2 mb-2"
      >
        Print
      </button>
    </div>
  );
}
