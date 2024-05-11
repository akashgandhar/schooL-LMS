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
import { UseBusStream, UseStopsStream } from "../../../lib/firebase_read";
import Loader from "../../../components/loader";

export default function Stops() {
  const a = useContext(UserContext);

  const [stopName, setStopName] = useState("");
  const [stopFee, setStopFee] = useState();
  const [stopBus, setStopBus] = useState("");

  const {
    data: busList,
    error: busError,
    isLoading: busLoading,
  } = UseBusStream(a);
  const { data: stopList, error: error, isLoading } = UseStopsStream(a);

  const createStop = async (name, fee, bus) => {
    if (!name || !fee || !bus) {
      alert("Enter Missing Details");
    } else {
      try {
        const docRef = `users/${a.user}/sessions/${a.session}/stops`;
        await setDoc(doc(db, docRef, `${name}`), {
          Stop_Name: name,
          Stop_Fee: fee,
          Stop_Bus: bus,
        }).then(() => {
          alert("success");
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const [isConfirm, setIsConfirm] = useState(false);

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">Add New Stop</h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Stop Name*
                    </label>
                    <input
                      onChange={(e) => {
                        setStopName(e.target.value);
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
                      Stop Fee*
                    </label>
                    <input
                      onChange={(e) => {
                        setStopFee(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="tel"
                      placeholder="Netboard"
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Stop Bus*
                    </label>
                    <select
                      onChange={(e) => {
                        setStopBus(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="B.tech / cse / CSP242 "
                    >
                      <option>please select</option>
                      {busList?.map((e, index) => {
                        return <option key={index}>{e.Bus_Number}</option>;
                      })}
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      createStop(stopName, stopFee, stopBus);
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div>
              {isLoading ? (
                <Loader />
              ) : (
                <table class="min-w-full border-collapse block md:table">
                  <thead class="block md:table-header-group">
                    <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        Stop Number
                      </th>
                      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        Stop Bus
                      </th>
                      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        Stop Fee
                      </th>

                      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="block md:table-row-group">
                    {stopList?.map((e, index) => {
                      return (
                        <tr
                          key={index}
                          class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                        >
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              name
                            </span>
                            {e.Stop_Name}
                          </td>
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              bus
                            </span>
                            {e.Stop_Bus}
                          </td>
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              fee
                            </span>
                            {e.Stop_Fee}
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
                                    `users/${a.user}/sessions/${a.session}/stops`,
                                    e.Stop_Name
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
