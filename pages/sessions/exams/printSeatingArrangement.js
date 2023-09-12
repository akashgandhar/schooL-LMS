import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { db } from "../../../firebase";
import UserContext from "../../../components/context/userContext";

function SeatingArrangementPage() {
  const router = useRouter();
  const { exam, room } = router.query;
  var maxSeats = router.query.maxSeats;
  const [old, setOld] = useState(false);
  // const [tableData, setTableData] = useState([]);
  const maxSeatsPerRow = 3;
  const [assignedStudents, setAssignedStudents] = useState([]);
  const a = useContext(UserContext);
  const [oldArrangementArray, setOldArrangementArray] = useState([]);

  // console.log();
  if (maxSeats == undefined) {
    maxSeats = 0;
  }

  const getAssignStudents = async () => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/exams/${exam}/rooms/${room}/Students`,
        "Arrangement"
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAssignedStudents(docSnap.data().Students);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (exam && room) {
      getAssignStudents();
    }
  }, [exam, room]);

  // console.log(assignedStudents);

  // const students = [...]; // Replace with your student data
  // const maxSeatsPerRow = 3; // Maximum seats per row (always 3 columns)
  // Change this to the maximum number of seats you want

  // Group students by class
  const studentsByClass = {};

  assignedStudents.forEach((student) => {
    const className = student.Class;
    if (!studentsByClass[className]) {
      studentsByClass[className] = [];
    }
    studentsByClass[className].push(student);
  });

  // Create an array of seats, each initialized as an empty array
  const seatingArrangement = Array.from({ length: maxSeats }, () => []);

  // Distribute students evenly into the seats
  const classNames = Object.keys(studentsByClass);
  let currentSeatIndex = 0;

  classNames.forEach((className) => {
    const studentsOfClass = studentsByClass[className];
    for (let i = 0; i < studentsOfClass.length; i++) {
      const student = studentsOfClass[i];
      seatingArrangement[currentSeatIndex].push(student);
      currentSeatIndex = (currentSeatIndex + 1) % maxSeats;
    }
  });

  // console.log("seat", seatingArrangement);

  function arrayToObj(seatingArrangement) {
    const seatingArrangementObject = {};

    for (let rowIndex = 0; rowIndex < seatingArrangement.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < seatingArrangement[rowIndex].length;
        colIndex++
      ) {
        const seatKey = `Seat_${rowIndex + 1}_${colIndex + 1}`;
        seatingArrangementObject[seatKey] =
          seatingArrangement[rowIndex][colIndex];
      }
    }

    return seatingArrangementObject;
  }

  // Function to convert an object to a 2D array
  function objToArray(seatingArrangementObject) {
    const numRows = Math.max(
      ...Object.keys(seatingArrangementObject).map((seatKey) =>
        parseInt(seatKey.split("_")[1], 10)
      )
    );
    const numCols = Math.max(
      ...Object.keys(seatingArrangementObject).map((seatKey) =>
        parseInt(seatKey.split("_")[2], 10)
      )
    );

    const seatingArrangement = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => null)
    );

    Object.keys(seatingArrangementObject).forEach((seatKey) => {
      const [_, rowIndex, colIndex] = seatKey.split("_");
      seatingArrangement[rowIndex - 1][colIndex - 1] =
        seatingArrangementObject[seatKey];
    });

    return seatingArrangement;
  }

  const seatingArrangementObject = arrayToObj(seatingArrangement);
  // console.log(seatingArrangementObject);

  const seatingArrangementArray = objToArray(oldArrangementArray);
  // console.log(seatingArrangementArray);

  const getArrangement = async () => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/exams/${exam}/rooms/${room}/Students`,
        "Arrangement"
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOldArrangementArray(docSnap.data().StudentArrangements);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const setArrangement = async () => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/exams/${exam}/rooms/${room}/Students`,
        "Arrangement"
      );
      await updateDoc(docRef, {
        StudentArrangements: seatingArrangementObject,
      }).catch((e) => {
        console.log(e.message);
        return;
      });
      alert("Saved");
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteAssigned = async () => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/exams/${exam}/rooms/${room}/Students`,
        "Arrangement"
      );
      await deleteDoc(docRef)
        .catch((e) => {
          console.log(e.message);
          return;
        })
        .then(() => {
          deleteAllAssigned();
        })
        .catch((e) => {
          console.log(e.message);
          return;
        })
        .then(() => {
          alert("Deleted");
          router.replace("/sessions/exams/seatingArrangement");
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  console.log(exam);

  const deleteAllAssigned = async () => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/exams/${exam}/Students`,
        "Arrangement"
      );
      await deleteDoc(docRef).catch((e) => {
        console.log(e.message);
        return;
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  // console.log(seatingArrangement);

  // Example array
  const data = [
    [
      {
        RTE_Status: "No",
        fees: "1000",
        Category: "OBC",
        Third_Ward: "No",
        Address: "BEEJALPUR EDALPUR",
      },
      {
        RTE_Status: "No",
        fees: "1100",
        Category: "OBC",
        Address: "RAYA ROAD SADABAD",
        Third_Ward: "Yes",
      },
      {
        RTE_Status: "",
        fees: "1100",
        Category: "OBC",
        Third_Ward: "",
        Address: "JHAGRAR",
      },
    ],
    // ... (other arrays of objects)
  ];

  // Function to get distinct classes and total number of students
  function getClassStats(data) {
    const classStats = {};

    // Iterate through the array
    data.forEach((subArray) => {
      subArray.forEach((student) => {
        const studentClass = student.Class; // Change this to the property that represents the class

        // If the class is not in classStats, initialize it with a count of 1
        if (!classStats[studentClass]) {
          classStats[studentClass] = 1;
        } else {
          // If the class is already in classStats, increment the count
          classStats[studentClass]++;
        }
      });
    });

    return classStats;
  }

  // Get the class statistics
  const classStatistics = getClassStats(seatingArrangement);
  const classStatisticsOld = getClassStats(seatingArrangementArray);

  // console.log(classStatistics);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="w-full p-4 bg-gray-200 my-5 flex flex-col  mx-auto">
      <div
        ref={componentRef}
        className="w-full  items-center flex justify-center"
      >
        <div className=" flex-col flex text-center items-center w-[29.7cm] p-4 bg-white">
          {/* <h1 className="">Seating Arrangement</h1> */}

          <h1 class=" items-center text-5xl mb-5 font-extrabold ">
            Seating Arrangement
            <br />
            <span class="bg-red-100  text-red-800 text-2xl font-semibold  px-2.5 py-0.5 rounded ">
              {exam}
            </span>
            <br />
            <span class="bg-blue-100  text-blue-800 text-2xl font-semibold  px-2.5 py-0.5 rounded ">
              Room No.: {room}
            </span>
          </h1>

          <table className="table-fixed w-full ">
            {!old ? (
              <tbody>
                {Array.from({
                  length: Math.ceil(maxSeats / maxSeatsPerRow),
                }).map((_, rowIndex) => (
                  <tr className="flex gap-2 mb-10" key={rowIndex}>
                    {seatingArrangement
                      .slice(
                        rowIndex * maxSeatsPerRow,
                        (rowIndex + 1) * maxSeatsPerRow
                      )
                      .map((row, columnIndex) => (
                        <td
                          key={columnIndex}
                          className={`w-1/3 flex border border-black items-center justify-center text-center`}
                        >
                          {Array.from({ length: maxSeatsPerRow }).map(
                            (_, divIndex) => (
                              <div
                                key={divIndex}
                                className={`overflow-hidden text-xs flex justify-center items-center border-black w-1/3 aspect-video p-2`}
                              >
                                {row[divIndex] ? (
                                  <div>
                                    {row[divIndex].name} <br /> (
                                    {row[divIndex].Class})
                                  </div>
                                ) : (
                                  <div className="w-1/3 h-1/3" />
                                )}
                              </div>
                            )
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                {Array.from({
                  length: Math.ceil(maxSeats / maxSeatsPerRow),
                }).map((_, rowIndex) => (
                  <tr className="flex gap-2 mb-5" key={rowIndex}>
                    {seatingArrangementArray
                      .slice(
                        rowIndex * maxSeatsPerRow,
                        (rowIndex + 1) * maxSeatsPerRow
                      )
                      .map((row, columnIndex) => (
                        <td
                          key={columnIndex}
                          className={`w-1/3 flex border border-black items-center justify-center text-center`}
                        >
                          {Array.from({ length: maxSeatsPerRow }).map(
                            (_, divIndex) => (
                              <div
                                key={divIndex}
                                className={`overflow-hidden text-xs flex justify-center items-center border-black w-1/3 aspect-video p-2`}
                              >
                                {row[divIndex] ? (
                                  <div>
                                    {row[divIndex].name} <br /> (
                                    {row[divIndex].Class})
                                  </div>
                                ) : (
                                  <div className="w-1/3 h-1/3" />
                                )}
                              </div>
                            )
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!old ? (
            <tr>
              {Object.entries(classStatistics).map(([className, count]) => (
                <td className="text-red-500" key={className}>
                  <span className="font-bold text-black">{className}</span>:{" "}
                  {count} students,{" "}
                </td>
              ))}
            </tr>
          ) : (
            <tr>
              {Object.entries(classStatisticsOld).map(([className, count]) => (
                <td className="text-red-500" key={className}>
                  <span className="font-bold text-black">{className}</span>:{" "}
                  {count} students,{" "}
                </td>
              ))}
            </tr>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-5">
        <button
          onClick={() => {
            getArrangement();
            setOld(!old);
          }}
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          {old ? " Get New " : "Get Last "}
        </button>
        <button
          onClick={setArrangement}
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Save New
        </button>
        <button
          onClick={handlePrint}
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Print
        </button>

        <button
          onClick={deleteAssigned}
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Delete Assigned
        </button>
        <button
          onClick={() => {
            router.push({
              pathname: "/sessions/exams/printSlips",
              query: { exam: exam, room: room, maxSeats: maxSeats },
            });
          }}
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Print Slips
        </button>
      </div>
    </div>
  );
}

export default SeatingArrangementPage;
