import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { use, useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import UserContext from "../../../components/context/userContext";
import { useRouter } from "next/router";

export default function seatingArrangement() {
  const [examList, setExamList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [count, setCount] = useState(0);
  const [examName, setExamName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [classList, setClassList] = useState([]);
  const [selectedClassList, setSelectedClassList] = useState([]);
  const router = useRouter();
  const a = useContext(UserContext);

  const GetExamList = async () => {
    if (count < 2) {
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
      // console.log("run");
      setCount(count + 1);
    }
  };

  const getRoomList = async (exam) => {
    if (examName || exam) {
      try {
        const docRef = collection(
          db,
          `users/${a.user}/sessions/${a.session}/exams/${exam}/rooms`
        );
        const docSnap = await getDocs(docRef);
        var list = [];
        docSnap.forEach((doc) => {
          list.push(doc.data());
        });
        setRoomList(list);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  useEffect(() => {
    GetExamList(examName);
  });

  useEffect(() => {
    getRoomList(examName);
  }, [examName]);

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">View Students</h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Exam*
                    </label>
                    <select
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                      onChange={(e) => {
                        setExamName(e.target.value);
                      }}
                    >
                      <option>Plese Select</option>
                      {examList.map((exam) => {
                        return <option>{exam.Name}</option>;
                      })}
                      ;
                    </select>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Room*
                    </label>
                    <select
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                      onChange={(e) => {
                        setRoomName(e.target.value);
                      }}
                    >
                      <option>Plese Select</option>
                      {roomList.map((room) => {
                        return <option value={room.Name}>{room.Name}</option>;
                      })}
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      router.push({
                        pathname: "/sessions/exams/printSeatingArrangement",
                        query: { exam: examName, room: roomName },
                      });
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Submit
                  </button>
                </div>
                <div class=" items-center px-3 mb-6 md:mb-0">
                  {/* </div> */}
                </div>
              </div>
            </div>

            {/* ---------------- */}

            {/* ---------- */}
          </div>
        </div>
      </div>
    </>
  );
}
