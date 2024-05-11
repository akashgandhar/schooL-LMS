import React from 'react'

export default function StudentChange() {
  return (
    <div>studentSubjectChange</div>
  )
}



// import React from "react";
// import { useMarkSheet } from "./contexts/marksheetContext";

// export default function StudentChange() {
//   const {
//     studentNew,
//     setStudentNew,
//     studentNewSubjects,
//     setStudentNewSubjects,
//     DeleteStudentNewSubjects,
//     ReloadStudentNewSubjects
//   } = useMarkSheet();

//   return (
//     <>
//       <div className="w-screen">
//         <div class="bg-gray-100 flex bg-local w-screen">
//           <div class="bg-gray-100 mx-auto w-screen h-auto  py-20 px-12 lg:px-24 shadow-xl mb-24">
//             <div>
//               <h1 className="text-center font-bold text-2xl">
//                 Delete Student Subjects
//               </h1>
//               <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
//                 <div class="-mx-3 md:flex mb-6">
//                   <div class="md:w-full px-3 mb-6 md:mb-0">
//                     <label
//                       class="uppercase tracking-wide text-black text-xs font-bold mb-2"
//                       for="company"
//                     >
//                       Student ID*
//                     </label>
//                     <input
//                       onChange={(e) => {
//                         setStudentNew(e.target.value);
//                       }}
//                       class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
//                       id="company"
//                       type="text"
//                       placeholder="Student ID"
//                       value={studentNew}
//                     />
//                   </div>
//                 </div>
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
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody class="block md:table-row-group">
//                   {studentNewSubjects.map((e, index) => {
//                     return (
//                       <tr
//                         key={index}
//                         class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
//                       >
//                         <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                           <span class="inline-block w-1/3 md:hidden font-bold">
//                             Name
//                           </span>
//                           {e.Name}
//                         </td>

//                         <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                           <span class="inline-block w-1/3 md:hidden font-bold">
//                             Actions
//                           </span>

//                           <button
//                             onClick={async () => {
//                               await DeleteStudentNewSubjects(e.Name);
//                               ReloadStudentNewSubjects();
//                             }}
//                             class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
//                           >
//                             Delete
//                           </button>
//                         </td>
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
