import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import UserContext from "../../../components/context/userContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export default function Invoice() {
  const a = useContext(UserContext);
  const router = useRouter();
  const s = router.query;
  const componentRef = useRef();
  const current = new Date();
  const time = new Intl.DateTimeFormat("en-IN", { timeStyle: "medium" }).format(
    current.getTime()
  );

  const d = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log(months[s.Month]);

  const [dues, setDues] = useState(0);

  const [count, setCount] = useState(0);

  const getDues = async () => {
    if (count < 2) {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${
            s.Section
          }/due/${months[s.Month]}/students`,
          s.Sr_Number
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists) {
          setDues(docSnap.data().month_Due);
          setCount(count + 1);
        }
        // setStudents(list);
      } catch (e) {
        alert(e.message);
      }
    }
  };

  useEffect(() => {
    getDues();
  }, []);

  console.log(dues);

  return (
    <div>
      <div
        ref={componentRef}
        class="grid justify-center p-4 sm:grid-cols-1 lg:grid-cols-2 "
      >
        <div class="-mx-1 w-full border-4 border-dotted">
          <div class="rounded-xl bg-gray-100 p-8 shadow-lg">
            <div class="flex items-center gap-5">
              <div class="mb-8 w-24">
                <img
                  class="h-20 w-20"
                  src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2Flogo%20gregy.jpg?alt=media&token=42f537ee-e751-4818-b15e-24d24e35d219"
                  alt=""
                />
              </div>
              <div class="mb-8 text-4xl w-full text-center font-bold text-red-500">
                M J Public School
              </div>
            </div>
            <div class="flex justify-between">
              <div class="mb-8 text-left">
                <div class="mb-2 text-2xl font-semibold">Student Details</div>
                <div class="mb-1 text-gray-600">Student ID: {s.Sr_Number}</div>
                <div class="mb-1 text-gray-600">Name: {s.name}</div>
                <div class="mb-1 text-gray-600">
                  Father Name: {s.Father_Name}
                </div>
                {/* <div class="mb-1 text-gray-600">
                  Date Of Birth: {s.Date_Of_Birth}
                </div>
                <div class="mb-1 text-gray-600">Place: {s.Place}</div> */}
              </div>
              <div class="mb-8 text-right">
                <div class="mb-2 text-2xl font-semibold">Invoice</div>
                <div class="mb-1 text-gray-600">
                  ID: #{s.Sr_Number}/{current.getDate()}
                  {current.getMonth() + 1}/{current.getHours()}
                  {current.getMinutes()}
                  {current.getSeconds()}
                </div>
                <div class="mb-1 text-gray-600">Date: {s.Date}</div>
                <div class="mb-2 border-t-2 text-red-600 border-gray-300 text-2xl font-semibold">
                  Dues: {dues > 0 ? 0 : dues}
                </div>
              </div>
            </div>

            <div className="p-2 text-xl w-full items-center justify-center flex border-2 mb-2 font-serif">
              Student Copy
            </div>

            <div class="overflow-x-auto">
              <table class="w-full table-auto">
                <thead>
                  <tr class="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                    <th colspan="3" class="py-3 px-4 text-left">
                      Description
                    </th>

                    <th class="py-3 px-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody class="text-sm font-light text-gray-600">
                  <tr class="border-b border-gray-200 bg-white">
                    <td colspan="3" class="py-3 px-4 text-left">
                      {s.mode}
                    </td>
                    <td class="py-3 px-4 font-bold text-right">
                      &#8377; {s.Amount}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 bg-gray-100">
                    <td colspan="3" class="py-3 px-4 text-left">
                      Concession
                    </td>
                    <td class="py-3 px-4 text-right">&#8377; {s.Concession}</td>
                  </tr>
                  <tr class="border-b border-gray-200 bg-white">
                    <td colspan="3" class="py-3 px-4 text-left">
                      Concession By: {s.ConcessionBy}
                    </td>
                    <td class="py-3 px-4 text-right"></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                    <td colspan="3" class="py-3 px-4 text-right font-semibold">
                      Subtotal
                    </td>
                    <td class="py-3 px-4 text-right font-semibold">
                      &#8377; {Number(s.Amount) + Number(s.Concession)}
                    </td>
                  </tr>
                  <tr class="bg-gray-100 text-sm uppercase leading-normal text-gray-600">
                    <td colspan="3" class="py-3 px-4 text-right font-semibold">
                      Concession
                    </td>
                    <td class="py-3 px-4 text-right font-semibold">
                      -&#8377; {s.Concession}
                    </td>
                  </tr>

                  <tr class="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                    <td colspan="3" class="py-3 px-4 text-right font-semibold">
                      Total
                    </td>
                    <td class="py-3 px-4 text-right font-semibold">
                      &#8377;{" "}
                      {Number(Number(s.Amount) + Number(s.Concession)) -
                        Number(s.Concession)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex justify-between mt-28">
              <div colspan="3" className="border-t-2 border-black py-2">
                Signature of Accountant
              </div>
              <div colspan="2" className="border-t-2 border-black py-2">
                Signature of Parents{" "}
              </div>
              <div colspan="4" className="border-t-2 border-black py-2">
                <div>Sign of Principal with Seal </div>
              </div>
            </div>
          </div>
        </div>
        <div class="-mx-1 w-full border-4 border-dotted">
          <div class="rounded-xl bg-gray-100 p-8 shadow-lg">
            <div class="flex items-center gap-5">
              <div class="mb-8 w-24">
                <img
                  class="h-20 w-20"
                  src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2Flogo%20gregy.jpg?alt=media&token=42f537ee-e751-4818-b15e-24d24e35d219"
                  alt=""
                />
              </div>
              <div class="mb-8 text-4xl w-full text-center font-bold text-red-500">
                M J Public School
              </div>
            </div>
            <div class="flex justify-between">
              <div class="mb-8 text-left">
                <div class="mb-2 text-2xl font-semibold">Student Details</div>
                <div class="mb-1 text-gray-600">Student ID: {s.Sr_Number}</div>
                <div class="mb-1 text-gray-600">Name: {s.name}</div>
                <div class="mb-1 text-gray-600">
                  Father Name: {s.Father_Name}
                </div>
                {/* <div class="mb-1 text-gray-600">
                  Date Of Birth: {s.Date_Of_Birth}
                </div>
                <div class="mb-1 text-gray-600">Place: {s.Place}</div> */}
              </div>
              <div class="mb-8 text-right">
                <div class="mb-2 text-2xl font-semibold">Invoice</div>
                <div class="mb-1 text-gray-600">
                  ID: #{s.Sr_Number}/{current.getDate()}
                  {current.getMonth() + 1}/{current.getHours()}
                  {current.getMinutes()}
                  {current.getSeconds()}
                </div>
                <div class="mb-1 text-gray-600">Date: {s.Date}</div>
                <div class="mb-2 border-t-2 text-red-600 border-gray-300 text-2xl font-semibold">
                  Dues: {dues > 0 ? 0 : dues}
                </div>
              </div>
            </div>
            <div className="p-2 text-xl w-full items-center justify-center flex border-2 mb-2 font-serif">
              School Copy
            </div>

            <div class="overflow-x-auto">
              <table class="w-full table-auto">
                <thead>
                  <tr class="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                    <th colspan="3" class="py-3 px-4 text-left">
                      Description
                    </th>

                    <th class="py-3 px-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody class="text-sm font-light text-gray-600">
                  <tr class="border-b border-gray-200 bg-white">
                    <td colspan="3" class="py-3 px-4 text-left">
                      {s.mode}
                    </td>
                    <td class="py-3 px-4 font-bold text-right">
                      &#8377; {s.Amount}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-200 bg-gray-100">
                    <td colspan="3" class="py-3 px-4 text-left">
                      Concession
                    </td>
                    <td class="py-3 px-4 text-right">&#8377; {s.Concession}</td>
                  </tr>
                  <tr class="border-b border-gray-200 bg-white">
                    <td colspan="3" class="py-3 px-4 text-left">
                      Concession By: {s.ConcessionBy}
                    </td>
                    <td class="py-3 px-4 text-right"></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                    <td colspan="3" class="py-3 px-4 text-right font-semibold">
                      Subtotal
                    </td>
                    <td class="py-3 px-4 text-right font-semibold">
                      &#8377; {s.Amount}
                    </td>
                  </tr>
                  <tr class="bg-gray-100 text-sm uppercase leading-normal text-gray-600">
                    <td colspan="3" class="py-3 px-4 text-right font-semibold">
                      Concession
                    </td>
                    <td class="py-3 px-4 text-right font-semibold">
                      -&#8377; {s.Concession}
                    </td>
                  </tr>

                  <tr class="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                    <td colspan="3" class="py-3 px-4 text-right font-semibold">
                      Total
                    </td>
                    <td class="py-3 px-4 text-right font-semibold">
                      &#8377; {Number(s.Amount) - Number(s.Concession)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex justify-between mt-28">
              <div colspan="3" className="border-t-2 border-black py-2">
                Signature of Accountant
              </div>
              <div colspan="2" className="border-t-2 border-black py-2">
                Signature of Parents{" "}
              </div>
              <div colspan="4" className="border-t-2 border-black py-2">
                <div>Sign of Principal with Seal </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 w-full justify-center flex">
        <div
          onClick={() => {
            handlePrint();
          }}
          class="hover:cursor-pointer relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        >
          <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
          <span class="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span class="relative text-white">Print</span>
          </span>
        </div>
      </div>
    </div>
  );
}
