import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
// import Model1 from '../../../components/model/model1'
// import AddIcon from '@mui/icons-material/Add';

var state = false

export default function Gallery() {
  const [openGallary, setOpenGalary] = useState(false)
  const [openCircular, setOpenCircular] = useState(false)
  const [openEvent, setOpenEvent] = useState(false)

  return (
    <>
      <div className="flex justify-center items-center relative p-5">
        {!openGallary && !openCircular && !openEvent && (
          <div className="flex p-5 gap-5 w-full">
            <div className="border-2 w-1/3 flex justify-center flex-col">
              <h1>Make Changes In Gallery</h1>
              <div className="w-full">
                <table className="w-full">
                  <thead>
                    <tr className="flex items-center justify-between w-full p-3">
                      <td className="font-serif font-bold text-3xl">
                        Pictures In Galary
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setOpenGalary(!openGallary)
                          }}
                          href="#_"
                          class="relative inline-block text-lg group"
                        >
                          <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                            <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                            <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                            <span class="relative">+</span>
                            
                          </span>
                          
                          <span
                            class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                            data-rounded="rounded-lg"
                          ></span>
                        </button>
                      </td>
                    </tr>
                    <tr className=" overflow-x-scroll flex p-4 gap-4 justify-center">
                      <div className="aspect-video w-full bg-no-repeat bg-cover bg-center border-2 border-black outline-double bg-[url('https://imglarger.com/Images/before-after/ai-image-enlarger-1-after-2.jpg')]">
                      {/* <span style={{"border: 1px solid silver; border-radius: 0.25em; padding: 0.5em;"}}><FontAwesomeIcon icon="fa-regular fa-plus" shake size="2xs" /></span> */}
                      </div>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>

            <div className="border-2 w-1/3">
              <button
                onClick={() => {
                  setOpenCircular(!openCircular)
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

            <div className="border-2 w-1/3">
              <button
                onClick={() => {
                  setOpenEvent(!openEvent)
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
                    setOpenGalary(!openGallary)
                  }}
                  class="w-6 h-6 hover:cursor-pointer"
                  fill="none"
                  stroke={'currentColor'}
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

        {/* CircularMOdel */}
        {openCircular && (
          //model
          <div class="flex justify-center h-full items-center  antialiased w-full">
            <div class="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
              <div class="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
                <p class="font-semibold text-gray-800">Add a New Circular</p>
                <svg
                  onClick={() => {
                    setOpenCircular(!openCircular)
                  }}
                  class="w-6 h-6 hover:cursor-pointer"
                  fill="none"
                  stroke={'currentColor'}
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

        {/* Event=Model */}
        {openEvent && (
          //model
          <div class="flex justify-center h-full items-center  antialiased w-full">
            <div class="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
              <div class="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
                <p class="font-semibold text-gray-800">Add a New Event</p>
                <svg
                  onClick={() => {
                    setOpenEvent(!openEvent)
                  }}
                  class="w-6 h-6 hover:cursor-pointer"
                  fill="none"
                  stroke={'currentColor'}
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
  )
}
