import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import UserContext from "../../../components/context/userContext";

export default function CreateRooms() {
  const a = useContext(UserContext);
  const [RoomName, setRoomName] = useState("");
  const [noSeats, setNoSeats] = useState("");
  const [noStudents, setNoStudents] = useState("");
  const [examName, setExamName] = useState("");
  const [examList, setExamList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);

  const createRoom = async () => {
    if (!RoomName || !noSeats || !noStudents) {
      alert("Enter Missing Details");
    } else {
      try {
        const docRef = `users/${a.user}/sessions/${a.session}/exams/${examName}/rooms`;
        await setDoc(doc(db, docRef, RoomName), {
          Name: RoomName,
          No_Of_Seats: noSeats,
          Students_Per_Seat: noStudents,
        }).then(() => {
          alert("Room Created");
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const getExamList = async () => {
    try {
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
    } catch (e) {
      console.log(e.message);
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
    // getExamList();\
    // getRoomList();
    console.log(roomList);
  }, [examList, examName, roomList]);

  return (
    <div className="w-screen">
      <div class="bg-gray-100 flex bg-local w-screen">
        <div class="bg-gray-100 mx-auto w-screen h-auto py-20 px-12 lg:px-24 shadow-xl mb-24">
          <div>
            <h1 className="text-center font-bold text-2xl">Add New Room</h1>
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
              <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="company"
                  >
                    Select Exams*
                  </label>
                  <select
                    onClick={() => {
                      if (examList.length == 0) {
                        getExamList();
                      }
                    }}
                    onChange={(e) => {
                      setExamName(e.target.value);
                    }}
                    class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="company"
                    type="text"
                    placeholder="Name"
                  >
                    <option>Please Select</option>
                    {examList.map((item,index) => {
                      return <option key={index}>{item.Name}</option>;
                    })}
                  </select>
                </div>
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="company"
                  >
                    Name*
                  </label>
                  <input
                    onChange={(e) => {
                      setRoomName(e.target.value);
                    }}
                    class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="company"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div class="md:w-1/2 px-3">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="title"
                  >
                    No. Of Seats*
                  </label>
                  <input
                    onChange={(e) => {
                      setNoSeats(e.target.value);
                    }}
                    class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="title"
                    type="number"
                    placeholder="number"
                  />
                </div>
                <div class="md:w-1/2 px-3">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="title"
                  >
                    Students Per Seat*
                  </label>
                  <input
                    onChange={(e) => {
                      setNoStudents(e.target.value);
                    }}
                    class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="title"
                    type="number"
                    placeholder="number"
                  />
                </div>
                <button
                  onClick={() => {
                    // createClass();
                    createRoom();
                  }}
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <select
              onClick={() => {
                getExamList();
              }}
              onChange={(e) => {
                setExamName(e.target.value);
                getRoomList(e.target.value);
                console.log(roomList);
              }}
              class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
              id="title"
              placeholder="B.tech / cse / CSP242 "
            >
              <option>Please Select Exam</option>
              {examList.map((e, index) => {
                return <option key={index}>{e.Name}</option>;
              })}
            </select>
            <table class="min-w-full border-collapse block md:table">
              <thead class="block md:table-header-group">
                <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                  <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Room Name
                  </th>
                  <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    No. Of Seats
                  </th>
                  <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Students Per Seat
                  </th>

                  <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="block md:table-row-group">
                {roomList.map((e, index) => {
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
                          No. Of Seats
                        </span>
                        {e.No_Of_Seats}
                      </td>
                      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                        <span class="inline-block w-1/3 md:hidden font-bold">
                          Students Per Seat
                        </span>
                        {e.Students_Per_Seat}
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
                                `users/${a.user}/sessions/${a.session}/exams/${examName}/rooms`,
                                e.Name
                              );
                              deleteDoc(docRef).then(() => {
                                alert("Deleted");
                              });
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
  );
}
