import React, { useContext, useEffect, useState } from "react";
import Images from "../../../components/landing/pageFlip";
import GalleryCard from "../../../components/galleryCard";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import UserContext from "../../../components/context/userContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Link from "next/link";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Model1 from '../../../components/model/model1'
// import AddIcon from '@mui/icons-material/Add';

var state = false;

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(false);
  const [openGallary, setOpenGalary] = useState(false);
  const [openCircular, setOpenCircular] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [images, setImages] = useState([]);
  const [circulars, setCirculars] = useState([]);
  const a = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);

  const ImagesLoad = async () => {
    if (count < 2) {
      const docRef = collection(db, `gallery`);

      var list = [];
      try {
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
          list.push(doc.data());
        });
        setImages(list);
        setCount(count + 1);
      } catch (e) {
        alert(e);
      }
    }
  };
  const LoadCirculars = async () => {
    if (count1 < 2) {
      const docRef = collection(db, `circulars`);

      var list = [];
      try {
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
          list.push(doc.data());
        });
        setCirculars(list);
        setCount1(count1 + 1);
      } catch (e) {
        alert(e);
      }
    }
  };

  const [imgtoUpload, setImgToUpload] = useState("nil");
  const [imgName, setImgName] = useState("nil");
  const [imgUrl, setImgUrl] = useState("nil");

  const [cname, setCname] = useState("nil");
  const [disc, setDisc] = useState("nil");

  const handleUploadTc = (docs, name) => {
    setIsLoading(true);
    try {
      const storageRef = ref(
        storage,
        `${a.user}/${a.session}/gallery/${name}.jpg`
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
          setIsLoading(false);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            try {
              const docRef = doc(db, `gallery`, name);
              setDoc(docRef, {
                name: name,
                link: downloadURL,
              });
            } catch (e) {}
          });
        }
      );
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    } finally {
      () => {
        setIsLoading(false);
      };
    }
    // setIsLoading(false)
  };
  const handleUploadTc2 = (docs, name) => {
    setIsLoading(true);
    try {
      const storageRef = ref(
        storage,
        `${a.user}/${a.session}/circulars/${name}.jpg`
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
          setIsLoading(false);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            try {
              const docRef = doc(db, `circulars`, cname);
              setDoc(docRef, {
                link: downloadURL,
                title: cname,
                disc: disc,
              });
            } catch (e) {}
          });
        }
      );
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    } finally {
      () => {
        setIsLoading(false);
      };
    }
    // setIsLoading(false)
  };

  useEffect(() => {
    ImagesLoad();
    LoadCirculars();
    console.log(images);
    // console.log(ima);
    console.log(imgUrl);
  }, [images]);

  return (
    <>
      <div className="flex justify-center items-center relative p-5">
        {!openGallary && !openCircular && !openEvent && (
          <div className="flex p-5 gap-5 w-full flex-col">
            <div>
              <div className="border-2 w-full flex justify-center flex-col p-2">
                <div className="w-full flex justify-between p-10 border-4 border-dashed border-black">
                  <div className="text-3xl ">
                    Gallery{" "}
                    <button
                      onClick={() => {
                        setOpenGalary(!openGallary);
                      }}
                      href="#_"
                      class="relative inline-block text-lg group"
                    >
                      <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                        <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span class="relative">Add Images</span>
                      </span>
                      <span
                        class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                        data-rounded="rounded-lg"
                      ></span>
                    </button>
                    <div className="mt-5 h-64 overflow-y-scroll w-full  text-base">
                      {images.map((image, index) => {
                        return (
                          <GalleryCard
                            key={index}
                            link={image.link}
                            name={image.name}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <Images images={images} />
                </div>
              </div>
            </div>
            <div>
              <div className="border-2 w-full flex justify-center flex-col p-2">
                <div className="w-full flex flex-col justify-between p-10 border-4 border-dashed border-black">
                  <div className="text-3xl flex flex-row justify-between w-full ">
                    Circulars{" "}
                    <button
                      onClick={() => {
                        setOpenCircular(!openCircular);
                      }}
                      href="#_"
                      class="relative inline-block text-lg group"
                    >
                      <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                        <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span class="relative">Add Circulars</span>
                      </span>
                      <span
                        class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                        data-rounded="rounded-lg"
                      ></span>
                    </button>
                  </div>
                  <div>
                    <div>
                      <div className="w-full border-r-2 h-96 overflow-y-scroll flex flex-col pt-5 items-center border-x-2 ">
                        {circulars.map((e, index) => {
                          return (
                            <div
                              key={index}
                              className="hover:scale-[101%] my-2 flex h-fit w-11/12 border-2 justify-between border-gray-400 text-left p-1"
                            >
                              <Link target="0" href={e.link} className="flex">
                                <div>
                                  <img
                                    className="h-20 w-20"
                                    src="https://google.oit.ncsu.edu/wp-content/uploads/sites/6/2021/01/Google_Docs.max-2800x2800-1-150x150.png"
                                  />
                                </div>
                                <div>
                                  <h2 className="text-xl font-bold">
                                    {e.title}
                                  </h2>
                                  <h2 className="text-sm italic ">
                                    Discription:{e.disc}
                                  </h2>
                                  <h3></h3>
                                </div>
                              </Link>

                              <button class="z-10 rounded-xl h-10 text-white py-2 hover:scale-105 duration-300">
                                <FontAwesomeIcon
                                  color="black"
                                  onClick={() => {
                                    try {
                                      const docRef = doc(
                                        db,
                                        `circulars`,
                                        e.title
                                      );
                                      deleteDoc(docRef)
                                        .then(() => {
                                          alert("deleted");
                                        })
                                        .then(() => {
                                          LoadCirculars();
                                        });
                                    } catch (e) {
                                      alert(e.message);
                                    }
                                  }}
                                  className="hover:cursor-pointer hover:scale-95"
                                  icon={faTrash}
                                />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="border-2 w-1/3">
                <button
                  onClick={() => {
                    setOpenEvent(!openEvent);
                  }}
                  href="#_"
                  class="relative inline-block text-lg group"
                >
                  <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                    <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                    <span class="relative">Add Images</span>
                  </span>
                  <span
                    class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                    data-rounded="rounded-lg"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GalaryModel */}
        {openGallary && (
          //model
          <div class="flex justify-center h-full items-center  antialiased w-full">
            <div class="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
              <div class="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
                <p class="font-semibold text-gray-800">
                  Add a Picture In Gallery
                </p>
                <svg
                  onClick={() => {
                    setOpenGalary(!openGallary);
                    setCount(0);
                  }}
                  class="w-6 h-6 hover:cursor-pointer"
                  fill="none"
                  stroke={"currentColor"}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <div class="flex flex-col px-6 py-5 bg-gray-50">
                <hr />

                <div class="flex flex-row items-center justify-between p-5 bg-white border border-gray-200 rounded shadow-sm">
                  <div class="flex flex-row items-center">
                    <input
                      onChange={(e) => {
                        setImgToUpload(e.target.files[0]);
                        setImgName(e.target.files[0].name);
                      }}
                      type="file"
                    />
                  </div>
                </div>
              </div>
              <div class="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
                <p class="font-semibold text-gray-600">Cancel</p>
                <button
                  onClick={() => {
                    handleUploadTc(imgtoUpload, imgName);
                  }}
                  class="px-4 py-2 text-white font-semibold hover:bg-blue-700 bg-blue-500 rounded"
                >
                  {!isLoading ? (
                    "Save"
                  ) : (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CircularMOdel */}
        {openCircular && (
          //model
          <div class="flex justify-center h-full items-center  antialiased w-full">
            <div class="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
              <div class="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
                <p class="font-semibold text-gray-800">Add a New Circular</p>
                <svg
                  onClick={() => {
                    setOpenCircular(!openCircular);
                  }}
                  class="w-6 h-6 hover:cursor-pointer"
                  fill="none"
                  stroke={"currentColor"}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <div class="flex flex-col px-6 py-5 bg-gray-50">
                <div class="md:w-full px-3">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="application-link"
                  >
                    Circular Title
                  </label>
                  <input
                    onChange={(e) => {
                      setCname(e.target.value);
                    }}
                    class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="application-link"
                    type="text"
                    placeholder="xyz"
                  />
                </div>
                <div class="md:w-full px-3">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="application-link"
                  >
                    Circular File
                  </label>
                  <input
                    onChange={(e) => {
                      setImgToUpload(e.target.files[0]);
                      setImgName(e.target.files[0].name);
                    }}
                    class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="application-link"
                    type="file"
                    placeholder="xyz"
                  />
                </div>
                <div class="md:w-full px-3">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="application-link"
                  >
                    Description
                  </label>
                  <textarea
                    onChange={(e) => {
                      setDisc(e.target.value);
                    }}
                    class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                    id="application-link"
                    type="text"
                    placeholder="xyz"
                  />
                </div>
              </div>

              <div class="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
                <p class="font-semibold text-gray-600">Cancel</p>
                <button
                  onClick={() => {
                    handleUploadTc2(imgtoUpload, cname);
                  }}
                  class="px-4 py-2 text-white font-semibold hover:bg-blue-700 bg-blue-500 rounded"
                >
                  {!isLoading ? (
                    "Save"
                  ) : (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Event=Model */}
        {openEvent && (
          //model
          <div class="flex justify-center h-full items-center  antialiased w-full">
            <div class="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
              <div class="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
                <p class="font-semibold text-gray-800">Add a New Event</p>
                <svg
                  onClick={() => {
                    setOpenEvent(!openEvent);
                  }}
                  class="w-6 h-6 hover:cursor-pointer"
                  fill="none"
                  stroke={"currentColor"}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <div class="flex flex-col px-6 py-5 bg-gray-50">
                <p class="mb-2 font-semibold text-gray-700">Bots Message</p>
                <textarea
                  type="text"
                  name=""
                  placeholder="Type message..."
                  class="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-36"
                  id=""
                ></textarea>
                <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
                  <div class="w-full sm:w-1/2">
                    <p class="mb-2 font-semibold text-gray-700">
                      Customer Response
                    </p>
                    <select
                      type="text"
                      name=""
                      class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none"
                      id=""
                    >
                      <option value="0">Add service</option>
                    </select>
                  </div>
                  <div class="w-full sm:w-1/2 mt-2 sm:mt-0">
                    <p class="mb-2 font-semibold text-gray-700">Next step</p>
                    <select
                      type="text"
                      name=""
                      class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none"
                      id=""
                    >
                      <option value="0">Book Appointment</option>
                    </select>
                  </div>
                </div>
                <hr />

                <div class="flex items-center mt-5 mb-3 space-x-4">
                  <input
                    class="inline-flex rounded-full"
                    type="checkbox"
                    id="check1"
                    name="check1"
                  />
                  <label
                    class="inline-flex font-semibold text-gray-400"
                    for="check1"
                  >
                    Add a crew
                  </label>
                  <br />
                  <input
                    class="inline-flex"
                    type="checkbox"
                    id="check2"
                    name="check2"
                    checked
                  />
                  <label
                    class="inline-flex font-semibold text-blue-500"
                    for="check2"
                  >
                    Add a specific agent
                  </label>
                  <br />
                </div>
                <div class="flex flex-row items-center justify-between p-5 bg-white border border-gray-200 rounded shadow-sm">
                  <div class="flex flex-row items-center">
                    <img
                      class="w-10 h-10 mr-3 rounded-full"
                      src="https://randomuser.me/api/portraits/lego/7.jpg"
                      alt=""
                    />
                    <div class="flex flex-col">
                      <p class="font-semibold text-gray-800">Xu Lin Bashir</p>
                      <p class="text-gray-400">table.co</p>
                    </div>
                  </div>
                  <h1 class="font-semibold text-red-400">Remove</h1>
                </div>
              </div>
              <div class="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
                <p class="font-semibold text-gray-600">Cancel</p>
                <button class="px-4 py-2 text-white font-semibold bg-blue-500 rounded">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
