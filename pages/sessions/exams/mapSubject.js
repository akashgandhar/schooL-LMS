import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import UserContext from "../../../components/context/userContext";
import { async } from "@firebase/util";

export default function MapExams() {
  const a = useContext(UserContext);

  const [classList, setClassList] = useState([]);
  const [examList, setExamList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);


  const [examName, setExamName] = useState();
  const [className, setClassName] = useState();
  const [subjectName, setSubjectName] = useState();
  const [maxMarks, setMaxMarks] = useState();

  const [selectedExamName, setSelectedExamName] = useState();
  const [selectedclassName, setSelectedClassName] = useState();

  const [count, setCount] = useState(0);

  useEffect(() => {
    GetExamList();
    GetClassList();
    // GetSubjectList();

  }, [classList, examList, selectedExamName, selectedclassName]);



  const mapSubjects = async () => {
    if (!className || !maxMarks || !subjectName || !examName) {
      alert("Enter Missing Details");
    } else {
      try {
        const docRef = `users/${a.user}/sessions/${a.session}/exams/${examName}/classes`;
        await setDoc(doc(db, docRef, className), {
          Name: className,
        }).then(async () => {
          const docRef = `users/${a.user}/sessions/${a.session}/exams/${examName}/classes/${className}/subjects`;
          await setDoc(doc(db, docRef, subjectName), {
            Name: subjectName,
            MAX_MARKS: maxMarks
          })
        })
      } catch (e) {
        console.error("Error adding document: ", e.message);
      }
    }
  };



  const GetExamList = async () => {
    if(count<3){

      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/exams`
        );
        const docSnap = await getDocs(docRef);
        var list = [];
        docSnap.forEach((doc) => {
          list.push(doc.data());
        });
        setExamList(list);
        setCount(count+1);
      }
  };

  const GetSubjectList = async () => {

      if (selectedclassName && selectedExamName) {
        const docRef = collection(
          db,
          `users/${a.user}/sessions/${a.session}/exams/${selectedExamName}/classes/${selectedclassName}/subjects`
          );
          const docSnap = await getDocs(docRef);
          var list = [];
          docSnap.forEach((doc) => {
            list.push(doc.data());
          });
          setSubjectList(list);
        
    }
  };


  const GetClassList = async () => {
    if(count <3){

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
        setCount(count+1);
      }
  };

  const [isConfirm, setIsConfirm] = useState(false);


  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">Add New Exam</h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Select Exam*
                    </label>
                    <select
                      onChange={(e) => {
                        setExamName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="class Name"
                    >
                      <option>Please Select</option>
                      {examList.map((e,index) => { return (<option key={index}>{e.Name}</option>) })}
                    </select>
                  </div>
                  <div class="md:w-full px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Select Class*
                    </label>
                    <select
                      onChange={(e) => {
                        setClassName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="class Name"
                    >
                      <option>Please Select</option>
                      {classList.map((e,index) => { return (<option key={index}>{e.Name}</option>) })}
                    </select>
                  </div>
                  <div class="md:w-full px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Subject Name*
                    </label>
                    <input
                      onChange={(e) => {
                        setSubjectName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="do not write duplicate"
                    />
                  </div>
                  <div class="md:w-full px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Maximum Marks*
                    </label>
                    <input
                      onChange={(e) => {
                        setMaxMarks(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="number"
                      placeholder="Write Max Marks"
                    />
                  </div>


                  <button
                    onClick={() => {
                      mapSubjects();
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Map
                  </button>
                </div>
              </div>
            </div>
            <h1 className="text-center font-bold text-2xl py-2">Mapped Subjects</h1>
            <div class="-mx-3 md:flex mb-6">


              <div class="md:w-full px-3 mb-6 md:mb-0">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="company"
                >
                  Select Exam*
                </label>
                <select
                  onChange={(e) => {
                    setSelectedExamName(e.target.value);
                  }}
                  class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="company"
                  type="text"
                  placeholder="Exam Name"
                ><option>Please Select</option>
                  {examList.map((e,index) => { return (<option key={index}>{e.Name}</option>) })}
                </select>
              </div>
              <div class="md:w-full px-3 mb-6 md:mb-0">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="company"
                >
                  Select Class*
                </label>
                <select onClick={GetSubjectList}
                  onChange={(e) => {
                    setSelectedClassName(e.target.value);
                  }}
                  class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="company"
                  type="text"
                  placeholder="Exam Name"
                ><option>Please Select</option>
                  {classList.map((e,index) => { return (<option key={index}>{e.Name}</option>) })}
                </select>
              </div>
                <button
                    onClick={() => {
                      GetSubjectList();
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Search
                  </button>

            </div>
            <div>
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Exam Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Maximum Marks
                    </th>

                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {subjectList.map((e, index) => {
                    return (
                      <tr
                        key={index}
                        class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                      >
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Name
                          </span>
                          {e.Name}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Maxmum Marks
                          </span>
                          {e.MAX_MARKS}
                        </td>

                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Actions
                          </span>

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
                                const docRef = doc(
                                  db,
                                  `users/${a.user}/sessions/${a.session}/exams`,
                                  e.Name
                                );
                                deleteDoc(docRef);
                                setIsConfirm(false);
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
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
