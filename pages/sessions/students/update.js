'use client'

import {
  FieldValue,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useState, useCallback } from "react";
import Nav from "../../../components/navbar";
import Header from "../../../components/dropdown";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import UserContext from "../../../components/context/userContext";
import { async } from "@firebase/util";
import { Input } from "postcss";
import DatePicker from "react-datepicker";
import "@coreui/coreui/dist/css/coreui.min.css";
import "react-html5-camera-photo/build/css/index.css";

import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseClassStream } from "../../../lib/firebase_read";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import Camera from "react-html5-camera-photo";
import Cropper from 'react-easy-crop'
import GetCroppedImg from "../../../utils/croppedImage";
// import GetCroppedImg from "./croppedImage";


export default function NewStudent() {
  const router = useRouter();
  const s = router.query;
  const [sr, setSr] = useState(s.Sr_Number);
  const [name, setName] = useState(s.name);
  const [fName, setFName] = useState(s.Father_Name);
  const [mName, setMName] = useState(s.Mother_Name);
  const [id, setId] = useState(s.ID);
  const [mobile, setMobile] = useState(s.Mobile_Number);
  const [fmobile, setFMobile] = useState(s.Father_Mobile_Number);
  const [age, setAge] = useState(s.Age);
  const [pen, setPen] = useState(s.Pen);
  const [file, setFile] = useState(s.File_Number);
  const [address, setAddress] = useState(s.Address);
  const [ward, setWard] = useState(s.Third_Ward);
  const [wardTemp, setWardTemp] = useState(s.Third_Ward);
  const [addSub, setAddSub] = useState(s.Additional_Subject);
  const [className, setClassName] = useState(s.Class);
  const [classNameTemp, setClassNameTemp] = useState(s.Class);
  const [sectionName, setSectionName] = useState(s.Section);
  const [sectionNameTemp, setSectionNameTemp] = useState(s.Section);
  const [transportStatus, setTransportStatus] = useState(s.Transport_Status);
  const [transportStatusTemp, setTransportStatusTemp] = useState(
    s.Transport_Status
  );
  const [busStopName, setBusStopName] = useState(s.BusStop_Name);
  const [busStopNameTemp, setBusStopNameTemp] = useState(s.BusStop_Name);
  // const [busNumber, setBusNumber] = useState("NaN");
  const [category, setCategory] = useState(s.Category);
  const [caste, setCaste] = useState(s.Caste);
  const [religion, setReligion] = useState(s.Religion);
  const [place, setPlace] = useState(s.Place);
  const [city, setCity] = useState(s.City);
  const [pincode, setPincode] = useState(s.PinCode);
  const [gender, setGender] = useState(s.Gender);
  const [lSchool, setLSchool] = useState(s.Last_School);
  const [lSchoolAdd, setLSchoolAdd] = useState(s.Last_School_Address);
  const [lSchoolBoard, setLSchoolBoard] = useState(s.Last_School_Board);
  const [lSchoolResult, setLSchoolResult] = useState(s.Last_School_Result);
  const [tcStatus, setTcStatus] = useState(s.Tc_Available);
  const [rteStatus, setRteStatus] = useState(s.RTE_Status);
  const [rteStatusTemp, setRteStatusTemp] = useState(s.RTE_Status);
  const [admissionDay, setAdmissionDay] = useState("");
  const [admissionMonth, setAdmissionMonth] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [aadharStatus, setAadharStatus] = useState(s.Aadhar_Available);
  const [house, setHouse] = useState(s.House);
  const [visible, setVisible] = useState(false);
  const [subject1, setSubject1] = useState(s.Subject1 ?? "no subject");
  const [subject2, setSubject2] = useState(s.Subject2 ?? "no subject");
  const [subject3, setSubject3] = useState(s.Subject3 ?? "no subject");
  const [subject4, setSubject4] = useState(s.Subject4 ?? "no subject");
  const [subject5, setSubject5] = useState(s.Subject5 ?? "no subject");
  const [subject6, setSubject6] = useState(s.Subject6 ?? "no subject");

  const [tcFile, setTcFile] = useState("nil");
  const [aadharFile, setAadharFile] = useState("nil");
  const [image, setImage] = useState("nil");

  const [imgUrl, setImgUrl] = useState(s.Image);
  const [tcUrl, setTcUrl] = useState("nil");
  const [aadharUrl, setAadharUrl] = useState(s.Aadhar);

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

  const d = `${current.getDate()}-${current.getMonth() + 1
    }-${current.getFullYear()}`;

  const [date, setDate] = useState();
  const [dateTemp, setDateTemp] = useState();
  const [dob, setDob] = useState(s.Date_Of_Birth);
  // console.log("test:", date);
  const getDate = useCallback(async () => {
    try {
      const docRef = doc(
        db,
        `users/${a.user}/sessions/${a.session}/classes/${classNameTemp}/sections/${sectionName}/students`,
        sr
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log(docSnap.data().Admission_Date.seconds);
        // console.log("exist");
        setDate(docSnap.data().Admission_Date.seconds * 1000);
        setDateTemp(docSnap.data().Admission_Date);
      }
    } catch (e) {
      console.log(e);
    }
  }, [a.user, a.session, classNameTemp, sectionName, sr]);

  const [isLoading, setIsLoading] = useState(false);

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
    // console.log(transportFee);
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
        }, {
          merge: true
        }).then(async () => {
          const dueRef = doc(
            db,
            `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/due/`,
            e
          );
          const Snap = await getDoc(dueRef);

          if (Snap.exists()) {
            await updateDoc(
              dueRef,
              {
                total_Due:
                  Snap.data().total_Due +
                  (rteStatus === "Yes"
                    ? 0
                    : classFee * (months.indexOf(e) + 1)) +
                  (e === "June" ? 0 : transportFee * (months.indexOf(e) + 1)),
              },
              { merge: true }
            );
          } else {
            await setDoc(dueRef, {
              total_Due:
                (rteStatus === "Yes" ? 0 : classFee * (months.indexOf(e) + 1)) +
                (e === "June" ? 0 : transportFee * (months.indexOf(e) + 1)),
            }, { merge: true });
          }
        });
      } catch (e) {
        alert(e.message);
      }
    });
  };
  const createAccount = async () => {
    const docRef = doc(
      db,
      `users/${a.user}/sessions/${a.session}/studentsAccount`,
      sr
    );

    const docRef2 = collection(
      db,
      `users/${a.user}/sessions/${a.session}/studentsAccount/${sr}/records`
    );
    const docRef3 = `users/${a.user}/sessions/${a.session}/studentsAccount/${sr}/records`;

    try {
      // console.log(5);
      const docSnap = await getDocs(docRef2);
      docSnap.forEach(async (docs) => {
        deleteDoc(doc(db, docRef3, docs.id));
      });

      // console.log(9);
      await setDoc(docRef, {
        Anual_Fee: 5000,
        Class_Fee: classFee,
        transportfees: transportFee,
      }, { merge: true });
    } catch (e) {
      alert(e.message);
    }
  };

  // console.log(transportFee,transportStatus,transportStatusTemp);
  const GetTransportFee = useCallback(async () => {
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
        }
      } catch (e) {
        alert("plese Select bus stop first");
      }
    }
  }, [transportStatus, a.user, a.session, busStopName]);

  // const GetClassList = async () => {
  //   const docRef = collection(
  //     db,
  //     `users/${a.user}/sessions/${a.session}/classes`
  //   );
  //   const docSnap = await getDocs(docRef);
  //   var list = [];
  //   docSnap.forEach((doc) => {
  //     list.push(doc.data());
  //   });
  //   setClassList(list);
  // };

  const {
    data: classList,
    error: classListError,
    isLoading: classListLoading,
  } = UseClassStream(a);

  const GetSectionList = useCallback(async () => {
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
  }, [className, a.user, a.session]);

  const GetHouseList = useCallback(async () => {
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
  }, [a.user, a.session]);

  const GetStopList = useCallback(async () => {
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
  }, [a.user, a.session]);

  useEffect(() => {
    GetTransportFee();
    GetHouseList();
    GetStopList();
  }, [GetTransportFee, GetHouseList, GetStopList]);

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
        async() => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
          });
          alert("Photo Cropped, Proceed to upload");

          setVisible(false);
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
    setIsLoading(true);
    console.log("Image URL",imgUrl);
    if (
      (!sr ||
        !name ||
        !fName ||
        !mName ||
        !dob ||
        !mobile ||
        !fmobile ||
        !age ||
        !pen ||
        !file ||
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
        if (className != classNameTemp || sectionName != sectionNameTemp) {
          await updateDoc(
            doc(
              db,
              `users/${a.user}/sessions/${a.session}/classes/${classNameTemp}/sections/${sectionNameTemp}/students`,
              sr
            ),
            {
              Deleted: true,
            }
          );

          months.forEach(async (e) => {
            try {
              const docRef = doc(
                db,
                `users/${a.user}/sessions/${a.session}/classes/${classNameTemp}/sections/${sectionNameTemp}/due/${e}/students`,
                sr
              );
              await updateDoc(docRef, {
                Deleted: true,
              });
            } catch (e) {
              alert(e.message);
            }
          });
        }

        // console.log(1);

        try {
          // console.log(className, classNameTemp);
          // console.log(7);

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
              Pen: pen,
              File_Number: file,
              Subject1: subject1,
              Subject2: subject2,
              Subject3: subject3,
              Subject4: subject4,
              Subject5: subject5,
              Subject6: subject6,
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
              Admission_Date: dateTemp,
              Tc_Available: tcStatus,
              Aadhar_Available: aadharStatus,
              House: house,
              Image: imgUrl,
              TC: tcUrl,
              Aadhar: aadharUrl,
              created: Timestamp.now(),
              Fees: classFee,
              Transport_Fee: transportFee,
            }, { merge: true }
          )
            .then(async () => {
              // console.log(2);
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
              if (
                ward != wardTemp ||
                rteStatus != rteStatusTemp ||
                className != classNameTemp ||
                transportStatus != transportStatusTemp ||
                busStopName != busStopNameTemp ||
                sectionName != sectionNameTemp
              ) {
                // console.log(3);
                createAccount();
              }
            })
            .then(() => {
              if (
                ward != wardTemp ||
                rteStatus != rteStatusTemp ||
                className != classNameTemp ||
                transportStatus != transportStatusTemp ||
                busStopNameTemp != busStopName ||
                sectionName != sectionNameTemp
              ) {
                // console.log(transportFee);
                createDues();
              }
            })
            .then(async () => {
              // console.log(5);
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
                  Pen: pen,
                  File_Number: file,
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
                  Admission_Date: dateTemp,
                  Tc_Available: tcStatus,
                  Aadhar_Available: aadharStatus,
                  House: house,
                  Image: imgUrl,
                  TC: tcUrl,
                  Aadhar: aadharUrl,
                  created: Timestamp.now(),
                  fees: classFee,
                }, { merge: true }
              );
            })
            .then(() => {
              alert("student Updated successfully");
              // router.reload();
            });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } catch (e) {
        alert(e.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
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
      mime = arr[0].match(/:(.*?);/)?.[1],
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

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)

    const croppedImage = await GetCroppedImg(
      uncroppedImage, croppedAreaPixels, rotation
    )
    console.log("cropped", croppedImage);
    const res = dataURLtoBlob(croppedImage)
    setImage(res);
    console.log("res", res);
  }

  useEffect(() => {
    // console.log("DATE : " + s.Admission_Date);
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
          console.log(docSnap.data());
        }
      } catch {
        // alert("class value missing");
        router.push("/sessions/students/viewStudent");
      }
    };

    getDate();
    GetSectionList();
    GetClassFee();
  }, [GetSectionList, a.session, a.user, className, getDate, router]);

  // useEffect(() => {
  //   console.log(date);
  // });

  return (
    <div className="h-auto">
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
              Crop
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
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen   py-20 px-12 lg:px-24 shadow-xl mb-24">
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
                  <img
                    className="w-52 h-52 rounded-full cursor-pointer"
                    onClick={() => setVisible(!visible)}
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
                      disabled
                      value={sr}
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
                      disabled
                      value={id}
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
                          onChange={(e) => {
                            // console.log("new", date);
                            setDate(e);
                            setDateTemp(e);
                          }}
                          dateFormat="dd/MM/yyyy"
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
                      value={name}
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
                      value={fName}
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
                      value={mName}
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
                      value={dob}
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
                      value={mobile}
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
                      value={fmobile}
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
                      value={pen}
                      onChange={(e) => {
                        setPen(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="Pen Number"
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
                        value={className}
                        onChange={(e) => {
                          setClassName(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>Please Select</option>
                        {classList?.map((e, index) => {
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
                        value={sectionName}
                        onChange={(e) => {
                          setSectionName(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="department"
                      >
                        <option>{sectionName}</option>
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
                        value={transportStatus}
                        onChange={(e) => {
                          setTransportStatus(e.target.value);
                          if (e.target.value === "No") {
                            setTransportFee(0);
                          }
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
                      {transportStatus == "Yes" && (
                        <select
                          value={busStopName}
                          onChange={(e) => {
                            setBusStopName(e.target.value);
                          }}
                          class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                          id="department"
                        >
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
                        value={house}
                        onChange={(e) => {
                          setHouse(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="department"
                      >
                        <option>{house}</option>
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
                      value={religion}
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
                      value={category}
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
                      value={caste}
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
                        value={subject1}
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
                        value={subject2}
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
                        value={subject3}
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
                        value={subject4}
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
                        value={subject5}
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
                        value={subject6}
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
                      value={addSub}
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
                      value={ward}
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
                      value={address}
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
                      value={place}
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
                      value={city}
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
                      value={pincode}
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
                        value={gender}
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
                      value={lSchool}
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
                      value={lSchoolAdd}
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
                      value={lSchoolBoard}
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
                      result of previos class
                    </label>
                    <input
                      value={lSchoolResult}
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
                        value={tcStatus}
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
                      value={file}
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
                        value={rteStatus}
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
                      {tcStatus == "Yes" && (
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
                        value={aadharStatus}
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
                      {aadharStatus == "Yes" && (
                        <>
                          <input
                            value={aadharUrl}
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
                          // console.log(gender);
                        }}
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full flex justify-center border border-gray-200  text-sm  pr-8 mb-3 hover:scale-105"
                      >
                        {!isLoading ? (
                          "Submit"
                        ) : (
                          <svg
                            class="h-12 w-12 animate-spin"
                            viewBox="3 3 18 18"
                          >
                            <path
                              class="fill-gray-200"
                              d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                            ></path>
                            <path
                              class="fill-gray-800"
                              d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                            ></path>
                          </svg>
                        )}
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