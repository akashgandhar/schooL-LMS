import React, { useContext, useEffect, useState } from "react";
import Nav from "../../../components/navbar";
import Header from "../../../components/dropdown";
import { auth, db } from "../../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import UserContext from "../../context/userContext";
import { async } from "@firebase/util";

export default function Exams() {
  const a = useContext(UserContext);

  const [examName, setExamName] = useState("");
  const [maxmark, setMaxMark] = useState("");
  const [examList, setExamList] = useState([]);
  const subList = [
    "Hindi",
    "English",
    "Mathematics",
    "Social Science",
    "Science",
    "MSC and GK ",
  ];

  useEffect(() => {
    GetExamList();
  }, [examList]);

  const [subName, setSubName] = useState();

  const createExam = async () => {
    if (!examName || !maxmark) {
      alert("Enter Missing Details");
    } else {
      try {
        const docRef = `users/${a.user}/sessions/${a.session}/exams/`;
        await setDoc(doc(db, docRef, examName), {
          Name: examName,
          Maximum_Marks: maxmark,
        }).then(async () => {
          subList.map(async (e) => {
            try {
              const docRef = `users/${a.user}/sessions/${a.session}/exams/${examName}/subjects/`;
              await setDoc(doc(db, docRef, e), {
                Name: e,
                Exam: examName,
                Maximum_Marks: maxmark,
              });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          });
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const GetExamList = async () => {
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
  };

  const [isConfirm, setIsConfirm] = useState(false);
  const [subl, setSubL] = useState(["fgdsfg", "dfsg"]);

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">Add New Exam</h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Name*
                    </label>
                    <input
                      onChange={(e) => {
                        setExamName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Maximum Marks
                    </label>
                    <input
                      onChange={(e) => {
                        setMaxMark(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="number"
                      placeholder="B.tech / cse / CSP242 "
                    />
                  </div>

                  <button
                    onClick={() => {
                      createExam();
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div>
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Exam Name
                    </th>

                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {examList.map((e, index) => {
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
