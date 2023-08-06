import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function SeatingArrangementPage() {
  const router = useRouter();
  const { selectedStudents, examName, roomName, roomSeats, studentsPerSeat } = router.query;

  // Parse the selected students
  const parsedSelectedStudents = selectedStudents ? JSON.parse(selectedStudents) : [];
  
  // Parse roomSeats and studentsPerSeat
  const parsedRoomSeats = Number(roomSeats) || 0;
  const parsedStudentsPerSeat = Number(studentsPerSeat) || 3; // Default to 3 if not provided
  
  const numRows = Math.ceil(parsedRoomSeats / parsedStudentsPerSeat);
  const numCols = parsedStudentsPerSeat;

  const tableData = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => []));

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

    for (let studentIndex = 0; studentIndex < currentClass.length; studentIndex++) {
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
                      {studentInfo.name} ({studentInfo.Class})
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SeatingArrangementPage;
