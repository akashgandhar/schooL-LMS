import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Input } from "postcss";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../components/context/userContext";
import { db } from "../../../firebase";
import { async } from "@firebase/util";

export default function ViewDue() {
  const months = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "OldDues"
  ];

  const [students, setStudents] = useState([]);

  const [month, setMonth] = useState();
  

  const getDues = async()=>{
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/${month}/students`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setStudents(list);
    } catch (e) {
      alert(e.message)
    }
  }

  const [classList, setClassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const a = useContext(UserContext);
  const [className, setClassName] = useState();
  const [sectionName, setSectionName] = useState("");

  

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
    } catch (e) {
      console.log(e);
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

  var total = 0;

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">
                View Dues
              </h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Class*
                    </label>
                    <select onClick={()=>{GetClassList()}}
                      onChange={(e) => {
                        setClassName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                    >
                      <option>Plese Select</option>
                      {classList.map((e,index)=>{return(<option key={index}>{e.Name}</option>)})}
                    </select>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Section*
                    </label>
                    <select onClick={()=>{GetSectionList()}}
                      onChange={(e) => {
                        setSectionName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                    >
                      <option>Plese Select</option>
                      {sectionList.map((e,index)=>{return(<option key={index}>{e.Name}</option>)})}
                    </select>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Month*
                    </label>
                    <select 
                      onChange={(e) => {
                        setMonth(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                    >
                      <option>Plese Select</option>
                      {months.map((e,index)=>{return(<option key={index}>{e}</option>)})}
                    </select>
                  </div>
                  
                  <button
                    onClick={() => {
                      getDues();
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
                      SID
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Student Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Father Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Address
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Mobile
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      month
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Fee Due
                    </th>
                      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        Transport Due
                      </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {students.map((e, index) => {
                   total += e.total>0?Number(e.total):0;
                    return (
                      <tr
                        key={index}
                        class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                      >
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            SID
                          </span>
                          {e.Sr_Number}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            name
                          </span>
                          {e.name}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            fName
                          </span>
                          {e.father_name}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Address
                          </span>
                          {e.Place}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            mobile
                          </span>
                          {e.Mobile}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            month
                          </span>
                          {e.month}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            fee_due
                          </span>
                          {(e.month_Due>0?e.month_Due:0)}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            transport_due
                          </span>
                          {e.transport_due>0?e.transport_due:0}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            total
                          </span>
                          {(Number(e.month_Due)>0?Number(e.month_Due):0)+(Number(e.transport_due)>0?Number(e.transport_due):0)}
                        </td>
                        
                      </tr>
                    );
                  })}
                  <tr class="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell font-bold">Total</td>
                    <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell font-bold text-red-600">{total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
