import React, {
  useState,
  Fragment,
  useRef,
  useEffect,
  useContext,
} from 'react';
import '../LandingPageCommon.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Dialog, Transition, Menu } from '@headlessui/react';
import defprop from '../../../Images/defprof.svg';
import { Link, Outlet, useParams } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import useInitializePerPage from '../../../hooks/initializePerPage/useInitializePerPage';
import useDebounce from '../../../hooks/debounce/useDebounce';
import { BoardMeetingsDataContext } from '../../../contexts/boardmeetingsDataContext/boardmeetingsDataContext';
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const BoardMeetingLandingPage = () => {
  const {
    getBoardMeetingbyId,
    boardmeetingsState: { boardmeetings },
  } = useContext(BoardMeetingsDataContext);
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});

  // For tabs active
  const getSingleProduct = async () => {
    try {
      const boardmeetingById = boardmeetings?.BoardMeetings?.find(
        (element) => element.id === +id
      );
      if (!boardmeetingById) {
        const product = await getBoardMeetingbyId(id);
        setSingleProduct(product?.data?.BoardMeetings);
      } else {
        setSingleProduct(boardmeetingById);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, [id]);

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  // for calendar
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: new Date(2024, 0, 17, 10, 0),
      end: new Date(2024, 0, 17, 12, 0),
    },
  ]);
  const [newtask, setNewTask] = useState('');
  const [newtaskStartDate, setnewtaskStartDate] = useState('');

  const [newtaskEndDate, setnewtaskEndDate] = useState('');

  const handleSelect = ({ start, end }) => {
    setOpen(true);
    setnewtaskStartDate(start);
    setnewtaskEndDate(end);
    setNewTask('');
  };

  const handleSave = () => {
    setOpen(false);

    if (newtask) {
      const newEvent = {
        title: newtask,
        start: newtaskStartDate,
        end: newtaskEndDate,
      };
      setEvents([...events, newEvent]);
      setNewTask('');
    }
  };
  // ----
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  // ---full screen
  const [expand, setExpand] = useState(false);
  let [customFormField, setCustomFormField] = useState();

  const userData = JSON.parse(localStorage.getItem('data'));
  const token = userData?.token;
  let response;
  let [predefinedImage, setPredefinedImage] = useState('');
  useEffect(() => {
    axios
      .get(`https://atbtbeta.infozit.com/boardmeeting/list/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        // Handle the successful response
        response = res;
        console.log('response', response.data.image);
        setPredefinedImage(response.data.image);
        setCustomFormField(response.data.customFieldsData);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    console.log('customFormField', customFormField);
  }, [customFormField]);

  // to set the time in 12hours
  function formatTime(timeString) {
    // Splitting the timeString to extract hours and minutes
    const [hourStr, minuteStr] = timeString.split(':');

    // Parsing hours and minutes as integers
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    // Checking if hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes)) {
      return 'Invalid time';
    }

    // Converting hours to 12-hour format and determining AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Handles midnight
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Ensures minutes are two digits

    // Constructing the formatted time string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
  }

  return (
    <div className='container p-4 bg-[#f8fafc]'>
      <div className='flex justify-between my-2'>
        <p className='text-xl font-semibold'>Board Meeting Landing Page</p>
        <div className='flex justify-end gap-3 '>
          <Link to='/users'>
            <button
              type='submit'
              className='create-btn px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1'
            >
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className=''>
        <div className='flex'>
          <div
            className={`cursor-pointer px-1 py-1 text-md font-semibold  ${
              activeTab === 1 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(1)}
          >
            Overview
          </div>

          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold  ${
              activeTab === 2 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(2)}
          >
            List
          </div>
          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold  ${
              activeTab === 3 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(3)}
          >
            Calendar
          </div>
          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold ${
              activeTab === 4 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(4)}
          >
            Dashboard
          </div>
          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold  ${
              activeTab === 5 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(5)}
          >
            Messages
          </div>
          <div
            className={`cursor-pointer px-5 py-1 text-md font-semibold  ${
              activeTab === 6 ? 'border-b-2 border-orange-600 text-black' : ''
            }`}
            onClick={() => handleTabClick(6)}
          >
            Attachments
          </div>
        </div>
        <hr />
      </div>
      {activeTab === 1 && (
        <div className='mt-5 flex justify-center'>
          <div className=' w-full md:w-full  lg:w-11/12 xl:11/12 shadow-md border-2 rounded-md bg-[#f8fafc] px-4 pb-4 pt-3'>
            {/* <div className='flex justify-end '>
              <Link
                to={`../${id}/edit`}
                relative='path'
                className='text-sm font-medium transition-colors  focus-visible:ring-1 focus-visible:ring-ring  text-gray-900 pt-2 '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-5 h-5 text-gray-900'
                >
                  <path d='m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z' />
                </svg>
              </Link>
            </div> */}
            {customFormField &&
              customFormField.length > 0 &&
              customFormField.map((item) => {
                return (
                  <div className='relative'>
                    {/* predefined fields*/}
                    <div className='flex justify-between flex-wrap'>
                      <span>
                        {item.type === 'text' &&
                          item.inputname === 'name' &&
                          item.field === 'predefined' && (
                            <div className='absolute mt-2'>
                              {item.value ? (
                                <p className='text-lg'>
                                  {item.value.toUpperCase()}
                                </p>
                              ) : (
                                <p className='text-lg text-gray-400'>Name</p>
                              )}
                            </div>
                          )}
                      </span>
                      <span>
                        {item.type === 'date' &&
                          item.inputname === 'date' &&
                          item.field === 'predefined' && (
                            <div className='mt-3'>
                              {item.value ? (
                                <p className='text-sm mt-1'>
                                  Date : {item.value}
                                </p>
                              ) : (
                                <p className='text-sm text-gray-400 mt-1'>
                                  Date : YYYY-MM-DD
                                </p>
                              )}
                            </div>
                          )}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='flex-1 mr-4'>
                        {item.type === 'select' &&
                          item.inputname === 'venue' &&
                          item.field === 'predefined' && (
                            <div className='relative w-5/6 bottom-5'>
                              {item.value ? (
                                <p className='text-sm'>
                                  Venue :{' '}
                                  <span className='text-xs'> {item.value}</span>
                                </p>
                              ) : (
                                <p className='text-sm text-gray-400'>
                                  Venue :{' '}
                                  <span className='text-xs'>
                                    abc building, xyz street , worldwide.{' '}
                                  </span>
                                </p>
                              )}
                            </div>
                          )}
                      </span>
                      <span className=''>
                        {item.type === 'time' &&
                          item.inputname === 'time' &&
                          item.field === 'predefined' && (
                            <div>
                              {item.value ? (
                                <p className='text-sm'>Time : {item.value}</p>
                              ) : (
                                <p className='text-sm text-gray-400 '>
                                  Time : 00:00 AM
                                </p>
                              )}
                            </div>
                          )}
                      </span>
                    </div>

                    {item.type === 'textarea' &&
                      item.inputname == 'description' &&
                      item.field == 'predefined' && (
                        <div className='  h-28 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full '>
                          {item.value}
                        </div>
                      )}
                    {item.type === 'multiselect' &&
                      item.inputname == 'members' &&
                      item.field == 'predefined' && (
                        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 mt-5'>
                          {item.value &&
                            Array.from({ length: 12 }).map((_, index) => {
                              let first = '';
                              let second = '';
                              let firstLetter;
                              let secondLetter;
                              let mail = '';
                              if (index < item.value.length) {
                                mail = item.value[index].email.split('@')[0];
                                if (mail.includes('.')) {
                                  first = mail.split('.')[0];
                                  second = mail.split('.')[1];
                                  firstLetter = first[0];
                                  secondLetter = second[0];
                                } else {
                                  firstLetter = mail[0];
                                }
                              }
                              if (mail.includes('.')) {
                                first = mail.split('.')[0];
                                second = mail.split('.')[1];
                                firstLetter = first[0];
                                secondLetter = second[0];
                              } else {
                                firstLetter = mail[0];
                              }
                              const colors = [
                                '#818cf8',
                                '#fb923c',
                                '#f87171',
                                '#0891b2',
                                '#db2777',
                                '#f87171',
                                '#854d0e',
                                '#166534',
                              ];
                              const getRandomColor = (firstLetter) => {
                                const randomIndex =
                                  firstLetter?.charCodeAt(0) % colors.length;
                                return colors[randomIndex];
                              };
                              return (
                                <div
                                  className='col-span-1 flex justify-start gap-3'
                                  key={index}
                                >
                                  {index + 1 <= item.value.length && (
                                    <>
                                      <h5
                                        style={{
                                          backgroundColor: item.value[index]
                                            .image
                                            ? 'transparent'
                                            : getRandomColor(firstLetter),
                                        }}
                                        className=' rounded-full w-10 h-10  md:h-8 xl:h-10 flex justify-center  text-xs items-center text-white'
                                      >
                                        {(item.value[index].image &&
                                          index < 11) ||
                                        (index === 11 &&
                                          item.value.length === 12) ? (
                                          <img
                                            src={
                                              typeof item.value[index].image ===
                                              'string'
                                                ? item.value[index].image
                                                : URL.createObjectURL(
                                                    item.value[index].image
                                                  )
                                            }
                                            name='EntityPhoto'
                                            alt='Entity Photo'
                                            className=' rounded-full w-10 h-10   flex justify-center  text-xs items-center text-white'
                                          />
                                        ) : (
                                          <span>
                                            {firstLetter?.toUpperCase()}
                                            {secondLetter &&
                                              secondLetter?.toUpperCase()}
                                          </span>
                                        )}

                                        {index == 11 &&
                                          item.value.length > 12 && (
                                            <span>
                                              <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke-width='1.5'
                                                stroke='currentColor'
                                                className='w-6 h-6'
                                              >
                                                <path
                                                  stroke-linecap='round'
                                                  stroke-linejoin='round'
                                                  d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
                                                />
                                              </svg>
                                            </span>
                                          )}
                                      </h5>
                                      <div
                                        className=' flex items-center md:items-start xl:items-center  overflow-hidden'
                                        style={{ width: '150px' }}
                                      >
                                        <div
                                          className=' md:w-28 lg:w-48  truncate'
                                          title={mail}
                                        >
                                          {index < 11 && mail}
                                          {index == 11 &&
                                            item.value.length == 12 &&
                                            mail}
                                          {index == 11 &&
                                            item.value.length > 12 && (
                                              <span>
                                                +{item.value.length - 11} more
                                              </span>
                                            )}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                  {index + 1 > item.value.length && (
                                    <>
                                      <h5 className='bg-[#e5e7eb] rounded-full w-10 h-10  flex justify-center text-xs items-center text-white'></h5>
                                      <div className=' flex items-center'>
                                        <div className=' rounded-md  bg-[#e5e7eb] h-2 w-28'></div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      )}
                    {/* customfields */}
                    {item.type === 'text' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 truncate text-[#727a85] '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600]  '>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'email' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 truncate text-[#727a85] '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6 '>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] break-all'>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}
                      </div>
                    )}

                    {item.type === 'phonenumber' && item.field == 'custom' && (
                      <div className='my-2 mx-2  flex-wrap'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 truncate text-[#727a85] '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] '>
                                {item.value.slice(0, 3)}&nbsp;
                                {item.value.slice(3, 6)}&nbsp;
                                {item.value.slice(6, 10)}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'number' && item.field == 'custom' && (
                      <div className='my-2 mx-2  flex-wrap'>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 truncate text-[#727a85] '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600]  break-all'>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'textarea' && item.field == 'custom' && (
                      <div className='my-2 mx-2  '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 text-[#727a85] truncate '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className=' flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600]  '>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'date' &&
                      item.field === 'custom' &&
                      (() => {
                        let date = new Date(item.value);
                        const day = date.getUTCDate();
                        const monthIndex = date.getUTCMonth();
                        const year = date.getUTCFullYear();

                        const monthAbbreviations = [
                          'Jan',
                          'Feb',
                          'Mar',
                          'Apr',
                          'May',
                          'Jun',
                          'Jul',
                          'Aug',
                          'Sep',
                          'Oct',
                          'Nov',
                          'Dec',
                        ];

                        // Formatting the date
                        date = `${day < 10 ? '0' : ''}${day}-${
                          monthAbbreviations[monthIndex]
                        }-${year}`;

                        return (
                          <div className='my-2 mx-2'>
                            {item.value && item.value.length > 0 && (
                              <p className='flex gap-2'>
                                <span className='w-2/6 text-[#727a85] truncate'>
                                  {item.label.charAt(0).toUpperCase() +
                                    item.label.slice(1)}
                                </span>
                                <span className='flex gap-2 w-4/6'>
                                  <span> : </span>{' '}
                                  <span className='text-md font-[600]'>
                                    {date ? date : 'No Date'}
                                  </span>
                                </span>
                              </p>
                            )}
                            {date && <hr className='mt-2' />}
                          </div>
                        );
                      })()}

                    {item.type === 'select' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 text-[#727a85] truncate  '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] '>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'multiselect' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 text-[#727a85]  truncate '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] '>
                                {item.value.join(', ')}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value.join(', ') && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'range' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex  gap-2'>
                            <span className='w-2/6 text-[#727a85] truncate '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] '>
                                {item.value}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                    {item.type === 'time' && item.field == 'custom' && (
                      <div className='my-2 mx-2 '>
                        {item.value && item.value.length > 0 && (
                          <p className='flex gap-2'>
                            <span className='w-2/6 text-[#727a85] truncate  '>
                              {item.label.charAt(0).toUpperCase() +
                                item.label.slice(1)}
                            </span>
                            <span className='  flex gap-2 w-4/6'>
                              <span> : </span>{' '}
                              <span className='text-md font-[600] '>
                                {formatTime(item.value)}
                              </span>
                            </span>
                          </p>
                        )}
                        {item.value && <hr className='mt-2' />}{' '}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {activeTab === 2 && (
        <div className=''>
          <div className='flex justify-end my-2'>
            <Menu
              as='div'
              className='relative inline-block ms-3 mt-1'
            >
              <div className=''>
                <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'>
                  Filters
                  <ChevronDownIcon
                    className='-mr-1 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Account settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Support
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          License
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu
              as='div'
              className='relative inline-block ms-3 mt-1'
            >
              <div className=''>
                <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50'>
                  Sort
                  <ChevronDownIcon
                    className='-mr-1 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Start
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Due
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Assigned
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div>
              <button className=' ms-2 create-btn mt-1 inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  text-orange-foreground shadow hover:bg-orange/90 h-9 px-3 py-1 shrink-0 bg-orange-600 text-white gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-5 h-5 '
                >
                  <path d='M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' />
                </svg>
                Add Task
              </button>
            </div>
          </div>

          <table className='w-full border-collapse border border-slate-200 mt-1 table-auto'>
            <thead>
              <tr>
                <th
                  scope='col'
                  className='py-2 text-sm text-white bg-orange-600  border-collapse border border-[#e5e7eb] '
                >
                  Task Name
                </th>
                <th
                  scope='col'
                  className='py-2 text-sm text-white bg-orange-600  border-collapse border border-[#e5e7eb] '
                >
                  Assignee
                </th>
                <th
                  scope='col'
                  className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb]'
                >
                  Due Date
                </th>
                <th
                  scope='col'
                  className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb]'
                >
                  Entity
                </th>
                <th
                  scope='col'
                  className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] '
                >
                  Status
                </th>
                <th
                  scope='col'
                  className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] '
                >
                  Create by Admin
                </th>
                <th
                  scope='col'
                  className='py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] '
                >
                  Update by Admin{' '}
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
              <tr className='text-center text-gray-500'>
                <td
                  scope='col'
                  onClick={toggleDrawer}
                  className='flex justify-between py-2 text-sm border-collapse border border-[#e5e7eb]'
                >
                  <div className='flex'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='w-5 h-5 ms-2'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>
                    <span className='text-sm ms-2'>Draft project brief</span>
                  </div>
                  <div className=''>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-5 h-5 text-end'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </td>
                <td
                  scope='col'
                  className='py-2 text-sm border-collapse border border-[#e5e7eb]'
                >
                  Assignee
                </td>
                <td
                  scope='col'
                  className='py-2 text-sm border-collapse border border-[#e5e7eb]'
                >
                  Due Date
                </td>
                <td
                  scope='col'
                  className='py-2 text-sm border-collapse border border-[#e5e7eb]'
                >
                  Entity
                </td>
                <td
                  scope='col'
                  className='py-2 text-sm border-collapse border border-[#e5e7eb] '
                >
                  Status
                </td>
                <td
                  scope='col'
                  className='py-2 text-sm border-collapse border border-[#e5e7eb] '
                >
                  Create by User{' '}
                </td>
                <td
                  scope='col'
                  className='py-2 text-sm border-collapse border border-[#e5e7eb] '
                >
                  Update by Admin{' '}
                </td>
              </tr>
              <div
                className={`fixed inset-0 transition-all duration-500 bg-gray-800 bg-opacity-50 z-50 ${
                  isOpen ? '' : 'hidden'
                }`}
              >
                <div
                  className={`${
                    expand ? 'w-5/6' : 'w-1/2'
                  } p-3 fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out`}
                >
                  <div className='flex justify-start'>
                    <div className='relative inline-block ms-2'>
                      <select className='block appearance-none w-full bg-white text-sm border border-gray-300 hover:border-gray-300 px-1 py-1.5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                        <option value='option1'>Select Status</option>
                        <option value='option2'>Complete</option>
                        <option value='option3'>Inprogress</option>
                        <option value='option4'>To Do</option>
                      </select>
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                        <svg
                          className='fill-current h-4 w-4'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                        >
                          <path d='M7 7l3-3 3 3m0 6l-3 3-3-3'></path>
                        </svg>
                      </div>
                    </div>
                    <div className='absolute top-4 right-4 flex flex-row'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        className='w-5 h-5 me-4 text-gray-500'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                        />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='me-4 w-5 h-5 text-gray-500'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 0 1 5.91 15.66l7.81-7.81a.75.75 0 0 1 1.061 1.06l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z'
                          clip-rule='evenodd'
                        />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        onClick={() => setExpand((e) => !e)}
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-5 h-5 me-4 text-gray-500'
                      >
                        <path
                          fillRule='evenodd'
                          d='M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <button
                        onClick={toggleDrawer}
                        className=''
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='w-5 h-5 text-gray-500'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className='mt-5 ms-3'>
                    <p className='text-xl font-semibold'>Bhavitha</p>
                    <div className='mt-5 flex flex-row'>
                      <p className='basis-1/4 text-sm text-gray-600'>
                        Assignee
                      </p>
                      <p className='basis-1/2 text-sm  flex flex-row'>
                        <p className='bg-yellow-500 text-black py-1.5 w-8 h-8  rounded-full'>
                          <span className='flex justify-center text-gray-800 text-sm'>
                            BA
                          </span>
                        </p>
                        <span className='ms-2 mt-1 text-sm'>
                          Bhavitha Agrawal
                        </span>
                      </p>
                    </div>
                    <div className='mt-5 flex flex-row'>
                      <p className='basis-1/4 text-sm text-gray-600'>
                        Due Date
                      </p>
                      <p className='basis-1/2 text-sm'>24/1/2024</p>
                    </div>
                    <div className='mt-5 flex flex-row'>
                      <p className='basis-1/4 text-sm text-gray-600'>Entity</p>
                      <p className='basis-1/2 text-sm'>Entity Text</p>
                    </div>
                    <div className='mt-5 flex flex-row'>
                      <p className='basis-1/4 text-sm text-gray-600'>
                        Board Meeting
                      </p>
                      <p className='basis-1/2 text-sm'>Board Meeting Text</p>
                    </div>
                    <div className='mt-5 flex flex-row'>
                      <p className='basis-1/4 text-sm text-gray-600  mt-1'>
                        Priority
                      </p>
                      <p className='basis-1/2'>
                        <div className='relative inline-block'>
                          <select className='block appearance-none w-full bg-white border text-sm border-gray-300 hover:border-gray-300 px-1 py-1.5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                            <option value='option1'>Select Priority</option>
                            <option value='option2'>Low</option>
                            <option value='option3'>Medium</option>
                            <option value='option4'>High</option>
                          </select>
                          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                            <svg
                              className='fill-current h-4 w-4'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                            >
                              <path d='M7 7l3-3 3 3m0 6l-3 3-3-3'></path>
                            </svg>
                          </div>
                        </div>

                        {/*                                             
                                    <Menu as="div" className="relative inline-block">
                                        <div className=''>
                                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
                                                Priority List
                                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Low
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Medium
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                               High
                                                            </Link>
                                                        )}
                                                    </Menu.Item>

                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu> */}
                      </p>
                    </div>
                    <div className='mt-5 flex flex-row'>
                      <p className='basis-1/4 text-sm text-gray-600'>
                        Description
                      </p>
                      <p className='basis-1/2'></p>
                    </div>
                    <div className='mt-5'>
                      <textarea
                        placeholder='What is this task about ?'
                        className='p-3 text-sm resize-none shadow-sm rounded-md w-full h-32 focus:outline-none focus:border-orange-400'
                      ></textarea>
                    </div>
                    <div className='flex mt-5'>
                      <div className='me-2'>
                        <p className='bg-yellow-500 text-black py-1.5 w-8 h-8  rounded-full'>
                          <span className='flex justify-center text-gray-800 text-sm'>
                            BA
                          </span>
                        </p>
                      </div>
                      <div className='flex-1 w-86'>
                        <textarea
                          placeholder='Add a comment'
                          className='p-2 border-2 text-sm resize-none shadow-sm rounded-md w-full h-24 focus:outline-none focus:border-orange-400'
                        ></textarea>
                        <div className='me-2 flex flex-row'>
                          <p className='text-sm mt-1'>Collaborators</p>
                          <p className='ms-2 bg-yellow-500 text-black py-1.5 w-8 h-8 rounded-full'>
                            <span className='flex justify-center text-gray-800 text-sm'>
                              BA
                            </span>
                          </p>
                          <p className='ms-2 bg-white border-dashed border-2 border-gray-600 text-gray-600  py-1 w-7 h-7 rounded-full'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke-width='1.5'
                              stroke='currentColor'
                              className='ms-1 w-4 h-4'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                              />
                            </svg>
                          </p>
                          <p className='ms-2 bg-white border-dashed border-2 border-gray-600 text-gray-600  py-1 w-7 h-7 rounded-full'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke-width='1.5'
                              stroke='currentColor'
                              className='ms-1 w-4 h-4'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                              />
                            </svg>
                          </p>
                          <p>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-4 h-4 mt-2 ms-2'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 4.5v15m7.5-7.5h-15'
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <tr className='text-center text-gray-500'>
                <td className='py-2 border-slate-200 flex justify-start ms-4 text-sm'>
                  <input
                    className='w-full bg-gray-50 border-none focus:outline-none'
                    type='text'
                    placeholder='Add Task ..'
                  />
                </td>
                <td
                  className='border text-sm'
                  colspan='7'
                ></td>
              </tr>
              {/* <div className='flex flex-start' onClick={handledoing}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mt-3">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    <p className='text-md ms-2 font-semibold mb-3 mt-3'>Doing</p>
                </div>
                {doing &&
                    <tr className='text-center text-gray-500'>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] flex justify-start"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 ms-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg><span className='text-sm ms-2'>Draft project brief</span></td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Assigne</td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Due Date</td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Board Meeting</td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Status</td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Create by User </td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Update by Admin </td>
                    </tr>}
                <tr className='text-center text-gray-500'>
                    <td className="py-2 border-slate-200 flex justify-start ms-4 text-sm border-b-" colspan="">
                        <input className='w-full bg-gray-50 border-none focus:outline-none' type="text" placeholder='Add Task ..' />
                    </td>
                    <td className="border text-sm" colspan="7"></td>
                </tr>

                <div className='flex flex-start' onClick={handledone}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mt-3">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    <p className='text-md ms-2 font-semibold mb-3 mt-3'>Done</p>
                </div>
                {done &&
                    <tr className='text-center text-gray-500'>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] flex justify-start"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 ms-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg><span className='text-sm ms-2'>Draft project brief</span></td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Assigne</td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Due Date</td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Board Meeting</td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Status</td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Create by User </td>
                        <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Update by Admin </td>
                    </tr>

                } 
                <tr className='text-center text-gray-500'>
                    <td className="py-2 border-slate-200 flex justify-start ms-4 text-sm border-b-" colspan="">
                        <input className='w-full bg-gray-50 border-none focus:outline-none' type="text" placeholder='Add Task ..' />
                    </td>
                    <td className="border text-sm" colspan="7"></td>
            </tr> */}
            </tbody>
          </table>
          <div></div>
        </div>
      )}
      {activeTab === 3 && (
        <div className='mt-4'>
          <div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor='start'
              endAccessor='end'
              style={{ height: 500 }}
              selectable
              onSelectSlot={handleSelect}
            />

            <Transition.Root
              show={open}
              as={Fragment}
            >
              <Dialog
                as='div'
                className='relative z-10'
                initialFocus={cancelButtonRef}
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                  <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-out duration-300'
                      enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                      enterTo='opacity-100 translate-y-0 sm:scale-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                      leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                      <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                        <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                          <div className='sm:flex sm:items-start'>
                            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-600 sm:mx-0 sm:h-10 sm:w-10'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='w-5 h-5 text-white'
                              >
                                <path d='M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' />
                              </svg>

                              {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                            </div>
                            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                              <Dialog.Title
                                as='h3'
                                className='text-base font-semibold leading-6 text-gray-900'
                              >
                                Create New Task
                              </Dialog.Title>
                              <div className='mt-2'>
                                <input
                                  placeholder='Enter Task Here'
                                  className='focus:outline-none ps-1 border-b-2 border-gray-200'
                                  onChange={(e) => setNewTask(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2'>
                          <button
                            type='button'
                            className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                          <button
                            type='button'
                            className='inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm  text-white shadow-sm  sm:ml-3 sm:w-auto'
                            onClick={handleSave}
                          >
                            Save
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        </div>
      )}
      {activeTab === 4 && <div className='mt-4'>kikk</div>}
      {activeTab === 5 && (
        <div className='mt-4'>
          <div className='flex flex-col '>
            <div className='flex justify-center'>
              <div className='flex flex-start rounded-md border-2 border-gray-200 px-3 py-2'>
                <img
                  className='w-8 h-8 rounded-full mx-3 my-3'
                  src={defprop}
                  alt='Neil image'
                />
                <div className='mt-2 mr-2'>
                  <input
                    className='px-2 py-2 w-96 focus:outline-none bg-[#f8fafc] rounded-md border-2 border-gray-200 '
                    type='text'
                    placeholder='Enter Your Message'
                  />
                </div>
                <div className=''>
                  <button className='mt-4 text-lg'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className='w-5 h-5'
                    >
                      <path d='M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 6 && <div className='mt-4'>kikk</div>}
    </div>
  );
};

export default BoardMeetingLandingPage;
