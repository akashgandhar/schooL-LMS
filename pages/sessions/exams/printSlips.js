import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function printSlips() {
  const router = useRouter();
  const data = router.query;
  const exam = data.exam;
  const room = data.room;

  
  const seatingArrangementArray = data.Arrangement;
//   console.log(JSON.parse(seatingArrangementArray));
  const maxSeats = data.maxSeats;
  const maxSeatsPerRow = data.maxSeatsPerRow;

  console.log(seatingArrangementArray);




  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="w-full p-4 bg-gray-200 my-5 flex flex-col  mx-auto">
      <div
        ref={componentRef}
        className="w-full  items-center flex justify-center"
      >
        <div className=" flex-col flex text-center items-center w-[29.7cm] p-4 bg-white">
          {/* <h1 className="">Seating Arrangement</h1> */}

          <h1 class=" items-center text-5xl mb-5 font-extrabold ">
            Seating Arrangement Slips
            <br />
            <span class="bg-red-100  text-red-800 text-2xl font-semibold  px-2.5 py-0.5 rounded ">
              {exam}
            </span>
            <br />
            <span class="bg-blue-100  text-blue-800 text-2xl font-semibold  px-2.5 py-0.5 rounded ">
              Room No.: {room}
            </span>
          </h1>

          <table className="table-fixed w-full ">
            <tbody>
              {Array.from({
                length: Math.ceil(maxSeats / maxSeatsPerRow),
              }).map((_, rowIndex) => (
                <tr className="flex gap-2 mb-5" key={rowIndex}>
                  {seatingArrangementArray
                    .slice(
                      rowIndex * maxSeatsPerRow,
                      (rowIndex + 1) * maxSeatsPerRow
                    )
                    .map((row, columnIndex) => (
                      <td
                        key={columnIndex}
                        className={`w-1/3 flex border border-black items-center justify-center text-center`}
                      >
                        {Array.from({ length: maxSeatsPerRow }).map(
                          (_, divIndex) => (
                            <div
                              key={divIndex}
                              className={`overflow-hidden text-xs flex justify-center items-center border-black w-1/3 aspect-video p-2`}
                            >
                              {row[divIndex] ? (
                                <div>
                                  {row[divIndex].name} <br /> (
                                  {row[divIndex].Class})
                                </div>
                              ) : (
                                <div className="w-1/3 h-1/3" />
                              )}
                            </div>
                          )
                        )}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-5">
        <button
          onClick={handlePrint}
          class="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Print
        </button>
      </div>
    </div>
  );
}
