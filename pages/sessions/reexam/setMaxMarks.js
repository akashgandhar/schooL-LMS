import React from 'react'

export default function setMaxMarks() {
  return (
    <div>setMaxMarks</div>
  )
}



// import React, { useContext, useEffect, useState } from "react";
// import { db } from "../../../firebase";
// import {
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   setDoc,
// } from "firebase/firestore";
// import UserContext from "../../../components/context/userContext";
// import { async } from "@firebase/util";
// import { useExam } from "./contexts/context";

// export default function MaxMarks() {
//   const a = useContext(UserContext);

//   const [classList, setClassList] = useState([]);
//   //   const [examList, setExamList] = useState([]);
//   const [subjectList, setSubjectList] = useState([]);

//   //   const [examName, setExamName] = useState();
//   const [className, setClassName] = useState();
//   const [subjectName, setSubjectName] = useState();
//   const [maxMarks, setMaxMarks] = useState();

//   const [selectedclassName, setSelectedClassName] = useState();

//   const [count, setCount] = useState(0);

//   const {
//     examName,
//     setExamName,
//     examList,
//     createExam,
//     deleteExam,
//     assignSubjects,
//     selectedSubjects,
//     setSelectedSubjects,
//     selectedExam,
//     setSelectedExam,
//     newSelectedSubjects,
//     setNewSelectedSubjects,
//     SetMaxMarks,
//   } = useExam();

//   const [isConfirm, setIsConfirm] = useState(false);


//   const [marks, setMarks] = useState([]);

//   return (
//     <>
//       <div className="w-screen">
//         <div class="bg-gray-100 flex bg-local w-screen">
//           <div class="bg-gray-100 mx-auto w-screen h-auto  py-20 px-12 lg:px-24 shadow-xl mb-24">
//             <h1 className="text-center font-bold text-2xl py-2">
//               Set Max Marks
//             </h1>
//             <div class="-mx-3 md:flex mb-6">
//               <div class="md:w-full px-3 mb-6 md:mb-0">
//                 <label
//                   class="uppercase tracking-wide text-black text-xs font-bold mb-2"
//                   for="company"
//                 >
//                   Select Exam*
//                 </label>
//                 <select
//                   onChange={(e) => {
//                     setSelectedExam(e.target.value);
//                   }}
//                   class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
//                   id="company"
//                   type="text"
//                   value={selectedExam}
//                   placeholder="Exam Name"
//                 >
//                   <option>Please Select</option>
//                   {examList.map((e, index) => {
//                     return <option key={index}>{e.Name}</option>;
//                   })}
//                 </select>
//               </div>
//             </div>
//             <div>
//               <table class="min-w-full border-collapse block md:table">
//                 <thead class="block md:table-header-group">
//                   <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
//                     <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                       Subject Name
//                     </th>
//                     <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                       Max Theory Marks
//                     </th>
//                     <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                       Max Practical Marks
//                     </th>

//                     {/* <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                       Actions
//                     </th> */}
//                   </tr>
//                 </thead>
//                 <tbody class="block md:table-row-group">
//                   {newSelectedSubjects.map((e, index) => {
//                     return (
//                       <tr
//                         key={index}
//                         class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
//                       >
//                         {/* {JSON.stringify(e)} */}
//                         <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                           <span class="inline-block w-1/3 md:hidden font-bold">
//                             Name
//                           </span>
//                           {e.Name}
//                         </td>
//                         <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                           <span class="inline-block w-1/3 md:hidden font-bold">
//                             Max Theory Marks
//                           </span>
//                           <input className="w-full h-10 p-2 placeholder:text-red-500 font-bold"
//                             type="tel"
//                             placeholder={e.MMT || 0}
//                             onChange={(event) => {
//                               SetMaxMarks(e.Name, event.target.value, "theory");
//                             }}
//                           ></input>
//                         </td>
//                         <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                           <span class="inline-block w-1/3 md:hidden font-bold">
//                             Max practical Marks
//                           </span>
//                           <input className="w-full h-10 p-2 placeholder:text-red-500 font-bold"
//                             type="tel"
//                             placeholder={e.MMP || 0}
//                             onChange={(event) => {
//                               SetMaxMarks(e.Name, event.target.value, "practical");
//                             }}
//                           ></input>
//                         </td>

//                         {/* <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                           <span class="inline-block w-1/3 md:hidden font-bold">
//                             Actions
//                           </span>

//                           <button
//                             onClick={() => {
//                               setIsConfirm(true);
//                             }}
//                             class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
//                           >
//                             Save
//                           </button>
//                         </td> */}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
