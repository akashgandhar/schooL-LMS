import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Input } from "postcss";
import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../../components/context/userContext";
import { db } from "../../../firebase";
import { async } from "@firebase/util";
import { useReactToPrint } from "react-to-print";

export default function ViewDue() {
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
    "Exam",
  ];

  const [isComposite, setIsComposite] = useState(false);

  const [students, setStudents] = useState([]);

  console.log(students);

  const [month, setMonth] = useState();


  const [isLoading, setIsLoading] = useState(false);

  const getDues = async () => {
    setIsLoading(true);
    setStudents([]);
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/${month}/students`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      console.log(docSnap.docs);
      docSnap.forEach(async (docx) => {
        // admision + old dues + third ward + exam/lab
        console.log(month);
        // if (
        //   month != "Admission" ||
        //   month != "OldDues" ||
        //   month != "Exam"
        // ) {
        //   const docRef = collection(
        //     db,
        //     `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/${month}/students`
        //   );

        //   const docSnap = await getDocs(docRef);

        //   // const docRefAdmission = doc(
        //   //   db,
        //   //   `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/Admission/students`,
        //   //   docx.id
        //   // );
        //   // const docSnapAdmission = await getDoc(docRefAdmission);

        //   // const docRefOldDues = doc(
        //   //   db,
        //   //   `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/OldDues/students`,
        //   //   docx.id
        //   // );

        //   // const docSnapOldDues = await getDoc(docRefOldDues);

        //   // const docRefThirdWard = doc(
        //   //   db,
        //   //   `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/otherDue/Third Ward Fee/Third Ward Fee/students`,
        //   //   docx.id
        //   // );

        //   // const docSnapThirdWard = await getDoc(docRefThirdWard);

        //   // const docRefExamLab = doc(
        //   //   db,
        //   //   `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/Exam/students`,
        //   //   docx.id
        //   // );

        //   // const docSnapExamLab = await getDoc(docRefExamLab);

        //   // list.push({
        //   //   Sr_Number: docx.id,
        //   //   name: docx.data().name,
        //   //   father_name: docx.data().father_name,
        //   //   Address: docx.data().Address,
        //   //   Mobile: docx.data().Mobile,
        //   //   month_Due: docx.data().month_Due,
        //   //   transport_due: docx.data().transport_due,
        //   //   Deleted: docx.data().Deleted,
        //   //   Admission: docSnapAdmission?.data()?.month_Due ?? 0,
        //   //   OldDues: docSnapOldDues?.data()?.month_Due ?? 0,
        //   //   ThirdWard: docSnapThirdWard?.data()?.month_Due ?? 0,
        //   //   ExamLab: docSnapExamLab?.data()?.month_Due ?? 0,
        //   // });
        // } else {
        list.push(docx.data());

        // console.log(list);
        // }
      });

      if (isComposite) {
        const oldFeeDocRef = collection(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/OldDues/students`
        );
        const oldFeeDocSnap = await getDocs(oldFeeDocRef);
        oldFeeDocSnap.forEach((docx) => {
          list.forEach((element) => {
            if (element.Sr_Number === docx.id) {
              element.OldDues = docx.data().month_Due;
            }
          });
        });

        const wardDocRef = collection(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/otherDue/Third Ward Fee/Third Ward Fee/students`
        );
        const wardDocSnap = await getDocs(wardDocRef);
        wardDocSnap.forEach((docx) => {
          list.forEach((element) => {
            if (element.Sr_Number === docx.id) {
              element.WardDue = docx.data().month_Due;
            }
          });
        });

        const admisionDocRef = collection(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/Admission/students`
        );
        const admisionDocSnap = await getDocs(admisionDocRef);
        admisionDocSnap.forEach((docx) => {
          list.forEach((element) => {
            if (element.Sr_Number === docx.id) {
              element.AdmDue = docx.data().month_Due;
            }
          });
        });

        const examDocRef = collection(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/Exam/students`
        );
        const ExamDocSnap = await getDocs(examDocRef);
        ExamDocSnap.forEach((docx) => {
          list.forEach((element) => {
            if (element.Sr_Number === docx.id) {
              element.ExamDue = docx.data().month_Due;
            }
          });
        });
      }

      setStudents(list);
    } catch (e) {
      alert(e.message);
    }

    setIsLoading(false)
  };

  const [classList, setClassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const a = useContext(UserContext);
  const [className, setClassName] = useState();
  const [sectionName, setSectionName] = useState("");

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
      console.log(e);
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
        if (!className) {
          alert("select class first");
        }
      };
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  var total = 0;

  return (
    <>
      <div className="w-screen relative">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto  py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">View Dues</h1>

              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div className="w-full items-end flex justify-start">

                  <div class="md:w-1/2  mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Want to Calculate Composite Dues*
                    </label>
                    <select
                      onChange={(e) => {
                        if (e.target.value === "Yes") {
                          setIsComposite(true)
                        } else {
                          setIsComposite(false)
                        }
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                      value={isComposite === true ? "Yes" : "No"}
                    >
                      <option>Plese Select</option>
                      <option>Yes</option>
                      <option>No</option>

                    </select>
                  </div>
                  {isComposite && <div class="md:w-1/2 flex flex-col  px-3 mb-6 md:mb-0">

                    <span

                      class="w-full text-red-500 bg-red-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"

                    >
                      This Action is Costly and Take More time than usuall !!

                    </span>
                  </div>}
                </div>
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
                      <option>Please Select</option>
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
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Month*
                    </label>
                    <select
                      onChange={(e) => {
                        setMonth(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                    >
                      <option>Plese Select</option>
                      {months.map((e, index) => {
                        return <option key={index}>{e}</option>;
                      })}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      getDues();
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Search
                  </button>
                </div>

              </div>
            </div>
            <div ref={componentRef} className="text-center">
              <div className="w-full flex justify-between p-4">
                <button class="bg-blue-600  text-white font-bold  py-2 px-4 rounded-full">
                  Class: {className}
                </button>
                <button class="bg-blue-600  text-white font-bold  py-2 px-4 rounded-full">
                  --- Due List ---
                </button>
                <button class="bg-blue-600  text-white font-bold  py-2 px-4 rounded-full">
                  Upto: {month} {a?.session?.slice(0, 4)}
                </button>
              </div>
              {isLoading && students.length === 0 && <div className="w-full flex justify-center items-center p-1">
                <div aria-label="Loading..." role="status" class="flex items-center space-x-2">
                  <svg class="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="24"></line>
                    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="24"></line>
                    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="24"></line>
                    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                  </svg>
                  <span class="text-4xl font-medium text-gray-500">Getting Composite Dues! Please Wait...</span>
                </div>
              </div>}
              {!isLoading && <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                      SID
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                      Student Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                      Father Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                      Address
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                      Mobile
                    </th>
                    {/* <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                      Composite Due
                    </th> */}
                    {month != "OldDues" || month != "Exam" || month != "Admission" ? (
                      <>
                        {isComposite && <><th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                          Old Dues
                        </th>
                          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                            Admission
                          </th>
                          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                            Exam
                          </th>
                          <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                            Third Ward
                          </th></>}
                        <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                          Monthly Due
                        </th>
                        <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                          Transport Due
                        </th>
                      </>
                    ) : (
                      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                        {month === "OldDues" ? "Old Dues" : month === "Exam" ? "Exam Due" : month === "Admission" ? "Admission Fee" : "None Selected"}
                      </th>
                    )}
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {students
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((e, index) => {
                      if (e.Deleted == false || e.Deleted == undefined) {
                        total += (Number(e.ExamDue) > 0 ? Number(e.ExamDue) : 0) +
                          (Number(e.AdmDue) > 0 ? Number(e.AdmDue) : 0) +
                          (Number(e.WardDue) > 0 ? Number(e.WardDue) : 0) +
                          (Number(e.OldDues) > 0 ? Number(e.OldDues) : 0) +
                          (Number(e.month_Due) > 0 ? Number(e.month_Due) : 0) +
                          (Number(e.transport_due) > 0
                            ? Number(e.transport_due)
                            : 0);
                        return (
                          <tr
                            key={index}
                            class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                          >
                            <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                SID
                              </span>
                              {e.Sr_Number}
                            </td>
                            <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                name
                              </span>
                              {e.name}
                            </td>
                            <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                fName
                              </span>
                              {e.father_name}
                            </td>
                            <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                Address
                              </span>
                              {e.Address}
                            </td>
                            <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                mobile
                              </span>
                              {e.Mobile}
                            </td>
                            {/* <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                composite
                              </span>
                              {(e.Admission > 0 ? e.Admission : 0) +
                                (e.OldDues > 0 ? e.OldDues : 0) +
                                (e.ThirdWard > 0 ? e.ThirdWard : 0) +
                                (e.ExamLab > 0 ? e.ExamLab : 0)}
                            </td> */}
                            {month != "OldDues" || month != "Exam" || month != "Admission" ? (
                              <>
                                {isComposite && <><td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    old
                                  </span>
                                  {Number(e.OldDues) > 0
                                    ? Number(e.OldDues)
                                    : 0}
                                </td>
                                  <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                    <span class="inline-block w-1/3 md:hidden font-bold">
                                      Admission
                                    </span>
                                    {Number(e.AdmDue) > 0
                                      ? Number(e.AdmDue)
                                      : 0}
                                  </td>
                                  <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                    <span class="inline-block w-1/3 md:hidden font-bold">
                                      Exam
                                    </span>
                                    {Number(e.ExamDue) > 0
                                      ? Number(e.ExamDue)
                                      : 0}
                                  </td></>}
                                <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    ward
                                  </span>
                                  {Number(e.WardDue) > 0
                                    ? Number(e.WardDue)
                                    : 0}
                                </td>
                                <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    monthly
                                  </span>
                                  {Number(e.month_Due) > 0
                                    ? Number(e.month_Due)
                                    : 0}
                                </td>
                                <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                  <span class="inline-block w-1/3 md:hidden font-bold">
                                    transport
                                  </span>
                                  {Number(e.transport_due) > 0
                                    ? Number(e.transport_due)
                                    : 0}
                                </td>
                              </>
                            ) : (
                              <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                <span class="inline-block w-1/3 md:hidden font-bold">
                                  month
                                </span>
                                {Number(e.month_Due) > 0 ? Number(e.month_Due) : 0}
                              </td>
                            )}


                            <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                total
                              </span>
                              {(Number(e.ExamDue) > 0 ? Number(e.ExamDue) : 0) +
                                (Number(e.AdmDue) > 0 ? Number(e.AdmDue) : 0) +
                                (Number(e.WardDue) > 0 ? Number(e.WardDue) : 0) +
                                (Number(e.OldDues) > 0 ? Number(e.OldDues) : 0) +
                                (Number(e.month_Due) > 0 ? Number(e.month_Due) : 0) +
                                (Number(e.transport_due) > 0
                                  ? Number(e.transport_due)
                                  : 0)}
                            </td>

                          </tr>
                        );
                      }
                    })}
                  <tr class="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                    <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell"></td>
                    {isComposite && <><td class="p-2 md:border md:border-grey-500 text-center block md:table-cell"></td>
                      <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell"></td>
                      <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell"></td>
                      <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell"></td>
                    </>}
                    <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell"></td>
                    {/* <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell"></td> */}
                    <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell font-bold">
                      Total
                    </td>
                    <td class="p-2 md:border md:border-grey-500 text-center block md:table-cell font-bold text-red-600">
                      {total}
                    </td>
                  </tr>
                </tbody>
              </table>}
            </div>
            <div className="flex justify-center items-center p-2">
              <button
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handlePrint}
              >
                print
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
