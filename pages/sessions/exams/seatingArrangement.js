import React, { use, useContext, useEffect, useState } from "react";
import UserContext from "../../../components/context/userContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useRouter } from "next/router";

const ExampleComponent = () => {
  const [exams, setExams] = useState(["Exam Loading"]); // Array of exams
  const [rooms, setRooms] = useState([
    { id: 1, name: "Room Loading", seats: 10, studentsPerSeat: 2 },
  ]); // Array of rooms
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", Class: "A" },
    { id: 2, name: "Jane Smith", Class: "B" },
    { id: 3, name: "Bob Johnson", Class: "A" },
    { id: 4, name: "Alice Brown", Class: "C" },
    // Add more students as needed
  ]); // Array of students

  const [selectedExam, setSelectedExam] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [maxStudents, setMaxStudents] = useState(0);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const a = useContext(UserContext);

  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const router = useRouter();

  const GetStudentList = async () => {
    if (count < 2) {
      try {
        const docRef = collection(
          db,
          `users/${a.user}/sessions/${a.session}/AllStudents`
        );
        const docSnap = await getDocs(docRef);
        var list = [];
        docSnap.forEach((doc) => {
          list.push(doc.data());
        });
        setStudents(list);
        setCount(count + 1);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const getExamList = async () => {
    if (count1 < 2) {
      try {
        const docRef = collection(
          db,
          `users/${a.user}/sessions/${a.session}/exams`
        );
        const docSnap = await getDocs(docRef);
        var list = [];
        docSnap.forEach((doc) => {
          list.push(doc.data().Name);
          // console.log(doc.data());
        });
        setExams(list);
        setCount1(count1 + 1);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const getRoomList = async () => {
    if (count2 < 2) {
      if (selectedExam) {
        try {
          const docRef = collection(
            db,
            `users/${a.user}/sessions/${a.session}/exams/${selectedExam}/rooms`
          );
          const docSnap = await getDocs(docRef);
          var list = [];
          docSnap.forEach((doc) => {
            list.push(doc.data());
          });
          setRooms(list);
          setCount2(count2 + 1);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };

  useEffect(() => {
    getExamList();
    getRoomList();
    GetStudentList();
    // console.log(count, count1, count2);
  }, [exams, rooms, students]);

  const handleExamChange = (event) => {
    setSelectedExam(event.target.value);
  };

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
    const room = rooms.find((room) => room.Name === event.target.value);
    if (room) {
      setMaxStudents(room.No_Of_Seats * room.Students_Per_Seat);
    } else {
      setMaxStudents(0);
    }
    setSelectedStudents([]);
  };
  // useEffect(() => {
  //   console.log(selectedStudents.length >= maxStudents);
  // });

  const handleStudentCheck = (event, student) => {
    const isChecked = event.target.checked;
    const isMaxStudentsReached = selectedStudents.length >= maxStudents;
    if (isChecked && !isMaxStudentsReached) {
      setSelectedStudents([...selectedStudents, student]);
    } else {
      setSelectedStudents(
        selectedStudents.filter(
          (selectedStudent) => selectedStudent.Sr_Number !== student.Sr_Number
        )
      );
    }
  };

  const handleClassCheck = (event, className) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedClasses([...selectedClasses, className]);
    } else {
      setSelectedClasses(
        selectedClasses.filter((selectedClass) => selectedClass !== className)
      );
      setSelectedStudents(
        selectedStudents.filter((student) => student.Class !== className)
      );
    }
  };

  // const handleRandomSelection = () => {
  //   const selectedClassStudents = students.filter((student) =>
  //     selectedClasses.includes(student.Class)
  //   );

  //   const totalSelectedStudents = Math.min(
  //     maxStudents,
  //     selectedClassStudents.length
  //   );
  //   const shuffledStudents = selectedClassStudents.sort(
  //     () => 0.5 - Math.random()
  //   );
  //   const randomStudents = shuffledStudents.slice(0, totalSelectedStudents);

  //   setSelectedStudents(randomStudents);
  //   // console.log("run",randomStudents);
  // };

  const handleRandomSelection = () => {
    if (!selectedExam || !selectedRoom) return;
  
    const selectedClassStudents = students.filter((student) =>
      selectedClasses.includes(student.Class)
    );
  
    const maxStudentsPerClass = Math.floor(maxStudents / Math.min(selectedClasses.length, 3));
  
    const studentsByClass = {};
    selectedClassStudents.forEach((student) => {
      if (!studentsByClass[student.Class]) {
        studentsByClass[student.Class] = [];
      }
      studentsByClass[student.Class].push(student);
    });
  
    let selectedStudents = [];
    for (const className of Object.keys(studentsByClass)) {
      const classStudents = studentsByClass[className];
      const totalSelectedStudentsFromClass = Math.min(maxStudentsPerClass, classStudents.length);
      const shuffledStudents = classStudents.sort(() => 0.5 - Math.random());
      const randomStudentsFromClass = shuffledStudents.slice(0, totalSelectedStudentsFromClass);
      selectedStudents = selectedStudents.concat(randomStudentsFromClass);
    }
  
    setSelectedStudents(selectedStudents);
  };
  

  const filteredStudents = students.filter((student) =>
    selectedClasses.includes(student.Class)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select an Exam:</h1>
      <select
        className="p-2 border border-gray-300 rounded-md"
        value={selectedExam}
        onChange={handleExamChange}
      >
        <option value="">-- Select Exam --</option>
        {exams.map((exam, index) => (
          <option key={index} value={exam}>
            {exam}
          </option>
        ))}
      </select>

      <h1 className="text-2xl font-bold mt-8 mb-4">Select a Room:</h1>
      <select
        onClick={getRoomList}
        className="p-2 border border-gray-300 rounded-md"
        value={selectedRoom}
        onChange={handleRoomChange}
      >
        <option value="">-- Select Room --</option>
        {rooms.map((room, index) => (
          <option key={index} value={room.Name}>
            {room.Name} (Seats: {room.No_Of_Seats}, Students/Seat:{" "}
            {room.Students_Per_Seat})
          </option>
        ))}
      </select>

      {selectedExam && selectedRoom && (
        <div>
          <h1 className="text-2xl font-bold mt-8 ">List of Students:</h1>
          <button
            className="bg-blue-500 disabled:hover:cursor-not-allowed hover:bg-blue-700 hover:cursor-pointer text-white rounded-md px-4 py-2 my-4"
            onClick={handleRandomSelection}
            disabled={
              selectedStudents.length >= maxStudents || selectedRoom === ""
            }
          >
            Random Selection
          </button>
          <button
            className="bg-blue-500 disabled:hidden  hover:bg-blue-700 hover:cursor-pointer text-white rounded-md px-4 py-2 mx-2 my-4"
            onClick={() => {
              setSelectedStudents([]);
              // console.log(selectedStudents);
            }}
          >
            Clear
          </button>
          <button
            className="bg-blue-500 disabled:hidden  hover:bg-blue-700 hover:cursor-pointer text-white rounded-md px-4 py-2 mx-2 my-4"
            onClick={() => {
              // console.log(selectedStudents);
              const selectedStudentsReduced = selectedStudents.map(
                (student) => ({
                  Class: student.Class,
                  Father_Name: student.Father_Name,
                  ID: student.ID,
                  Section: student.Section,
                  Sr_Number: student.Sr_Number,
                  name: student.name,
                })
              );
              router.push({
                pathname: "/sessions/exams/printSeatingArrangement",
                query: {
                  selectedStudents: JSON.stringify(selectedStudentsReduced),
                  examName: selectedExam,
                  roomName: selectedRoom,
                  roomSeats:
                    rooms.find((room) => room.Name === selectedRoom)
                      ?.No_Of_Seats || 0,
                  studentsPerSeat:
                    rooms.find((room) => room.Name === selectedRoom)
                      ?.Students_Per_Seat || 0,
                },
              });
            }}
          >
            Generate
          </button>
          <div className="flex items-center">
            {Array.from(new Set(students.map((student) => student.Class))).map(
              (className) => (
                <div key={className} className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    checked={selectedClasses.includes(className)}
                    onChange={(event) => handleClassCheck(event, className)}
                    disabled={selectedStudents.length >= maxStudents || selectedClasses.length >= 3}
                  />
                  <span className="ml-2">{className}</span>
                </div>
              )
            )}
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">SN.</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Father's Name</th>
                <th className="border border-gray-300 p-2">Class</th>
                <th className="border border-gray-300 p-2">Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents
                .sort((a, b) => {
                  if (a.Class === b.Class) {
                    return a.name.localeCompare(b.name); // Sort alphabetically if classes are the same
                  } else {
                    return a.Class.localeCompare(b.Class); // Sort by class
                  }
                })
                .map((student, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {student.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {student.Father_Name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {student.Class}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="checkbox"
                        checked={selectedStudents.some(
                          (selectedStudent) =>
                            selectedStudent.Sr_Number === student.Sr_Number
                        )}
                        onChange={(event) => handleStudentCheck(event, student)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <h1 className="text-2xl font-bold mt-8 mb-4">Selected Students:</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Father's Name</th>
            <th className="border border-gray-300 p-2">Class</th>
          </tr>
        </thead>
        <tbody>
          {selectedStudents
            .sort((a, b) => {
              if (a.Class === b.Class) {
                return a.name.localeCompare(b.name); // Sort alphabetically if classes are the same
              } else {
                return a.Class.localeCompare(b.Class); // Sort by class
              }
            })
            .map((student) => (
              <tr key={student.id}>
                <td className="border border-gray-300 p-2">{student.name}</td>
                <td className="border border-gray-300 p-2">
                  {student.Father_Name}
                </td>
                <td className="border border-gray-300 p-2">{student.Class}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExampleComponent;
