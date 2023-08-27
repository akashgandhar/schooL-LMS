import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import UserContext from "../../../components/context/userContext";
import { db } from "../../../firebase";
import { data } from "autoprefixer";

export default function AdmitCard() {
  const router = useRouter();
  const s = router.query;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // console.log(JSON.parse(s.Students));
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log(data);
    // Simulating fetching data (replace this with your actual data fetching)
    setTimeout(() => {
      try {
        const fetchedData = JSON.parse(s.Students);
        setData(fetchedData);
      } catch {
        setData([]);
      }
      // Update state with fetched data
    }, 2000); // Simulate delay for fetching data
  }, []);
  // console.log(s.Students);

  const [SubjectList, setSubjectList] = useState([]);

  const [count, setCount] = useState(0);

  const GetSubjectList = async () => {
    if (s.Class && s.Exam && count < 3) {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/exams/${s.Exam}/classes/${s.Class}/subjects`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setSubjectList(list);
      setCount(count + 1);
    }
  };

  useEffect(() => {
    GetSubjectList();
  }, [s.Class, s.Exam]);

  const a = useContext(UserContext);

  const [current, setCurrent] = useState(new Date());
  const d =
    current.getDate() +
    "-" +
    (current.getMonth() + 1) +
    "-" +
    current.getFullYear();
  // useEffect(() => {
  //   setCurrent(new Date());
  // }, [current]);

  return (
    <center className="w-full flex items-center flex-col justify-center py-7 text-[12pt]">
      <button
        class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => {
          handlePrint();
        }}
      >
        Print
      </button>
      <div
        ref={componentRef}
        className="h-[280mm]  flex mx-auto justify-center max-w-[280mm] bg-no-repeat bg-center"
      >
        <div
          id="print"
          className="flex w-[280mm] h-[280mm] flex-row flex-wrap  gap-1 mx-2 pt-5 pb-5 "
        >
          {data.map((std, index) => {
            return (
              <table
                key={index}
                className={` align-middle break-after-page mt-10 mb-5 h-auto max-h-[160mm] mx-auto ${
                  s.Type == "bulk" ? "w-[49%]" : "w-[65%]"
                } border-2 border-black text-[12pt]`}
              >
                <tbody className="">
                  <tr>
                    <td className="h-auto col-span-9 flex items-center justify-evenly">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=7ca8a823-a8a0-4316-8b80-3bbdb6e994f7"
                        className="float-left ml-4 h-24 mt-2 mix-blend-color-burn"
                      />
                      <div className="mx-5 float-right ">
                        <center
                          className="float-left"
                          style={{ lineHeight: "0.5" }}
                        >
                          <span
                            className="text-red-600 font-extrabold text-2xl"
                            style={{ lineHeight: "1.2" }}
                          >
                            M J PUBLIC SCHOOL
                          </span>
                          <br />
                          <span
                            className="font-bold text-[.65rem]"
                            style={{ lineHeight: "1.2" }}
                          >
                            Affiliated to Central Board of Secondary Education
                            (C.B.S.E.)
                            <br />
                            mail id: mjpssadabad.cbse@gmail.com"
                            <br />
                            www.mjpssadabad.com
                            <br />
                            <span className="text-xs">
                              RAYA ROAD SADABAD HATHRAS
                            </span>
                          </span>
                        </center>
                      </div>
                      {/* <img
                    src="	https://mjpssadabad.in/mdls/report/cbse-logo.png"
                    className="float-right ml-7 mt-2 mr-8 h-28"
                /> */}
                    </td>
                  </tr>
                  <tr className="w-full flex justify-center">
                    <div className="font-bold text-2xl italic mt-2 ml-2 w-fit px-2 border-2 border-black bg-white rounded-2xl">
                      <div className="pt-0.5 text-lg">
                        <span className="">ADMIT CARD</span>
                      </div>
                    </div>
                  </tr>
                  <tr>
                    <td height="5"> </td>
                  </tr>
                  <tr className="font-bold flex justify-between px-5">
                    <td>School No. : 60978</td>
                    <td>Affiliation No. : 2132393</td>
                  </tr>
                  <tr className="h-4"></tr>
                  <tr className="font-bold underline italic text-xl flex justify-center px-5">
                    <td>EXAM: {s ? s.Exam : "Loading..."}</td>
                    {/* <td>Date : {d}</td> */}
                  </tr>
                  <tr className="h-4"></tr>
                  <tr className="font-bold border-black border border-b-0 p-1 flex justify-between mx-5">
                    <td className="w-full border-r border-black">
                      Name Of Student{" "}
                    </td>
                    <td className="uppercase text-center w-full text-[10pt] font-bold border-black ">
                      {std.name}
                    </td>{" "}
                  </tr>
                  <tr className="font-bold border-black border border-b-0 p-1 flex items-center justify-between mx-5">
                    <td className="w-full border-r border-black">
                      Father&apos;s Name{" "}
                    </td>
                    <td className="uppercase w-full text-center text-[10pt] font-bold border-black ">
                      {std.Father_Name}
                    </td>{" "}
                  </tr>
                  <tr className="font-bold border-black border flex p-1  justify-between mx-5">
                    <td className="w-full border-r border-black">
                      Class & Section{" "}
                    </td>
                    <td className="uppercase w-full text-center text-[10pt] font-bold border-black ">
                      {s.Class} & {s.Section}
                    </td>{" "}
                  </tr>
                  <tr className="font-bold flex flex-col items-center mt-1 justify-center px-5">
                    <h1 className="underline text-xl">Date Sheet</h1>
                    <table class="min-w-full border mt-2 text-center text-sm font-light dark:border-neutral-500">
                      <thead class="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th
                            scope="col"
                            class="border-r px-6 py-2 dark:border-neutral-500"
                          >
                            SN.
                          </th>
                          <th
                            scope="col"
                            class="border-r px-6 py-2 dark:border-neutral-500"
                          >
                            Subject
                          </th>
                          <th
                            scope="col"
                            class="border-r px-6 py-2 dark:border-neutral-500"
                          >
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {SubjectList.sort((a, b) => {
                          const datePartsA = a.Date
                            ? a.Date.split("-").map((part) => parseInt(part))
                            : [];
                          const datePartsB = b.Date
                            ? b.Date.split("-").map((part) => parseInt(part))
                            : [];

                          if (
                            datePartsA.length === 3 &&
                            datePartsB.length === 3
                          ) {
                            const dateA = new Date(
                              datePartsA[2],
                              datePartsA[1] - 1,
                              datePartsA[0]
                            );
                            const dateB = new Date(
                              datePartsB[2],
                              datePartsB[1] - 1,
                              datePartsB[0]
                            );

                            return dateA - dateB;
                          } else {
                            return 0; // Default comparison value if date parts are not valid
                          }
                        }).map((sub, index) => {
                          return (
                            <tr
                              key={index}
                              class="border-b dark:border-neutral-500"
                            >
                              <td class="whitespace-nowrap border-r px-6 py-2 font-medium dark:border-neutral-500">
                                {index + 1}
                              </td>
                              <td class="whitespace-nowrap border-r px-6 py-2 font-bold dark:border-neutral-500">
                                {sub.Name}
                              </td>
                              <td class="whitespace-nowrap font-bold border-r px-6 py-2 dark:border-neutral-500">
                                {sub.Date ? sub.Date : "Not Set"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </tr>

                  <tr className="h-0"></tr>

                  <tr className="flex justify-between mt-2 mx-5">
                    <td colspan="3" className=" border-black py-2">
                      Teacher's Signature
                    </td>
                    {/* <td colspan="2" className="border-t-2 border-black py-2">
                  Signature of Office Supdt.{" "}
                </td> */}
                    <td colspan="4" className="  border-black py-2">
                      <div>Principal Signature</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}

          {/* <table className=" align-middle max-h-[300mm] mx-auto w-11/12 border-2 border-black text-[12pt]"></table> */}
        </div>
      </div>
    </center>
  );
}
