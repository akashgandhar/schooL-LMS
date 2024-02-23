import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase";
import UserContext from "../../../../components/context/userContext";
import { useRouter } from "next/router";

export default function Context() {
  return <div>context</div>;
}

export const UseMarkSheetStream = (uid, selectedExam) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const a = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!selectedExam || !uid) {
      router.push("/sessions/reexam/studentMarksheets");
      return;
    }
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
  }, [a.user, a.session, selectedExam, uid, router]);

  return { data, error, isLoading };
};
