import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useRef, useState } from "react";
import UserContext from "../../../components/context/userContext";
import { db } from "../../../firebase";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import { UseClassStream } from "../../../lib/firebase_read";

export default function ViewStd() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [q, setQ] = useState();

  // const months = [
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  //   "January",
  //   "February",
  //   "March",
  // ];
  const router = useRouter();
  const [students, setStudents] = useState([]);

  const [month, setMonth] = useState();

  const [isConfirm, setIsConfirm] = useState(false);

  const getStudents = async () => {
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

  const [q2, setQ2] = useState("");
  const [allStudents, setAllStudents] = useState([]);

  

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
          where("Sr_Number", "==", queryStr)
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

  const [sectionList, setSectionList] = useState([]);
  const a = useContext(UserContext);
  const [className, setClassName] = useState();
  const [sectionName, setSectionName] = useState("");

  const { data: classList, error, isLoading } = UseClassStream(a);

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
        if (!className) {
          alert("select class first");
        }
      };
    }
  };

  const deleteStudent = async (data) => {
    const docRef = doc(
      db,
      `users/${a.user}/sessions/${a.session}/classes/${data.Class}/sections/${data.Section}/students`,
      data.Sr_Number
    );
    const docRef2 = doc(
      db,
      `users/${a.user}/sessions/${a.session}/AllStudents`,
      data.Sr_Number
    );

    try {
      await updateDoc(
        docRef,
        {
          Deleted: true,
        },
        { merge: true }
      );

      await updateDoc(
        docRef2,
        {
          Deleted: true,
        },
        { merge: true }
      );

      months.forEach(async (e) => {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${data.Class}/sections/${data.Section}/due/${e}/students`,
          data.Sr_Number
        );
        await updateDoc(
          docRef,
          {
            Deleted: true,
          },
          { merge: true }
        );
      });

      alert("Deleted SuccessFully");
    } catch (e) {
      alert(e.message);
    }
  };

  const months = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "OldDues",
    "Admission",
  ];

  const [check, setCheck] = useState(false);

  // const setData = async () => {
  //   console.log("start");
  //   months.forEach(async (e) => {
  //     const docRef = collection(
  //       db,
  //       `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/${e}/students`
  //     );
  //     try {
  //       await getDocs(docRef).then((doct) => {
  //         doct.forEach(async (docc) => {
  //           // console.log(doc.data());
  //           // console.log(students.Sr_Number);

  //           const docRef = doc(
  //             db,
  //             `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/${e}/students`,
  //             docc.data().Sr_Number
  //           );
  //           // console.log(
  //           //   students.find((e) => doc.data().Sr_Number == e.Sr_Number)
  //           // );

  //           await updateDoc(docRef, {
  //             Address: students.find(
  //               (e) => docc.data().Sr_Number == e.Sr_Number
  //             ).Address,
  //           });
  //         });
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   });
  //   console.log("end");
  // };

  // useEffect(() => {
  //   console.log(check);
  // }, [check]);

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">View Students</h1>
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
                      onChange={(e) => {
                        setClassName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                    >
                      <option>Plese Select</option>
                      {classList?.map((e, index) => {
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
                      getStudents();
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
                        }
                      }}
                      onChange={(e) => {
                        setQ2(e.target.value);
                      }}
                      class="w-4/5 bg-gray-200 text-black border mr-2 border-gray-200 rounded py-3 px-4 "
                      id="company"
                      type="text"
                      placeholder="Sid / NAME"
                    />
                    <button
                      id="myButton"
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
              <div className="w-full flex justify-center p-4">
                <button
                  // onClick={() => {
                  //   setData();
                  // }}
                  class="bg-blue-600  text-white font-bold  py-2 px-4 rounded-full"
                >
                  --- Class {className} ---
                </button>
              </div>
              <table class="font-semibold min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-black md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      SN.
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Adm No.
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      SID
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Student Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Father Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Class
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Section
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Mobile
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Address
                    </th>

                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>
                {!q && (
                  <tbody class="font-semibold block md:table-row-group">
                    {students
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .filter(
                        (e) => e.Deleted === false || e.Deleted === undefined
                      )
                      .map((e, index) => {
                        return (
                          <tr
                            key={index}
                            class="bg-white font-semibold border border-black md:border-none block md:table-row"
                          >
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                sn
                              </span>
                              {index + 1}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                sn
                              </span>
                              {e.ID}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                SID
                              </span>
                              {e.Sr_Number}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                name
                              </span>
                              {e.name}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                fName
                              </span>
                              {e.Father_Name}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                class
                              </span>
                              {e.Class}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                section
                              </span>
                              {e.Section}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                mobile
                              </span>
                              {e.Mobile_Number}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                Address
                              </span>
                              {e.Address}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-auto md:hidden font-bold">
                                action
                              </span>
                              <button
                                onClick={() => {
                                  // alert(e.Admission_Date.toDate())
                                  e["Adm_Date"] =
                                    e.Admission_Date.seconds * 1000;
                                  router.push({
                                    pathname: "/sessions/students/update",
                                    query: e,
                                  });
                                }}
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  setIsConfirm(true);
                                }}
                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                              >
                                Delete
                              </button>
                              {isConfirm && (
                                <button
                                  onClick={() => {
                                    deleteStudent(e).then(() => {
                                      setIsConfirm(false);
                                    });
                                  }}
                                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                                >
                                  Confirm
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                )}

                {/* //dupi */}
                {/* {q && (
                  <tbody class="block md:table-row-group">
                    {students
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .filter(
                        (e) => e.Deleted === false || e.Deleted === undefined
                      )
                      .map((e, index) => {
                        if (
                          e.name.includes(q) ||
                          e.Sr_Number.includes(q) ||
                          e.name.includes(q.toUpperCase())
                        ) {
                          if (e.Deleted == false || e.Deleted == undefined) {
                            return (
                              <tr
                                key={index}
                                class="bg-white border border-black md:border-none block md:table-row"
                              >
                                <td class="p-2 md:border border-black text-left block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    sn
                                  </span>
                                  {index + 1}
                                </td>
                                <td class="p-2 md:border border-black text-left block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    sn
                                  </span>
                                  {e.ID}
                                </td>
                                <td class="p-2 md:border border-black text-left block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    SID
                                  </span>
                                  {e.Sr_Number}
                                </td>
                                <td class="p-2 md:border border-black text-left block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    name
                                  </span>
                                  {e.name}
                                </td>
                                <td class="p-2 md:border border-black text-left block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    fName
                                  </span>
                                  {e.Father_Name}
                                </td>
                                <td class="p-2 md:border border-black text-left block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    class
                                  </span>
                                  {e.Class}
                                </td>
                                <td class="p-2 md:border border-black text-left block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    section
                                  </span>
                                  {e.Section}
                                </td>
                                <td class="p-2 md:border border-black text-left block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    mobile
                                  </span>
                                  {e.Mobile_Number}
                                </td>
                                <td class="p-2 md:border border-black text-left block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    Address
                                  </span>
                                  {e.Address}
                                </td>
                                <td class="p-2 md:border border-black text-left block md:table-cell">
                                  <span class="inline-block w-auto md:hidden font-bold">
                                    action
                                  </span>
                                  <button
                                    onClick={() => {
                                      alert(e.ID);
                                      // console.log(e);
                                      // e['Adm_Date'] = e.Admission_Date
                                      router.push({
                                        pathname: "/sessions/students/update",
                                        query: e,
                                      });
                                    }}
                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={() => {
                                      setIsConfirm(true);
                                    }}
                                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                                  >
                                    Delete
                                  </button>
                                  {isConfirm && (
                                    <button
                                      onClick={() => {
                                        deleteStudent(e).then(() => {
                                          setIsConfirm(false);
                                        });
                                      }}
                                      class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                                    >
                                      Confirm
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          }
                        }
                      })}
                  </tbody>
                )} */}
                {/* //dupi */}
              </table>
            </div>
            <div className="w-full flex justify-center p-4">
              <button
                class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" hidden border-2  border-gray-600">
        <div className="p-1 block" ref={componentRef}>
          <table class=" min-w-full border-collapse  md:table">
            <thead class="block md:table-header-group">
              <tr class="border border-black md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                  SN.
                </th>
                <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                  SrNo.
                </th>
                <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                  SID
                </th>
                <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                  Student Name
                </th>
                <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                  Father Name
                </th>
                <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                  Class
                </th>
                <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                  Section
                </th>
                <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                  Mobile
                </th>
                <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                  Address
                </th>
              </tr>
            </thead>
            {!q && (
              <tbody class="font-semibold block md:table-row-group">
                {students
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .filter((e) => e.Deleted === false || e.Deleted === undefined)
                  .map((e, index) => {
                    if (e.Deleted == false || e.Deleted == undefined) {
                      return (
                        <tr
                          key={index}
                          class="bg-white border border-black md:border-none block md:table-row"
                        >
                          <td class="p-2 md:border border-black text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              sn
                            </span>
                            {index + 1}
                          </td>
                          <td class="p-2 md:border border-black text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              sn
                            </span>
                            {e.ID}
                          </td>
                          <td class="p-2 md:border border-black text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              SID
                            </span>
                            {e.Sr_Number}
                          </td>
                          <td class="p-2 md:border border-black text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              name
                            </span>
                            {e.name}
                          </td>
                          <td class="p-2 md:border border-black text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              fName
                            </span>
                            {e.Father_Name}
                          </td>
                          <td class="p-2 md:border border-black text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              class
                            </span>
                            {e.Class}
                          </td>
                          <td class="p-2 md:border border-black text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              section
                            </span>
                            {e.Section}
                          </td>
                          <td class="p-2 md:border border-black text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              mobile
                            </span>
                            {e.Mobile_Number}
                          </td>
                          <td class="p-2 md:border border-black text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              Address
                            </span>
                            {e.Address}
                          </td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
