import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

export default function Tc() {
  const router = useRouter()
  const s = router.query
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <center className="w-full py-7">
      <div className="w-full bg-no-repeat bg-center">
        <div ref={componentRef} id="print" className="pt-20 pb-5">
          <table className=" align-middle h-full mx-auto w-11/12 border-2 border-black text-lg">
            <tbody>
              <tr>
                <td className="h-auto col-span-9 flex justify-between">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=0d48043a-f970-4495-b131-5f788bb00733"
                    className="float-left ml-8 h-28 mt-2"
                  />
                  <div className="ml-5  float-right ">
                    <center className="float-left">
                      <span className="text-red-600 font-bold text-6xl">
                        M J PUBLIC SCHOOL
                      </span>
                      <span>
                        <br />
                        <span className="font-bold text-base">
                          Affiliated to Central Board of Secondary Education
                          (C.B.S.E.) New Delhi
                          <br />" Website: www.mjpssadabad.in mail id:
                          mjpssadabad.cbse@gmail.com "
                          <br />
                          <span className="text-2xl">
                            RAYA ROAD SADABAD HATHRAS
                          </span>
                        </span>
                      </span>
                    </center>
                  </div>
                  <img
                    src="	https://mjpssadabad.in/mdls/report/cbse-logo.png"
                    className="float-right ml-7 mt-2 mr-8 h-28"
                  />
                </td>
              </tr>
              <tr>
                <td align="center" height="62" className="col-span-9">
                  <div className="font-bold text-2xl italic ml-2 w-96 border-2 border-black bg-white rounded-2xl">
                    <div className="pt-0.5 text-2xl">
                      <span className="ml-2">TRANSFER CERTIFICATE</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td height="30"> </td>
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td>School No. : 60978</td>
                <td>Affiliation No. : 2132393</td>
              </tr>
              <tr className="font-bold flex justify-between px-5">
                <td>TC No. : 291 </td>
                <td> </td>
                <td>Student Id : 1446</td>
              </tr>
              <tr className=" flex justify-between px-5">
                <td height="39" colSpan="7" valign="top">
                  {/* Registration No. of the candidate (in case Class-IX to XII) */}
                </td>
                <td colSpan="2" valign="top"></td>
              </tr>

              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  1.
                  <span> Name of Student </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>{s.name} </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5 "
              >
                <td height="34" colSpan="6" className="flex-1 ">
                  2.
                  <span> Mother's Name </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right ">
                  <b>{s.Mother_Name} </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  3.
                  <span> Father's Name </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>{s.Father_Name} </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  4.
                  <span> Nationality </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>Indian </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  5.
                  <span> Category </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>{s.Category} </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  6.
                  <span> Date of Birth </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>{s.Date_Of_Birth} </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  7.
                  <span> Date of Admission </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>{s.Admission_Date} </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  8.
                  <span> pupil is failed or pass </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>Pass </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  9.
                  <span> Last Class </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>{s.Class} </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  10.
                  <span> School/Board </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>MJ Public School / CBSE </b>
                </td>
              </tr>

              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  11.
                  <span> Promoted or Not </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>Pramoted </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  12.
                  <span> Total Attendance (in %) </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b> 75% </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  13.
                  <span> Date of application </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>DATE </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  14.
                  <span> Date of issue of certificate </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>DATE </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  15.
                  <span> Reason for leaving </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>GIVEN reason </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1">
                  16.
                  <span> General Conduct </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>Good </b>
                </td>
              </tr>
              <tr
                style={{ marginLeft: '20%', marginRight: '20%' }}
                className="flex px-5"
              >
                <td height="34" colSpan="6" className="flex-1 ">
                  17.
                  <span> Any other remark </span>
                </td>
                <td height={16} colSpan={3} className="flex-1 text-right">
                  <b>N/A</b>
                </td>
              </tr>

              <tr>
                <td height="100" colspan="9">
                  {' '}
                </td>
              </tr>
              <tr>
                <td height="100" colspan="9">
                  {' '}
                </td>
              </tr>

              <tr className="flex justify-between mx-5">
                <td colspan="3" className="border-t-2 border-black py-2">
                  Signature of Class Teacher
                </td>
                <td colspan="2" className="border-t-2 border-black py-2">
                  Signature of Manager{' '}
                </td>
                <td colspan="4" className="border-t-2 border-black py-2">
                  <div>Sign of Principal school seal </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handlePrint}>Print</button>
    </center>
  )
}
