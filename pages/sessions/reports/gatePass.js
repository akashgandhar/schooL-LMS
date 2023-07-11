import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import UserContext from "../../../components/context/userContext";
import { db } from "../../../firebase";

export default function GatePass() {
  const router = useRouter();
  const s = router.query;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const a = useContext(UserContext);

  const [sName, setSName] = useState("");
  const [rName, setRName] = useState("");
  const [fName, setFName] = useState("");
  const [add, setAdd] = useState("");
  const [reason, setReason] = useState("");

  return (
    <center className="w-full py-7 text-[12pt]">
      <div className="w-[250mm] max-h-[280mm] bg-no-repeat bg-center">
        <div
          ref={componentRef}
          id="print"
          className="flex gap-1 mx-2 pt-5 pb-5 "
        >
          <table className=" align-middle max-h-[300mm] mx-auto w-11/12 border-2 border-black text-[12pt]">
            <tbody>
              <tr>
                <td className="h-auto col-span-9 flex justify-between">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=7ca8a823-a8a0-4316-8b80-3bbdb6e994f7"
                    className="float-left ml-4 h-24 mt-2 mix-blend-color-burn"
                  />
                  <div className="mx-5  float-right ">
                    <center
                      className="float-left"
                      style={{ lineHeight: "0.5" }}
                    >
                      <span
                        className="text-red-600 font-extrabold text-3xl"
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
                    <span className="">GATE PASS</span>
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
              <tr className="h-8"></tr>

              <tr className="font-bold flex justify-between px-5">
                <td className="w-1/2">Student(s) Name: </td>
                <textarea
                  onChange={(e) => setSName(e.target.value)}
                  value={sName}
                  type="text"
                  className="uppercase w-full text-[10pt] font-bold border-b-2 border-black border-dashed"
                  placeholder="max words"
                />
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td className="w-1/2">Father(s) Name: </td>
                <textarea
                  onChange={(e) => setFName(e.target.value)}
                  value={fName}
                  type="text"
                  className="uppercase w-full text-[10pt] font-bold border-b-2 border-black border-dashed"
                  placeholder="max words"
                />
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td className="w-1/2">Reciever's Name: </td>
                <textarea
                  onChange={(e) => setRName(e.target.value)}
                  value={rName}
                  type="text"
                  className="uppercase w-full text-[10pt] font-bold border-b-2 border-black border-dashed"
                  placeholder="max words"
                />
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td className="w-1/2">Address: </td>
                <textarea
                  onChange={(e) => setAdd(e.target.value)}
                  value={add}
                  type="text"
                  className="uppercase w-full text-[10pt] font-bold border-b-2 border-black border-dashed"
                  placeholder="max words"
                />
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td className="w-1/2">Reason: </td>
                <textarea
                  onChange={(e) => setReason(e.target.value)}
                  value={reason}
                  type="text"
                  className="uppercase w-full text-[10pt] font-bold border-b-2 border-black border-dashed"
                  placeholder="max words"
                />
              </tr>
              <tr className="h-20"></tr>

              <tr className="flex justify-between mx-5">
                <td colspan="3" className="border-t-2 border-black py-2">
                  GateKeeper
                </td>
                {/* <td colspan="2" className="border-t-2 border-black py-2">
                  Signature of Office Supdt.{" "}
                </td> */}
                <td colspan="4" className="border-t-2 border-black py-2">
                  <div>Principal with seal </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className=" align-middle max-h-[300mm] mx-auto w-11/12 border-2 border-black text-[12pt]">
            <tbody>
              <tr>
                <td className="h-auto col-span-9 flex justify-between">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=7ca8a823-a8a0-4316-8b80-3bbdb6e994f7"
                    className="float-left ml-4 h-24 mt-2 mix-blend-color-burn"
                  />
                  <div className="mx-5  float-right ">
                    <center
                      className="float-left"
                      style={{ lineHeight: "0.5" }}
                    >
                      <span
                        className="text-red-600 font-extrabold text-3xl"
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
                    <span className="">GATE PASS</span>
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
              <tr className="h-8"></tr>

              <tr className="font-bold flex justify-between px-5">
                <td className="w-1/2">Student(s) Name: </td>
                <textarea
                  onChange={(e) => setSName(e.target.value)}
                  value={sName}
                  type="text"
                  className="uppercase w-full text-[10pt] font-bold border-b-2 border-black border-dashed"
                  placeholder="max words"
                />
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td className="w-1/2">Father(s) Name: </td>
                <textarea
                  onChange={(e) => setFName(e.target.value)}
                  value={fName}
                  type="text"
                  className="uppercase w-full text-[10pt] font-bold border-b-2 border-black border-dashed"
                  placeholder="max words"
                />
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td className="w-1/2">Reciever's Name: </td>
                <textarea
                  onChange={(e) => setRName(e.target.value)}
                  value={rName}
                  type="text"
                  className="uppercase w-full text-[10pt] font-bold border-b-2 border-black border-dashed"
                  placeholder="max words"
                />
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td className="w-1/2">Address: </td>
                <textarea
                  onChange={(e) => setAdd(e.target.value)}
                  value={add}
                  type="text"
                  className="uppercase w-full text-[10pt] font-bold border-b-2 border-black border-dashed"
                  placeholder="max words"
                />
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td className="w-1/2">Reason: </td>
                <textarea
                  onChange={(e) => setReason(e.target.value)}
                  value={reason}
                  type="text"
                  className="uppercase w-full text-[10pt] font-bold border-b-2 border-black border-dashed"
                  placeholder="max words"
                />
              </tr>
              <tr className="h-20"></tr>

              <tr className="flex justify-between mx-5">
                <td colspan="3" className="border-t-2 border-black py-2">
                  GateKeeper
                </td>
                {/* <td colspan="2" className="border-t-2 border-black py-2">
                  Signature of Office Supdt.{" "}
                </td> */}
                <td colspan="4" className="border-t-2 border-black py-2">
                  <div>Principal with seal </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <table className=" align-middle max-h-[300mm] mx-auto w-11/12 border-2 border-black text-[12pt]"></table> */}
        </div>
        <button
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            setTc();
            handlePrint();
          }}
        >
          Print
        </button>
      </div>
    </center>
  );
}
