import React, {
  useState,
  Fragment,
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
// import '../LandingPageCommon.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Dialog, Transition, Menu } from '@headlessui/react';
import defprop from '../../../Images/defprof.svg';
import {
  NavLink,
  redirect,
  useLoaderData,
  useParams,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import useInitializePerPage from '../../../hooks/initializePerPage/useInitializePerPage';
import useDebounce from '../../../hooks/debounce/useDebounce';
import { UserDataContext } from '../../../contexts/usersDataContext/usersDataContext';
import axios from 'axios';
import { getUserById } from '../../../contexts/usersDataContext/utils/usersApis';
import linesimage from '../../../Images/lines_10.svg';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export const userLandingLoader = async ({ params }) => {
  try {
    const { data } = await getUserById(params?.id);
    console.log(data, 'id data');
    return data;
  } catch (error) {
    console.error('Error loading dashboard:', error);
    throw redirect(`/${error?.response?.status ?? '500'}`);
  }
};

const UserLandingPage = () => {
  const { id } = useParams();
  const data = useLoaderData();
  console.log(data?.user?.customFieldsData, 'rrd');
  const customFormField = data?.user?.customFieldsData;
  console.log(customFormField, 'rdd');
  const {
    usersState: { users },
    getUser,
  } = useContext(UserDataContext);
  // for the active tabs
  const location = useLocation();
  const currentURL = location.pathname.split('/');
  console.log('currentURL', currentURL);
  const [activeTab, setActiveTab] = useState(currentURL[3]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
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
  useEffect(() => {
    console.log('events', events);
  }, [events]);
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
  // full screen
  const [expand, setExpand] = useState(false);

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
        <p className='text-xl font-semibold'>User Landing Page</p>
        <div className='flex justify-end gap-3 '>
          <NavLink to='/users'>
            <button
              type='submit'
              className='create-btn px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1'
            >
              Back
            </button>
          </NavLink>
        </div>
      </div>

      <div className='flex overflow-auto'>
        <NavLink
          to='task'
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? 'cursor-pointer px-4 py-1 text-md font-semibold'
              : isActive
              ? 'border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold'
              : 'cursor-pointer px-4 py-1 text-md font-semibold'
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to='boardmeetings'
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? 'cursor-pointer px-4 py-1 text-md font-semibold'
              : isActive
              ? 'border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold'
              : 'cursor-pointer px-4 py-1 text-md font-semibold'
          }
        >
          Board Meetings
        </NavLink>
        <NavLink
          to='documents'
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
            ? 'cursor-pointer px-4 py-1 text-md font-semibold'
            : isActive
            ? 'border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold'
            : 'cursor-pointer px-4 py-1 text-md font-semibold'
          }
        >
          Documents
        </NavLink>

        <NavLink
          to='.'
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
            ? 'cursor-pointer px-4 py-1 text-md font-semibold'
            : isActive
            ? 'border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold'
            : 'cursor-pointer px-4 py-1 text-md font-semibold'
          }
        >
          Overview
        </NavLink>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default UserLandingPage;
