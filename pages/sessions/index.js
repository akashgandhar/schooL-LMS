import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import UserContext from "../../components/context/userContext";
import { UseSessionStream } from "../../lib/firebase_read";

export default function Index() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sessionSelected, setSessionSelected] = useState();
  const a = useContext(UserContext);

  const [count, setCount] = useState(0);

  const { data: sessionList, error, isLoading } = UseSessionStream(a);

  const setCurrentSession = async (value) => {
    updateProfile(auth.currentUser, {
      photoURL: value,
    })
      .then(() => {
        // Profile updated!
        // ...
        alert("success");
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const createSession = async (fromdate, todate) => {
    try {
      await setDoc(
        doc(db, `users/${a.user}/sessions`, `${fromdate}-${todate}`),
        {
          Name: `${fromdate}-${todate}`,
          From: fromdate,
          To: todate,
        }
      ).then(setCurrentSession(`${fromdate}-${todate}`));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const [migrateFrom, setMigrateFrom] = useState();
  const [migrateTo, setMigrateTo] = useState();

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">
                Add New Session
              </h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      From*
                    </label>
                    <input
                      onChange={(e) => {
                        setFrom(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="From Year"
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      To*
                    </label>
                    <input
                      onChange={(e) => {
                        setTo(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="To Year"
                    />
                  </div>
                  <button
                    onClick={() => {
                      createSession(from, to);
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-center font-bold text-2xl">
                Change Current Session
              </h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Current Session*
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setSessionSelected(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>Select_Session</option>
                        {sessionList?.map((e, index) => {
                          return <option key={index}>{e.Name}</option>;
                        })}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentSession(sessionSelected);
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
