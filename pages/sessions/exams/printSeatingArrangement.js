import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

function SeatingArrangementPage() {
  const router = useRouter();
  const { selectedStudents, examName, roomName, roomSeats, studentsPerSeat } =
    router.query;

  // Parse the selected students
  const parsedSelectedStudents = selectedStudents
    ? JSON.parse(selectedStudents)
    : [];

  // Parse roomSeats and studentsPerSeat
  const parsedRoomSeats = Number(roomSeats) || 0;
  const parsedStudentsPerSeat = Number(studentsPerSeat) || 3; // Default to 3 if not provided

  const numRows = Math.ceil(parsedRoomSeats / parsedStudentsPerSeat);
  const numCols = parsedStudentsPerSeat;

  const tableData = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => [])
  );

  // Group students by class
  const studentsByClass = {};
  parsedSelectedStudents.forEach((student) => {
    const studentClass = student.Class;
    if (!studentsByClass[studentClass]) {
      studentsByClass[studentClass] = [];
    }
    studentsByClass[studentClass].push(student);
  });

  // Distribute students from different classes evenly across the seats
  let currentRow = 0;
  let currentCol = 0;

  const classKeys = Object.keys(studentsByClass);
  for (let classIndex = 0; classIndex < classKeys.length; classIndex++) {
    const currentClassKey = classKeys[classIndex];
    const currentClass = studentsByClass[currentClassKey];

    for (
      let studentIndex = 0;
      studentIndex < currentClass.length;
      studentIndex++
    ) {
      tableData[currentRow][currentCol].push(currentClass[studentIndex]);

      currentRow++;
      if (currentRow >= numRows) {
        currentRow = 0;
        currentCol++;
        if (currentCol >= numCols) {
          currentCol = 0;
        }
      }
    }
  }
  // console.log(classKeys);

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
        <div className="h-[21cm] flex-col flex text-center items-center w-[29.7cm] p-4 bg-white">
          {/* <h1 className="">Seating Arrangement</h1> */}

          <h1 class=" items-center text-5xl mb-5 font-extrabold ">
            Seating Arrangement
            <br />
            <span class="bg-blue-100  text-blue-800 text-2xl font-semibold  px-2.5 py-0.5 rounded ">
              {classKeys.map((e) => {
                return <>{e},</>;
              })}
            </span>
          </h1>

          <table className="table-fixed w-full ">
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr className="flex gap-2" key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`w-1/3 flex border border-black items-center justify-center text-center`}
                    >
                      {cell.map((studentInfo, studentIndex) => (
                        <>
                          <div
                            key={studentIndex}
                            className={`${
                              studentIndex < 2 && "border-r"
                            } overflow-hidden text-xs flex justify-center items-center border-black w-1/3 aspect-video p-2`}
                          >
                            {studentInfo.name} <br /> ({studentInfo.Class})
                          </div>
                        </>
                      ))}
                    </td>
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

export default SeatingArrangementPage;
