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
  const [studentList, setStudentList] = useState([]);
  const [count, setCount] = useState(0);
  const [examName, setExamName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [classList, setClassList] = useState([]);
  const [selectedClassList, setSelectedClassList] = useState([]);
  const [selectedStudentList, setSelectedStudentList] = useState([]);
  const [previousStudentList, setPreviosStudentList] = useState([]);
  const router = useRouter();
  const maxStudents =
    roomList.find((item) => item.Name === roomName)?.No_Of_Seats * 3;

  const a = useContext(UserContext);

  const getStudents = async () => {
    try {
      const docRef = query(
        collection(db, `users/${a.user}/sessions/${a.session}/AllStudents`),
        where("Class", "in", selectedClassList)
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setStudentList(list);
    } catch (e) {
      console.log(e);
    }
  };

  console.log("room", roomName);

  const GetClassList = async () => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  };

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
    GetClassList();
  });

  useEffect(() => {
    getRoomList(examName);
  }, [examName]);

  const prevArray = Object.keys(previousStudentList).map((key) => {
    return {
      index: key,
      ...previousStudentList[key],
    };
  });

  const subtractedArray = studentList.filter((obj2) => {
    // Check if obj2's "ID" is not present in array1
    return !prevArray.some((obj1) => obj1.ID === obj2.ID);
  });

  // console.log(subtractedArray);

  const mergedArray = [...selectedStudentList, ...prevArray];
  console.log(selectedStudentList, prevArray);

  // Use a Set to remove duplicates
  const uniqueMergedArray = Array.from(
    new Set(mergedArray.map((student) => student.ID))
  ).map((id) => mergedArray.find((student) => student.ID === id));

  console.log("uniqe", uniqueMergedArray);

  const setAssignStudents = async () => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/exams/${examName}/rooms/${roomName}/Students`,
        "Arrangement"
      );
      await updateDoc(docRef, {
        Students: uniqueMergedArray,
      })
        .catch((e) => {
          if (e.code === "not-found") {
            setDoc(docRef, {
              Students: uniqueMergedArray,
            });
          }
          console.log(e.code);
          return;
        })
        .then(() => {
          router.push({
            pathname: "/sessions/exams/printSeatingArrangement",
            query: {
              exam: examName,
              room: roomName,
              maxSeats: maxStudents / 3,
            },
          });
        });
      alert("Students Assigned");
    } catch (e) {
      console.log(e.message);
    }
  };

  const getAssignStudents = async () => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/exams/${examName}/rooms/${roomName}/Students`,
        "Arrangement"
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPreviosStudentList(docSnap.data().Students);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getAssignStudents();
  }, [roomName]);

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
                </div>
                <div class=" items-center px-3 mb-6 md:mb-0">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="company"
                  >
                    Select Classes*
                  </label>
                  <div
                    class="w-full flex flex-wrap items-center justify-between text-center bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="company"
                    type="text"
                    placeholder="Netboard"
                  >
                    <div className="flex">
                      {classList.map((classs) => {
                        return (
                          <>
                            <div className="flex items-center text-center mr-1 flex-row gap-1">
                              <input
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedClassList([
                                      ...selectedClassList,
                                      classs.Name,
                                    ]);
                                  } else {
                                    setSelectedClassList(
                                      selectedClassList.filter(
                                        (c) => c !== classs.Name
                                      )
                                    );
                                  }
                                }}
                                type="checkbox"
                              />
                              <span>{classs.Name}</span>
                            </div>
                            <div className="border "></div>
                          </>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => {
                        getStudents();
                      }}
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- */}

            <div>
              <div className="w-full flex justify-center p-4">
                <button
                  // onClick={() => {
                  //   setData();
                  // }}
                  class="bg-blue-600  text-white font-bold  py-2 px-4 rounded-full"
                >
                  {"---"} Selected Students : {selectedStudentList.length}{" "}
                  {"---"}
                </button>
              </div>
              <table class="font-semibold min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-black md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      IN
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Adm No.
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      SID
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Student Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Father Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Class
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Section
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Mobile
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border border-black text-left block md:table-cell">
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody class="font-semibold block md:table-row-group">
                  {subtractedArray
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .filter(
                      (e) => e.Deleted === false || e.Deleted === undefined
                    )
                    .map((e, index) => {
                      if (e.Deleted == false || e.Deleted == undefined) {
                        return (
                          <tr
                            key={index}
                            class="bg-white font-semibold border border-black md:border-none block md:table-row"
                          >
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                in
                              </span>
                              <input
                                type="checkbox"
                                onChange={(event) => {
                                  if (uniqueMergedArray.length >= maxStudents) {
                                    alert("Max Students Reached");

                                    return;
                                  }

                                  if (
                                    uniqueMergedArray.filter(
                                      (c) => c.Class === e.Class
                                    ).length >=
                                    maxStudents / 3
                                  ) {
                                    alert(
                                      "Max Students from One Class Has Reached"
                                    );

                                    return;
                                  }

                                  if (event.target.checked) {
                                    setSelectedStudentList([
                                      ...selectedStudentList,
                                      e,
                                    ]);
                                  } else {
                                    setSelectedStudentList(
                                      selectedStudentList.filter(
                                        (c) => c.ID !== e.ID
                                      )
                                    );
                                  }
                                }}
                              />
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                sn
                              </span>
                              {e.ID}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                SID
                              </span>
                              {e.Sr_Number}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                name
                              </span>
                              {e.name}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                fName
                              </span>
                              {e.Father_Name}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                class
                              </span>
                              {e.Class}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                section
                              </span>
                              {e.Section}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                mobile
                              </span>
                              {e.Mobile_Number}
                            </td>
                            <td class="p-2 md:border border-black text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                Address
                              </span>
                              {e.Address}
                            </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>

                {/* //dupi */}
              </table>
            </div>

            {/* ---------- */}
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => {
                  setAssignStudents();
                }}
                class="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Assign Students
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
