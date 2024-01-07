import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { Input } from "postcss";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../components/context/userContext";
import { db } from "../../../firebase";
import { async } from "@firebase/util";
import { useRouter } from "next/router";

export default function OldFee() {
  const [students, setStudents] = useState([]);
  const [month, setMonth] = useState();
  const [oldDue, setOldDue] = useState(0);
  const [admfee, setAdmFee] = useState(0);
  const [examFee, setExamFee] = useState(0);

  const getStudent = async () => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/students`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setStudents(list);
    } catch (e) {
      console.log(e);
    }
  };

  const [classList, setClassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const a = useContext(UserContext);
  const [className, setClassName] = useState();
  const [sectionName, setSectionName] = useState("");
  const router = useRouter();

  const GetClassList = async () => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setClassList(list);
    } catch (e) {
      alert(e.message);
    }
  };

  const GetSectionList = async () => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes/${className}/sections`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setSectionList(list);
    } catch {
      (e) => {
        alert(e.message);
        if (!className) {
          alert("select class first");
        }
      };
    }
  };

  const setDues = async (sr, name, fName, place, mobile) => {
    const docRef = doc(
      db,
      `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/OldDues/students`,
      sr
    );
    try {
      await setDoc(docRef, {
        name: name,
        month: "OldDues",
        class: className,
        section: sectionName,
        father_name: fName,
        Place: place,
        Mobile: mobile,
        Sr_Number: sr,
        month_Due: Number(oldDue),
        total: Number(oldDue),
      }).then(() => {
        alert("saved");
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const setAdm = async (sr, name, fName, place, mobile) => {
    const docRef = doc(
      db,
      `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/Admission/students`,
      sr
    );
    try {
      await setDoc(docRef, {
        name: name,
        month: "Admission",
        class: className,
        section: sectionName,
        father_name: fName,
        Place: place,
        Mobile: mobile,
        Sr_Number: sr,
        month_Due: Number(admfee),
        total: Number(admfee),
      }).then(() => {
        alert("saved");
      });
    } catch (e) {
      alert(e.message);
    }
  };
  const setExam = async (sr, name, fName, place, mobile) => {
    const docRef = doc(
      db,
      `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/Exam/students`,
      sr
    );
    try {
      await setDoc(docRef, {
        name: name,
        month: "Exam",
        class: className,
        section: sectionName,
        father_name: fName,
        Place: place,
        Mobile: mobile,
        Sr_Number: sr,
        month_Due: Number(examFee),
        total: Number(examFee),
      }).then(() => {
        alert("saved");
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const classes = ["IX", "X", "XI", "XII"];

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">
                Insert Other Fees
              </h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Class*
                    </label>
                    <select
                      onClick={() => {
                        GetClassList();
                      }}
                      onChange={(e) => {
                        setClassName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                    >
                      <option>Plese Select</option>
                      {classList.map((e, index) => {
                        return <option key={index}>{e.Name}</option>;
                      })}
                    </select>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Section*
                    </label>
                    <select
                      onClick={() => {
                        GetSectionList();
                      }}
                      onChange={(e) => {
                        setSectionName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                    >
                      <option>Plese Select</option>
                      {sectionList.map((e, index) => {
                        return <option key={index}>{e.Name}</option>;
                      })}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      if (!className || !sectionName) {
                        alert("Information Missing");
                      } else {
                        getStudent();
                      }
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div>
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      SID
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Student Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Father Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Address
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Old Fee
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Admission Fee
                    </th>
                    {classes.includes(className) && (
                      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        Exam/Lab Fee
                      </th>
                    )}
                    {/* {
                      className == "CLASS TG2" && (
                        <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                          Exam/Lab Fee
                        </th>
                      )} */}
                    {/* <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {students
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .filter(
                      (e) => e.Deleted === false || e.Deleted === undefined
                    )
                    .map((e, index) => {
                      return (
                        <tr
                          key={index}
                          class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                        >
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              SID
                            </span>
                            {e.Sr_Number}
                          </td>
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              name
                            </span>
                            {e.name}
                          </td>
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              fName
                            </span>
                            {e.Father_Name}
                          </td>
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              Address
                            </span>
                            {e.Place}
                          </td>
                          <td class="px-2  h-full md:border md:border-grey-500 text-left table-cell items-center">
                            <div className="flex my-1 w-full">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                old fee
                              </span>
                              <input
                                onChange={(e) => {
                                  setOldDue(e.target.value);
                                }}
                                type="tel"
                                className="font-bold x p-2 w-full h-10 placeholder:text-red-700 placeholder:font-bold  mx-2"
                                placeholder="0"
                              ></input>
                              <button
                                id="svbtn"
                                onClick={() => {
                                  setDues(
                                    e.Sr_Number,
                                    e.name,
                                    e.Father_Name,
                                    e.Place,
                                    e.Mobile_Number
                                  );
                                }}
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                              >
                                Save
                              </button>
                            </div>
                          </td>
                          <td class="px-2 h-full md:border md:border-grey-500 text-left table-cell items-center">
                            <div className="flex w-full my-1">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                adm fee
                              </span>
                              <input
                                onChange={(e) => {
                                  setAdmFee(e.target.value);
                                }}
                                type="tel"
                                className="font-bold mx-2 x p-2 w-full h-10 placeholder:text-red-700 placeholder:font-bold  "
                                placeholder="0"
                              ></input>
                              <button
                                id="svbtn"
                                onClick={() => {
                                  setAdm(
                                    e.Sr_Number,
                                    e.name,
                                    e.Father_Name,
                                    e.Place,
                                    e.Mobile_Number
                                  );
                                }}
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                              >
                                Save
                              </button>
                            </div>
                          </td>
                          {classes.includes(className) && (
                            <td class="px-2 h-full md:border md:border-grey-500 text-left table-cell items-center">
                              <div className="flex w-full my-1">
                                <span class="inline-block w-1/3 md:hidden font-bold">
                                  Exam fee
                                </span>
                                <input
                                  onChange={(e) => {
                                    e.preventDefault();
                                    setExamFee(e.target.value);
                                  }}
                                  type="tel"
                                  className="font-bold mx-2 x p-2 w-full h-10 placeholder:text-red-700 placeholder:font-bold  "
                                  placeholder="0"
                                ></input>
                                <button
                                  id="svbtn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setExam(
                                      e.Sr_Number,
                                      e.name,
                                      e.Father_Name,
                                      e.Place,
                                      e.Mobile_Number
                                    );
                                  }}
                                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                                >
                                  Save
                                </button>
                              </div>
                            </td>
                          )}
                          {/* <td class="px-2 h-full md:border md:border-grey-500 text-left table-cell items-center">
                              <div className="flex w-full my-1">
                                <span class="inline-block w-1/3 md:hidden font-bold">
                                  adm fee
                                </span>
                                <input
                                  onChange={(e) => {
                                    setAdmFee(e.target.value);
                                  }}
                                  type="tel"
                                  className="font-bold mx-2 x p-2 w-full h-10 placeholder:text-red-700 placeholder:font-bold  "
                                  placeholder="0"
                                ></input>
                                <button
                                  id="svbtn"
                                  onClick={() => {
                                    setAdm(
                                      e.Sr_Number,
                                      e.name,
                                      e.Father_Name,
                                      e.Place,
                                      e.Mobile_Number
                                    );
                                  }}
                                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                                >
                                  Save
                                </button>
                              </div>
                            </td> */}

                          {/* <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                action
                              </span>
                              
                              
                            </td> */}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
