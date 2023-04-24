import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useRouter } from 'next/router'

export default function Cc() {
  const router = useRouter()
  const s = router.query
  const [name, setName] = useState(s.name)
  const [fName, setFName] = useState(s.Father_Name)
  const [className, setClassName] = useState(s.Class)
  const [aDate, setADate] = useState()
  const [pDate, setPDate] = useState()
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  // useEffect(() => {
  //  console.log(s);
  // }, [])
  
  return (
    <center className="w-full py-7 text-[12pt]">
      <div className="w-[250mm]  max-h-[280mm] bg-no-repeat bg-center">
        <div ref={componentRef} id="print" className="pt-5 pb-5 ">
          <div className=" align-middle  max-h-[300mm] mx-auto w-11/12 border-2 border-black text-[12pt] outline-double">
            <div className="h-auto col-span-9 flex justify-between">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=7ca8a823-a8a0-4316-8b80-3bbdb6e994f7"
                className="float-left ml-8 h-28 mt-2 mix-blend-color-burn"
              />
              <div className="ml-5  float-right ">
                <center className="float-left" style={{ lineHeight: '0.5' }}>
                  <span
                    className="text-red-600 font-extrabold text-3xl"
                    style={{ lineHeight: '1.2' }}
                  >
                    M J PUBLIC SCHOOL
                  </span>
                  <br />
                  <span
                    className="font-bold text-xs"
                    style={{ lineHeight: '1.2' }}
                  >
                    Affiliated to Central Board of Secondary Education
                    (C.B.S.E.)
                    <br />
                    mail id: mjpssadabad.cbse@gmail.com"
                    <br />
                    www.mjpssadabad.com
                    <br />
                    <span className="text-xs">RAYA ROAD SADABAD HATHRAS</span>
                  </span>
                  {/* <div className="font-bold text-2xl italic mt-2 ml-2 w-fit px-2 border-2 border-black bg-white rounded-2xl"> */}
                  <div className="pt-0.5 text-lg font-bold italic font-serif underline">
                    <span className="">CHARACTER CERTIFICATE</span>
                  </div>
                  {/* </div> */}
                </center>
              </div>
              <img
                src="	https://mjpssadabad.in/mdls/report/cbse-logo.png"
                className="float-right ml-7 mt-2 mr-8 h-28"
              />
            </div>

            <div className="font-bold flex justify-between  mt-8 mx-20">
              <h1>Sr No. : 60978</h1>
              <h1>Student ID : 2132393</h1>
            </div>
            <div className="flex mx-20 my-2">
              <div className="w-[40mm] h-[45mm] border-2 border-black border-dotted "></div>
            </div>

            <div className="text-justify mx-20 font-serif mb-20">
              {/* <h1 className="text-xl font-bold">Character Certificate</h1> */}
              {/* <p className="text-lg">To Whom It May Concern:</p> */}
              <p className="text-xl leading-relaxed">
                This is to certify that{' '}
                <span className="font-bold">
                  <input
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                    value={name}
                    className="w-fit border-b-2 border-dashed uppercase border-black"
                    placeholder="Student Name"
                  />
                </span>
                <br /> son/daughter of{' '}
                <span className="font-bold">
                  <input
                  onChange={(e) => {
                    setFName(e.target.value)
                  }}
                  value={fName}
                    className="uppercase w-fit border-b-2 border-dashed border-black"
                    placeholder="Gaurdian Name"
                  />
                </span>
                , was a student of{' '}
                <span className="font-bold">M J Public School </span>
                and studied in Class{' '}
                <span className="font-bold">
                  <input
                  onChange={(e) => {
                    setClassName(e.target.value)
                  }}
                  value={className}
                    className="w-20 uppercase border-b-2 border-dashed border-black"
                    placeholder="Class"
                  />
                </span>{' '}
                from{' '}
                <span className="font-bold">
                  <input
                  onChange={(e)=>{
                    setADate(e.target.value);
                  }}
                    type="date"
                    className=" border-b-2 border-dashed border-black uppercase"
                    placeholder="Date"
                  />
                </span>{' '}
                to{' '}
                <span className="font-bold">
                  <input
                  onChange={(e)=>{
                    setPDate(e.target.value);
                  }}
                    type="date"
                    className="border-b-2 border-dashed border-black uppercase"
                    placeholder="Date"
                  />
                </span>
                .<br /> During the student's tenure at our school, he/she
                exhibited excellent character and conduct.
              </p>
              <p className="text-lg leading-relaxed">
                The student was punctual, regular, and showed a sincere
                dedication to his/her studies. He/she maintained good grades and
                was actively involved in various school activities. The student
                also demonstrated excellent leadership qualities and was a role
                model for his/her peers.
              </p>
              <p className="text-lg leading-relaxed">
                We can attest that the student has a high level of honesty,
                integrity, and moral values. He/she was respectful to teachers
                and fellow students alike, and always conducted himself/herself
                in a professional and courteous manner.
              </p>
              <p className="text-xl leading-relaxed">
                We are confident that{' '}
                <span className="font-bold">
                  <input
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  value={name}
                    className="w-fit border-b-2 border-dashed border-black uppercase"
                    placeholder="Student Name"
                  />
                </span>{' '}
                <br />
                will continue to excel in any future academic or professional
                endeavors. We highly recommend him/her for any future
                opportunities.
              </p>
            </div>
            <div className="flex justify-end p-2 mx-20 h-38 text-xl my-10 font-black items-center">
              Managing Directors Signature
            </div>
          </div>
        </div>
        <button
          onClick={handlePrint}
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Print
        </button>
      </div>
    </center>
  )
}
