import { useRouter } from "next/router";
import React, { use, useRef, useState, useEffect, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { db } from "../../../firebase";
import UserContext from "../../../components/context/userContext";
import { doc, getDoc } from "firebase/firestore";

export default function PrintSlips() {
  const router = useRouter();
  const data = router.query;
  const exam = data.exam;
  const room = data.room;
  const maxSeats = data.maxSeats;
  const maxSeatsPerRow = 3;
  const [assignedStudents, setAssignedStudents] = useState([]);
  // const [seatingArrangementArray, setSeatingArrangementArray] = useState([]);
  const [oldArrangementArray, setOldArrangementArray] = useState([]);
  const a = useContext(UserContext);

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

  // console.log(seatingArrangementObject);

  const seatingArrangementArray = objToArray(oldArrangementArray);

  useEffect(() => {
    getArrangement();
  }, [exam, room, maxSeats]);

  console.log(seatingArrangement);

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

          <h1 class=" items-center print:hidden text-5xl mb-5 font-extrabold ">
            Seating Arrangement Slips
            <br />
            <span class="bg-red-100 print:hidden  text-red-800 text-2xl font-semibold  px-2.5 py-0.5 rounded ">
              {exam}
            </span>
            <br />
            <span class="bg-blue-100  text-blue-800 text-2xl font-semibold  px-2.5 py-0.5 rounded ">
              Room No.: {room}
            </span>
          </h1>

          <table className="table-fixed w-full h-fit">
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
                      <div
                        key={columnIndex}
                        className={`w-1/3 flex flex-wrap border border-black items-center justify-center text-center`}
                      >
                        {Array.from({ length: maxSeatsPerRow }).map(
                          (_, divIndex) => (
                            <div
                              key={divIndex}
                              className={`overflow-h text-xs PrintItem flex justify-center items-center border-black w-full aspect-video p-1`}
                            >
                              {row[divIndex] ? (
                                <div className="w-full border-2 border-dashed border-black p-1">
                                  <p className="text-lg font-bold">
                                    M J PUBLIC SCHOOL
                                  </p>
                                  <p className="text-sm font-bold underline mb-1">
                                    Seat Slip
                                  </p>
                                  <table className="border w-full border-black border-collapse">
                                    <tbody>
                                      <tr className="w-full flex">
                                        <td className="text-left flex-1 truncate border border-black">
                                          Seat No.:{" "}
                                        </td>
                                        <td className="text-left flex-1 truncate border-black border">
                                          {columnIndex + rowIndex * 3 + 1}
                                        </td>
                                      </tr>
                                      <tr className="w-full flex">
                                        <td className="text-left flex-1 truncate border border-black">
                                          Student ID:{" "}
                                        </td>
                                        <td className="text-left flex-1 truncate border-black border">
                                          {row[divIndex].Sr_Number}
                                        </td>
                                      </tr>
                                      <tr className="w-full flex">
                                        <td className="text-left flex-1 truncate border border-black">
                                          Name:{" "}
                                        </td>
                                        <td className="text-left flex-1 truncate border-black border">
                                          {row[divIndex].name}
                                        </td>
                                      </tr>

                                      <tr className="w-full flex">
                                        <td className="text-left flex-1 truncate border border-black">
                                          Father&apos;s Name:{" "}
                                        </td>
                                        <td className="text-left truncate flex-1 border-black border">
                                          {row[divIndex].Father_Name}
                                        </td>
                                      </tr>
                                      <tr className="w-full flex">
                                        <td className="text-left flex-1 truncate border border-black">
                                          Class:{" "}
                                        </td>
                                        <td className="text-left flex-1 truncate border-black border">
                                          {row[divIndex].Class}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {/* {columnIndex + rowIndex * 3 + 1}
                                  {row[divIndex].name} <br /> (
                                  {row[divIndex].Class}) */}
                                </div>
                              ) : (
                                <div className="w-1/3 h-1/3" />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-5">
        <button
          onClick={handlePrint}
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Print
        </button>
      </div>
    </div>
  );
}
