import { async } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Nav from "../components/navbar";
import { auth, db, storage } from "../firebase";

export default function NewAssignment() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [aName, setAName] = useState("");
  const [roll, setRoll] = useState("");
  const [cName, setCName] = useState("");
  const [mode, setMode] = useState("Online");
  const [type, setType] = useState("SoftCopy (Online)");
  const [dead, setDead] = useState("1 Day");
  const [discription, setDiscription] = useState("");
  const [answer, setAnswer] = useState("Yes");

  const [answerFile, setAnswerFile] = useState("");
  const [questionFile, setQuestionFile] = useState("");

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleUpload = (e, data, aName1) => {
    e.preventDefault();
    const file = data;

    if (!file) return alert("upload");

    const storageRef = ref(
      storage,
      `${auth.currentUser.displayName}'_'${aName1}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        alert("Uploaded SuccessFully")
      }
    );
  };

  const addData = async (
    names,
    branchs,
    aNames,
    rolls,
    cNames,
    modes,
    types,
    deads,
    discriptions,
    answers
  ) => {
    try {
      await setDoc(
        doc(db, `users/${auth.currentUser.displayName}/assignments`, names),
        {
          name: names,
          branch: branchs,
          Assignment_Name: aNames,
          roll_systemid: rolls,
          course: cNames,
          mode: modes,
          type: types,
          deadline: deads,
          information: discriptions,
          answer_avail: answers,
        }
      );
      router.push("/home")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>

      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">
                Assignment Details
              </h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Name*
                    </label>
                    <input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Netboard"
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Program / Branch / Course
                    </label>
                    <input
                      onChange={(e) => {
                        setBranch(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="B.tech / cse / CSP242 "
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="company"
                    >
                      Assignment Name and Details
                    </label>
                    <input
                      onChange={(e) => {
                        setAName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="company"
                      type="text"
                      placeholder="Assignment 1 "
                    />
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      System Id / Roll Number
                    </label>
                    <input
                      onChange={(e) => {
                        setRoll(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      type="text"
                      placeholder="2021..... / 21010....."
                    />
                  </div>
                </div>

                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="application-link"
                    >
                      Course Name and Other Header Details
                    </label>
                    <input
                      onChange={(e) => {
                        setCName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="object oriented programming using java , "
                    />
                  </div>
                </div>

                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Mode*
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setMode(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      >
                        <option>Online</option>
                        <option>Offline</option>
                      </select>
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="job-type"
                    >
                      Type*
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="job-type"
                      >
                        <option>SoftCopy (Online)</option>
                        <option>Scanned Hardcopy(Online)</option>
                        <option>Hardcopy(offline)</option>
                      </select>
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="department"
                    >
                      DeadLine (Price Vary)
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setDead(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="department"
                      >
                        <option>1 Day</option>
                        <option>3 Days</option>
                        <option>1 Week</option>
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
                      All Other Details Of The Assignment In Brief*
                    </label>
                    <input
                      onChange={(e) => {
                        setDiscription(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="application-link"
                      type="text"
                      placeholder="Priorities etc"
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="location"
                    >
                      Upload Questions*
                    </label>
                    <div>
                      <input
                        onChange={(e) => {
                          setQuestionFile(e.target.files[0]);
                        }}
                        type="file"
                        class="w-auto bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      />
                      <button
                        onClick={(e) => {
                          handleUpload(e, questionFile, name);
                        }}
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="job-type"
                    >
                      Answer Available (Price Vary)
                    </label>
                    <div>
                      <select
                        onChange={(e) => {
                          setAnswer(e.target.value);
                        }}
                        class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="job-type"
                      >
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
                      Upload Answers*
                    </label>
                    <div>
                      <input
                        onChange={(e) => {
                          setAnswerFile(e.target.files[0]);
                        }}
                        type="file"
                        class="w-auto bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                        id="location"
                      />
                      <button
                        onClick={(e) => {
                          handleUpload(e, answerFile, name);
                        }}
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={()=>{addData(
                  name,
                  branch,
                  aName,
                  roll,
                  cName,
                  mode,
                  type,
                  dead,
                  discription,
                  answer
                );}}
                type="submit"
                class=" md:w-96 bg-gray-900 text-white font-bold py-2 px-4 border-b-4 h hover:scale-105  hover:border-gray-100 rounded-full"
              >
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div class="-mx-3 md:flex mt-2">
                
              </div> */
}
