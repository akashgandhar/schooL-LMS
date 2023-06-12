import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../firebase";

export default function GalleryCard(props) {
  return (
    <div class="w-full max-w-sm bg-white border-2 border-gray-400 rounded-lg shadow my-2">
      <a href="#">
        <img class="p-8 rounded-xl" src={props.link} alt="product image" />
      </a>
      <div class="px-10 pb-5">
        <div class="flex items-center justify-between">
          <a
            href="#"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit
          </a>
          <a
            onClick={() => {
              console.log(props.name);
              const docRef = doc(db, `gallery`, props.name);
              try{

                deleteDoc(docRef).then(() => {
                  alert("Deleted");
                });
              }catch(e){
                alert(e.message)
              }
            }}
            href="#"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}
