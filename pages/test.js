import React, { useContext, useEffect, useState } from "react";
import UserContext from "../components/context/userContext";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Test() {
  const a = useContext(UserContext);

  const [stds, setStds] = useState([]);

  const CalculatTransport = (month, fee, n) => {
    if (month == "April" || month == "May") {
      return fee * n;
    } else if (month == "June") {
      return fee * 2;
    } else {
      return fee * (n - 1);
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

  const transportFee = 700;
  const className = [
    "I",
    "II",
    "III",
    "IV",
    "IX",
    "LKG",
    "NRY",
    "UKG",
    "V",
    "VI",
    "VII",
    "VIII",
    "X",
    "XI",
    "XII",
  ];
  const sectionName = "Section-1";

  const stops = [
    { name: "ADALPUR", fee: 550 },
    { name: "BAHADURPUR", fee: 650 },
    { name: "BARAMAI", fee: 700 },
    { name: "BEEJALPUR", fee: 600 },
    { name: "BISAWAR", fee: 700 },
    { name: "DAUDA MURSAN", fee: 800 },
    { name: "GARHI ASHA", fee: 600 },
    { name: "GARHI HULASHI", fee: 500 },
    { name: "GARIBA", fee: 700 },
    { name: "JANGALA", fee: 650 },
    { name: "JHAGRAR", fee: 650 },
    { name: "KAJRAUTHI", fee: 650 },
    { name: "KUNJALPUR", fee: 500 },
    { name: "KURSANDA", fee: 600 },
    { name: "LOKERA", fee: 600 },
    { name: "MADHAKA", fee: 700 },
    { name: "MADNAI", fee: 500 },
    { name: "MAHAWATPUR", fee: 600 },
    { name: "MANSHYA", fee: 600 },
    { name: "MEERPUR", fee: 600 },
    { name: "MONIYA", fee: 550 },
    { name: "NAGLA BADA", fee: 650 },
    { name: "NAGLA BANJARA", fee: 700 },
    { name: "NAGLA BARI", fee: 550 },
    { name: "NAGLA CHHATTI", fee: 700 },
    { name: "NAGLA GHANI", fee: 600 },
    { name: "NAGLA JAGRAM", fee: 550 },
    { name: "NAGLA KALLU", fee: 700 },
    { name: "NAGLA MAN SAHAY", fee: 650 },
    { name: "NAGLA MAYA", fee: 650 },
    { name: "NAGLA MOHAN", fee: 600 },
    { name: "NAGLA PACHAURI", fee: 600 },
    { name: "NAGLA PRAN", fee: 650 },
    { name: "NAGLA SIDHARI", fee: 600 },
    { name: "NAGLA THADA", fee: 550 },
    { name: "PODHA", fee: 600 },
    { name: "PUSAINI", fee: 600 },
    { name: "RASEEDPUR", fee: 650 },
    { name: "SADABAD", fee: 600 },
    { name: "SAINPUR", fee: 600 },
    { name: "SALEMPUR", fee: 650 },
    { name: "SAROOPA", fee: 600 },
    { name: "SORAI", fee: 600 },
    { name: "TEEKAIT", fee: 600 },
  ];

  const getData = async (stop) => {
    const docRef = query(
      collection(db, `users/${a.user}/sessions/${a.session}/AllStudents`),
      where("BusStop_Name", "==", stop)
    );
    try {
      const ssnap = await getDocs(docRef);
      var list = [];
      ssnap.forEach((doc) => {
        list.push(doc.data());
      });
      stds[`${stop}`] = list;
      // console.log(stds[stop]);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getAll = () => {
    stops.forEach((ss) => {
      getData(ss.name);
    });
  };

  const createDues = async () => {
    stops.forEach((st) => {
      className.forEach((cl) => {
        stds[st.name].forEach((en) => {
          if (en.Class == cl) {
            months.forEach(async (e) => {
              try {
                const docRef = doc(
                  db,
                  `users/${a.user}/sessions/${a.session}/classes/${cl}/sections/${sectionName}/due/${e}/students`,
                  en.Sr_Number
                );
                await updateDoc(docRef, {
                  transport_due: CalculatTransport(
                    e,
                    st.fee,
                    months.indexOf(e) + 1
                  ),

                  total:
                    en.Fees * (months.indexOf(e) + 1) +
                    CalculatTransport(e, transportFee, months.indexOf(e) + 1),
                });
                // console.log("success");
              } catch (e) {
                console.log(e.message);
              }
            });
          }
        });
      });
    });
  };

  // useEffect(() => {
  //   // console.log(stds);
  // }, [stds]);

  const setSr = async (sr) => {
    className.forEach(async (cl) => {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes/${cl}/sections/Section-1/students`
      );
      try {
        const docSnap = await getDocs(docRef);
        docSnap.forEach(async (d) => {
          const docRef = doc(
            db,
            `users/${a.user}/sessions/${a.session}/AllStudents`,
            d.data().Sr_Number
          );
          await updateDoc(docRef, {
            ID: d.data().ID ? d.data().ID : 0,
          }).then(() => {
            // console.log("success");
          });
        });
      } catch (e) {
        console.log(e.message);
      }
    });
  };

  // const docRef = doc(
  //   db,
  //   `users/${a.user}/sessions/${a.session}/AllStudents`,
  //   sr
  // );
  // await updateDoc(docRef, {
  //   ID: id,
  // }).then(() => {
  //   console.log("success");
  // });

  // "1500", "524", "1708", "522", "982", "670", "546", "666", "1579", "698", "1700", "650", "1721", "1647", "922", "2306101", "1659", "435", "1564", "589", "1140", "1584", "2405030", "1137", "1845", "1689", "1667", "977", "451", "1653",

  // "1504", "1777", "737", "760", "1585", "1709", "2405056", "1605", "947", "2303062", "2404029", "1819", "1315", "2301082", "1698", "1697", "2301003"

  const setAdresses = async () => {
    const docRef = query(collection(db, `users/${a.user}/sessions/${a.session}/AllStudents`),
      where("Sr_Number", "in", ["1504", "1777", "737", "760", "1585", "1709", "2405056", "1605", "947", "2303062", "2404029", "1819", "1315", "2301082", "1698", "1697", "2301003"]));


    const addresses = [];

    try {
      const ssnap = await getDocs(docRef);
      ssnap.forEach((doc) => {
        addresses.push(doc.data());
      });
      console.log(addresses);
    }
    catch (e) {
      console.log(e.message);
    }


    addresses.forEach(async (en) => {

      await createDue(en.Sr_Number, en.Class, en.Section, en.Place, en.Address);

    });




  }



  const createDue = async (sr, className, sectionName, place, address) => {
    var total = 0;
    months.forEach(async (e) => {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/${e}/students`,
          sr
        );
        await setDoc(docRef, {

          Place: place,
          Address: address,

        }, { merge: true })
      } catch (er) {
        console.log(er.message);
      }
    });
  };



  return (
    <div>
      <button className="p-4 norder-2">kkkkkkk</button>
      <button onClick={setAdresses} className="p-4 norder-2">
        sett
      </button>
    </div>
  );
}
