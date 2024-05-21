// import React from 'react'

// export default function AssignSubToStudents() {
//   return (
//     <div>assignSubToStudents</div>
//   )
// }






import React, { useContext, useEffect, useState } from "react";
import Nav from "../../../components/navbar";
import Header from "../../../components/dropdown";
import { auth, db } from "../../../firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import UserContext from "../../../components/context/userContext";
import axios from "axios";
import { useExam } from "./contexts/context";
import { useSubject } from "./contexts/subContext";

export default function AssignSubToStudents() {
  const a = useContext(UserContext);
  const router = useRouter();

  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [classList, setClassList] = useState([]);

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
    } catch {
      (e) => {
        if (!className) {
          alert("select class first");
        }
      };
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

  const [selectedStudents, setSelectedStudents] = useState([]);

  const GetStudentList = async () => {
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/students`
    );
    const docSnap = await getDocs(docRef);
    var list = [];
    var students = [];
    docSnap.forEach((doc) => {
      list.push(doc.data());
      students.push({ sid: doc.data().Sr_Number, checked: false });
    });
    setStudentList(list);
    setSelectedStudents(students);
  };

  const handleCheckboxChange = (student) => {
    const newData = [...selectedStudents];
    const index = newData.findIndex((item) => item.sid === student.Sr_Number);
    newData[index].checked = !newData[index].checked;
  };

  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);

  const handleHeaderCheckboxChange = () => {
    const newData = selectedStudents.map((item) => {
      return {
        ...item,
        checked: !isHeaderCheckboxChecked,
      };
    });
    setSelectedStudents(newData);
    setIsHeaderCheckboxChecked(!isHeaderCheckboxChecked);
  };

  // SMS

  const { examList, newSelectedSubjects, selectedExam, setSelectedExam } =
    useExam();

  const { subjectList } = useSubject();

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSubjectCheckBoxToggle = (e, name) => {
    if (e.target.checked) {
      setSelectedSubjects([...selectedSubjects, name]);
    } else {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== name));
    }
  };

  const AssignSubjectsToStudents = async () => {
    if (selectedSubjects.length === 0) {
      alert("Please select subjects");
      return;
    }

    if (selectedStudents.filter((item) => item.checked).length === 0) {
      alert("Please select students");
      return;
    }

    console.log(selectedSubjects);
    console.log(selectedStudents);

    selectedSubjects.forEach(async (subject) => {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/subjects/${subject}`
      );

      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      const checkedStudents = selectedStudents.filter((item) => item.checked);

      const newData = [
        ...(data?.Students || []),
        ...(checkedStudents.map((item) => item.sid) || []),
      ];

      await setDoc(docRef, { Students: newData }, { merge: true });

      alert("Subjects assigned successfully");
    });
  };

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto  py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">
                Assign Subjects To Students
              </h1>
              {/* {JSON.stringify(sele)} */}
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
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
                      id="title"
                      placeholder="B.tech / cse / CSP242 "
                    >
                      <option>Please Select</option>
                      {classList.map((e, index) => {
                        return <option key={index}>{e.Name}</option>;
                      })}
                    </select>
                  </div>

                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
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
                      id="title"
                      placeholder="B.tech / cse / CSP242 "
                    >
                      <option>Please Select</option>
                      {sectionList.map((e, index) => {
                        return <option key={index}>{e.Name}</option>;
                      })}
                    </select>
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Exam*
                    </label>
                    <select
                      onChange={(e) => {
                        setSelectedSubjects([]);
                        setSelectedExam(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      placeholder="B.tech / cse / CSP242 "
                    >
                      <option>Please Select</option>
                      {examList.map((e, index) => {
                        return <option key={index}>{e.Name}</option>;
                      })}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      GetStudentList();
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2 mb-1 flex items-center w-full border-2">
              <div className="flex flex-1 overflow-auto whitespace-nowrap">
                {newSelectedSubjects?.map((sub, index) => (
                  <div
                    key={index}
                    className="p-2 flex items-center gap-1 font-bold border rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedSubjects.includes(sub?.Name) ? true : false
                      }
                      onChange={(e) => handleSubjectCheckBoxToggle(e, sub.Name)}
                    />
                    {sub.Name}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      <input
                        type="checkbox"
                        checked={isHeaderCheckboxChecked}
                        onChange={handleHeaderCheckboxChange}
                      />
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      SID
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Student Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Father's Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Class
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Address
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Mobile
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {studentList
                    .filter(
                      (e) => e.Deleted === false || e.Deleted === undefined
                    )
                    .sort((a, b) =>
                      a.name > b.name ? 1 : a.Sr_Number > b.Sr_Number ? 1 : -1
                    )
                    .map((e, index) => {
                      return (
                        <tr
                          key={index}
                          class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                        >
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              check
                            </span>
                            <input
                              type="checkbox"
                              checked={
                                selectedStudents.find(
                                  (item) => item.sid === e.Sr_Number
                                ).checked
                              }
                              onChange={() => handleCheckboxChange(e)}
                            />
                          </td>
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              Name
                            </span>
                            {e.Sr_Number}
                          </td>
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              Name
                            </span>
                            {e.name}
                          </td>
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              sections
                            </span>
                            {e.Father_Name}
                          </td>
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              classTeacher
                            </span>
                            {className}
                          </td>
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              Strength
                            </span>
                            {e.Place}
                          </td>
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              Strength
                            </span>
                            {e.Mobile_Number}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div class="bg-white border-2 shadow-md rounded px-8 pt-6 pb-8 my-4 flex flex-col">
              <button
                onClick={() => {
                  AssignSubjectsToStudents();
                }}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
