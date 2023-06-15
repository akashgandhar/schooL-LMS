/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Faculty from "./Faculty";
import Images from "./pageFlip";
import UserContext from "../context/userContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function Main() {
  const [hid, setHid] = useState(true);
  const [hid1, setHid1] = useState(true);

  const [circulars, setCirculars] = useState([]);
  const [count1, setCount1] = useState(0);

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

  const [images, setImages] = useState([]);
  const a = useContext(UserContext);
  const [count, setCount] = useState(0);

  const ImagesLoad = async () => {
    // if (count < 2) {
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
    // }
  };

  useEffect(() => {
    ImagesLoad();
    LoadCirculars();
    // console.log(images);
    // console.log(ima);
    // console.log(imgUrl);
  }, [images]);

  return (
    <div className="grotesk mt-6 mb-16 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-20 sm:px-0 md:px-6">
      <div className="grotesk max-w-8xl mx-auto">
        <section className="w-full text-black">
          <div className="h-20 w-full hidden xl:block"></div>
          <div className="max-w-8xl mx-auto inline-block items-center p-3 pt-0 lg:flex lg:flex-wrap lg:pt-4">
            <div className="lg:w-3/6 ">
              <h2 className="max-w-xl mt-20 lg:text-[4.2em] text-3xl font-bold leading-none text-black inline-block">
                Welcome To <br />M J Public School
              </h2>

              <p className="mt-6 max-w-2xl text-xl font-serif font-semibold text-[#404040]">
                Empowering young minds to become future leaders. Discover the
                possibilities at our school.
              </p>
            </div>
            {/* <div className=" mt-44 mb-20  lg:mt-12 ">
              {/* <img
                src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2Fkids.png?alt=media&token=08bc33fa-da87-42b0-b8a1-efe0104fecca"
                alt="Hero"
              /> */}

            <div className="flex justify-center items-center lg:w-3/6">
              <Images images={images} />
            </div>
            {/* </div> */}
            <div className="h-20 w-full"></div>
          </div>
          <div id="events" className=" bg-white lg:mt-20">
            <div className="mx-auto">
              <div className="mx-auto px-5 py-5 lg:px-24">
                <div className="my-10 flex w-full flex-col text-center">
                  <h2 className="mb-5 text-2xl font-bold text-black lg:text-3xl">
                    Quick Links
                  </h2>
                </div>
                <div
                  className=" 
                  grid
                  gap-16
                  text-center
                  sm:grid-col-3
                  xl:grid-cols-6
                  lg:grid-cols-3
                  justify-center"
                >
                  <Link
                    href="/staff"
                    className="flex hover:scale-105 flex-col justify-center items-center w-fit"
                  >
                    <div>
                      <img
                        width={100}
                        height={100}
                        src="https://icon-library.com/images/faculty-icon/faculty-icon-20.jpg"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold">Faculty</h1>
                    </div>
                  </Link>
                  <div className="flex flex-col justify-center items-center w-fit">
                    <div>
                      <img
                        width={100}
                        height={100}
                        src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/logo_sylabus.jpg?alt=media&token=31b71581-7dc1-4af9-affd-4a0527717710"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold">Syllabus</h1>
                    </div>
                  </div>
                  <Link
                    target="0"
                    href="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Fee_Structure.pdf?alt=media&token=f70eba44-2c0e-41a6-bff6-9d588346148b"
                    className="flex hover:scale-105 flex-col justify-center items-center w-fit"
                  >
                    <div>
                      <img
                        width={100}
                        height={100}
                        src="https://i0.wp.com/sagritaraschoolportblair.com/wp-content/uploads/2021/04/fees.jpg?w=490&ssl=1"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold">Fee Chart</h1>
                    </div>
                  </Link>
                  <div className="flex flex-col justify-center items-center w-fit">
                    <div>
                      <img
                        width={100}
                        height={100}
                        src="https://www.manisteelibrary.org/images/events-calendar.png/@@images/image.png"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold">Events</h1>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center w-fit">
                    <div>
                      <img
                        width={100}
                        height={100}
                        src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/drupal-module-calendar.jpg?alt=media&token=c498b876-aefe-4af8-b219-252c50d8765b"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold">Calender</h1>
                    </div>
                  </div>
                  <Link
                    
                    href="/cbse"
                    className="flex hover:scale-105 flex-col justify-center items-center w-fit"
                  >
                    <div>
                      <img
                        width={100}
                        height={100}
                        src="https://www.cbse.gov.in/images//logo.png"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold">CBSE Disclosure</h1>
                    </div>
                  </Link>
                  <Link
                    
                    href="/tc"
                    className="flex hover:scale-105 flex-col justify-center items-center w-fit"
                  >
                    <div>
                      <img
                        width={100}
                        height={100}
                        src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/tc.png?alt=media&token=fe141b9f-8e5c-4245-b680-8a73b9bd48d5"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold">Transfer Certificates</h1>
                    </div>
                  </Link>
                </div>
                <div className="flex my-10 justify-evenly items-center w-full border-2 ">
                  <table className="w-full text-center">
                    <thead>
                      <tr>
                        <td className="border-r-2 w-1/3">Quick Links</td>
                        <td className="border-r-2 w-1/3">Circulars</td>
                        <td className="w-1/3">Calender</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-slate-100">
                        <td></td>
                        <td>
                          <div className="w-full border-r-2 h-96 overflow-y-scroll flex flex-col pt-5 items-center border-x-2 ">
                            {circulars.map((e, index) => {
                              return (
                                <Link
                                  key={index}
                                  target="0"
                                  href={e.link}
                                  className="m-1 flex h-fit w-11/12 border-2 hover:border-gray-600 border-gray-400 text-left p-1"
                                >
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
                              );
                            })}
                          </div>
                        </td>
                        <td>
                          
                          <div className="border-t-2">
                            <iframe
                              src="https://calendar.google.com/calendar/embed?src=mjpssadabad.cbse%40gmail.com&ctz=Asia%2FKolkata&title=M%20J%20PUBLIC%20SCHOOL"
                              // style="border:solid 1px #777"
                              className="w-full h-96"
                              frameborder="0"
                              // scrolling="no"
                            ></iframe>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div id="about"></div>
                </div>
                <div className="my-6 flex w-full flex-col pl-8 text-center">
                  <a
                    href="/"
                    className="
                    underline-blue
                    mb-1
                    mt-2
                    text-xl
                    font-bold
                    text-black
                  "
                  ></a>
                </div>
              </div>
            </div>
            <div className="text-black">
              <div
                className="
                max-w-9xl
                mx-auto
                flex
                flex-col
                items-center
                justify-center
                px-5
              "
              >
                <div className="mr-0 mb-6 w-full py-4 text-center lg:w-2/3">
                  <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
                    About School
                  </h2>
                  <p className="mb-4 text-lg leading-relaxed">
                    Our school, now recognized up to XII standard and affiliated
                    to C.B.S.E., New Delhi, is committed to preparing students
                    who are mentally alert, morally sound, and capable of
                    contributing to the evolution of India. Our goal is to make
                    them
                    {!hid && (
                      <p>
                        physically and mentally fit and dynamic, with the
                        ability to achieve their targets in social, scientific,
                        and economic spheres, and to play a vital role in the
                        emerging world challenges. To ensure the best study
                        environment, we have made significant investments in a
                        leading-edge Library facility, fully functional Computer
                        Lab, and Language Laboratory. Our highly qualified staff
                        is focused on creating leaders who are creative,
                        critical, and calculative thinkers, capable of handling
                        challenges effectively, proactively, and efficiently.
                        The school was founded by Mr. Munesh Kumar, who
                        initially taught a group of children in her own family
                        house. News of the atmosphere and pedagogical approach
                        of her school quickly spread, and overwhelmed with
                        requests from parents, more children were admitted to
                        the nest school.
                      </p>
                    )}
                  </p>
                  <a
                    onClick={() => {
                      setHid(!hid);
                    }}
                    className="underline-blue font-semibold hover:cursor-pointer"
                  >
                    {hid ? "Read more" : "Read Less"}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto px-5 pt-32 pb-24 lg:px-24">
            <div className="my-3 flex w-full flex-col text-left lg:text-center">
              <h2 className="bold mb-8 text-4xl font-bold leading-tight text-black lg:text-6xl">
                Chairman's Message
              </h2>
            </div>
            <div className=" w-full flex-col text-left lg:text-center">
              <h3 className="text-2xl text-black">
                The aim of education in recent time is being confined to make
                Engineers, Doctors, Administrators and so on. I agree that the
                education prepares the child for his/her future.But this aim of
                education is in narrow sense. The real aim of education is to
                develop the dormant skills in the child and bring out the best
                in him to make him/her worthy to fight against the odds to come
                out successful.
                {!hid1 && (
                  <p>
                    In the task ahead educator to imbibe in the child the noble
                    qualities, moral values and ethics prevalent in the society.
                    It is not only the head to be developed in the student, but
                    the heart has also to be taken in to consideration. So there
                    should be a healthy assimilation of head and heart in the
                    child to bring an all round developement of his/her
                    personality. I emphasis on the solid foundation of students
                    on which the superstructure can be built. I am happy to say
                    that a very dadicated team of administration and teachers is
                    working in the right direction, and institution is touching
                    new heights every year.
                  </p>
                )}
                <br />
                <a
                  onClick={() => {
                    setHid1(!hid1);
                  }}
                  className="underline-blue font-semibold hover:cursor-pointer"
                >
                  {hid1 ? "Read more" : "Read Less"}
                </a>
              </h3>
            </div>
          </div>

          <div className="bg-white text-black">
            <div className="mx-auto flex flex-col items-center px-5 pt-10 lg:flex-row ">
              <div className="mb-16 flex flex-col text-left lg:mb-0 lg:w-1/2 lg:flex-grow lg:items-start lg:p-16 lg:p-16">
                <h2 className="mb-4 text-4xl font-bold leading-none sm:text-5xl">
                  Manager's Message
                </h2>
                <p className="font-3xl mb-8 font-semibold leading-relaxed">
                  Commercialization of English Medium Schools is the main cause
                  of deterioration in the standard of education. Some of the
                  owners of School having no idea about the manner and method of
                  education, have worsened the situation. But there is always a
                  silver lining in dark clouds. Commercialization of English
                  Medium Schools is the main cause of deterioration in the
                  standard of education. Some of the owners of School having no
                  idea about the manner and method of education, have worsened
                  the situation. But there is always a silver lining in dark
                  clouds. Education has its base in philosophy, and therefore it
                  is a living process which changes from time to time. Education
                  is the culture of body and mind which adapts a child to a
                  particular calling providing him/her excellent personal and
                  social life within the framework of that calling. Here the
                  Educator functions as a Friends, Philosopher and Guide to
                  infuse the best in the child. He has to infuse all noble
                  attributes in the child for the betterment and upliftment of
                  humanity.
                </p>
              </div>
              <div className="flex justify-center lg:w-full lg:max-w-2xl">
                <img
                  className="w-4/5"
                  src="https://docs.google.com/uc?export=download&id=10a1uu5HSG0BO2NxPtp1bdisY_eSPoGn5"
                  alt="img"
                />
              </div>
            </div>
            <div className=" w-11/12 h-10 mx-auto border-b-2 border-dashed border-black "></div>
            <div className="mx-auto flex flex-col items-center px-5 pt-10 lg:flex-row">
              <div className="flex justify-center lg:w-full lg:max-w-2xl">
                <img className="w-4/5 mb-10" src="/mpimage.jpg" alt="img" />
              </div>
              <div className="mb-16 flex flex-col text-left lg:mb-0 lg:w-1/2 lg:flex-grow lg:items-start lg:p-16 lg:p-16">
                <h2 className="mb-4 text-4xl font-bold leading-none sm:text-5xl">
                  Principal's Message
                </h2>
                <p className="font-3xl mb-8 font-semibold leading-relaxed">
                  Dear Parents,
                  <br /> The proficiency of the faculty is a must for the
                  progress of students. We have the team of well-qualified and
                  complete academic faculty for the benefit of of the students.
                  Discipline is the main pool center of the educational
                  processes. It is a must for students as well as teachers. We
                  are the producers of the future teachers so the devotion,
                  sincerity and honesty with punctuality from teachers is the
                  basic necessity for the upliftment of the institute through
                  the common efforts of teachers and pupil-teachers.
                  <br />
                  The formula for this is : Skill + Will = Kill
                  <br />
                  It is hoped that the students, guardians and others, who are
                  associated with the school, will have a feel of our know-how.
                  We seek their co-operation and commit once more to see the
                  sapling flourishing into a huge banyan tree to flourish for
                  ages together. Let us make our students SMART.
                </p>
              </div>
            </div>

            <div className="my-24 p-4 text-black">
              {/* <Faculty/> */}
              <div className="max-w-9xl mx-auto items-center bg-gradient-to-r from-blue-200 to-blue-100 px-5 pt-5 pb-24 lg:flex-row">
                <h2 className="text-4xl font-bold text-center py-10">
                  News And Events
                </h2>
                <div className="">
                  <Faculty />
                </div>
              </div>
            </div>
            {/* <div className="mx-auto">
              <div className="max-w-8xl mx-auto px-5 py-24 lg:px-24">
                <div className="my-6 flex w-full flex-col text-left lg:text-center">
                  <h3 className="mb-8 text-5xl font-bold text-black">
                    Dui tellus quis magna id ultricies eu sed.
                  </h3>
                  <h3 className="mb-12 px-0 text-lg font-semibold text-gray-900 lg:px-52">
                    Lorem ipsum accumsan arcu, consectetur adipiscing elit.
                    Aliquet vestibulum molestie amet, maecenas id amet. Ipsum
                    accumsan arcu, aenean viverra penatibus quis. Laoreet.
                  </h3>
                </div>
                <img src="/images/placeholder.png" alt="img" />
              </div>
            </div> */}
            {/* <div className="text-black">
              <div className="max-w-8xl mx-auto flex flex-col px-5 py-48 text-black lg:flex-row">
                <div className="lg:mb-0 lg:w-full lg:max-w-xl">
                  <img
                    className="rounded object-cover object-center"
                    alt="image"
                    src="/images/placeholder1.png"
                  />
                </div>
                <div className="items-left flex flex-col pt-16 text-left lg:w-1/2 lg:flex-grow lg:items-start lg:pl-32 lg:pl-48 lg:text-left">
                  <h2 className="mb-2 text-lg leading-tight text-gray-700 sm:text-lg">
                    Viverra enim diam gravida risus nisl.
                  </h2>
                  <h2 className="mb-6 text-lg font-bold sm:text-lg">
                    Lectus eu.
                  </h2>
                  <h2 className="mb-4 text-3xl font-bold sm:text-3xl">
                    Lorem ipsum accumsan arcu, consectetur adipiscing elit. Sed
                    eget enim vel.
                  </h2>
                  <a
                    href="/"
                    className="underline-blue mt-12 text-lg font-bold leading-relaxed"
                  >
                    Ut convallis massa.
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    </div>
  );
}
