import React, { useEffect, useState } from "react";

export default function GatePass(props) {
  const [reason, setReason] = useState();
  const [guardian, setGuardian] = useState();
  const current = new Date();
  const time = current.toLocaleTimeString("en-US");
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  // useEffect(() => {
  //   console.log(props.props.Image);
  // }, [props]);
if(props.props){
  return (
    <div class="max-w-md mx-auto z-10 bg-blue-900 rounded-3xl">
      <div class="flex flex-col">
        <div class="bg-white relative drop-shadow-2xl  rounded-3xl p-4 m-4">
          <div class="flex-none sm:flex">
            <div class=" relative h-32 w-32   sm:mb-0 mb-3 hidden">
              <img
                src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                alt="aji"
                class=" w-32 h-32 object-cover rounded-2xl"
              />
              <a
                href="#"
                class="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-4 w-4"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
              </a>
            </div>
            <div class="flex-auto justify-evenly">
              <div class="flex items-center justify-between">
                <div class="flex items-center  my-1">
                  <span class="mr-3 rounded-full bg-white w-8 h-8">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=0d48043a-f970-4495-b131-5f788bb00733"
                      class="h-8 p-1"
                    />
                  </span>
                  <h2 class="font-medium">M J Public School</h2>
                </div>
                <div class="ml-auto text-blue-800">GatePass</div>
              </div>
              <div class="border-b border-dashed border-b-2 my-5"></div>
              <div class="flex items-center">
                <div class="flex flex-col mx-0">
                  <img src={props.props.Image} class="w-20 p-1 rounded-2xl" />
                </div>
                <div class="flex flex-col mx-10">
                  <div class="text-sm">{props.props.Sr_Number}</div>

                  <div class="w-full flex-none text-2xl text-blue-800 font-bold leading-none">
                    {props.props.name}
                  </div>
                  <div class="text-sm">{props.props.Class}</div>
                </div>

                {/* <div class="flex flex-col ">
                  <div class="flex-auto text-xs text-gray-400 my-1">
                    <span class="mr-1">MO</span>
                    <span>19 22</span>
                  </div>
                  <div class="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                    DXB
                  </div>
                  <div class="text-xs">Dubai</div>
                </div> */}
              </div>
              <div class="border-b border-dashed border-b-2 my-5 pt-5">
                <div class="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                <div class="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
              </div>
              <div class="flex items-center mb-5 p-5 text-sm">
                <div class="flex mx-auto">
                  <img src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2Fapproved.png?alt=media&token=59fbf0fc-c5bd-461a-b229-7d9b0dc017f7" />
                </div>
              </div>
              <div class="border-b border-dashed border-b-2 my-5 pt-5">
                <div class="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                <div class="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
              </div>
              <div class="flex items-center px-5 pt-3 text-sm">
                <div class="flex flex-col">
                  <span class="font-bold">Reason</span>
                  <div class="font-semibold"><input onChange={(e)=>{setReason(e.target.value)}} value={reason} placeholder="Write Reason"></input></div>
                </div>
                <div class="flex flex-col mx-auto">
                  <span class="font-bold">Guardian</span>
                  <div class="font-semibold"><input onChange={(e)=>{setGuardian(e.target.value)}} value={guardian} placeholder="Guardian Name"></input></div>
                </div>
                
              </div>
              <div class="flex items-center px-5 pt-3 text-sm">
                <div class="flex flex-col">
                  <span class="font-bold">Date</span>
                  <div class="font-semibold">{date}</div>
                </div>
                <div class="flex flex-col mx-auto">
                  <span class="font-bold">Time</span>
                  <div class="font-semibold">{time}</div>
                </div>
                
              </div>
              <div class="flex flex-col py-5  justify-center text-sm ">
                <h6 class="font-bold text-center">Authorised Signature</h6>

                <div className="h-14 w-0 inline-block mt-4 relative left-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );}
  
}
