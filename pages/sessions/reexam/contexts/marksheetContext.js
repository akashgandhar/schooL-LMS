import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";

import React, {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import UserContext from "../../../../components/context/userContext";


export default function Context() {
  return (
    <div>context</div>
  )
}


// Create the MarkSheetContext
const MarkSheetContext = createContext();

// Create the MarkSheetProvider
const MarkSheetProvider = ({ children }) => {
  const a = useContext(UserContext);
  const [markSheet, setMarkSheet] = useState([]);

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedClassName, setSelectedClassName] = useState("");
  const [selectedSectionName, setSelectedSectionName] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  const [lastUpdated, setLastUpdated] = useState("");

  const [subjects, setSubjects] = useState([]);

  const [student, setStudent] = useState({});

  const [subjectDetails, setSubjectDetails] = useState([]);

  const onChangeMarkSheet = (name, value) => {
    const docRef = doc(
      db,
      `users/${a.user}/sessions/${a.session}/exams/${selectedExam}/marksheets/${selectedStudentId}`
    );

    const fetchedData = getDoc(docRef);
    const data = fetchedData.data();

    const newData = {
      ...data,
      [name]: value,
    };

    setDoc(docRef, newData).then(() => {
      setLastUpdated(new Date().toISOString());
    });
  };

  const GetSubjectDetails = useCallback(async () => {
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/exams/${selectedExam}/subjects/`
    );

    const q = query(docRef, where("Name", "in", subjects));

    const querySnapshot = await getDocs(q);

    var list = [];

    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
    }

    setSubjectDetails(list);
  }, [a.session, a.user, selectedExam, subjects]);

  useEffect(() => {
    if (subjects.length > 0 && selectedExam) {
      GetSubjectDetails();
    }
  }, [GetSubjectDetails, selectedExam, subjects.length]);

  const SubjectsIntersection = useCallback(async () => {
    const studentSubjectsRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/subjects`
    );

    const studentSubjectsQuery = query(
      studentSubjectsRef,
      where("Students", "array-contains", selectedStudentId.trim())
    );

    const studentSubjectsQuerySnapshot = await getDocs(
      query(
        studentSubjectsRef,
        where("Students", "array-contains", selectedStudentId.trim())
      )
    );

    console.log("studentSubjectsQuerySnapshot", studentSubjectsQuerySnapshot);

    var studentSubjects = [];

    if (studentSubjectsQuerySnapshot.size > 0) {
      studentSubjectsQuerySnapshot.forEach((doc) => {
        studentSubjects.push(doc.data().Name);
      });
    }

    const examSubjectsRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/exams/${selectedExam}/subjects`
    );

    var examSubjects = [];

    await getDocs(examSubjectsRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        examSubjects.push(doc.data().Name);
      });
    });

    console.log("examSubjects", studentSubjects);

    const intersection = studentSubjects.filter((x) =>
      examSubjects.includes(x)
    );
    setSubjects(intersection);
  }, [a.session, a.user, selectedExam, selectedStudentId]);

  useEffect(() => {
    if (selectedStudentId) {
      SubjectsIntersection();
    }
  }, [SubjectsIntersection, selectedStudentId]);

  const GetStudentDetails = useCallback(async () => {
    const docRef = doc(
      db,
      `users/${a.user}/sessions/${a.session}/classes/${selectedClassName}/sections/${selectedSectionName}/students`,
      selectedStudentId
    );

    const fetchedData = await getDoc(docRef);

    console.log("fetchedData", fetchedData);
    if (!fetchedData.exists()) {
      console.log("No such document!");

      return;
    }
    const data = fetchedData.data();
    setStudent(data);
  }, [
    a.session,
    a.user,
    selectedClassName,
    selectedSectionName,
    selectedStudentId,
  ]);

  useEffect(() => {
    if (selectedStudentId) {
      GetStudentDetails();
    }
  }, [GetStudentDetails, selectedStudentId]);

  console.log("subjects", subjects);

  // const [lastUpdated, setLastUpdated] = useState(null);

  const UpdateMarks = async (sub, value, type, student) => {
    console.log(sub, value, type, student, selectedExam);
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/exams/${selectedExam}/marksheets/${student}`
      );

      if (type === "BoardReg") {
        setDoc(
          docRef,
          {
            BoardReg: value,
          },
          { merge: true }
        ).then(() => {
          setLastUpdated(new Date().toISOString());
        });
      } else if (type === "Roll_No") {
        setDoc(
          docRef,
          {
            Roll_No: value,
          },
          { merge: true }
        ).then(() => {
          setLastUpdated(new Date().toISOString());
        });
      } else if (type === "Term1T") {
        console.log("Term1T");
        const data = await getDoc(docRef);
        var Term_1 = data.data()?.Term_1 || [];

        const subIndex = Term_1.findIndex((e) => e.Name === sub);
        if (subIndex === -1) {
          Term_1.push({
            Name: sub,
            Theory: value,
            Practical: 0,
          });
        } else {
          Term_1[subIndex].Theory = Number(value);
        }
        setDoc(
          docRef,
          {
            Term_1: Term_1,
          },
          { merge: true }
        ).then(() => {
          setLastUpdated(new Date().toISOString());
        });
      } else if (type === "Term1P") {
        console.log("Term1P");
        const data = await getDoc(docRef);
        var Term_1 = data.data().Term_1 || [];

        const subIndex = Term_1.findIndex((e) => e.Name === sub);
        if (subIndex === -1) {
          Term_1.push({
            Name: sub,
            Theory: 0,
            Practical: value,
          });
        } else {
          Term_1[subIndex].Practical = Number(value);
        }
        setDoc(
          docRef,
          {
            Term_1: Term_1,
          },
          { merge: true }
        ).then(() => {
          setLastUpdated(new Date().toISOString());
        });
      } else if (type === "Term2T") {
        console.log("Term2T");
        const data = await getDoc(docRef);
        var Term_2 = data.data().Term_2 || [];

        const subIndex = Term_2.findIndex((e) => e.Name === sub);
        if (subIndex === -1) {
          Term_2.push({
            Name: sub,
            Theory: value,
            Practical: 0,
          });
        } else {
          Term_2[subIndex].Theory = Number(value);
        }
        setDoc(
          docRef,
          {
            Term_2: Term_2,
          },
          { merge: true }
        ).then(() => {
          setLastUpdated(new Date().toISOString());
        });
      } else if (type === "Term2P") {
        console.log("Term2P");
        const data = await getDoc(docRef);
        var Term_2 = data.data().Term_2 || [];

        const subIndex = Term_2.findIndex((e) => e.Name === sub);
        if (subIndex === -1) {
          Term_2.push({
            Name: sub,
            Theory: 0,
            Practical: value,
          });
        } else {
          Term_2[subIndex].Practical = Number(value);
        }
        setDoc(
          docRef,
          {
            Term_2: Term_2,
          },
          { merge: true }
        ).then(() => {
          setLastUpdated(new Date().toISOString());
        });
      } else {
        alert("Type Error");
        return;
      }
    } catch (e) {
      console.error("Error updating document: ", e.message);
      return;
    }
  };

  const UpdateCoActivities = async (sub, value, student) => {
    console.log(sub, value, student, selectedExam);
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/exams/${selectedExam}/marksheets/${student}`
      );

      setDoc(
        docRef,
        {
          [sub]: value,
        },
        { merge: true }
      ).then(() => {
        setLastUpdated(new Date().toISOString());
      });
    } catch (e) {
      console.error("Error updating document: ", e.message);
      return;
    }
  };

  return (
    <MarkSheetContext.Provider
      value={{
        markSheet,
        setMarkSheet,
        selectedStudentId,
        setSelectedStudentId,
        selectedClassName,
        setSelectedClassName,
        selectedSectionName,
        setSelectedSectionName,
        selectedExam,
        setSelectedExam,
        lastUpdated,
        setLastUpdated,
        subjects,
        setSubjects,
        student,
        setStudent,
        subjectDetails,
        setSubjectDetails,
        onChangeMarkSheet,
        GetSubjectDetails,
        SubjectsIntersection,
        GetStudentDetails,
        UpdateMarks,
        lastUpdated,
        UpdateCoActivities
      }}
    >
      {children}
    </MarkSheetContext.Provider>
  );
};

// Create the useMarkSheet hook
const useMarkSheet = () => useContext(MarkSheetContext);

export { MarkSheetProvider, useMarkSheet };