import React from 'react';
import './Dashboard.css';
import login_bg from '../../../Images/login_bg.jpg';
import logo from '../../../Images/logo.png';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function Dashboard() {
  return (
    <div className="container p-3 bg-[#f8fafc] ">
      <h1 className='m-3 font-semibold'>Home</h1>
      <div className='text-center '>

        <p class="text-md">Monday, January 08</p>

        <h4 class=" text-2xl font-bold dark:text-white">Good Morning , Bhavitha</h4>

        <div className='flex flex-wrap mt-4 justify-center'>

          <div className="tota_tasks border-r-2 border-black-100 bg-gray-100 p-2 rounded-s-full">

            <h6 className='mr-4 ml-4 px-2 text-xs'>Total Tasks</h6>

            <p className='mr-4 ml-4 px-2 '>1,000</p>

          </div>

          <div className=" completed_tasks border-r-2 border-black-100 bg-gray-100 p-2">

            <h5 className='mr-4 ml-4 px-2 text-sm'>Completed Tasks</h5>

            <p className='mr-4 ml-4 px-2'>1,000</p>

          </div>
          <div className=" upcoming_tasks border-r-2 border-black-100 bg-gray-100 p-2">

            <h5 className='mr-4 ml-4 text-sm '>Upcoming Tasks</h5>

            <p className='mr-4 ml-4'>1,000</p>

          </div>

          <div className=" overdue_tasks border-r-2 border-black-100 bg-gray-100 p-2 rounded-e-full">

            <h5 className='mr-4 ml-4 px-2 text-sm'>Overdue Tasks</h5>

            <p className='mr-4 ml-4 px-2'>1,000</p>

          </div>

        </div>

      </div>
      <div className="mt-8">
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-col-2 gap-2'>
          <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className='grid1-item overflow-hidden sm:w-full' >
              <div className='p-3 sm:px-4 sm:py-2'>
                <div class="flex items-center justify-between mb-4">
                  <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Entities</h5>
                  <Link to="#" class="text-sm font-medium text-white-600 hover:underline dark:text-white-500">
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-500 text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 shrink-0 bg-orange-400 text-white gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 ">
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                      </svg>
                      Create</button>
                  </Link>
                </div>
                <div className='flex gap-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
                  </svg>
                  <p>Search Entity</p>

                </div><hr className='w-60 mt-2' />
              </div>
              <hr className='p-0' />
              <div class="flow-root p-3 sm:px-4 sm:py-2">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={login_bg} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
                          Kapil Knowledge Hub Private Limited
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>

                      </div>
                    </div>
                  </li>
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
                          Kapil Properties
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-start text-gray-900 truncate dark:text-white">
                          Kapil Chits
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />
                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-start text-gray-900 truncate dark:text-white">
                          Kapil IT Solutions
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
                  <li class="pt-3 pb-0 sm:pt-4">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
                          Taaza Panta
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>


            </div>

          </div>

          <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className='grid1-item overflow-hidden sm:w-full' >
              <div className='p-3 sm:px-4 sm:py-2'>
                <div class="flex items-center justify-between mb-4">
                  <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Entities</h5>
                  <Link to="#" class="text-sm font-medium text-white-600 hover:underline dark:text-white-500">
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-500 text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 shrink-0 bg-orange-400 text-white gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 ">
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                      </svg>
                      Create</button>
                  </Link>
                </div>
                <div className='flex gap-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
                  </svg>
                  <p>Search Entity</p>

                </div><hr className='w-60 mt-2' />
              </div>
              <hr className='p-0' />
              <div class="flow-root p-3 sm:px-4 sm:py-2">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={login_bg} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
                          Kapil Knowledge Hub Private Limited
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>

                      </div>
                    </div>
                  </li>
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
                          Kapil Properties
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-start text-gray-900 truncate dark:text-white">
                          Kapil Chits
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
                  <li class="py-2 sm:py-2">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />
                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-start text-gray-900 truncate dark:text-white">
                          Kapil IT Solutions
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
                  <li class="pt-3 pb-0 sm:pt-4">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={logo} alt="Neil image" />

                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
                          Taaza Panta
                        </p>

                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>


            </div>

          </div>


        </div>
      </div>
    </div>
  );
}

export default Dashboard;
