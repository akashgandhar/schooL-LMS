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
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import UserContext from "../../context/userContext";

export default function payment() {
  const router = useRouter();
  const current = new Date();
  const a = useContext(UserContext);
  const d = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  const [mode, setMode] = useState();
  const [amount, setAmount] = useState();
  const [concession, setConcession] = useState(0);
  const [concessionBy, setConcessionBy] = useState("nil");

  const s = router.query;

  const [subjects, setSubjects] = useState([]);

  const GetSubList = async () => {
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/exams/${s.exam}/subjects`
    );
    const docSnap = await getDocs(docRef);
    var list = [];
    docSnap.forEach((doc) => {
      list.push(doc.data());
    });
    setSubjects(list);
  };

  

  const [English, setEnglish] = useState(0);
  const [Hindi, setHindi] = useState(0);
  const [gk, setGk] = useState(0);
  const [Mathematics, setMathematics] = useState(0);
  const [Science, setScience] = useState(0);
  const [SocialScience, setSocialScience] = useState(0);

  useEffect(() => {
    GetSubList();
    console.log(English,Hindi,SocialScience);
  }, [English,Hindi,SocialScience]);

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">Fee Payment</h1>
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
                <div class="bg-blue-500  text-white font-bold  py-2 px-4 rounded-full text-center align-middle">
                  Insert Marks Of {s.exam}
                </div>
              </div>
            </div>
            <div>
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Subject
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Obtained Marks
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Maximum Marks
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {subjects.map((e, index) => {
                    return (
                      <tr
                        key={index}
                        class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                      >
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Month
                          </span>
                          {e.Name}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            obtained
                          </span>
                          <input
                            onChange={(e) => {
                              if (e.Name == "English") {
                                setEnglish(e.target.value);
                              }
                              if (e.Name === "Hindi") {
                                setHindi(e.target.value);
                              }
                              if (e.Name === "MSC and GK") {
                                setGk(e.target.value);
                              }
                              if (e.Name === "Mathematics") {
                                setMathematics(e.target.value);
                              }
                              if (e.Name === "Science") {
                                setScience(e.target.value);
                              }
                              if (e.Name === "Social Science") {
                                setSocialScience(e.target.value);
                              }
                            }}
                            type="number"
                          ></input>
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            max
                          </span>
                          {e.Maximum_Marks}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            percent
                          </span>
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
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Mode Of Payment
                    </label>
                    <select
                      onChange={(e) => {
                        setMode(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    >
                      <option>Plese Select</option>
                      <option>Monthly Fee</option>
                      <option>Transport Fee</option>
                      <option>Old Dues</option>
                    </select>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Amount
                    </label>
                    <input
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      placeholder="Amount"
                      type="number"
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Concession
                    </label>
                    <input
                      onChange={(e) => {
                        setConcession(e.target.value);
                      }}
                      placeholder="Concession"
                      value={concession}
                      type="number"
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    />
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Concession By
                    </label>
                    {concession > 0 && (
                      <input
                        onChange={(e) => {
                          setConcessionBy(e.target.value);
                        }}
                        placeholder="concession By"
                        class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      />
                    )}
                  </div>
                </div>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => {
                    if (!mode || !amount) {
                      alert("Information Missing");
                    } else {
                      pay();
                    }
                  }}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
