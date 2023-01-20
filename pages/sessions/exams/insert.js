import { async } from "@firebase/util";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  FieldValue,
  Timestamp,
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import UserContext from "../../../components/context/userContext";

export default function InsertMarks() {
  const router = useRouter();
  const current = new Date();
  const a = useContext(UserContext);
  const d = `${current.getDate()}-${current.getMonth() + 1
    }-${current.getFullYear()}`;

  const [mode, setMode] = useState();
  const [amount, setAmount] = useState();
  const [concession, setConcession] = useState(0);
  const [concessionBy, setConcessionBy] = useState("nil");



  const s = router.query;


  const [subList, setSubList] = useState([]);

  const GetSubList = async () => {
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/exams/${s.exam}/classes/${s.Class}/subjects`
    );
    const docSnap = await getDocs(docRef);
    var list = [];
    docSnap.forEach((doc) => {
      list.push(doc.data());
    });
    setSubList(list);
  };

  useEffect(() => {
    GetSubList();

  }, [subList])



  const time = new Intl.DateTimeFormat("en-IN", { timeStyle: "medium" }).format(
    current.getTime()
  );

  const [obt, setObt] = useState();


  const saveMarks = async (sub) => {
    if (!obt) {
      alert("Enter Missing Details");
    } else {
      try {
        const docRef = `users/${a.user}/sessions/${a.session}/exams/${s.exam}/classes/${s.Class}/subjects`;
        await updateDoc(doc(db, docRef, sub), {
          OBTAINED_MARKS: obt,

        }).then(() => { alert("success") })
      }
      catch (e) {
        console.error("Error adding document: ", e.message);
      }
    }
  };



  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">Insert Marks Of {s.exam}</h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Student Id
                    </label>
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {s.Sr_Number}
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Student Name
                    </label>
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {s.name}
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Student Father Name
                    </label>
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {s.Father_Name}
                    </div>
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Class
                    </label>
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {s.Class}
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Section
                    </label>
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {s.Section}
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Date
                    </label>
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {current.getDate()}/{current.getMonth() + 1}/
                      {current.getFullYear()}
                    </div>
                  </div>
                </div>
                <button
                  class="bg-red-400  text-white font-bold  py-2 px-4 rounded-full"

                >
                  --- Please Save Marks Of One Subject First Then Proceed To Next ---
                </button>
              </div>
            </div>
            <div>
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Subjects
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Obtained Marks
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Maximum Marks
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Percent
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {subList.map((e, index) => {
                    return (
                      <tr
                        key={index}
                        class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                      >
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            subject
                          </span>
                          {e.Name}
                        </td>
                        <td class="px-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            obtained Marks
                          </span>
                          <input max={e.MAX_MARKS} onChange={(e) => { setObt(e.target.value) }} className="w-full" placeholder="Enter Marks" />
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            maximum marks
                          </span>
                          {e.MAX_MARKS}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            percent
                          </span>
                          {obt / e.MAX_MARKS * 100}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            action
                          </span>
                          <button onClick={() => {
                            saveMarks(e.Name)
                          }}

                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">

                </div>
                <button

                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={async () => {
                    const docRef = collection(
                      db,
                      `users/${a.user}/sessions/${a.session}/exams/${s.exam}/classes/${s.Class}/subjects`
                    );
                    const docSnap = await getDocs(docRef);
                    docSnap.forEach((doc) => {
                      if (!doc.data().OBTAINED_MARKS) {

                      }
                    });
                    alert("Marks Added Successfully");
                    router.push("/sessions/exams/marks")
                  }}

                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
