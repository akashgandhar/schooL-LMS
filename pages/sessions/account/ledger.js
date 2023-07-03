import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  Timestamp,
  increment,
  query,
  where,
} from "firebase/firestore";
import UserContext from "../../../components/context/userContext";

export default function InsertMarks() {
  const router = useRouter();
  const current = new Date();
  const a = useContext(UserContext);
  // const d = `${current.getDate()}-${
  //   current.getMonth() + 1
  // }-${current.getFullYear()}`;

  const [obtMarks, setObtMarks] = useState([]);
  // const [amount, setAmount] = useState();
  const [concession, setConcession] = useState(0);
  const [concessionBy, setConcessionBy] = useState("nil");

  const s = router.query;

  const [pList, setPList] = useState([]);
  const [count, setCount] = useState(0);

  const GetPList = async () => {
    if (count < 2) {
      try {
        const docRef = collection(
          db,
          `users/${a.user}/sessions/${a.session}/studentsAccount/${s.Sr_Number}/records`
        );
        const docSnap = await getDocs(docRef);
        var list = [];
        console.log(docSnap);
        docSnap.forEach((doc) => {
          list.push(doc.data());
          //   console.log(doc.data());
        });
        console.log(list);
        setPList(list);
        console.log("run2");
        setCount(count + 1);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const time = new Intl.DateTimeFormat("en-IN", { timeStyle: "medium" }).format(
    current.getTime()
  );

  const [obt, setObt] = useState();

  const saveMarks = async (sub, per, max) => {
    if (!obt) {
      alert("Enter Missing Details");
    } else if (Number(obt) > Number(max)) {
      alert("Marks Can Not Be Greater Than Max Marks");
      // console.log(obt,max);
    } else {
      try {
        const docRef = `users/${a.user}/sessions/${a.session}/exams/${s.exam}/classes/${s.Class}/subjects`;
        await updateDoc(doc(db, docRef, sub), {
          OBTAINED_MARKS: obt,
          PERCENT: per,
        }).then(() => {
          alert("success");
        });
      } catch (e) {
        console.error("Error adding document: ", e.message);
      }
    }
  };

  useEffect(() => {
    GetPList();
    // GetMarks()
    // console.log(pList);
  }, [pList]);

  var totalObtained = 0;
  var totalMaximum = 0;

  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const docRef = doc(
      db,
      `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/March/students`,
      s.Sr_Number
    );

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        final[e] = docSnap.data();
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const months = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
  ];

  const pay = async (d, t, m, am) => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/studentsAccount/${s.Sr_Number}/records`,
        d + "+" + t
      );

      await deleteDoc(docRef)
        .then(async () => {
          await payFee(m, am);
        })
        .then(async () => {
          await addIncome(d, t, m);
        })
        .then(() => {
          alert("Deleted SuccessFully");
          // data["mode"] = mode;
          // data["Amount"] = Number(amount);
          // data["Concession"] = concession;
          // data["ConcessionBy"] = concessionBy;
          // router.push({ pathname: "/sessions/account/invoice", query: data });
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const addIncome = async (da, ti, mo) => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/dayBook/${da}/income`,
        ti
      );

      console.log(da, ti);
      console.log(`${mo} Of ${s.name} s/o ${s.Father_Name} (${s.Class})`);

      deleteDoc(docRef);
    } catch (e) {
      console.log(e.message);
    }
  };

  const payFee = async (mode, amount) => {
    if (mode == "Old Dues") {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/OldDues/students`,
          s.Sr_Number
        );
        await updateDoc(docRef, {
          lastUpdate: Timestamp.now(),
          month_Due: increment(Number(amount)),
          total: increment(Number(amount)),
        });
      } catch (e) {
        console.log(e.message);
      }
    }
    if (mode == "Admission Fee") {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/Admission/students`,
          s.Sr_Number
        );
        await updateDoc(docRef, {
          lastUpdate: Timestamp.now(),
          month_Due: increment(Number(amount)),
          total: increment(Number(amount)),
        });
      } catch (e) {
        console.log(e.message);
      }
    }
    if (mode == "Third ward Fee") {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/otherDue/Third Ward Fee/Third Ward Fee/students`,
          s.Sr_Number
        );
        await updateDoc(docRef, {
          lastUpdate: Timestamp.now(),
          month_Due: increment(Number(amount)),
          total: increment(Number(amount)),
        });
      } catch (e) {
        console.log(e.message);
      }
    }
    months.map(async (e) => {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/${e}/students`,
          s.Sr_Number
        );
        if (mode === "Monthly Fee") {
          await updateDoc(docRef, {
            lastUpdate: Timestamp.now(),
            month_Due: increment(Number(amount)),
            total: increment(Number(amount)),
          }).then(async () => {
            const dueRef = doc(
              db,
              `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/`,
              e
            );

            await updateDoc(
              dueRef,
              {
                total_Due: increment(Number(amount)),
              },
              { merge: true }
            );
          });
        }

        if (mode === "Transport Fee") {
          await updateDoc(docRef, {
            lastUpdate: Timestamp.now(),
            transport_due: increment(Number(amount)),
            total: increment(Number(amount)),
          }).then(async () => {
            const dueRef = doc(
              db,
              `users/${a.user}/sessions/${a.session}/classes/${s.Class}/sections/${s.Section}/due/`,
              e
            );

            await updateDoc(
              dueRef,
              {
                total_Due: increment(Number(amount)),
              },
              { merge: true }
            );
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  var total = 0;
  var totalconcession = 0;

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto  py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <div className=" flex text-center items-center justify-center font-bold text-2xl">
                Student Ledger <h1 className="mx-3">{s.exam}</h1>
              </div>
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
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      {current.getDate()}/{current.getMonth() + 1}/
                      {current.getFullYear()}
                    </div>
                  </div>
                </div>
                {/* <button class="bg-red-400  text-white font-bold  py-2 px-4 rounded-full">
                  --- Please Save Marks Of One Subject First Then Proceed To
                  Next ---
                </button> */}
              </div>
            </div>
            <div>
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Date
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Particulars
                    </th>

                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Amount Paid
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Concession
                    </th>

                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {pList.map((e, index) => {
                    // console.log();

                    total = total + e.Total_Paid;
                    totalconcession = Number(
                      totalconcession + Number(e.Concession)
                    );

                    return (
                      <tr
                        key={index}
                        class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                      >
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            date
                          </span>
                          {e.Date}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            mode
                          </span>
                          {e.Mode}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            amount
                          </span>
                          {e.Total_Paid}
                        </td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span class="inline-block w-1/3 md:hidden font-bold">
                            concession
                          </span>
                          {e.Concession}
                          {e.Concession > 0 ? `By:(${e.concessionBy})` : ""}
                        </td>

                        <td
                          width="150"
                          class="p-2  md:border md:border-grey-500 text-left block md:table-cell"
                        >
                          {/* <button class="bg-blue-500 mx-2 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                            Edit
                          </button> */}
                          <button
                            onClick={() => {
                              pay(e.Date, e.Time, e.Mode, e.Total_Paid_Amount);
                            }}
                            class="bg-blue-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr class="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                    <td class="p-2 md:border md:border-grey-500 block md:table-cell text-left font-bold">
                      <span class="inline-block w-1/3 md:hidden font-bold">
                        TOTAL
                      </span>
                    </td>
                    <td class="p-2 md:border md:border-grey-500 block md:table-cell text-left font-bold">
                      <span class="inline-block w-1/3 md:hidden font-bold">
                        obtained
                      </span>
                      Grand Total
                      {/* {totalObtained} */}
                    </td>
                    <td class="p-2 md:border md:border-grey-500 block md:table-cell text-left font-bold">
                      <span class="inline-block w-1/3 md:hidden font-bold">
                        tmax
                      </span>
                      {total}
                    </td>
                    <td
                      colSpan={2}
                      class="p-2 md:border md:border-grey-500 block md:table-cell text-left font-bold"
                    >
                      <span class="inline-block w-1/3 md:hidden font-bold">
                        percent
                      </span>
                      {totalconcession}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6"></div>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={async () => {
                    const docRef = collection(
                      db,
                      `users/${a.user}/sessions/${a.session}/exams/${s.exam}/classes/${s.Class}/subjects`
                    );
                    const docSnap = await getDocs(docRef);
                    docSnap.forEach((doc) => {
                      if (!doc.data().OBTAINED_MARKS) {
                      }
                    });
                    alert("Marks Added Successfully");
                    router.push("/sessions/exams/marks");
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
