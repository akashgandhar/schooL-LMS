import React, { useContext, useEffect, useState } from "react";
import Nav from "../../../components/navbar";
import Header from "../../../components/dropdown";
import { auth, db } from "../../../firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import UserContext from "../../../components/context/userContext";
import axios from "axios";

export default function SMS() {
  const a = useContext(UserContext);
  const router = useRouter();

  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [classList, setClassList] = useState([]);

  const GetClassList = async () => {
    try {
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
    } catch {
      (e) => {
        if (!className) {
          alert("select class first");
        }
      };
    }
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

  const [mobileNumbers, setMobileNumbers] = useState([]);

  const GetStudentList = async () => {
    const docRef = collection(
      db,
      `users/${a.user}/sessions/${a.session}/classes/${className}/sections/${sectionName}/students`
    );
    const docSnap = await getDocs(docRef);
    var list = [];
    var mobiles = [];
    docSnap.forEach((doc) => {
      list.push(doc.data());
      mobiles.push({ mobile: doc.data().Mobile_Number, checked: false });
    });
    setStudentList(list);
    setMobileNumbers(mobiles);
  };

  const current = new Date();
  const time = new Intl.DateTimeFormat("en-IN", { timeStyle: "medium" }).format(
    current.getTime()
  );

  const d = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  const handleCheckboxChange = (index) => {
    const newData = [...mobileNumbers];
    newData[index].checked = !newData[index].checked;
    setMobileNumbers(newData);
  };

  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false);

  const handleHeaderCheckboxChange = () => {
    const newData = mobileNumbers.map((item) => {
      return {
        ...item,
        checked: !isHeaderCheckboxChecked,
      };
    });
    setMobileNumbers(newData);
    setIsHeaderCheckboxChecked(!isHeaderCheckboxChecked);
  };

  const updateHeaderCheckboxState = () => {
    const allChecked = data.every((item) => item.checked);
    setIsHeaderCheckboxChecked(allChecked);
  };

  // SMS

  const templates = [
    {
      id: 153222,
      text: "Dear Parents, The school will remain closed on {#var#} on account of {#var#}. MJPS SADABAD",
      variables: ["date", "reason"],
    },
    {
      id: 153223,
      text: "Dear Parents, Your ward {#var#} of {#var#} is absent from the school today without prior intimation. Hope everything is fine! MJPS SADABAD",
      variables: ["name", "class"],
    },
    {
      id: 153224,
      text: "Dear Parents, We wish your ward {#var#} a very Happy Birthday. God Bless him/her. MJPS SADABAD",
      variables: ["name"],
    },
    {
      id: 153225,
      text: "Dear Staff, The school will remain closed on {#var#} on account of {#var#}. MJPS SADABAD",
      variables: ["date", "reason"],
    },
    {
      id: 153226,
      text: "Dear Parents, Your ward {#var#} of {#var#} usually comes late to school. Kindly ensure punctuality. MJPS SADABAD",
      variables: ["name", "class"],
    },
    {
      id: 153227,
      text: "Dear Parents, The classes from {#var#} will remain closed on {#var#} due to {#var#}. Principal, MJPS SADABAD",
      variables: ["class", "date", "reason"],
    },
    {
      id: 153228,
      text: "Dear Parents, It is to inform you that the school timing will be change from {#var#}. New timing will be {#var#}. Please reach your stop accordingly. Principal, MJPS SADABAD",
      variables: ["oldTime", "newTime"],
    },
    {
      id: 153229,
      text: "Dear Parents, We are going to inform you that the {#var#} vacation is going to start from {#var#} to {#var#}. Enjoy your vacations with your family. Principal, MJPS SADABAD",
      variables: ["vacationType", "startDate", "endDate"],
    },
    {
      id: 153230,
      text: "Dear Parents, Please deposit the outstanding amount {#var#} of your ward due fee up to the month {#var#} before {#var#}. Principal, MJPS SADABAD",
      variables: ["amount", "month", "deadline"],
    },
    {
      id: 153231,
      text: "Dear Parents, As per the order of the state government, the school will remain close due to {#var#} from {#var#} to {#var#}. The school will reopen on {#var#} as usual time. Principal MJPS SADABAD",
      variables: ["reason", "startDate", "endDate", "reopenDate"],
    },
    {
      id: 153232,
      text: "Dear Parents, It will be a holiday on {#var#} on account of {#var#} and reopen on {#var#} as usual time. Principal MJPS SADABAD",
      variables: ["holidayDate", "reason", "reopenDate"],
    },
    {
      id: 153233,
      text: "Dear parents, all classes will remain suspended for{#var#} vacation from {#var#}to {#var#}. Wishing you all {#var#}. With best wishes, M.P.Singh Principal",
      variables: ["duration", "start_date", "end_date", "greeting"],
    },
    {
      id: 153234,
      text: "Dear parents, the school will run by lunch time(half day) on {#var#}. To and fro your ward accordingly. Principal, M J Public School Sadabad",
      variables: ["date"],
    },
    {
      id: 153235,
      text: "Dear parents, submit your ward's outstanding dues ₹{#var#} before {#var#} to avoid any inconvenience. Principal, M J Public School Sadabad",
      variables: ["amount", "due_date"],
    },
    {
      id: 153236,
      text: "Dear parents, the school{#var#} time has been {#var#} for {#var#} w.e.f. {#var#} corelate accordingly. Principal, M J Public School",
      variables: ["type", "new_time", "duration", "start_date"],
    },
    {
      id: 153237,
      text: "DEAR PARENTS, PTM FOR {#var#}. IS GOING TO BE HELD ON {#var#}. YOUR PRESENCE IS MANDATORY ALONG WITH YOUR WARD TO KNOW HIS PROGRESS. PRINCIPAL M J P S SADABAD",
      variables: ["meeting_subject", "meeting_date"],
    },
    {
      id: 153238,
      text: "Dear parents/students, all classes will remain suspended for {#var#} vacation from {#var#} to {#var#}. Wishing you all {#var#}. With best wishes, M.P.Singh Principal M J Public School",
      variables: ["duration", "start_date", "end_date", "greeting"],
    },
    {
      id: 153239,
      text: "Dear parents/students, the school {#var#} time has been {#var#} for {#var#} w.e.f. {#var#} corelate accordingly. Principal, M J Public School",
      variables: ["type", "new_time", "duration", "start_date"],
    },
    {
      id: 153240,
      text: "Dear staff, the school will remain closed on {#var#} account of {#var#}. Principal, M J Public School",
      variables: ["closure_date", "reason"],
    },
    {
      id: 153241,
      text: "Dear colleague, official work will remain suspended due to {#var#} on {#var#}. Principal, M J Public School",
      variables: ["closure_reason", "closure_date"],
    },
    {
      id: 153242,
      text: "DEAR PARENTS, We informed you that {#var#} {#var#} {#var#} {#var#}. PRINCIPAL MJPS SADABAD",
      variables: [
        "information_1",
        "information_2",
        "information_3",
        "information_4",
      ],
    },
    {
      id: 153243,
      text: "Dear parents, PTM for {#var#} is going to be held on {#var#}. Your presence is mandatory along with your ward. Principal MJPS Sadabad",
      variables: ["date", "time"],
    },
    {
      id: 153244,
      text: "Dear parents/students it is informed you that {#var#} {#var#} {#var#} {#var#} {#var#}. Principal MJPS Sadabad",
      variables: [
        "information1",
        "information2",
        "information3",
        "information4",
        "information5",
      ],
    },
    {
      id: 153245,
      text: "Dear Principal, your ERP is logged by {#var#} on {#var#}. Please block through {#var#} if this is not authorized by you. MJPS, Sadabad",
      variables: ["name", "date", "source"],
    },
    {
      id: 153246,
      text: "प्रिय अभिभावक, आपको अवगत कराया जाता है कि {#var#}{#var#}{#var#}{#var#}{#var#}. प्रधानाचार्य MJPS सादाबाद .",
      variables: [
        "information1",
        "information2",
        "information3",
        "information4",
        "information5",
      ],
    },
    {
      id: 153247,
      text: "Dear parents, Please deposit outstanding fee of Rs {#var#} upto {#var#} of {#var#} class {#var#}. Principal MJPS Sadabad",
      variables: ["amount", "date", "class", "ward"],
    },
    // Add more templates here
  ];

  const [vars, setVars] = useState([]);
  const [varValues, setVarValues] = useState([]);
  const [senderId, setSenderId] = useState("MJPSMD");
  const [template, setTemplate] = useState("");

  var mobiles = [];
  mobileNumbers.forEach((e) => {
    if (e.checked == true) {
      mobiles.push(e.mobile);
    }
  });
  var mob = mobiles.join(",");
  var varv = varValues.join("|");

  const [counts, setCounts] = useState([]);

  // api
  const sendMessage = () => {
    axios
      .get("https://www.fast2sms.com/dev/bulkV2", {
        params: {
          authorization:
            "mDwLlWGr5tigscS97MdZeO1NCUqJRPXoBAI3zh6jVfF4k2unHbcd057oW62uknFCw1sIKPNGOfS4UhXb",
          route: "dlt",
          sender_id: "MJPSMD",
          message: template,
          variables_values: varv,
          numbers: mob,
          flash: "0",
        },
      })
      .then(function (response) {
        // handle success
        if (response.status == 200) {
          alert("Send SuccessFully");
        } else {
          alert("Error !" + response.status + "Message Not Send");
        }
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
      })
      .then(function () {
        // always executed
      });

    // Optionally the request above could also be done as
    axios
      .get("/user", {
        params: {
          ID: 12345,
        },
      })
      .then(function (response) {})
      .catch(function (error) {})
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    console.log(mob);
  }, [studentList, mobileNumbers, varValues]);

  return (
    <>
      <div className="w-screen">
        <div class="bg-gray-100 flex bg-local w-screen">
          <div class="bg-gray-100 mx-auto w-screen h-auto  py-20 px-12 lg:px-24 shadow-xl mb-24">
            <div>
              <h1 className="text-center font-bold text-2xl">Send SMS</h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Class*
                    </label>
                    <select
                      onClick={() => {
                        GetClassList();
                      }}
                      onChange={(e) => {
                        setClassName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      placeholder="B.tech / cse / CSP242 "
                    >
                      <option>Please Select</option>
                      {classList.map((e, index) => {
                        return <option key={index}>{e.Name}</option>;
                      })}
                    </select>
                  </div>

                  <div class="md:w-1/2 px-3">
                    <label
                      class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                      for="title"
                    >
                      Section*
                    </label>
                    <select
                      onClick={() => {
                        GetSectionList();
                      }}
                      onChange={(e) => {
                        setSectionName(e.target.value);
                      }}
                      class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                      id="title"
                      placeholder="B.tech / cse / CSP242 "
                    >
                      <option>Please Select</option>
                      {sectionList.map((e, index) => {
                        return <option key={index}>{e.Name}</option>;
                      })}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      GetStudentList();
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div>
              <table class="min-w-full border-collapse block md:table">
                <thead class="block md:table-header-group">
                  <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      <input
                        type="checkbox"
                        checked={isHeaderCheckboxChecked}
                        onChange={handleHeaderCheckboxChange}
                      />
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      SID
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Student Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Father's Name
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Class
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Address
                    </th>
                    <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Mobile
                    </th>
                  </tr>
                </thead>
                <tbody class="block md:table-row-group">
                  {studentList
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .filter(
                      (e) => e.Deleted === false || e.Deleted === undefined
                    )
                    .map((e, index) => {
                      if (e.Deleted == false || e.Deleted == undefined) {
                        return (
                          <tr
                            key={index}
                            class="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                          >
                            <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                check
                              </span>
                              <input
                                type="checkbox"
                                checked={mobileNumbers[index].checked}
                                onChange={() => handleCheckboxChange(index)}
                              />
                            </td>
                            <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                Name
                              </span>
                              {e.Sr_Number}
                            </td>
                            <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                Name
                              </span>
                              {e.name}
                            </td>
                            <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                sections
                              </span>
                              {e.Father_Name}
                            </td>
                            <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                classTeacher
                              </span>
                              {className}
                            </td>
                            <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                Strength
                              </span>
                              {e.Place}
                            </td>
                            <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                              <span class="inline-block w-1/3 md:hidden font-bold">
                                Strength
                              </span>
                              {e.Mobile_Number}
                            </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
            <div class="bg-white border-2 shadow-md rounded px-8 pt-6 pb-8 my-4 flex flex-col">
              <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/2 px-3">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="title"
                  >
                    SENDER ID*
                  </label>
                  <div
                    class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="title"
                    placeholder=""
                  >
                    {senderId}
                  </div>
                </div>

                <div class="md:w-1/2 px-3">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="title"
                  >
                    Templates*
                  </label>
                  <select
                    onChange={(e) => {
                      templates.forEach((a) => {
                        if (a.text == e.target.value) {
                          setTemplate(a.id);
                          setVars(a.variables);
                        }
                      });
                    }}
                    class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="title"
                    placeholder="B.tech / cse / CSP242 "
                  >
                    <option>Please Select</option>
                    {templates.map((e, index) => {
                      return <option key={index}>{e.text}</option>;
                    })}
                  </select>
                </div>

                {/* <button
                    onClick={() => {
                      GetStudentList()
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Search
                  </button> */}
              </div>
              <div class="-mx-3 md:flex mb-6">
                <div class="w-full px-3">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="title"
                  >
                    Selected Template*
                  </label>
                  <div
                    class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="title"
                  >
                    {templates.map((e, index) => {
                      if (e.id == template) {
                        return e.text;
                      }
                    })}
                  </div>
                </div>

                {/* <button
                    onClick={() => {
                      GetStudentList()
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Search
                  </button> */}
              </div>
              <div class="-mx-3 md:flex mb-6">
                {vars.map((e, index) => {
                  return (
                    <div key={index} class="w-full px-3">
                      <label
                        class="flex justify-between uppercase tracking-wide text-black text-xs font-bold mb-2"
                        for="title"
                      >
                        {e}*<h1>{counts[index]}</h1>
                      </label>
                      <input
                        onChange={(e) => {
                          varValues[index] = e.target.value;
                          // count = e.target.value.length;
                          const newValues = [...counts];
                          newValues[index] = e.target.value.length;
                          setCounts(newValues);
                          // console.log(counts);
                        }}
                        class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                        id="title"
                      ></input>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  sendMessage();
                }}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
