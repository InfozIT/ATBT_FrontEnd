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

const BoardMeetingOverview = () => {
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
        <div className='mt-5 flex justify-center'>
            <div className=' w-full md:w-full  lg:w-11/12 xl:11/12 shadow-md border-2 rounded-md bg-[#f8fafc] px-4 pb-4 pt-1'>
                <div className='flex justify-end '>
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
                </div>
                {customFormField &&
                    customFormField.length > 0 &&
                    customFormField.map((item) => {
                        return (
                            <div className='relative'>
                                {/* predefined */}
                                {item.type === 'text' &&
                                    item.inputname === 'name' &&
                                    item.field === 'predefined' && (
                                        <p className='text-lg '>
                                            {item.value.toUpperCase()}
                                        </p>
                                    )}
                                <div className='md:flex md:justify-between '>
                                    <div className='md:flex-1 mr-4'>
                                        {item.type === 'select' &&
                                            item.inputname === 'venue' &&
                                            item.field === 'predefined' && (
                                                <div className='md:relative md:w-4/6   md:bottom-6 mt-1'>
                                                    <p className='text-sm'>  Meeting Number : <span className='text-xs'>201</span>  </p>
                                                </div>
                                            )}
                                    </div>
                                    {item.type === 'date' &&
                                        item.inputname === 'date' &&
                                        item.field === 'predefined' && (
                                            <p className='text-sm  '>
                                                Dateg : {item.value}
                                            </p>
                                        )}
                                </div>
                                {/* <div className='flex justify-start md:justify-end'>
                                    <span className=''>
                                        {item.type === 'time' &&
                                            item.inputname === 'time' &&
                                            item.field === 'predefined' && (
                                                <p className='text-sm mt-1 '>Time :   {formatTime(item.value)}</p>
                                            )}
                                    </span>
                                </div> */}
                                {item.type === 'textarea' &&
                                    item.inputname == 'description' &&
                                    item.field == 'predefined' && (
                                        <div className=' h-28 overflow-auto border border-1 border-gray-200 rounded-md p-2 bg-[#f8fafc] text-sm w-full '>
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
                                        date = `${day < 10 ? '0' : ''}${day}-${monthAbbreviations[monthIndex]
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
    )
}

export default BoardMeetingOverview