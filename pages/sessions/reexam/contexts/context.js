import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../../../../firebase";
import UserContext from "../../../../components/context/userContext";





export default function Context() {
  return (
    <div>context</div>
  )
}


// Create the ExamContext
const ExamContext = createContext();

// Create the ExamProvider component
const ExamProvider = ({ children }) => {
  // const a = useContext(UserContext);

  // const [isLoading, setIsLoading] = useState(true);

  // const [examName, setExamName] = useState(null);

  // const [examList, setExamList] = useState([]);

  // const createExam = async () => {
  //   if (!examName) {
  //     alert("Enter Missing Details");
  //   } else {
  //     try {
  //       const docRef = `users/${a.user}/sessions/${a.session}/exams/`;
  //       await setDoc(doc(db, docRef, examName), {
  //         Name: examName,
  //       }).then(() => {
  //         alert("Exam Added");
  //       });
  //     } catch (e) {
  //       console.error("Error adding document: ", e.message);
  //     }
  //   }
  // };

  // const deleteExam = async (id) => {
  //   if (!confirm("Are you sure you want to delete this exam?")) return;
  //   try {
  //     await deleteDoc(
  //       doc(db, `users/${a.user}/sessions/${a.session}/exams/`, id)
  //     );
  //     alert("Exam Deleted");
  //   } catch (e) {
  //     console.error("Error deleting document: ", e.message);
  //   }
  // };

  // const GetExamList = useCallback(async () => {
  //   const docRef = collection(
  //     db,
  //     `users/${a.user}/sessions/${a.session}/exams`
  //   );
  //   const docSnap = await getDocs(docRef);
  //   var list = [];
  //   docSnap.forEach((doc) => {
  //     list.push(doc.data());
  //   });
  //   setExamList(list);
  //   // console.log("run");
  // }, [a.user, a.session, setExamList]);

  // const [selectedExam, setSelectedExam] = useState(null);

  // const [selectedSubjects, setSelectedSubjects] = useState([]);

  // const [newSelectedSubjects, setNewSelectedSubjects] = useState([
  //   ...selectedSubjects,
  // ]);

  // const GetSelectedSubjectList = useCallback(async () => {
  //   if (selectedExam) {
  //     const docRef = collection(
  //       db,
  //       `users/${a.user}/sessions/${a.session}/exams/${selectedExam}/subjects`
  //     );
  //     const docSnap = await getDocs(docRef);
  //     var list = [];
  //     docSnap.forEach((doc) => {
  //       list.push(doc.data());
  //     });
  //     setSelectedSubjects(list);
  //     setNewSelectedSubjects([...list]);
  //   }
  // }, [a.user, a.session, selectedExam, setSelectedSubjects]);

  // // console.log("ssdsdsd", selectedSubjects);

  // // console.log("jhgghj", newSelectedSubjects);
  // // console.log("jhgghj", selectedSubjects);

  // const assignSubjects = async () => {
  //   if (!selectedExam) {
  //     alert("Select Exam First");
  //     return;
  //   }
  //   if (newSelectedSubjects.length === 0) {
  //     alert("Select Subjects First");
  //     return;
  //   }
  //   try {
  //     await setAssignedDocs();

  //     alert("Subjects Assigned");
  //   } catch (e) {
  //     console.error("Error adding document: ", e.message);
  //   }
  // };

  // const setAssignedDocs = async () => {
  //   const docRef = `users/${a.user}/sessions/${a.session}/exams/${selectedExam}/subjects/`;
  //   newSelectedSubjects.forEach(async (subject) => {
  //     await setDoc(doc(db, docRef, subject.Name), {
  //       Name: subject.Name,
  //     });
  //   });

  //   //delete the subjects that are not in the newSelectedSubjects
  //   const intersection = selectedSubjects.filter((obj1) =>
  //     newSelectedSubjects.some((obj2) => obj1.id === obj2.id)
  //   );

  //   // Log the elements that are in array1 but not in the intersection
  //   const elementsNotInIntersection = selectedSubjects.filter(
  //     (obj1) => !intersection.some((obj2) => obj1.id === obj2.id)
  //   );
  // };

  // const SetMaxMarks = (sub, marks, type) => {
  //   const docRef = doc(
  //     db,
  //     `users/${a.user}/sessions/${a.session}/exams/${selectedExam}/subjects/${sub}`
  //   );

  //   if (type === "practical") {
  //     setDoc(
  //       docRef,
  //       {
  //         MMP: Number(marks),
  //       },
  //       { merge: true }
  //     );
  //   } else if (type === "theory") {
  //     setDoc(
  //       docRef,
  //       {
  //         MMT: Number(marks),
  //       },
  //       { merge: true }
  //     );
  //   } else {
  //     alert("Type Error");
  //     return;
  //   }
  // };

  

  // useEffect(() => {
  //   GetSelectedSubjectList();
  // }, [GetSelectedSubjectList, selectedExam, setSelectedSubjects]);

  // useEffect(() => {
  //   GetExamList();
  // }, [GetExamList, examList]);

  return (
    <ExamContext.Provider
      value={{
        // examName,
        // setExamName,
        // examList,
        // createExam,
        // deleteExam,
        // assignSubjects,
        // selectedSubjects,
        // setSelectedSubjects,
        // selectedExam,
        // setSelectedExam,
        // newSelectedSubjects,
        // setNewSelectedSubjects,
        // SetMaxMarks,
        
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

// Create the useExam hook
const useExam = () => useContext(ExamContext);

export { ExamProvider, useExam };