import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import UserContext from '../pages/context/userContext';

export default function Card() {
    const [students, setStudents] = useState([]);

    const a = useContext(UserContext)

    const GetStudents = async () => {
        const docRef = collection(
          db,
          `users/${a.user}/sessions/${a.session}/AllStudents`
        );
        const docSnap = await getDocs(docRef);
        var list = [];
        docSnap.forEach((doc) => {
          list.push(doc.data());
        });
        setStudents(list);
      };

      useEffect(() => {

        GetStudents();
      }, [students])
      


  return (
    
        <div class="container  max-w-sm m-4 flex flex-wrap flex-col md:flex-row items-center justify-start">
  
    <div class="w-full p-3 ">
      <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border  shadow-lg">
        <img class="block h-auto w-full lg:w-48 flex-none bg-cover" src="https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg"/>
        <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="text-black font-bold text-xl ">Total Students</div>
          <p class="text-grey-darker text-red-600 font-bold">{students.length}</p>
        </div>
      </div>
    </div>
    
    
    
    
  </div>
  )
}
