import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Input } from "postcss";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../components/context/userContext";
import { db } from "../../../firebase";
import { async } from "@firebase/util";
import { useRouter } from "next/router";

export default function PayFee() {
  const [students, setStudents] = useState([]);

  const [month, setMonth] = useState();

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

  const [q, setQ] = useState();
  const [q2, setQ2] = useState("");

  const searchStudents = async () => {
    if (q2 === "") {
      return;
    }
  
    try {
      // Assuming q2 is a string
      const queryStr = q2.trim(); // Remove leading/trailing spaces
      const isNumeric = /^\d+$/.test(queryStr); // Check if the query is numeric
  
      var docRef;
  
      if (isNumeric) {
        docRef = query(
          collection(db, `users/${a.user}/sessions/${a.session}/AllStudents`),
          where("Sr_Number", "==", parseInt(queryStr))
        );
      } else {
        // Search for substring match in student names
        docRef = query(
          collection(db, `users/${a.user}/sessions/${a.session}/AllStudents`),
          where("name", ">=", queryStr),
          where("name", "<=", queryStr + "\uf8ff")
        );
      }
  
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
  
      console.log(list);
      setStudents(list);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto  py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">Fee Payment</h1>
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
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="company"
                  >
                    Search*
                  </label>
                  <div className="flex items-center justify-between ">
                    <input
                      onKeyPress={() => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          searchStudents(q2);
                        }
                      }}
                      onChange={(e) => {
                        setQ(e.target.value);
                        setQ2(e.target.value);
                      }}
                      class="w-4/5 bg-gray-200 text-black border mr-2 border-gray-200 rounded py-3 px-4 "
                      id="company"
                      type="text"
                      placeholder="Sid / NAME"
                    />
                    <button
                      onClick={() => {
                        searchStudents(q2);
                      }}
                      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Search
                    </button>
                  </div>
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
                      Class
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Father Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Address
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Mobile
                    </th>

                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Action
                    </th>
                  </tr>
                </thead>
                {!q && (
                  <tbody class="block md:table-row-group">
                    {students
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((e, index) => {
                        if (e.Deleted == false || e.Deleted == undefined) {
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
                                  class
                                </span>
                                {e.Class}
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
                              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span class="inline-block w-1/3 md:hidden font-bold">
                                  mobile
                                </span>
                                {e.Mobile_Number}
                              </td>

                              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span class="inline-block w-1/3 md:hidden font-bold">
                                  action
                                </span>
                                <button
                                  onClick={() => {
                                    router.push({
                                      pathname: "/sessions/account/payment",
                                      query: e,
                                    });
                                  }}
                                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                                >
                                  Pay
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                )}
                {q && (
                  <tbody class="block md:table-row-group">
                    {students.map((e, index) => {
                      if (
                        e.name.includes(q) ||
                        e.Sr_Number.includes(q) ||
                        e.name.includes(q.toUpperCase())
                      ) {
                        if (e.Deleted == false || e.Deleted == undefined) {
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
                                  class
                                </span>
                                {e.Class}
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
                              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span class="inline-block w-1/3 md:hidden font-bold">
                                  mobile
                                </span>
                                {e.Mobile_Number}
                              </td>

                              <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span class="inline-block w-1/3 md:hidden font-bold">
                                  action
                                </span>
                                <button
                                  onClick={() => {
                                    router.push({
                                      pathname: "/sessions/account/payment",
                                      query: e,
                                    });
                                  }}
                                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                                >
                                  Pay
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      }
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
