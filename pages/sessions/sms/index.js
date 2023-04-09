import React, { useContext, useEffect, useState } from "react";
import Nav from "../../../components/navbar";
import Header from "../../../components/dropdown";
import { auth, db } from "../../../firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import UserContext from "../../../components/context/userContext";

export default function SMS() {
  const a = useContext(UserContext);
  const router = useRouter();

  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [classList, setClassList] = useState([]);

  const GetClassList = async () => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setClassList(list);
    } catch {
      (e) => {
        if (!className) {
          alert("select class first");
        }
      };
    }
  };

  const GetSectionList = async () => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes/${className}/sections`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setSectionList(list);
    } catch {
      (e) => {
        if (!className) {
          alert("select class first");
        }
      };
    }
  };

  const GetStudentList = async () => {
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/students`
    );
    const docSnap = await getDocs(docRef);
    var list = [];
    docSnap.forEach((doc) => {
      list.push(doc.data());
    });
    setStudentList(list);
  };

  const current = new Date();
  const time = new Intl.DateTimeFormat("en-IN", { timeStyle: "medium" }).format(
    current.getTime()
  );

  const d = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  const setTcCut = (student,rname)=>{
    try{
      console.log(student);
      const docRef = doc(db,`users/${a.user}/sessions/${a.session}/Reports/${d}/${rname}`,time);
      setDoc(docRef,{
        Name: student.name,
        Class: student.Class,
        Section: student.Section,
        Father_Name: student.Father_Name,
        Mother_Name: student.Mother_Name,
        Place: student.Place,
        ID:time,
        Report: rname
      }).then(()=>{
        router.push({
          pathname: "/sessions/reports/tc",
          query: student
        });
      })
    }catch(e){
      console.log(e.message);
    }
  }

  


  const [checkedItems, setCheckedItems] = useState({});
  const [selectedMobiles, setSelectedMobiles] = useState([]);

  const handleCheckboxChange = (event, id, mobileNumber) => {
    const isChecked = event.target.checked;
    setCheckedItems({ ...checkedItems, [id]: isChecked });
    if (isChecked) {
      setSelectedMobiles([...selectedMobiles, mobileNumber]);
    } else {
      setSelectedMobiles(selectedMobiles.filter(mobile => mobile !== mobileNumber));
    }
  };




  useEffect(() => {
    console.log(selectedMobiles);  
        
    }, [studentList])
    

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">Send SMS</h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Class*
                    </label>
                    <select
                      onClick={() => {
                        GetClassList();
                      }}
                      onChange={(e) => {
                        setClassName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      placeholder="B.tech / cse / CSP242 "
                    >
                      <option>Please Select</option>
                      {classList.map((e,index) => {
                        return <option key={index}>{e.Name}</option>;
                      })}
                    </select>
                  </div>

                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Section*
                    </label>
                    <select
                      onClick={() => {
                        GetSectionList();
                      }}
                      onChange={(e) => {
                        setSectionName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      placeholder="B.tech / cse / CSP242 "
                    >
                      <option>Please Select</option>
                      {sectionList.map((e,index) => {
                        return <option key={index}>{e.Name}</option>;
                      })}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      GetStudentList();
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div>
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      <input type="checkbox" />
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      SID
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Student Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Father's Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Class
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Address
                    </th>
                    
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {studentList.map((e, index) => {
                    return (
                      <tr
                        key={index}
                        class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                      >
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            check
                          </span>
                          <input
                type="checkbox"
                checked={checkedItems[e.Sr_Number] || false}
                onChange={e => handleCheckboxChange(e, e.Sr_Number, e.Mobile)}
              />
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Name
                          </span>
                          {e.Sr_Number}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Name
                          </span>
                          {e.name}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            sections
                          </span>
                          {e.Father_Name}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            classTeacher
                          </span>
                          {className}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Strength
                          </span>
                          {e.Place}
                        </td>
                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
