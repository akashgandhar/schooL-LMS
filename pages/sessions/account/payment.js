import { async } from '@firebase/util'
import { useRouter } from 'next/router'
import React, { use, useContext, useEffect, useState } from 'react'
import { db } from '../../../firebase'
import {
  FieldValue,
  Timestamp,
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import UserContext from '../../../components/context/userContext'
import { Input } from 'postcss'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Payment() {
  const router = useRouter()
  const [current, setCurrent] = useState(new Date())
  const a = useContext(UserContext)
  const [d, setD] = useState(
    `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`,
  )
  const [month, setMonth] = useState(current.getMonth())

  const [mode, setMode] = useState()
  const [amount, setAmount] = useState()
  const [concession, setConcession] = useState(0)
  const [concessionBy, setConcessionBy] = useState('nil')

  useEffect(() => {
    if (localStorage.getItem('date')) {
      var date = localStorage.getItem('date').split('-')
      setCurrent(new Date(date[2], date[1] - 1, date[0]))
      setD(localStorage.getItem('date'))
      setMonth(date[1] - 1)
    }
  }, [])

  const months = [
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
  ]

  const s = router.query
  const [type, setType] = useState()
  var [students, setStudents] = useState({
    April: {
      transport_due: 0,
      total: 0,
      month_Due: 0,
    },
    May: {
      transport_due: 0,
      month_Due: 0,
      total: 0,
    },
    June: {
      transport_due: 0,
      month_Due: 0,
      total: 0,
    },
    July: {
      transport_due: 0,
      total: 0,
      month_Due: 0,
    },
    August: {
      total: 0,
      month_Due: 0,
      transport_due: 0,
    },
    September: {
      transport_due: 0,
      total: 0,
      month_Due: 0,
    },
    October: {
      total: 0,
      transport_due: 0,
      month_Due: 0,
    },
    November: {
      total: 0,
      transport_due: 0,
      month_Due: 0,
    },
    December: {
      total: 0,
      transport_due: 0,
      month_Due: 0,
    },
    January: {
      total: 0,
      transport_due: 0,
      month_Due: 0,
    },
    February: {
      month_Due: 0,
      transport_due: 0,
      total: 0,
    },
    March: {
      month_Due: 0,
      transport_due: 0,
      total: 0,
    },
  })

  var data = s

  const getDue = async () => {
    var final = {}
    months.forEach(async (e) => {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/${e}/students`,
          s.Sr_Number,
        )
        const docSnap = await getDoc(docRef)
        var list = {}

        if (docSnap.exists()) {
          final[e] = docSnap.data()
        }
        //   final.push(list);
      } catch (e) {
        console.log(e)
      } finally {
        if (Object.keys(final).length == 12) {
          setStudents(final)
        }
      }
    })
  }
  

  const [isLoading, setIsLoading] = useState(false)

  const pay = async () => {
    setIsLoading(true)

    const time = new Intl.DateTimeFormat('en-IN', { timeStyle: 'medium' }).format(
      current.getTime(),
    )
    
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/studentsAccount/${s.Sr_Number}/records`,
        d + '+' + time,
      )

      await setDoc(docRef, {
        Total_Paid_Amount: Number(amount) + Number(concession),
        Total_Paid: Number(amount),
        Concession: concession,
        concessionBy: concessionBy,
        Mode: mode,
        Date: d,
        Time: time,
      })
        .catch((error) => {
          alert('Error in Adding Record', error.message)
          setIsLoading(false)
          return
        })
        .then(async () => {
          await payFee()
        })
        .then(async () => {
          await addIncome()
        })
        .then(() => {
          alert('paid SuccessFully')
          data['mode'] = mode
          data['Amount'] = Number(amount)
          data['Concession'] = concession
          data['ConcessionBy'] = concessionBy
          data['Date'] = d
          data['Month'] = month + 1
          router.replace({ pathname: '/sessions/account/invoice', query: data })
        })
        .then(() => {
          setIsLoading(false)
        })
    } catch (e) {
      console.log(e.message)
      setIsLoading(false)
    }
    // setIsLoading(false)
  }

  const payFee = async () => {
    if (mode == 'Old Dues') {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/OldDues/students`,
          s.Sr_Number,
        )
        await updateDoc(docRef, {
          lastUpdate: Timestamp.now(),
          month_Due: increment(Number(-(Number(amount) + Number(concession)))),
          total: increment(Number(-(Number(amount) + Number(concession)))),
        })
      } catch (e) {
        console.log(e.message)
      }
    }
    if (mode == 'Admission Fee') {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/Admission/students`,
          s.Sr_Number,
        )
        await updateDoc(docRef, {
          lastUpdate: Timestamp.now(),
          month_Due: increment(Number(-(Number(amount) + Number(concession)))),
          total: increment(Number(-(Number(amount) + Number(concession)))),
        })
      } catch (e) {
        console.log(e.message)
      }
    }
    if (mode == 'Exam/Lab Fee') {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/Exam/students`,
          s.Sr_Number,
        )
        await updateDoc(docRef, {
          lastUpdate: Timestamp.now(),
          month_Due: increment(Number(-(Number(amount) + Number(concession)))),
          total: increment(Number(-(Number(amount) + Number(concession)))),
        })
      } catch (e) {
        console.log(e.message)
      }
    }
    if (mode == 'Third ward Fee') {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/otherDue/Third Ward Fee/Third Ward Fee/students`,
          s.Sr_Number,
        )
        await updateDoc(docRef, {
          lastUpdate: Timestamp.now(),
          month_Due: increment(
            Number(Number(-(Number(amount) + Number(concession)))),
          ),
          total: increment(Number(-(Number(amount) + Number(concession)))),
        })
      } catch (e) {
        console.log(e.message)
      }
    }
    months.map(async (e) => {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/${e}/students`,
          s.Sr_Number,
        )
        if (mode === 'Monthly Fee') {
          await updateDoc(docRef, {
            lastUpdate: Timestamp.now(),
            month_Due: increment(-(Number(amount) + Number(concession))),
            total: increment(-(Number(amount) + Number(concession))),
          }).then(async () => {
            const dueRef = doc(
              db,
              `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/`,
              e,
            )

            await updateDoc(
              dueRef,
              {
                total_Due: increment(-(Number(amount) + Number(concession))),
              },
              { merge: true },
            )
          })
        }

        if (mode === 'Transport Fee') {
          await updateDoc(docRef, {
            lastUpdate: Timestamp.now(),
            transport_due: increment(-(Number(amount) + Number(concession))),
            total: increment(-(Number(amount) + Number(concession))),
          }).then(async () => {
            const dueRef = doc(
              db,
              `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/`,
              e,
            )

            await updateDoc(
              dueRef,
              {
                total_Due: increment(-(Number(amount) + Number(concession))),
              },
              { merge: true },
            )
          })
        }
      } catch (e) {
        console.log(e)
      }
    })
  }

  const addIncome = async () => {
    console.log("income added")
    console.log(d)
    console.log(time)

    const time = new Intl.DateTimeFormat('en-IN', { timeStyle: 'medium' }).format(
      current.getTime(),
    )
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/dayBook/${d}/income`,
        time,
      )

      await setDoc(docRef, {
        Total_Paid_Amount: Number(amount) + Number(concession),
        Total_Paid: Number(amount),
        Concession: concession,
        concessionBy: concessionBy,
        Mode: mode,
        name: `${mode} Of ${s.name} s/o ${s.Father_Name} (${s.Class})`,
        Time: time,
      }).catch((e)=>{
        console.log("error", e.message)
      })
    } catch {
      (error) => {
        alert('Error in Adding Income', error.message)
      }
    }
  }

  const [oldDue, setOldDue] = useState(0)
  const [admDue, setAdmDue] = useState(0)
  const [otherDue, setOtherDue] = useState(0)
  const [examDue, setExamDue] = useState(0)
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)

  const getOldDues = async () => {
    if (count < 1) {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/OldDues/students`,
          s.Sr_Number,
        )

        const docSnap = await getDoc(docRef)

        if (docSnap.exists) {
          setOldDue(docSnap.data().total)
          setCount(count + 1)
        }
      } catch (e) {
        console.log(e.message)
      }
    }
  }
  const getAdmDues = async () => {
    if (count2 < 1) {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/Admission/students`,
          s.Sr_Number,
        )

        const docSnap = await getDoc(docRef)

        if (docSnap.exists) {
          setAdmDue(docSnap.data().total)
          setCount2(count2 + 1)
        }
      } catch (e) {
        console.log(e.message)
      }
    }
  }
  const getExamDues = async () => {
    if (count3 < 1) {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/Exam/students`,
          s.Sr_Number,
        )

        const docSnap = await getDoc(docRef)

        if (docSnap.exists) {
          setExamDue(docSnap.data().total)
          setCount3(count2 + 1)
        }
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  const getOtherDues = async () => {
    if (count1 < 1) {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/otherDue/Third Ward Fee/Third Ward Fee/students`,
          s.Sr_Number,
        )

        const docSnap = await getDoc(docRef)

        if (docSnap.exists) {
          setOtherDue(docSnap.data().total)
          setCount1(count + 1)
        }
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  useEffect(() => {
    getOldDues()
    getOtherDues()
    getAdmDues()
    getExamDues()
    // GetFeeList();
  }, [oldDue, otherDue, admDue])

  const classes = ['IX', 'X', 'XI', 'XII']

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto  py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">Fee Payment</h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Student Id
                    </label>
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {s.Sr_Number}
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Student Name
                    </label>
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {s.name}
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Student Father Name
                    </label>
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {s.Father_Name}
                    </div>
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Class
                    </label>
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {s.Class}
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Section
                    </label>
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {s.Section}
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Date
                    </label>
                    <ReactDatePicker
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      selected={current}
                      onChange={(e) => {
                        setCurrent(e)
                        setD(
                          `${e.getDate()}-${
                            e.getMonth() + 1
                          }-${e.getFullYear()}`,
                        )
                        localStorage.setItem(
                          'date',
                          `${e.getDate()}-${
                            e.getMonth() + 1
                          }-${e.getFullYear()}`,
                        )
                        setMonth(e.getMonth())
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between  items-center">
                  <div class="bg-red-500 text-white font-bold w-96 py-2 px-10 rounded-full my-2 flex justify-between">
                    <span>Old Dues : </span>
                    <span>{oldDue}</span>
                  </div>
                  <div class="bg-red-500 text-white font-bold w-96 py-2 px-10 rounded-full my-2 flex justify-between">
                    <span>Admission Dues : </span>
                    <span>{admDue}</span>
                  </div>

                  <div class="bg-red-500 text-white font-bold w-96 py-2 px-10 rounded-full my-2 flex justify-between">
                    <span>Third Ward Fee : </span>
                    <span>{otherDue}</span>
                  </div>
                  {classes.includes(s.Class) && (
                    <div class="bg-red-500 text-white font-bold w-96 py-2 px-10 rounded-full my-2 flex justify-between">
                      <span>Exam/Lab Fee : </span>
                      <span>{examDue}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between w-full items-center">
                  <button
                    class="bg-blue-500 w-full hover:bg-blue-700  text-white font-bold  py-2 px-4 rounded-full"
                    onClick={() => {
                      getDue()
                    }}
                  >
                    Get Current Dues
                  </button>
                </div>
              </div>
            </div>
            <div>
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Month
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Monthly Fee
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Transport Fee
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {months.map((e, index) => {
                    return (
                      <tr
                        key={index}
                        class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                      >
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            Month
                          </span>
                          {e}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            monthly fee
                          </span>
                          {students[e].month_Due > 0
                            ? students[e].month_Due
                            : 0}
                        </td>
                        {e == 'June' ? (
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              transport fee
                            </span>
                          </td>
                        ) : (
                          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span class="inline-block w-1/3 md:hidden font-bold">
                              transport fee
                            </span>
                            {students[e].transport_due > 0
                              ? students[e].transport_due
                              : 0}
                          </td>
                        )}
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            total
                          </span>
                          {(students[e].month_Due > 0
                            ? students[e].month_Due
                            : 0) +
                            (students[e].transport_due > 0
                              ? students[e].transport_due
                              : 0)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Mode Of Payment
                    </label>
                    <select
                      onChange={(e) => {
                        setMode(e.target.value)
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    >
                      <option>Plese Select</option>
                      <option>Admission Fee</option>
                      <option>Monthly Fee</option>
                      <option>Transport Fee</option>
                      <option>Old Dues</option>
                      <option>Third ward Fee</option>
                      {classes.includes(s.Class) && (
                        <option>Exam/Lab Fee</option>
                      )}
                    </select>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Amount
                    </label>
                    <input
                      onChange={(e) => {
                        setAmount(e.target.value)
                      }}
                      placeholder="Amount"
                      type="tel"
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Concession
                    </label>
                    <input
                      onChange={(e) => {
                        setConcession(e.target.value)
                      }}
                      placeholder="Concession"
                      value={concession}
                      type="tel"
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    />
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Concession By
                    </label>
                    {concession > 0 && (
                      <input
                        onChange={(e) => {
                          setConcessionBy(e.target.value)
                        }}
                        placeholder="concession By"
                        class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      />
                    )}
                  </div>
                </div>
                <button
                  disabled={isLoading}
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => {
                    if (!mode || !amount) {
                      alert('Information Missing')
                    } else {
                      pay()
                    }
                  }}
                >
                  {isLoading ? 'Loading..' : 'Pay Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
