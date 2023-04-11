import { useRouter } from 'next/router'
import React, { useContext, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import UserContext from '../../../components/context/userContext'

export default function ReportCard() {
    const router = useRouter()
    const a = useContext(UserContext);
  const s = router.query
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <center className="w-full py-7 text-center font-serif">
      <div className="w-full bg-no-repeat bg-center">
        <div ref={componentRef} id="print" className="pt-20 pb-5">
          <table className=" align-middle h-full mx-auto w-11/12 border-2 border-black text-lg">
            <tbody>
            <tr className="font-bold flex justify-between px-5">
                <td>School No. : 60978</td>
                <td>Affiliation No. : 2132393</td>
              </tr>
              
              <tr>
                <td className="h-auto col-span-9 flex justify-between">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=0d48043a-f970-4495-b131-5f788bb00733"
                    className="float-left ml-8 h-28 mt-2"
                  />
                  <div className="ml-5  float-right ">
                    <center className="float-left">
                      <span className="text-red-800 font-bold text-5xl">
                        M J PUBLIC SCHOOL
                      </span>
                      <span>
                        <br />
                        <span className="font-bold text-4xl text-red-600">
                          RAYA ROAD SADABAD HATHRAS
                          <br /><h1 className='text-xl'>Affiliated to C.B.S.E. New Delhi</h1>

                          
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
                <span className="text-4xl font-bold text-red-500">
                            MARKS STATEMENT 2023-2024   
                          </span>
                </td>
              </tr>
              <tr>
                <td height="30"> </td>
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
