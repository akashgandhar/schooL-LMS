import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

export default function StaffDetails() {
  const [sectionName, setSectionName] = useState("PGT");
  const [sections, setSections] = useState([
    "PGT",
    "TGT",
    "PRT",
    "Counsellor",
    "Special Educator",
    "Non Teaching Staff",
  ]);
  const [staff, setStaff] = useState([]);
  const [count, setCount] = useState(0);

  const filteredTeachers = sectionName
    ? staff.filter((teacher) => teacher.post === sectionName)
    : [];

  const getStaff = async () => {
    if (count < 2) {
      try {
        const docRef = collection(db, "staff");
        const docSnap = await getDocs(docRef);
        var list = [];
        docSnap.forEach((doc) => {
          list.push(doc.data());
        });
        setStaff(list);
      } catch (e) {}
    }
  };

  useEffect(() => {
    getStaff();
  }, [staff]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-10 ">
      <div className="h-24"></div>
      <div className="flex flex-col items-center justify-center gap-1">
        <img
          src="/mpimage.jpg"
          alt="principle"
          className="h-96 w-96 border-2 object-cover"
        />
        <h1 className="text-2xl font-bold font-serif">Mahendra Pal Sing</h1>
      </div>

      <div className="flex justify-center h-20 border-y-4 w-full my-20 ">
        {sections.map((e, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSectionName(e);
              }}
              className="w-60 hover:cursor-pointer hover:scale-105 border-black h-15 border-2 m-2 flex justify-center items-center"
            >
              <h1 className="font-bold text-2xl">{e}</h1>
            </div>
          );
        })}
      </div>

      <div className="w-full h-28 flex items-center justify-center text-4xl font-bold text-red-500 font-serif">
        <h1>{sectionName}s</h1>
      </div>

      <div className="grid grid-cols-5 gap-4 ">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher, index) => (
            <div
              key={index}
              className={`grid-item  flex flex-col items-center justify-center gap-1 border-t-[3px] border-red-500 -mb-2 pt-5`}
            >
              <img
                src={teacher.img}
                alt={teacher.name}
                className="h-72 w-72 border-[3px] rounded-lg object-cover border-t-2 "
              />
              <h1 className="text-2xl font-bold font-serif my-1">
                {teacher.name}
              </h1>
              <div className="w-full p-0 border-b-[3px] border-red-500"></div>
            </div>
          ))
        ) : (
          <p>No teachers found for the selected department.</p>
        )}
      </div>
    </div>
  );
}
