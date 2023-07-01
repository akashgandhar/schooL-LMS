import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function SeatingArrangementPage() {
  const router = useRouter();
  const { selectedStudents, examName, roomName, roomSeats, studentsPerSeat } =
    router.query;

  const parsedSelectedStudents = selectedStudents
    ? JSON.parse(selectedStudents)
    : [];
  const parsedRoomSeats = Number(roomSeats) || 0;
  const parsedStudentsPerSeat = Number(studentsPerSeat) || 0;

  // Shuffle the selected students randomly
  const shuffledStudents = [...parsedSelectedStudents].sort(() => Math.random() - 0.5);

  const numRows = Math.round(parsedRoomSeats / 3);
  const numCols = 3;

  const tableData = [];
  let studentIndex = 0;

  for (let row = 0; row < numRows; row++) {
    const rowData = [];

    for (let col = 0; col < numCols; col++) {
      const studentList = [];
      const assignedClasses = [];

      for (let i = 0; i < 3; i++) {
        if (studentIndex < shuffledStudents.length) {
          const student = shuffledStudents[studentIndex];
          const studentClass = student.Class;

          if (!assignedClasses.includes(studentClass)) {
            const studentInfo = {
              name: student.name,
              class: studentClass,
            };
            studentList.push(studentInfo);
            assignedClasses.push(studentClass);
            studentIndex++;
          }
        }
      }

      rowData.push(studentList);
    }

    tableData.push(rowData);
  }

  // Check if all students have been assigned seats
  const allStudentsAssigned = studentIndex === shuffledStudents.length;

  return (
    <div className="max-w-full p-4 border">
      <table className="table-fixed w-full">
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr className="flex" key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="w-1/3 flex  border px-4 py-2 text-center"
                >
                  {cell.map((studentInfo, studentIndex) => (
                    <div
                      key={studentIndex}
                      className="border w-1/3 border-red-500 p-2"
                    >
                      {studentInfo.name} ({studentInfo.class})
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!allStudentsAssigned && (
        <p className="text-red-500 mt-4">
          Unable to assign seats for all students with the given conditions.
        </p>
      )}
    </div>
  );
}

export default SeatingArrangementPage;
