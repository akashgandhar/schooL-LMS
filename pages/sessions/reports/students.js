import React, { useContext, useEffect, useRef, useState } from 'react'
import Nav from '../../../components/navbar'
import Header from '../../../components/dropdown'
import { auth, db } from '../../../firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import UserContext from '../../../components/context/userContext'
import { useReactToPrint } from 'react-to-print'

export default function GatePass() {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const a = useContext(UserContext)
  const router = useRouter()

  const [className, setClassName] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [studentList, setStudentList] = useState([])
  const [sectionList, setSectionList] = useState([])
  const [classList, setClassList] = useState([])

  const GetClassList = async () => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes`,
      )
      const docSnap = await getDocs(docRef)
      var list = []
      docSnap.forEach((doc) => {
        list.push(doc.data())
      })
      setClassList(list)
    } catch {
      ;(e) => {
        if (!className) {
          alert('select class first')
        }
      }
    }
  }

  const GetSectionList = async () => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes/${className}/sections`,
      )
      const docSnap = await getDocs(docRef)
      var list = []
      docSnap.forEach((doc) => {
        list.push(doc.data())
      })
      setSectionList(list)
    } catch {
      ;(e) => {
        if (!className) {
          alert('select class first')
        }
      }
    }
  }

  const GetStudentList = async () => {
    var docRef
    if (className && sectionName) {
      docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/students`,
      )
    } else {
      docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/AllStudents`,
      )
    }
    const docSnap = await getDocs(docRef)
    var list = []
    docSnap.forEach((doc) => {
      list.push(doc.data())
    })
    setStudentList(list)
  }

  const SearchStudent = async (q) => {
    var docRef
    if (className && sectionName) {
      docRef = query(
        collection(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/students`,
        ),
        q,
      )
    } else {
      docRef = query(
        collection(db, `users/${a.user}/sessions/${a.session}/AllStudents`),
        q,
      )
    }
    try {
      const docSnap = await getDocs(docRef)
      var list = []
      docSnap.forEach((doc) => {
        list.push(doc.data())
      })
      setStudentList(list)
    } catch (e) {
      alert(e.message)
    }
  }

  const rlist = [
    'All Students',
    'Class Wise',
    'RTE Students',
    'Third Wards',
    'All Male',
    'All Female',
  ]
  const [q, setQ] = useState()

  const [selectedAttributes, setSelectedAttributes] = useState([])

  const sortedStudents = studentList.sort((a, b) => {
    if (a.Class < b.Class) {
      return -1
    }
    if (a.Class > b.Class) {
      return 1
    }
    return 0
  })

  const [columns, setColumns] = useState(["Sr_Number","ID","name","Father_Name","Class","Place","Mobile_Number"])

  useEffect(() => {
    console.log(columns)
  }, [columns])

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">Print Reports</h1>
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
                        GetClassList()
                      }}
                      onChange={(e) => {
                        if (e.target.value == 'Please Select') {
                          setClassName('')
                        } else {
                          setClassName(e.target.value)
                        }
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      placeholder="B.tech / cse / CSP242 "
                    >
                      <option>Please Select</option>
                      {classList.map((e, index) => {
                        return <option key={index}>{e.Name}</option>
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
                        GetSectionList()
                      }}
                      onChange={(e) => {
                        setSectionName(e.target.value)
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      placeholder="B.tech / cse / CSP242 "
                    >
                      <option>Please Select</option>
                      {sectionList.map((e, index) => {
                        return <option key={index}>{e.Name}</option>
                      })}
                    </select>
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      List Filter*
                    </label>
                    <select
                      onChange={(e) => {
                        if (e.target.value == 'Please Select') {
                          setQ('')
                        } else {
                          setQ(e.target.value)
                        }
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      placeholder="B.tech / cse / CSP242 "
                    >
                      <option>Please Select</option>
                      {rlist.map((e, index) => {
                        return <option key={index}>{e}</option>
                      })}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      if (q == 'Class Wise') {
                        GetStudentList()
                      }
                      if (!q || q == 'All Students') {
                        GetStudentList()
                      }
                      if (q == 'RTE Students') {
                        const s = where('RTE_Status', '==', 'Yes')
                        SearchStudent(s)
                      }
                      if (q == 'Third Wards') {
                        const s = where('Third_Ward', '==', 'Yes')
                        SearchStudent(s)
                      }
                      if (q == 'All Male') {
                        const s = where('Gender', '==', 'Male')
                        SearchStudent(s)
                      }
                      if (q == 'All Female') {
                        const s = where('Gender', '==', 'Female')
                        SearchStudent(s)
                      }
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Search
                  </button>
                </div>
                <h1 className="font-bold">Select Columns</h1>
                <div className="h-32 overflow-scroll border-2 p-2">
                  {[
                    'name',
                    'Aadhar',
                    'Aadhar_Available',
                    'Additional_Subject',
                    'Address',
                    'Age',
                    'BusStop_Name',
                    'Caste',
                    'Category',
                    'City',
                    'Class',
                    'Date_Of_Birth',
                    'Father_Mobile_Number',
                    'Father_Name',
                    'Fees',
                    'Gender',
                    'House',
                    'ID',
                    'Image',
                    'Last_School',
                    'Last_School_Address',
                    'Last_School_Board',
                    'Last_School_Result',
                    'Mobile_Number',
                    'Mother_Name',
                    'PinCode',
                    'Place',
                    'RTE_Status',
                    'Religion',
                    'Section',
                    'Sr_Number',
                    'Third_Ward',
                    'Transport_Fee',
                    'Transport_Status',
                  ].map((attribute) => (
                    <div>
                      <label key={attribute}>
                        <input
                          type="checkbox"
                          checked={columns.includes(attribute)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setColumns([...columns, attribute])
                            } else {
                              setColumns(
                                columns.filter((col) => col !== attribute),
                              )
                            }
                          }}
                        />
                        {attribute}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div ref={componentRef} className="p-2">
              <div className="flex justify-between items-center p-2">
                <div class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
                  Class : {className ? className : 'All'}
                </div>
                <div class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
                  Student Reports : {q ? q : 'All Students'}
                </div>
                <div class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
                  Section : {sectionName ? sectionName : 'All'}
                </div>
              </div>
              <table class="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                  <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {sortedStudents.map((e, index) => {
                    if (e.Deleted == false || e.Deleted == undefined) {
                      return (
                        <tr
                          key={index}
                          className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                        >
                          {columns.map((col) => (
                            <td
                              key={col}
                              className="p-2 md:border md:border-grey-500 text-left block md:table-cell"
                            >
                              <span className="inline-block w-1/3 md:hidden font-bold">
                                {col}
                              </span>
                              {e[col]}
                            </td>
                          ))}
                        </tr>
                      )
                    }
                  })}
                </tbody>
              </table>
              <div className='flex justify-center items-center p-2'>

              <button className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={handlePrint}>print</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
