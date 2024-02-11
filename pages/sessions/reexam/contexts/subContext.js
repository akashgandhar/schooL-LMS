import {
  collection,
  deleteDoc,
  doc,
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

// Create the SubjectContext
const SubjectContext = createContext();

// Create the SubjectProvider component
const SubjectProvider = ({ children }) => {
  const a = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

  const [subjectName, setSubjectName] = useState(null);

  const [subjectList, setSubjectList] = useState([]);

  const createSubject = async () => {
    if (!subjectName) {
      alert("Enter Missing Details");
    } else {
      try {
        const docRef = `users/${a.user}/sessions/${a.session}/subjects/`;
        await setDoc(doc(db, docRef, subjectName), {
          Name: subjectName,
        }).then(() => {
          alert("Exam Added");
        });
      } catch (e) {
        console.error("Error adding document: ", e.message);
      }
    }
  };

  const deleteSubject = async (id) => {
    if (!confirm("Are you sure you want to delete this Subject?")) return;
    try {
      await deleteDoc(
        doc(db, `users/${a.user}/sessions/${a.session}/subjects/`, id)
      );
      alert("Exam Deleted");
    } catch (e) {
      console.error("Error deleting document: ", e.message);
    }
  };

  const GetSubjectList = useCallback(async () => {
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/subjects/`
    );
    const docSnap = await getDocs(docRef);
    var list = [];
    docSnap.forEach((doc) => {
      list.push(doc.data());
    });
    setSubjectList(list);
    // console.log("run");
  }, [a.user, a.session, setSubjectList]);

  // console.log(subjectList);\










  useEffect(() => {
    GetSubjectList();
  }, [GetSubjectList, subjectList]);

  return (
    <SubjectContext.Provider
      value={{
        subjectName,
        setSubjectName,
        subjectList,
        createSubject,
        deleteSubject,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

// Create the useExam hook
const useSubject = () => useContext(SubjectContext);

export { SubjectProvider, useSubject };