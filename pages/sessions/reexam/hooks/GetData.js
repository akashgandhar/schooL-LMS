import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase";
import UserContext from "../../../../components/context/userContext";

export const UseMarkSheetStream = (uid, selectedExam) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const a = useContext(UserContext);

  useEffect(() => {
    const path = `users/${a.user}/sessions/${a.session}/exams/${selectedExam}/marksheets/${uid}`;
    const ref = doc(db, path);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        setIsLoading(false);
        setData(snap.data());
        setError(null);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [a.user, a.session, selectedExam, uid]);

  return { data, error, isLoading };
};