import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import UserContext from '../pages/context/userContext';
import { useRouter } from 'next/router';

export default function ExpenseCard() {
    const current = new Date();
  const time = new Intl.DateTimeFormat("en-IN", { timeStyle: "medium" }).format(
    current.getTime()
  );

  const d = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  const [incomeList, setIncomeList] = useState([]);
const [total, setTotal] = useState(0)
  const a = useContext(UserContext);
  const [source, setSource] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState(d);
  const router = useRouter();

  const getIncome = async () => {
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

        getIncome();
      }, [total])
      


  return (
    
        <div class="container  max-w-sm m-4 flex flex-wrap flex-col md:flex-row items-center justify-start">
  
    <div class="w-full p-3 ">
      <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border  shadow-lg">
        <img class="block h-auto w-full lg:w-48 flex-none bg-cover" src="https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg"/>
        <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="text-black font-bold text-xl ">Today's Expense</div>
          <p class="text-grey-darker text-red-600 font-bold">{total}</p>
        </div>
      </div>
    </div>
    
    
    
    
  </div>
  )
}
