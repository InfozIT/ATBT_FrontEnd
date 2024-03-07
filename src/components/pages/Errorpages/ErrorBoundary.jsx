import React, { Component } from 'react';
import { Link, useRouteError } from 'react-router-dom';
const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);
  return (

    <div className='flex justify-center items-center min-h-screen' id='error-page'>
      <div className='border-2 border-gray-100 px-10 py-2 sm:px-20 sm:py-5 md:px-40 md:py-10 shadow-md  rounded-md'>
        <div className='flex justify-center'>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-orange-600">
                        <path fill-rule="evenodd" d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z" clip-rule="evenodd" />
                    </svg> */}

          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-orange-600'
          >
            <path
              fill-rule='evenodd'
              d='M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z'
              clip-rule='evenodd'
            />
          </svg>
        </div>
        <div className='text-4xl sm:text-6xl md:text-8xl text-center text-orange-600 font-light mt-1 sm:mt-3 md:mt-5'>
          Oops!
        </div>
        <div className='text- sm:text-2xl md:text-3xl text-center text-orange-600  sm:mt-1 md:mt-3'>
          Sorry, an unexpected error has occurred.
        </div>
        <div className='text-sm sm:text-md md:text-md text-center text-orange-600  sm:mt-1 md:mt-2'>
          {error?.statusText || error?.message || 'not found'}
        </div>
        <div className='flex justify-center mt-3 sm:mt-4 md:mt-6'>
          <button className='border border-1 border-gray-100 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-orange-600 text-white rounded-md'>
            Go Back Home
          </button>
        </div>
      </div>
    </div>
    // <div id='error-page'>
    //   <h1>Oops!</h1>
    //   <p>Sorry, an unexpected error has occurred.</p>
    //   <p>
    //     <i>{error?.statusText || error?.message || 'not found'}</i>
    //   </p>
    // </div>
  );
};

export default ErrorBoundary;
// class ErrorBoundary extends Component {
//   state = { hasError: false, error: null, info: null };

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, info) {
//     // You can also log the error to an error reporting service
//     console.error('ErrorBoundary caught an error', error, info);
//     this.setState({ info });
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return (
//         <div>
//           <h2>Something went wrong.</h2>
//           <p>{this?.state?.error?.toString()}</p>
//           <p>{this?.state?.error?.response?.data?.message ?? 'none'}</p>
//           <p>{this?.state?.info?.componentStack ?? 'none'}</p>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
