'use client'

import {
  FieldValue,
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Nav from "../../../components/navbar";
import Header from "../../../components/dropdown";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import UserContext from "../../../components/context/userContext";
import { async } from "@firebase/util";
import { Input } from "postcss";
import DatePicker from "react-datepicker";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import Cropper from 'react-easy-crop'
import GetCroppedImg from "./croppedImage";


export default function NewStudent() {
  const router = useRouter();
  const [sr, setSr] = useState("");
  const [name, setName] = useState("");
  const [fName, setFName] = useState("");
  const [mName, setMName] = useState("");
  const [id, setId] = useState("");
  const [mobile, setMobile] = useState("");
  const [fmobile, setFMobile] = useState("");
  const [age, setAge] = useState(0);
  const [file, setFile] = useState("");
  const [pen, setPen] = useState("");
  const [address, setAddress] = useState("");
  const [ward, setWard] = useState("");
  const [addSub, setAddSub] = useState("");
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [transportStatus, setTransportStatus] = useState("");
  const [busStopName, setBusStopName] = useState("NaN");
  const [subject1, setSubject1] = useState("no subject");
  const [subject2, setSubject2] = useState("no subject");
  const [subject3, setSubject3] = useState("no subject");
  const [subject4, setSubject4] = useState("no subject");
  const [subject5, setSubject5] = useState("no subject");
  const [subject6, setSubject6] = useState("no subject");
  // const [busNumber, setBusNumber] = useState("NaN");
  const [category, setCategory] = useState("");
  const [caste, setCaste] = useState("");
  const [religion, setReligion] = useState("");
  const [place, setPlace] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [gender, setGender] = useState("");
  const [lSchool, setLSchool] = useState("");
  const [lSchoolAdd, setLSchoolAdd] = useState("");
  const [lSchoolBoard, setLSchoolBoard] = useState("");
  const [lSchoolResult, setLSchoolResult] = useState("");
  const [tcStatus, setTcStatus] = useState("");
  const [rteStatus, setRteStatus] = useState("");
  const [admissionDay, setAdmissionDay] = useState("");
  const [admissionMonth, setAdmissionMonth] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [aadharStatus, setAadharStatus] = useState("");
  const [house, setHouse] = useState();
  const [visible, setVisible] = useState(false);
  const [tcFile, setTcFile] = useState("nil");
  const [aadharFile, setAadharFile] = useState("nil");
  const [image, setImage] = useState("nil");

  const [imgUrl, setImgUrl] = useState(
    "https://st3.depositphotos.com/13159112/17145/v/450/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg"
  );
  const [tcUrl, setTcUrl] = useState("nil");
  const [aadharUrl, setAadharUrl] = useState("nil");

  const [classList, setClassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [stopList, setStopList] = useState([]);
  const [houseList, setHouseList] = useState([]);

  const [classFee, setClassFee] = useState(0);
  const [transportFee, setTransportFee] = useState(0);

  const a = useContext(UserContext);

  const current = new Date();
  const time = new Intl.DateTimeFormat("en-IN", { timeStyle: "medium" }).format(
    current.getTime()
  );

  const d = `${current.getDate()}-${current.getMonth() + 1
    }-${current.getFullYear()}`;

  const [date, setDate] = useState(current);
  const [dob, setDob] = useState(current);

  useEffect(() => {
    GetSectionList();
  }, [className]);

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

  const CalculatTransport = (month, fee, n) => {
    if (month == "April" || month == "May") {
      return fee * n;
    } else if (month == "June") {
      return fee * 2;
    } else {
      return fee * (n - 1);
    }
  };

  const createDues = async () => {
    var total = 0;
    months.forEach(async (e) => {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/${e}/students`,
          sr
        );
        await setDoc(docRef, {
          month: e,
          month_Due:
            rteStatus === "Yes" || ward === "Yes"
              ? 0
              : classFee * (months.indexOf(e) + 1),
          transport_due: CalculatTransport(
            e,
            transportFee,
            months.indexOf(e) + 1
          ),
          name: name,
          class: className,
          section: sectionName,
          father_name: fName,
          Place: place,
          Address: address,
          Mobile: mobile,
          Sr_Number: sr,
          total:
            rteStatus === "Yes" || ward === "Yes"
              ? 0
              : classFee * (months.indexOf(e) + 1) +
              CalculatTransport(e, transportFee, months.indexOf(e) + 1),
        }).then(async () => {
          const dueRef = doc(
            db,
            `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/`,
            e
          );
          const Snap = await getDoc(dueRef);

          if (Snap.exists()) {
            await updateDoc(dueRef, {
              total_Due:
                Snap.data().total_Due +
                (rteStatus === "Yes" ? 0 : classFee * (months.indexOf(e) + 1)) +
                (e === "June" ? 0 : transportFee * (months.indexOf(e) + 1)),
            });
          } else {
            await setDoc(dueRef, {
              total_Due:
                (rteStatus === "Yes" ? 0 : classFee * (months.indexOf(e) + 1)) +
                (e === "June" ? 0 : transportFee * (months.indexOf(e) + 1)),
            });
          }
        });
      } catch { }
    });
  };
  const createAccount = async () => {
    const docRef = doc(
      db,
      `users/${a.user}/sessions/${a.session}/studentsAccount`,
      sr
    );
    await setDoc(docRef, {
      Anual_Fee: 5000,
      Class_Fee: classFee,
      transportfees: transportFee,
    });
  };

  const GetClassFee = async () => {
    console.log("class check", className);
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/classes`,
        className
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        setClassFee(docSnap.data().Class_Fee);
      }
    } catch (e) {
      alert("class value missing");
      console.log(e);
    }
  };
  const GetTransportFee = async () => {
    if (transportStatus === "Yes") {
      try {
        const docRef = doc(
          db,
          `users/${a.user}/sessions/${a.session}/stops`,
          busStopName
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          setTransportFee(docSnap.data().Stop_Fee);
          // console.log(transportFee);
        }
      } catch (e) {
        alert("plese Select bus stop first");
      }
    }
  };

  const GetClassList = async () => {
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/classes`
    );
    const docSnap = await getDocs(docRef);
    var list = [];
    docSnap.forEach((doc) => {
      list.push(doc.data());
    });
    setClassList(list);
  };

  const GetSectionList = async () => {
    try {
      const docRef = collection(
        db,
        `users/${a.user}/sessions/${a.session}/classes/${className}/sections`
      );
      const docSnap = await getDocs(docRef);
      var list = [];
      docSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setSectionList(list);
    } catch {
      (e) => {
        if (!className) {
          alert("select class first");
        }
      };
    }
  };

  const GetHouseList = async () => {
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/houses`
    );
    const docSnap = await getDocs(docRef);
    var list = [];
    docSnap.forEach((doc) => {
      list.push(doc.data());
    });
    setHouseList(list);
  };

  const GetStopList = async () => {
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/stops`
    );
    const docSnap = await getDocs(docRef);
    var list = [];
    docSnap.forEach((doc) => {
      list.push(doc.data());
    });
    setStopList(list);
  };

  const handleUpload = (img) => {
    if (!className || !name || !sectionName) {
      alert("Write Name, Class and Section First");
    } else {
      const storageRef = ref(
        storage,
        `${a.user}/${a.session}/${className}/${sectionName}/${name}.jpg`
      );
      const file = img;
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },

        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          alert("uploaded");
          setVisible(false);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
          });
        }
      );
    }
  };

  const handleUploadTc = (docs) => {
    const storageRef = ref(
      storage,
      `${a.user}/${a.session}/${className}/${sectionName}/${name}/TC.jpg`
    );
    const file = docs;
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        alert("uploaded");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setTcUrl(downloadURL);
        });
      }
    );
  };

  const handleUploadAadhar = (docs) => {
    const storageRef = ref(
      storage,
      `${a.user}/${a.session}/${className}/${sectionName}/${name}/Aadhar.jpg`
    );
    const file = docs;
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        alert("uploaded");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAadharUrl(downloadURL);
        });
      }
    );
  };

  const submitForm = async () => {
    if (
      (!sr ||
        !name ||
        !fName ||
        !mName ||
        !dob ||
        !mobile ||
        !fmobile ||
        !age ||
        !file ||
        !pen ||
        !address ||
        !ward ||
        !transportStatus ||
        !busStopName ||
        !category ||
        !caste ||
        !place ||
        !city ||
        !pincode ||
        !gender ||
        !lSchool ||
        !lSchoolAdd ||
        !lSchoolBoard ||
        !lSchoolResult ||
        !tcStatus ||
        !aadharStatus ||
        !className ||
        !sectionName ||
        !house ||
        !addSub ||
        !religion,
        !file || !pen || !id)
    ) {
      alert("some information is missing");
    } else {
      var oldSr = [];
      try {
        const q = query(
          collection(
            db,
            `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/students`
          ),
          where("Sr_Number", "==", sr)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          oldSr.push(doc.data().Sr_Number);
        });
      } catch { }

      if (oldSr.length >= 1) {
        alert("SID already exist");
      } else {
        try {
          await setDoc(
            doc(
              db,
              `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/students`,
              sr
            ),
            {
              Sr_Number: sr,
              ID: id,
              Class: className,
              Section: sectionName,
              name: name,
              Father_Name: fName,
              Mother_Name: mName,
              Religion: religion,
              Date_Of_Birth: dob,
              Mobile_Number: mobile,
              Father_Mobile_Number: fmobile,
              Age: age,
              File_Number: file,
              Pen: pen,
              Address: address,
              Transport_Status: transportStatus,
              BusStop_Name: busStopName,
              Category: category,
              Caste: caste,
              Third_Ward: ward,
              Place: place,
              City: city,
              Subject1: subject1,
              Subject2: subject2,
              Subject3: subject3,
              Subject4: subject4,
              Subject5: subject5,
              Subject6: subject6,
              Additional_Subject: addSub,
              PinCode: pincode,
              Gender: gender,
              Last_School: lSchool,
              Last_School_Address: lSchoolAdd,
              Last_School_Board: lSchoolBoard,
              Last_School_Result: lSchoolResult,
              RTE_Status: rteStatus,
              Admission_Date: date,
              Tc_Available: tcStatus,
              Aadhar_Available: aadharStatus,
              House: house,
              Image: imgUrl,
              TC: tcUrl,
              Aadhar: aadharUrl,
              created: Timestamp.now(),
              Fees: classFee,
              Transport_Fee: transportFee,
            }
          )
            .then(async () => {
              const sessionRef = doc(
                db,
                `users/${a.user}/sessions/${a.session}/classes/${className}/sections/`,
                sectionName
              );
              const classRef = doc(
                db,
                `users/${a.user}/sessions/${a.session}/classes/`,
                className
              );

              const sesSnap = await getDoc(sessionRef);
              const classSnap = await getDoc(classRef);

              if (sesSnap.exists() && classSnap.exists()) {
                await updateDoc(classRef, {
                  Strength: classSnap.data().Strength + 1,
                });
                await updateDoc(sessionRef, {
                  Strength: sesSnap.data().Strength + 1,
                });
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            .then(() => {
              createAccount();
            })
            .then(() => {
              createDues();
            })
            .then(async () => {
              await setDoc(
                doc(
                  db,
                  `users/${a.user}/sessions/${a.session}/AllStudents`,
                  sr
                ),
                {
                  Sr_Number: sr,
                  ID: id,
                  Class: className,
                  Section: sectionName,
                  name: name,
                  Father_Name: fName,
                  Mother_Name: mName,
                  Date_Of_Birth: dob,
                  Mobile_Number: mobile,
                  Father_Mobile_Number: fmobile,
                  Religion: religion,
                  Age: age,
                  File_Number: file,
                  Pen: pen,
                  Subject1: subject1,
                  Subject2: subject2,
                  Subject3: subject3,
                  Subject4: subject4,
                  Subject5: subject5,
                  Subject6: subject6,
                  Third_Ward: ward,
                  Additional_Subject: addSub,
                  Address: address,
                  Transport_Status: transportStatus,
                  BusStop_Name: busStopName,
                  Category: category,
                  Caste: caste,
                  Place: place,
                  City: city,
                  PinCode: pincode,
                  Gender: gender,
                  Last_School: lSchool,
                  Last_School_Address: lSchoolAdd,
                  Last_School_Board: lSchoolBoard,
                  Last_School_Result: lSchoolResult,
                  RTE_Status: rteStatus,
                  Admission_Date: date,
                  Tc_Available: tcStatus,
                  Aadhar_Available: aadharStatus,
                  House: house,
                  Image: imgUrl,
                  TC: tcUrl,
                  Aadhar: aadharUrl,
                  created: Timestamp.now(),
                  fees: classFee,
                }
              );
            })
            .then(() => {
              alert("student regestered successfully");
              router.reload();
            });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  // const [count, setCount] = useState(0);
  const [status, setStatus] = useState("idle");
  const [indivisualPercent, setIndivisualPercent] = useState(0);

  const [studentList, setStudentList] = useState([{}]);

  const ImportFromSession = async ({ session }) => {
    setStatus("started");
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${session}/AllStudents`
    );

    var list = [];
    const docSnap = await getDocs(docRef);
    docSnap.forEach((doc) => {
      list.push(doc.data());
    });

    setStudentList(list);
  };

  console.log(studentList);

  const [count, setCount] = useState(0);

  const handleImport = async ({ session }) => {
    setStatus("Importing Stated");

    var total = studentList.length;

    studentList
      ?.filter((e) => e.Deleted === false || e.Deleted === undefined)
      .forEach(async (e) => {
        setStatus("Importing " + e.Sr_Number);
        const newClass =
          e.Class === "NRY"
            ? "LKG"
            : e.Class === "LKG"
              ? "UKG"
              : e.Class === "UKG"
                ? "I"
                : e.Class === "I"
                  ? "II"
                  : e.Class === "II"
                    ? "III"
                    : e.Class === "III"
                      ? "IV"
                      : e.Class === "IV"
                        ? "V"
                        : e.Class === "V"
                          ? "VI"
                          : e.Class === "VI"
                            ? "VII"
                            : e.Class === "VII"
                              ? "VIII"
                              : e.Class === "VIII"
                                ? "IX"
                                : e.Class === "IX"
                                  ? "X"
                                  : e.Class === "X"
                                    ? "XI"
                                    : e.Class === "XI"
                                      ? "XII"
                                      : "NRY";

        // const cfees = await GetNewClassFee(newClass);
        // const tfees = await GetNewTransportFee(e.BusStop_Name);

        try {
          //   var oldSr = [];
          //   try {
          //     const q = query(
          //       collection(
          //         db,
          //         `users/${a.user}/sessions/${a.session}/classes/${newClass}/sections/${e.Section}/students`
          //       ),
          //       where("Sr_Number", "==", e.Sr_Number)
          //     );

          //     const querySnapshot = await getDocs(q);
          //     querySnapshot.forEach((doc) => {
          //       oldSr.push(doc.data().Sr_Number);
          //     });
          //   } catch {}

          // if (oldSr.length >= 1) {
          //   console.log("SID already exist");
          // } else {
          try {
            // await setDoc(
            //   doc(
            //     db,
            //     `users/${a.user}/sessions/${a.session}/classes/${newClass}/sections/${e.Section}/students`,
            //     e.Sr_Number
            //   ),
            //   {
            //     Sr_Number: e.Sr_Number,
            //     ID: e.ID,
            //     Class: newClass,
            //     Section: e.Section,
            //     name: e.name,
            //     Father_Name: e.Father_Name,
            //     Mother_Name: e.Mother_Name,
            //     Religion: e.Religion,
            //     Date_Of_Birth: e.Date_Of_Birth,
            //     Mobile_Number: e.Mobile_Number,
            //     Father_Mobile_Number: e.Father_Mobile_Number,
            //     Age: e.Age,
            //     Address: e.Address,
            //     Transport_Status: e.Transport_Status,
            //     BusStop_Name: e.BusStop_Name,
            //     Category: e.Category,
            //     Caste: e.Caste,
            //     Third_Ward: e.Third_Ward,
            //     Place: e.Place,
            //     City: e.City,
            //     Additional_Subject: e.Additional_Subject,
            //     PinCode: e.PinCode,
            //     Gender: e.Gender,
            //     Last_School: e.Last_School,
            //     Last_School_Address: e.Last_School_Address,
            //     Last_School_Board: e.Last_School_Board,
            //     Last_School_Result: e.Last_School_Result,
            //     RTE_Status: e.RTE_Status,
            //     Admission_Date: e.Admission_Date ?? Timestamp.now(),
            //     Tc_Available: e.Tc_Available,
            //     Aadhar_Available: e.Aadhar_Available,
            //     House: e.House,
            //     Image: e.Image,
            //     TC: e.TC,
            //     Aadhar: e.Aadhar,
            //     created: Timestamp.now(),
            //     Fees:
            //       e.RTE_Status === "Yes" || e.Third_Ward === "Yes"
            //         ? 0
            //         : cfees,
            //     Transport_Fee: e.Transport_Status === "Yes" ? tfees : 0,
            //   },
            //   { merge: true }
            // )
            // .then(async () => {
            //   const sessionRef = doc(
            //     db,
            //     `users/${a.user}/sessions/${a.session}/classes/${newClass}/sections/`,
            //     e.Section
            //   );
            //   const classRef = doc(
            //     db,
            //     `users/${a.user}/sessions/${a.session}/classes/`,
            //     newClass
            //   );

            //   const sesSnap = await getDoc(sessionRef);
            //   const classSnap = await getDoc(classRef);

            //   if (sesSnap.exists() && classSnap.exists()) {
            //     await updateDoc(
            //       classRef,
            //       {
            //         Strength: classSnap.data().Strength + 1,
            //       },
            //       { merge: true }
            //     );
            //     await updateDoc(
            //       sessionRef,
            //       {
            //         Strength: sesSnap.data().Strength + 1,
            //       },
            //       { merge: true }
            //     );
            //   } else {
            //     // doc.data() will be undefined in this case
            //     console.log("No such document!");
            //   }
            // })
            // .then(async () => {
            // try {
            //   const docRef = doc(
            //     db,
            //     `users/${a.user}/sessions/${a.session}/studentsAccount`,
            //     e.Sr_Number
            //   );
            //   await setDoc(
            //     docRef,
            //     {
            //       Anual_Fee: 5000,
            //       Class_Fee:
            //         e.RTE_Status === "Yes" || e.Third_Ward === "Yes"
            //           ? 0
            //           : cfees,
            //       transportfees: e.Transport_Status === "Yes" ? tfees : 0,
            //     },
            //     { merge: true }
            //   );
            // } catch (error) {
            //   console.log("Error adding document: ", error);
            // }
            // })
            // .then(() => {
            var total = 0;
            months.forEach(async (ed) => {
              try {
                const docRef = doc(
                  db,
                  `users/${a.user}/sessions/${a.session}/classes/${newClass}/sections/${e.Section}/due/${ed}/students`,
                  e.Sr_Number
                );

                // console.log(e.Sr_Number, docRef);
                await updateDoc(
                  docRef,
                  {
                    // month: ed,
                    // month_Due:
                    //   e.RTE_Status === "Yes" || e.Third_Ward === "Yes"
                    //     ? 0
                    //     : cfees * (months.indexOf(ed) + 1),
                    // transport_due: CalculatTransport(
                    //   ed,
                    //   tfees,
                    //   months.indexOf(ed) + 1
                    // ),
                    name: e.name,
                    class: newClass,
                    section: e.Section,
                    father_name: e.Father_Name,
                    Place: e.Place,
                    Address: e.Address,
                    Mobile: e.Mobile_Number,
                    Sr_Number: e.Sr_Number,
                    // total:
                    //   rteStatus === "Yes" || ward === "Yes"
                    //     ? 0
                    //     : cfees * (months.indexOf(ed) + 1) +
                    //       CalculatTransport(e, tfees, months.indexOf(ed) + 1),
                  },
                  {
                    merge: true,
                  }
                );
                // .then(async () => {
                //   const dueRef = doc(
                //     db,
                //     `users/${a.user}/sessions/${session}/classes/${newClass}/sections/${e.Section}/due/`,
                //     ed
                //   );
                //   const dueRefSet = doc(
                //     db,
                //     `users/${a.user}/sessions/${a.session}/classes/${newClass}/sections/${e.Section}/due/`,
                //     ed
                //   );
                //   const Snap = await getDoc(dueRef);

                //   if (Snap.exists()) {
                //     await updateDoc(
                //       dueRefSet,
                //       {
                //         total_Due:
                //           Snap.data().total_Due +
                //           (rteStatus === "Yes"
                //             ? 0
                //             : cfees * (months.indexOf(ed) + 1)) +
                //           (ed === "June"
                //             ? 0
                //             : tfees * (months.indexOf(ed) + 1)),
                //       },
                //       { merge: true }
                //     );
                //   } else {
                //     await setDoc(
                //       dueRefSet,
                //       {
                //         total_Due:
                //           (e.RTE_Status === "Yes" || e.Third_Ward === "Yes"
                //             ? 0
                //             : cfees * (months.indexOf(ed) + 1)) +
                //           (ed === "June"
                //             ? 0
                //             : tfees * (months.indexOf(ed) + 1)),
                //       },
                //       { merge: true }
                //     );
                //   }
                // });
              } catch (ec) {
                console.log(ec);
              }
            });
            // })
            // .then(async () => {
            //   await setDoc(
            //     doc(
            //       db,
            //       `users/${a.user}/sessions/${a.session}/AllStudents`,
            //       e.Sr_Number
            //     ),
            //     {
            //       Sr_Number: e.Sr_Number,
            //       ID: e.ID,
            //       Class: newClass,
            //       Section: e.Section,
            //       name: e.name,
            //       Father_Name: e.Father_Name,
            //       Mother_Name: e.Mother_Name,
            //       Religion: e.Religion,
            //       Date_Of_Birth: e.Date_Of_Birth,
            //       Mobile_Number: e.Mobile_Number,
            //       Father_Mobile_Number: e.Father_Mobile_Number,
            //       Age: e.Age,
            //       Address: e.Address,
            //       Transport_Status: e.Transport_Status,
            //       BusStop_Name: e.BusStop_Name,
            //       Category: e.Category,
            //       Caste: e.Caste,
            //       Third_Ward: e.Third_Ward,
            //       Place: e.Place,
            //       City: e.City,
            //       Additional_Subject: e.Additional_Subject,
            //       PinCode: e.PinCode,
            //       Gender: e.Gender,
            //       Last_School: e.Last_School,
            //       Last_School_Address: e.Last_School_Address,
            //       Last_School_Board: e.Last_School_Board,
            //       Last_School_Result: e.Last_School_Result,
            //       RTE_Status: e.RTE_Status,
            //       Admission_Date: e.Admission_Date ?? Timestamp.now(),
            //       Tc_Available: e.Tc_Available,
            //       Aadhar_Available: e.Aadhar_Available,
            //       House: e.House,
            //       Image: e.Image,
            //       TC: e.TC,
            //       Aadhar: e.Aadhar,
            //       created: Timestamp.now(),
            //       Fees:
            //         e.RTE_Status === "Yes" || e.Third_Ward === "Yes"
            //           ? 0
            //           : cfees,
            //       Transport_Fee: e.Transport_Status === "Yes" ? tfees : 0,
            //     },
            //     {
            //       merge: true,
            //     }
            //   );
            // })
            // .then(() => {
            //   setCount(count + 1);

            //   // router.reload();
            // });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          // }
        } catch (e) {
          console.log(e);
        }
      });
  };

  const GetNewClassFee = async (newClass) => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/classes`,
        newClass
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        return docSnap.data().Class_Fee;
      } else {
        return 0;
      }
    } catch (e) {
      console.log("class value missing");
      console.log(e);
      return 0;
    }
  };

  const GetNewTransportFee = async (busStopName) => {
    console.log(busStopName);
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/stops`,
        busStopName
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        return docSnap.data().Stop_Fee ?? 0;
      } else {
        return 0;
      }
    } catch (e) {
      console.log("plese Select bus stop first");
      console.log(e);
      return 0;
    }
  };

  const MigrateOldFeeFromSession = async ({ session }) => {
    setIsLoading(true);
    studentList
      .filter((e) => e.Deleted === false || e.Deleted === undefined)
      .forEach(async (e) => {
        const newClass =
          e.Class === "NRY"
            ? "LKG"
            : e.Class === "LKG"
              ? "UKG"
              : e.Class === "UKG"
                ? "I"
                : e.Class === "I"
                  ? "II"
                  : e.Class === "II"
                    ? "III"
                    : e.Class === "III"
                      ? "IV"
                      : e.Class === "IV"
                        ? "V"
                        : e.Class === "V"
                          ? "VI"
                          : e.Class === "VI"
                            ? "VII"
                            : e.Class === "VII"
                              ? "VIII"
                              : e.Class === "VIII"
                                ? "IX"
                                : e.Class === "IX"
                                  ? "X"
                                  : e.Class === "X"
                                    ? "XI"
                                    : e.Class === "XI"
                                      ? "XII"
                                      : "OLD";

        var marchFee = 0;
        var oldoldDues = 0;
        var AdmissionFee = 0;
        var otherDues = 0;
        var examDues = 0;
        try {
          const docRefMarch = doc(
            db,
            `users/${a.user}/sessions/${session}/classes/${e.Class}/sections/${e.Section}/due/March/students`,
            e.Sr_Number
          );

          const docSnapMarch = await getDoc(docRefMarch);
          if (docSnapMarch.exists) {
            marchFee =
              docSnapMarch.data()?.month_Due === undefined ||
                docSnapMarch.data()?.month_Due == NaN ||
                docSnapMarch.data()?.transport_due == NaN ||
                docSnapMarch.data()?.transport_due == undefined
                ? 0
                : Number(
                  docSnapMarch.data().month_Due > 0
                    ? docSnapMarch.data().month_Due
                    : 0
                ) +
                  +Number(
                    docSnapMarch.data().transport_due > 0
                      ? docSnapMarch.data().transport_due
                      : 0
                  ) >
                  0
                  ? Number(
                    docSnapMarch.data().month_Due > 0
                      ? docSnapMarch.data().month_Due
                      : 0
                  ) +
                  +Number(
                    docSnapMarch.data().transport_due > 0
                      ? docSnapMarch.data().transport_due
                      : 0
                  )
                  : 0;
            console.log(docSnapMarch.data());
          } else {
            marchFee = 0;
          }

          const docRefOldDues = doc(
            db,
            `users/${a.user}/sessions/${session}/classes/${e.Class}/sections/${e.Section}/due/OldDues/students`,
            e.Sr_Number
          );

          const docSnapOldDues = await getDoc(docRefOldDues);

          if (docSnapOldDues.exists) {
            oldoldDues =
              docSnapOldDues.data()?.total === undefined ||
                docSnapOldDues.data()?.total == NaN
                ? 0
                : docSnapOldDues.data().total > 0
                  ? docSnapOldDues.data().total
                  : 0;
            console.log(docSnapOldDues.data());
          }

          const docRefAdmission = doc(
            db,
            `users/${a.user}/sessions/${session}/classes/${e.Class}/sections/${e.Section}/due/Admission/students`,
            e.Sr_Number
          );

          const docSnapAdmission = await getDoc(docRefAdmission);

          if (docSnapAdmission.exists) {
            AdmissionFee =
              docSnapAdmission.data()?.total === undefined ||
                docSnapAdmission.data()?.total == NaN
                ? 0
                : docSnapAdmission.data().total > 0
                  ? docSnapAdmission.data().total
                  : 0;
            console.log(docSnapAdmission.data());
          }

          const docRefOtherDues = doc(
            db,
            `users/${a.user}/sessions/${session}/classes/${e.Class}/sections/${e.Section}/due/otherDue/Third Ward Fee/Third Ward Fee/students`,
            e.Sr_Number
          );

          const docSnapOtherDues = await getDoc(docRefOtherDues);

          if (docSnapOtherDues.exists) {
            otherDues =
              docSnapOtherDues.data()?.total === undefined ||
                docSnapOtherDues.data()?.total == NaN
                ? 0
                : docSnapOtherDues.data().total > 0
                  ? docSnapOtherDues.data().total
                  : 0;

            console.log(docSnapOtherDues.data());
          }

          const docRefExamDues = doc(
            db,
            `users/${a.user}/sessions/${session}/classes/${e.Class}/sections/${e.Section}/due/Exam/students`,
            e.Sr_Number
          );

          const docSnapExamDues = await getDoc(docRefExamDues);

          if (docSnapExamDues.exists) {
            examDues =
              docSnapExamDues.data()?.total === undefined ||
                docSnapExamDues.data()?.total == NaN
                ? 0
                : docSnapExamDues.data().total > 0
                  ? docSnapExamDues.data().total
                  : 0;
            console.log(docSnapExamDues.data());
          }

          console.log(
            Number(oldoldDues) +
            Number(marchFee) +
            Number(AdmissionFee) +
            Number(otherDues) +
            Number(examDues)
          );

          await setDoc(
            doc(
              db,
              `users/${a.user}/sessions/${a.session}/classes/${newClass}/sections/${e.Section}/due/OldDues/students`,
              e.Sr_Number
            ),
            {
              month: "OldDues",
              month_Due:
                Number(oldoldDues) +
                Number(marchFee) +
                Number(AdmissionFee) +
                Number(otherDues) +
                Number(examDues),
              name: e.name,
              class: newClass,
              section: e.Section,
              father_name: e.Father_Name,
              Place: e.Place,
              Address: e.Address,
              Mobile: e.Mobile_Number,
              Sr_Number: e.Sr_Number,
              total:
                Number(oldoldDues) +
                Number(marchFee) +
                Number(AdmissionFee) +
                Number(otherDues) +
                Number(examDues),
            }
          );
        } catch (e) {
          console.log(e);
        }

        setCount(count + 1);
      });
    setIsLoading(false);
  };

  const [uncroppedImage, setUncroppedImage] = useState();
  const [imageClicked, setImageClicked] = useState(false);

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
    console.log(dataUri);

    const res = dataURLtoBlob(dataUri);

    setUncroppedImage(dataUri);

    setImageClicked(true);


    // setImage(res);
  }



  console.log(image);

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }


  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = async(croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)

    const croppedImage = await GetCroppedImg(
      uncroppedImage,croppedAreaPixels,rotation
    )
    console.log("cropped", croppedImage);
    const res = dataURLtoBlob(croppedImage)
    setImage(res);
    console.log("res",res);
  }

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-screen">
          <div className="w-96 h-96 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Importing Data</h1>
            <div className="w-full h-1 bg-gray-200 my-2">
              <div
                className="h-1 bg-blue-500"
                style={{ width: `${(count / studentList.length) * 100}%` }}
              ></div>
            </div>
            <h1 className="text-xl font-bold">{status}</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-auto`}>
      <>
        <CModal
          alignment="center"
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">
              Click Picture
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            {!imageClicked ? <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);

              }}
            /> : <div className="w-full h-[400px]">
              <Cropper
                image={uncroppedImage}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={4 / 4}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              /></div>

            }
          </CModalBody>

          <CModalFooter>
            <CButton
              disabled={image === "nil"}
              color={image === "nil" ? "secondary" : "primary"}
              onClick={() => {
                handleUpload(image);
              }}
            >
              Upload
            </CButton>
            <CButton
              
              color="secondary" 
              onClick={() => {
                setImageClicked(false);
                setUncroppedImage(null);
                setImage(null);
              }}
            >
              Discard
            </CButton>
          </CModalFooter>
        </CModal>
      </>
      {/* {isCamera && (
        <div className="absolute w-screen h-screen flex justify-center items-start overflow-hidden z-50 bg-gray-50/80 ">
          <Camera
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri);
            }}
          />
        </div>
      )} */}
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen  bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              {/* <h1 className="text-center text-xl w-full flex ">
                Want to Migrate Data : {"  "}
                <button
                  className="font-bold"
                  onClick={async () => {
                    if (!confirm("Are you sure you want to migrate data?")) {
                      return;
                    }

                    if (!confirm("Caution! The Action is Irreplaceable.")) {
                      return;
                    }
                    if (
                      !confirm("Do you reload the page after session change?")
                    ) {
                      return;
                    }

                    if (!a.user || a.session === "2021-2022") {
                      alert("Please select a session or relogin");
                      return;
                    }

                    setIsLoading(true);
                    await ImportFromSession({ session: "2023-2024" });
                    setIsLoading(false);
                  }}
                >
                  Click Here
                </button>
                <button
                  onClick={async () => {
                    setIsLoading(true);
                    // await handleImport({ session: "2023-2024" });
                    await MigrateOldFeeFromSession({ session: "2023-2024" });
                    setIsLoading(false);
                  }}
                >
                  start
                </button>
              </h1> */}

              <h1 className="text-center font-bold text-2xl">
                New Student Details
              </h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <section class="flex items-center justify-center max-w-fit mx-auto pb-10">
                  <input
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                    id="company"
                    type="file"
                    placeholder="1111"
                  />
                  {a.user && (
                    <button
                      onClick={() => {
                        handleUpload(image);
                      }}
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Upload
                    </button>
                  )}
                </section>

                <div className="flex items-center justify-center max-w-fit mx-auto pb-10">
                  <img
                    onClick={() => setVisible(!visible)}
                    className="w-52 h-52 rounded-full cursor-pointer "
                    src={imgUrl}
                  />
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Student ID *
                    </label>
                    <input
                      onChange={(e) => {
                        setSr(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="1111"
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Student Sr*
                    </label>
                    <input
                      onChange={(e) => {
                        setId(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="student sr"
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="department"
                    >
                      Admission Date
                    </label>
                    <div>
                      <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                        <DatePicker
                          selected={date}
                          onChange={(e) => setDate(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Student Name
                    </label>
                    <input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="student name"
                    />
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Student Father's Name
                    </label>
                    <input
                      onChange={(e) => {
                        setFName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="father's Name"
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Student Mother's Name
                    </label>
                    <input
                      onChange={(e) => {
                        setMName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="mother's Name"
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Student Date Of Birth
                    </label>
                    <input
                      onChange={(e) => {
                        setDob(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="Whatsapp Number"
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Student's Mobile Number
                    </label>
                    <input
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="Whatsapp Number"
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Father's Mobile Number
                    </label>
                    <input
                      onChange={(e) => {
                        setFMobile(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Father's Number For Message"
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Pen Number
                    </label>
                    <input
                      onChange={(e) => {
                        setPen(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="PEN Number"
                    />
                  </div>
                </div>

                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Class*
                    </label>
                    <div>
                      <select
                        onClick={() => {
                          GetClassList();
                        }}
                        onChange={(e) => {
                          setClassName(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>Please Select</option>
                        {classList.map((e, index) => {
                          return <option key={index}>{e.Name}</option>;
                        })}
                      </select>
                    </div>
                  </div>

                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="department"
                    >
                      Section
                    </label>
                    <div>
                      <select
                        onClick={() => {
                          GetClassFee();
                        }}
                        onChange={(e) => {
                          setSectionName(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="department"
                      >
                        <option>Please Select</option>
                        {sectionList.map((e, index) => {
                          return <option key={index}>{e.Name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Transport Status*
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setTransportStatus(e.target.value);
                          GetStopList();
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>Please Select</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>

                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="department"
                    >
                      Bus Stop Name
                    </label>
                    <div>
                      {transportStatus.valueOf() == "Yes" && (
                        <select
                          onChange={(e) => {
                            setBusStopName(e.target.value);
                          }}
                          class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                          id="department"
                        >
                          <option>Please Select</option>
                          {stopList.map((e, index) => {
                            return <option key={index}>{e.Stop_Name}</option>;
                          })}
                        </select>
                      )}
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="department"
                    >
                      Select House
                    </label>
                    <div>
                      <select
                        onClick={() => {
                          GetHouseList();
                          GetTransportFee();
                        }}
                        onChange={(e) => {
                          setHouse(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="department"
                      >
                        <option>Please Select</option>
                        {houseList.map((e, index) => {
                          return <option key={index}>{e.Name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Religion
                    </label>
                    <input
                      onChange={(e) => {
                        setReligion(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="Religion"
                    />
                  </div>
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Category
                    </label>
                    <input
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="Category"
                    />
                  </div>
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Caste
                    </label>
                    <input
                      onChange={(e) => {
                        setCaste(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="Caste"
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Subject 1
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setSubject1(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>No Subject</option>
                        <option>Hindi</option>
                        <option>English</option>
                        <option>Hindi Core</option>
                        <option>English Core</option>
                      </select>
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Subject 2
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setSubject2(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>No Subject</option>
                        <option>Hindi</option>
                        <option>English</option>
                        <option>Hindi Core</option>
                        <option>English Core</option>
                      </select>
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Subject 3
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setSubject3(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>No Subject</option>
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>Social Science</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                        <option>History</option>
                        <option>Political Science</option>
                        <option>Economics</option>
                        <option>Accountancy</option>
                        <option>Business Studies</option>
                        <option>Geography</option>
                        <option>Computer Science</option>
                        <option>Physical Education</option>
                        <option>Information Technology</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Subject 4
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setSubject4(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>No Subject</option>
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>Social Science</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                        <option>History</option>
                        <option>Political Science</option>
                        <option>Economics</option>
                        <option>Accountancy</option>
                        <option>Business Studies</option>
                        <option>Geography</option>
                        <option>Computer Science</option>
                        <option>Physical Education</option>
                        <option>Information Technology</option>
                      </select>
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Subject 5
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setSubject5(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>No Subject</option>
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>Social Science</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                        <option>History</option>
                        <option>Political Science</option>
                        <option>Economics</option>
                        <option>Accountancy</option>
                        <option>Business Studies</option>
                        <option>Geography</option>
                        <option>Computer Science</option>
                        <option>Physical Education</option>
                        <option>Information Technology</option>
                      </select>
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Subject 6
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setSubject6(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>No Subject</option>
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>Social Science</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                        <option>History</option>
                        <option>Political Science</option>
                        <option>Economics</option>
                        <option>Accountancy</option>
                        <option>Business Studies</option>
                        <option>Geography</option>
                        <option>Computer Science</option>
                        <option>Physical Education</option>
                        <option>Information Technology</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Additional SUBJECT
                    </label>
                    <select
                      onChange={(e) => {
                        setAddSub(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="address"
                    >
                      <option>Please Select</option>
                      <option>Compter </option>
                      <option>Computer Science</option>
                      <option>Physical Education</option>
                    </select>
                  </div>
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Third Ward
                    </label>
                    <select
                      onChange={(e) => {
                        setWard(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="address"
                    >
                      <option>Please Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Village / Town
                    </label>
                    <input
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="Village / Town"
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Post
                    </label>
                    <input
                      onChange={(e) => {
                        setPlace(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="Post"
                    />
                  </div>
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      District
                    </label>
                    <input
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="District"
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Pin-Code
                    </label>
                    <input
                      onChange={(e) => {
                        setPincode(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="Pin-Code"
                    />
                  </div>

                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="department"
                    >
                      Gender
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="department"
                      >
                        <option>Please Select</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Last School
                    </label>
                    <input
                      onChange={(e) => {
                        setLSchool(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="Last School"
                    />
                  </div>
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Last School Address
                    </label>
                    <input
                      onChange={(e) => {
                        setLSchoolAdd(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="Last School Address"
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Last School Board
                    </label>
                    <input
                      onChange={(e) => {
                        setLSchoolBoard(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="Last School Board"
                    />
                  </div>
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      result of previous class
                    </label>
                    <input
                      onChange={(e) => {
                        setLSchoolResult(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="Pass / Fail"
                    />
                  </div>
                </div>

                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      TC Status*
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setTcStatus(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>Please Select</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>

                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      File Number
                    </label>
                    <input
                      onChange={(e) => {
                        setFile(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="student name"
                    />
                  </div>

                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="department"
                    >
                      RTE Status
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setRteStatus(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="department"
                      >
                        <option>Please Select</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Upload TC*
                    </label>
                    <div>
                      {tcStatus.valueOf() == "Yes" && (
                        <>
                          <input
                            onChange={(e) => {
                              setTcFile(e.target.files[0]);
                            }}
                            type="file"
                            class="w-auto bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                            id="location"
                          />
                          <button
                            onClick={(e) => {
                              handleUploadTc(tcFile);
                            }}
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                          >
                            Upload
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="job-type"
                    >
                      Aadhar Available
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setAadharStatus(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="job-type"
                      >
                        <option>Please Select</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="department"
                    >
                      Aadhar Number*
                    </label>
                    <div>
                      {aadharStatus.valueOf() == "Yes" && (
                        <>
                          <input
                            onChange={(e) => {
                              setAadharUrl(e.target.value);
                            }}
                            type="text"
                            class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                            id="location"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>

                  <div class="md:w-1/2 px-3">
                    {/* class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" */}
                    <div>
                      <button
                        onClick={() => {
                          submitForm();
                        }}
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full  border border-gray-200  text-sm  pr-8 mb-3 hover:scale-105"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div class="-mx-3 md:flex mt-2">
                
              </div> */
}