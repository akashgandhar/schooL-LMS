import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/router";

export default function MarkSheet() {
  const router = useRouter();
  const s = router.query;
  const [name, setName] = useState(s.name);
  const [fName, setFName] = useState(s.Father_Name);
  const [className, setClassName] = useState(s.Class);
  const [aDate, setADate] = useState();
  const [pDate, setPDate] = useState();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // useEffect(() => {
  //  console.log(s);
  // }, [])

  return (
    <center className="w-full py-7 ">
      <div className=" bg-no-repeat bg-center">
        <div
          ref={componentRef}
          id="print"
          className="py-5 h-[29.7cm] w-[1024px]  "
        >
          <div className=" align-middle h-auto  mx-auto  border-2 border-black text-[12pt] outline-double">
            <div className="h-auto col-span-9 pb-5 flex justify-between">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=7ca8a823-a8a0-4316-8b80-3bbdb6e994f7"
                className="float-left ml-8 h-28 mt-2 mix-blend-color-burn"
              />
              <div className="ml-5  float-right ">
                <center className="float-left" style={{ lineHeight: "0.5" }}>
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
                  <div className="pt-0.5 mt-1 uppercase text-red-500 text-[30px] font-bold  font-serif ">
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

            <table class="w-[95%] my-8">
              <tbody class="bg-white text-[16px] font-bold ">
                <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                  <td class="px-1 w-[160px]  py-1 border-2 border-black">
                    ADMISSION NO:
                  </td>
                  <td class="px-1 w-[328px] py-1 border-2 border-black">22</td>
                  <td class="px-1 py-1 w-[150px] border-2 border-black">
                    BOARD REG.:
                  </td>
                  <td class="px-1 py-1 w-[150px] border-2 border-black">
                    BY BIRTH
                  </td>
                  <td rowSpan={4} class="px-1  py-3  border-2 border-black">
                    6/4/2000
                  </td>
                </tr>
                <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                  <td class="px-1 w-[160px]  py-1 border-2 border-black">
                    STUDENT'S NAME:{" "}
                  </td>
                  <td class="px-1 w-[328px] py-1 border-2 border-black">22</td>
                  <td class="px-1 py-1 w-[150px] border-2 border-black">
                    CLASS/SECTION:{" "}
                  </td>
                  <td class="px-1 py-1 w-[150px] border-2 border-black">
                    BY BIRTH
                  </td>
                </tr>
                <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                  <td class="px-1 w-[160px]  py-1 border-2 border-black">
                    FATHER'S NAME:{" "}
                  </td>
                  <td class="px-1 w-[328px] py-1 border-2 border-black">22</td>
                  <td class="px-1 py-1 w-[150px] border-2 border-black">
                    ROLL NO:{" "}
                  </td>
                  <td class="px-1 py-1 w-[150px] border-2 border-black">
                    BY BIRTH
                  </td>
                </tr>
                <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                  <td class="px-1 w-[160px]  py-1 border-2 border-black">
                    MOTHER'S NAME:{" "}
                  </td>
                  <td class="px-1 w-[328px] py-1 border-2 border-black">22</td>
                  <td class="px-1 py-1 w-[150px] border-2 border-black">
                    DOB:{" "}
                  </td>
                  <td class="px-1 py-1 w-[150px] border-2 border-black">
                    BY BIRTH
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="w-[95%] my-8">
              <tbody class="bg-white text-[16px]  font-bold ">
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
                  <td rowSpan={4} class="px-1  py-3  border-2 border-black">
                    GRAND TOTAL (100 MARKS)
                  </td>
                </tr>
                <tr class=" text-center h-[100px] font-serif text-[11px]">
                  <td
                    colSpan={2}
                    class="px-1 py-1 w-[160px] border-2 border-black"
                  >
                    THEORY{" "}
                  </td>
                  <td
                    colSpan={2}
                    class="px-1 py-1 w-[160px] border-2 border-black"
                  >
                    PRACTICAL / IA{" "}
                  </td>
                  <td
                    rowSpan={2}
                    class="px-1 py-1 w-[80px] border-2 border-black"
                  >
                    TOTAL{" "}
                  </td>
                  <td
                    colSpan={2}
                    class="px-1 py-1 w-[160px] border-2 border-black"
                  >
                    THEORY{" "}
                  </td>
                  <td
                    colSpan={2}
                    class="px-1 py-1 w-[160px] border-2 border-black"
                  >
                    PRACTICAL / IA{" "}
                  </td>
                  <td
                    rowSpan={2}
                    class="px-1 py-1 w-[80px] border-2 border-black"
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
              </tbody>
            </table>

            <table class="w-[95%] my-8">
              <tbody class="bg-white text-center text-[16px] font-bold ">
                <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                  <td colSpan={2} class="px-1 text-[18px] font-serif py-1 border-2 border-black">
                  CO-SCHOLASTIC AREAS (ON 3 POINT GRADING SCALE)
                  </td>
                </tr>
                <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                  <td class="px-1 w-1/2 py-1 border-2 border-black">
                    STUDENT'S NAME:{" "}
                  </td>
                  <td class="px-1  py-1 border-2 border-black">22</td>
                </tr>
                <tr class="text-[#b8121d]  h-[44px] text-[15px]">
                  <td class="px-1   py-1 border-2 border-black">
                    FATHER'S NAME:{" "}
                  </td>
                  <td class="px-1  py-1 border-2 border-black">22</td>
                </tr>
                <tr class="text-[#b8121d]  h-[44px] text-[1px]">
                  <td class="px-1   py-1 border-2 border-black">
                    MOTHER'S NAME:{" "}
                  </td>
                  <td class="px-1  py-1 border-2 border-black">22</td>
                </tr>
                <tr class="text-[#b8121d]  h-[44px] text-[1px]">
                  <td class="px-1   py-1 border-2 border-black">
                    MOTHER'S NAME:{" "}
                  </td>
                  <td class="px-1  py-1 border-2 border-black">22</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={handlePrint}
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Print
        </button>
      </div>
    </center>
  );
}
