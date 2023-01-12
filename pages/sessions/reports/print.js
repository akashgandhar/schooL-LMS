import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import UserContext from "../../context/userContext";
import GatePass from "../../../components/gatePass";

export default function print() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const a = useContext(UserContext);
  const className = router.query.classes;
  const sectionName = router.query.section;

  useEffect(() => {
   console.log(student);
   console.log(a.user);
  }, [student])
  

  const GetStudentList = async () => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/students`,
        router.query.sid
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        setStudent(docSnap.data());
        console.log(docSnap.data());
      }
    } catch {
      alert("plese go back and select student again");
      router.replace("/sessions/gatepass");
    }
  };

 

  if (student) {
    return (
      <>
        <div id="print">
          <GatePass props={student} />
        </div>
        
      </>
    );
  } else {
    return (
      <>
        <div>
          {router.query.sid}
          {router.query.classes}
          {router.query.section}
        </div>
        <div className="align-middle justify-center">
          <button
            onClick={() => {
              GetStudentList(); 
            }}
          >
            Generate
          </button>
          {/* {student.name && <div>student is there somewhere</div>} */}
        </div>
      </>
    );
  }
}
