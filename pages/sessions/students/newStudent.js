import {
  FieldValue,
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
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

import "react-datepicker/dist/react-datepicker.css";

export default function NewStudent() {
  const router = useRouter();
  const [sr, setSr] = useState("");
  const [name, setName] = useState("");
  const [fName, setFName] = useState("");
  const [mName, setMName] = useState("");
  
  const [mobile, setMobile] = useState("");
  const [fmobile, setFMobile] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [ward, setWard] = useState("");
  const [addSub, setAddSub] = useState("");
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [transportStatus, setTransportStatus] = useState("");
  const [busStopName, setBusStopName] = useState("NaN");
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

  const [classFee, setClassFee] = useState();
  const [transportFee, setTransportFee] = useState(0);

  const a = useContext(UserContext);

  const current = new Date();
  const time = new Intl.DateTimeFormat("en-IN", { timeStyle: "medium" }).format(
    current.getTime()
  );

  const d = `${current.getDate()}-${
    current.getMonth() + 1
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
            rteStatus === "Yes" ? 0 : classFee * (months.indexOf(e) + 1),
          transport_due:
            e == "June"
              ? transportFee * 2
              : transportFee * (months.indexOf(e) + 1),
          name: name,
          class: className,
          section: sectionName,
          father_name: fName,
          Place: place,
          Mobile: mobile,
          Sr_Number: sr,
          total:
            (rteStatus === "Yes" || ward === "Yes" ? 0 : classFee * (months.indexOf(e) + 1)) +
            (e === "June" ? 0 : transportFee * (months.indexOf(e) + 1)),
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
      } catch {}
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
    } catch {
      alert("class value missing");
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
          console.log(transportFee);
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
      !sr ||
      !name ||
      !fName ||
      !mName ||
      !dob ||
      !mobile ||
      !fmobile ||
      !age ||
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
      !religion
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
      } catch {}

      if (oldSr.length >= 1) {
        alert("sr already exist");
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
              Address: address,
              Transport_Status: transportStatus,
              BusStop_Name: busStopName,
              Category: category,
              Caste: caste,
              Third_Ward: ward,
              Place: place,
              City: city,
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

  return (
    <div className="h-auto">
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen  bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">
                New Student Details
              </h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <section class="flex items-center justify-center max-w-fit mx-auto pb-10">
                  <input
                    onChange={(e) => {
                      setImage(e.target.files[0]);
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
                  <img className="w-52 h-52 rounded-full" src={imgUrl} />
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      SR Number *
                    </label>
                    <input
                      onChange={(e) => {
                        setSr(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="number"
                      placeholder="1111"
                    />
                  </div>
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
                </div>
                <div class="-mx-3 md:flex mb-6">
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
                    <div class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3">
                      <DatePicker selected={date} onChange={(e) => setDob(e)} />
                    </div>
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
                      Student's Age on 31-March-{current.getFullYear()}
                    </label>
                    <input
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="Age"
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
                        {classList.map((e,index) => {
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
                        {sectionList.map((e,index) => {
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
                          {stopList.map((e,index) => {
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
                        {houseList.map((e,index) => {
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
                      Last School Result
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
