import { collection, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import UserContext from './context/userContext'

export default function Card() {
  const [students, setStudents] = useState([])

  const a = useContext(UserContext)

  const GetStudents = async () => {
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/AllStudents`,
    )
    const docSnap = await getDocs(docRef)
    var list = []
    docSnap.forEach((doc) => {
      list.push(doc.data())
    })
    setStudents(list)
  }

  const current = new Date();
  const time = new Intl.DateTimeFormat("en-IN", { timeStyle: "medium" }).format(
    current.getTime()
  );

  const [total, setTotal] = useState(0)


  const d = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

const [totalinc, setTotalInc] = useState(0)

  const getIncome = async () => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/dayBook/${d}/income`
      );
      const docSnap = await getDocs(docRef);
      var list = 0;
      docSnap.forEach((doc) => {
        list += Number(doc.data().Total_Paid);
      });
      setTotalInc(list)
    
    } catch (e) {
      alert(e.message)
    }
  };

  const getExpense = async () => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/dayBook/${d}/expense`
      );
      const docSnap = await getDocs(docRef);
      var list = 0;
      docSnap.forEach((doc) => {
        list += Number(doc.data().Total_Paid);
      });
      setTotal(list)
    
    } catch (e) {
      alert(e.message)
    }
  };

  useEffect(() => {
    GetStudents();
    getIncome();
    getExpense();
  }, [students,totalinc,total])

  return (
    <div class="w-full px-6 py-6 mx-auto">
      {/* <!-- row 1 --> */}
      <div class="flex flex-wrap -mx-3">
        {/* <!-- card1 --> */}
        <div class="w-full max-w-full px-10 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
          <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
            <div class="flex-auto p-4">
              <div class="flex flex-row ">
                <div class="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                      Total Strength
                    </p>
                    <h5 class="mb-0 font-bold">
                      {students.length}
                      <span class="leading-normal text-sm font-weight-bolder text-lime-500"></span>
                    </h5>
                  </div>
                </div>
                <div class="px-3 text-right basis-1/3">
                  <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl ">
                    <img
                      class="ni leading-none ni-money-coins text-lg relative  text-white"
                      src="https://cdn-icons-png.flaticon.com/512/2995/2995620.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- card2 --> */}
        <div class="w-full max-w-full px-10 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
          <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
            <div class="flex-auto p-4">
              <div class="flex flex-row -mx-3">
                <div class="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                      Today's Income
                    </p>
                    <h5 class="mb-0 font-bold">
                      {totalinc}
                      <span class="leading-normal text-sm font-weight-bolder text-lime-500">
                      
                      </span>
                    </h5>
                  </div>
                </div>
                <div class="px-3 text-right basis-1/3">
                  <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl ">
                    <img src='https://cdn-icons-png.flaticon.com/512/2936/2936758.png' class="ni leading-none ni-world text-lg relative  text-white"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- card3 --> */}
        <div class="w-full max-w-full px-10 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
          <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
            <div class="flex-auto p-4">
              <div class="flex flex-row -mx-3">
                <div class="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                      Today's Expense
                    </p>
                    <h5 class="mb-0 font-bold">
                      {total}
                      <span class="leading-normal text-sm font-weight-bolder text-lime-500">
                      
                      </span>
                    </h5>
                  </div>
                </div>
                <div class="px-3 text-right basis-1/3">
                  <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl ">
                    <img src='https://cdn-icons-png.flaticon.com/512/3707/3707999.png' class="ni leading-none ni-world text-lg relative  text-white"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* <!-- card4 --> */}
        <div class="w-full max-w-full px-10 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
          <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
            <div class="flex-auto p-4">
              <div class="flex flex-row -mx-3">
                <div class="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                    Today's Balance
                    </p>
                    <h5 class="mb-0 font-bold">
                    {Number(totalinc) - Number(total)}
                      <span class="leading-normal text-sm font-weight-bolder text-lime-500">
                      
                      </span>
                    </h5>
                  </div>
                </div>
                <div class="px-3 text-right basis-1/3">
                  <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl ">
                    <img src='https://cdn-icons-png.flaticon.com/512/10164/10164637.png' class="ni leading-none ni-world text-lg relative  text-white"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
