// import React from 'react'

// export default function Assign() {
//   return (
//     <div>assignSubjects</div>
//   )
// }




import React from "react";
import { useExam } from "./contexts/context";
import { useSubject } from "./contexts/subContext";

export default function Assign() {
  const {
    examList,
    deleteExam,
    assignSubjects,
    newSelectedSubjects,
    setNewSelectedSubjects,
    selectedExam,
    setSelectedExam,
  } = useExam();
  const {
    subjectName,
    setSubjectName,
    subjectList,
    createSubject,
    deleteSubject,
  } = useSubject();

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto  py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">
                Assign Subjects to Exam
              </h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Select Exam*
                    </label>
                    <select
                      onChange={(e) => {
                        setSelectedExam(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Exam Name"
                    >
                      <option value="">Select Exam</option>
                      {examList.map((e, index) => {
                        return (
                          <option key={index} value={e.Name}>
                            {e.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span
                className="
                text-red-500 text-sm italic font-bold
                "
              >
                *DO NOT FORGOT TO CLICK ON ASSIGN BUTTON BELOW AFTER SELECTING
                SUBJECTS
              </span>
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Subject Name
                    </th>

                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {subjectList.map((e, index) => {
                    return (
                      <tr
                        key={index}
                        class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                      >
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Name
                          </span>
                          {e.Name}
                        </td>

                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Actions
                          </span>

                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewSelectedSubjects([
                                  ...newSelectedSubjects,
                                  { Name: e.target.value },
                                ]);
                              } else {
                                setNewSelectedSubjects(
                                  newSelectedSubjects.filter(
                                    (el) => el.Name !== e.target.value
                                  )
                                );
                              }
                            }}
                            value={e.Name}
                            checked={newSelectedSubjects
                              ?.map((e) => e.Name)
                              .includes(e.Name)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex justify-center mt-4 w-full">
                <button
                  onClick={() => {
                    assignSubjects();
                  }}
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
