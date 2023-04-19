import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import UserContext from "../../../components/context/userContext";
import { db } from "../../../firebase";

export default function Tc() {
  const router = useRouter();
  const s = router.query;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const a = useContext(UserContext);

  const fields = [
    "Name of the Pupil",
    "Mother's Name",
    "Father's/Guardian's Name",
    "Date of Birth according to the Admission Register (In figure)",
    "Nationality",
    "Whether the pupil belongs to SC/ST/OBC category",
    "Date of first admission in the school with class",
    "Class in which the pupil last studies (in words)",
    "Whether failed, if so once/twice in same class?",
    "School/Board Examination last taken with result",
    "Subjects offered",
    "Whether qualified for promotion to the next higher class",
    "Month upto which the pupil has paid school dues?",
    "Any fee concession availed of? if so the Roture of such concession.",
    "Total no. of working days",
    "Total no. of working days present",
    "Whether the pupil is NCC Cadet/Boy Scunt/Girl Guide (give details)",
    "Games played or extra curricular activities in which the pupil usually took part (mention bchivement level)",
    "General conduct",
    "Application of certificate",
    "Actual issue of Certificate",
    "Reason for leaving the school",
    "Any other remarks",
    "Date on which pupil's name was struck off rolls of the school",
  ];

  const [data, setData] = useState({});


const getData = async() =>{
  // console.log(a);
  if(a.user && a.session && !data){

    try{
      const docRef = doc(db,`users/${a.user}/sessions/${a.session}/Reports/${s.Sr_Number}/TC`,s.Sr_Number);
      const docSnap = await getDoc(docRef)
      setData(docSnap.data());
    }catch(e){
      alert(e.message)
    }
  }
}

const setTc = async() =>{
    try{
      console.log(s);
      const docRef = doc(db,`users/${a.user}/sessions/${a.session}/Reports/${s.Sr_Number}/TC`,s.Sr_Number);
      setDoc(docRef,data);
    }catch(e){
      console.log(e.message);
  }
}

  // useEffect(() => {
  //   const myVar = 'f1';
  //   console.log(data[myVar]);
  //   getData();
  // }, [a,data]);

  return (
    <center className="w-full py-7 text-[12pt]">
      <div className="w-[250mm] max-h-[280mm] bg-no-repeat bg-center">
        <div ref={componentRef} id="print" className="pt-5 pb-5 ">
          <table className=" align-middle max-h-[300mm] mx-auto w-11/12 border-2 border-black text-[12pt]">
            <tbody>
              <tr>
                <td className="h-auto col-span-9 flex justify-between">
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
                        className="text-red-600 font-extrabold text-3xl"
                        style={{ lineHeight: "1.2" }}
                      >
                        M J PUBLIC SCHOOL
                      </span>
                      <br />
                      <span
                        className="font-bold text-xs"
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
                      <div className="font-bold text-2xl italic mt-2 ml-2 w-fit px-2 border-2 border-black bg-white rounded-2xl">
                        <div className="pt-0.5 text-lg">
                          <span className="">TRANSFER CERTIFICATE</span>
                        </div>
                      </div>
                    </center>
                  </div>
                  <img
                    src="	https://mjpssadabad.in/mdls/report/cbse-logo.png"
                    className="float-right ml-7 mt-2 mr-8 h-28"
                  />
                </td>
              </tr>
              {/* <tr>
                <td align="center" height="20" className="col-span-9">
                  <div className="font-bold text-2xl italic ml-2 w-96 border-2 border-black bg-white rounded-2xl">
                    <div className="pt-0.5 text-lg">
                      <span className="ml-2">TRANSFER CERTIFICATE</span>
                    </div>
                  </div>
                </td>
              </tr> */}
              <tr>
                <td height="5"> </td>
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td>School No. : 60978</td>
                <td>Affiliation No. : 2132393</td>
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td>TC No. : 291 </td>
                <td> </td>
                <td>Student Id : 1446</td>
              </tr>
              <tr className=" flex  px-5 mb-1">
                <td colSpan="6" className="flex-1 ">
                  <span>
                    {" "}
                    Registration No. of the candidate (in case Class-IX to XII){" "}
                  </span>
                </td>
                <td colSpan={3} className="flex-1 flex h-auto items-center">
                  <span className="font-bold W-[10%]"> : </span>

                  <input onChange={(e) => {
                            var temp = { ...data };
                            temp[`fr`] = e.target.value;
                            setData(temp);
                          }}
                    type="text"
                    value={data.fr}
                    className="uppercase w-[90%] text-[10pt] font-bold "
                    placeholder="max 30 words"
                  />
                </td>
              </tr>

              {fields.map((e, index) => {
                
                return (
                  <tr key={index} className=" flex px-5 ">
                    <td colSpan="6" className="flex-1 ">
                      {index + 1}.<span> {e} </span>
                    </td>
                    <td colSpan={3} className="flex-1 flex h-auto items-center">
                      <span className="font-bold W-[10%]"> : </span>

                      {e == "Subjects offered" ? (
                        <textarea
                          onChange={(e) => {
                            var temp = { ...data };
                            temp[`f${index + 1}`] = e.target.value;
                            setData(temp);
                          }}
                          type="text"
                          className="uppercase w-[90%] text-[10pt] font-bold border-b-2 border-black border-dashed"
                          placeholder="max words"
                          value={data[`f${index + 1}`]}
                        />
                      ) : (
                        <input
                          onChange={(e) => {
                            var temp = { ...data };
                            temp[`f${index + 1}`] = e.target.value;
                            setData(temp);
                          }}
                          type="text"
                          className="uppercase w-[90%] text-[10pt] font-bold border-b-2 border-black border-dashed"
                          placeholder="max 30 words"
                        />
                      )}
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td height="20" colspan="9">
                  {" "}
                </td>
              </tr>

              <tr className="flex justify-between mx-5">
                <td colspan="3" className="border-t-2 border-black py-2">
                  Signature of Class Teacher
                </td>
                <td colspan="2" className="border-t-2 border-black py-2">
                  Signature of Office Supdt.{" "}
                </td>
                <td colspan="4" className="border-t-2 border-black py-2">
                  <div>Sign of Principal with school seal </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={()=>{setTc();
            handlePrint();}}
        >
          Print
        </button>
      </div>
    </center>
  );
}
