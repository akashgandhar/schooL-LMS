import {
  collection,
  deleteDoc,
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

export default function Expense() {
  const current = new Date();
  const time = new Intl.DateTimeFormat("en-IN", { timeStyle: "medium" }).format(
    current.getTime()
  );

  const d = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  const [incomeList, setIncomeList] = useState([]);
  var total = 0;
  const a = useContext(UserContext);
  const [source, setSource] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState(d);
  const [searchDate, setSearchDate] = useState(d);
  const router = useRouter();
  // console.log(date);

  const getIncome = async () => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/dayBook/${searchDate}/expense`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setIncomeList(list);
      // console.log("run");
    } catch (e) {
      alert(e.message);
    }
  };

  const setIncome = async () => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/dayBook/${date}/expense`,
        time
      );
      await setDoc(docRef, {
        name: source,
        Total_Paid: Number(amount),
        Time: time,
      }).then(() => {
        alert("success");
      });
    } catch (e) {
      alert(e.message);
    }
  };


  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">Add Expense</h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Expense Source*
                    </label>
                    <input
                      onChange={(e) => {
                        setSource(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                    />
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Amount*
                    </label>
                    <input
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="tel"
                      placeholder="Netboard"
                    />
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Date*
                    </label>
                    <input
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      value={date}
                      type="text"
                      placeholder="DD-MM-YYYY"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (!date || !source || !amount) {
                        alert("Information Missing");
                      } else {
                        setIncome();
                      }
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Insert
                  </button>
                </div>
                <div className="flex gap-2 items-center w-full">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Date*
                    </label>
                    <input
                      onChange={(e) => {
                        setSearchDate(e.target.value);
                      }}
                      class="w-full  bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      value={searchDate}
                      type="text"
                      placeholder="DD-MM-YYYY"
                    />
                  </div>

                  <button
                    onClick={() => {
                      getIncome();
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white w-24 h-10 font-bold py-2 px-4 rounded-full"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-center font-bold text-2xl">
                Expense Details : {searchDate}
              </h1>

              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Sn
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Particulars
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Amount
                    </th>

                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {incomeList.map((e, index) => {
                    try {
                      total += Number(e.Total_Paid);
                    } catch {}

                    return (
                      <tr
                        key={index}
                        class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                      >
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            sr
                          </span>
                          {index + 1}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            name
                          </span>
                          {e.name}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            amount
                          </span>
                          {e.Total_Paid}
                        </td>

                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            action
                          </span>

                          <button
                            onClick={async () => {
                              // console.log(e);
                              const docRef = doc(
                                db,
                                `users/${a.user}/sessions/${a.session}/dayBook/${searchDate}/income`,
                                e.Time
                              );
                              deleteDoc(docRef);
                              alert("Deleted");
                            }}
                            class="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  <tr class="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      total
                    </td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell font-bold text-red-600">
                      {total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
