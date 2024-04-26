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
import UserContext from "../../../components/context/userContext";

export default function Classes() {
  const a = useContext(UserContext);

  const [className, setClassName] = useState("");
  const [noSections, setNoSections] = useState("");
  const [classFee, setClassFee] = useState();
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    GetClassList();
  }, [classList]);

  const createSections = async (nam, num) => {
    for (let i = 1; i <= num; i++) {
      try {
        const docRef = `users/${a.user}/sessions/${a.session}/classes/${nam}/sections`;

        await setDoc(doc(db, docRef, `Section-${i}`), {
          Name: `Section-${i}`,
          Parent_Class: nam,
          Strength: 0,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const createClass = async () => {
    if (!className || !classFee || !noSections) {
      alert("Enter Missing Details");
    } else {
      try {
        const docRef = `users/${a.user}/sessions/${a.session}/classes`;
        await setDoc(doc(db, docRef, className), {
          Name: className,
          No_Of_Sections: noSections,
          Class_Fee: classFee,
          Strength: 0,
        });
        createSections(className, noSections);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const GetClassList = async () => {
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
  };

  const [isConfirm, setIsConfirm] = useState(false);

  const ImportClassFromSession = async ({ session }) => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${session}/classes`
      );
      const docSnap = await getDocs(docRef);
      docSnap.forEach(async (docx) => {
        setDoc(
          doc(
            db,
            `users/${a.user}/sessions/${a.session}/classes`,
            docx.data().Name
          ),
          {
            Name: docx.data().Name,
            No_Of_Sections: docx.data().No_Of_Sections,
            Class_Fee: docx.data().Class_Fee,
            Strength: docx.data().Strength,
          }
        );
        const docRef2 = collection(
          db,
          `users/${a.user}/sessions/${session}/classes/${
            docx.data().Name
          }/sections`
        );
        const docSnap2 = await getDocs(docRef2);
        docSnap2.forEach(async (doc2) => {
          setDoc(
            doc(
              db,
              `users/${a.user}/sessions/${a.session}/classes/${
                docx.data().Name
              }/sections`,
              doc2.data().Name
            ),
            {
              Name: doc2.data().Name,
              Parent_Class: doc2.data().Parent_Class,
              Strength: doc2.data().Strength,
            }
          );
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto py-20 px-12 lg:px-24 shadow-xl mb-24">
            {/* <h1 className="text-center w-full flex items-center gap-2 font-bold text-xl">
              Want to import ?
              <button
                onClick={async () => {
                  if (!confirm("Are you sure you want to import ?")) {
                    return;
                  }
                  setIsLoading(true);
                  await ImportClassFromSession({ session: "2021-2022" });
                  setIsLoading(false);
                }}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded-full"
              >
                Click Here
              </button>
            </h1> */}

            <div>
              <h1 className="text-center font-bold text-2xl">Add New Class</h1>
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
                        setClassName(e.target.value);
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
                      No. Of Sections*
                    </label>
                    <input
                      onChange={(e) => {
                        setNoSections(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="tel"
                      placeholder="B.tech / cse / CSP242 "
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Class Fee*
                    </label>
                    <input
                      onChange={(e) => {
                        setClassFee(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="tel"
                      placeholder="B.tech / cse / CSP242 "
                    />
                  </div>
                  <button
                    onClick={() => {
                      createClass();
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
                      Classs Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Sections
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Class Teacher
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Strength
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {classList.map((e, index) => {
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
                            sections
                          </span>
                          {e.No_Of_Sections}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            classTeacher
                          </span>
                          {e.classTeacher}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Strength
                          </span>
                          {e.Strength}
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
                                  `users/${a.user}/sessions/${a.session}/classes`,
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
