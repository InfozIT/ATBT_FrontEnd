import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
const CommentsView = ({
  comments,
  messagesEndRef,
  setIsCommentEditing,
  setNewComment,
}) => {
  let loggedInUser = JSON.parse(localStorage.getItem("data")).user;
  let fetcher = useFetcher();
  const attachmentStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
    margin: "10px",
  };
  const [commentCrudView, setCommentCrudView] = useState(null);
  const handleCommentCrudView = (id) => {
    setCommentCrudView(id === commentCrudView ? null : id);
  };
  const handleDeleteComment = (commentId) => {
    let UpdateData = {
      id: commentId,
      type: "DELETE_COMMENT",
    };
    console.log("UpdateData", UpdateData);
    try {
      fetcher.submit(UpdateData, {
        method: "DELETE",
        encType: "application/json",
      });
      setCommentCrudView(null);
    } catch (error) {
      console.log(error, "which error");
    }
  };
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCommentCrudView(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [displayAllComments, setDisplayAllComments] = useState(true);
  console.log("displayAllComments", displayAllComments);

  useEffect(() => {
    setDisplayAllComments(comments?.length <= 5);
  }, [comments]);
  return (
    <div>
      <div className="bg-[#f8fafc] ">
        <p className="p-3"> Comments</p>
        <hr />
        {/* {comments?.length > 5 && (
          <p
            onClick={() => setDisplayAllComments((prev) => !prev)}
            className="text-sm p-3 text-end text-blue-500 hover:underline"
          > */}
            {/* {displayAllComments
              ? "Hide earlier comments"
              : comments.length - 5 + " more comments"} */}
{comments?.length > 5 && (
  <p
    onClick={() => setDisplayAllComments((prev) => !prev)}
    className="text-sm p-3 text-end text-blue-500 hover:underline"
  >
    {displayAllComments
      ? "Hide earlier comments"
      : comments.length === 6
        ? "One more comment"
        : comments.length - 5 + " more comments"}
  </p>
)}

        {Array.isArray(comments) &&
          comments.length > 0 &&
          comments?.map((comment, index) => (
            <React.Fragment key={comment.id}>
              {displayAllComments || index >= comments.length - 5 ? (
                <div className=" pe-5 md:pe-3  py-2 grid grid-cols-11 sm:grid-cols-11 md:grid-cols-11 xl:grid-cols-11 lg:grid-ols-11  items-start">
                  <div className="md:col-span-1 text-center  flex justify-center">
                    <p className="hidden md:block  w-9 h-9 rounded-full ">
                      <span className="flex justify-center text-white text-sm">
                        <img src={comment.senderImage} />
                      </span>
                    </p>
                  </div>
                  <div key={index} className="col-span-9 ">
                    <div>
                      <span className="font-semibold block md:inline text-sm">
                        {comment.senderName} &nbsp;
                      </span>
                      <span className="text-sm text-gray-500">
                        {comment.createdAt &&
                          (() => {
                            let date = new Date(comment.createdAt);
                            const day = date.getUTCDate();
                            const monthIndex = date.getUTCMonth();
                            const year = date.getUTCFullYear();
                            const ISTOffset = 330; // 5 hours 30 minutes in minutes
                            const indianDateTime = new Date(
                              date.getTime() + ISTOffset * 60000
                            );

                            const hours = indianDateTime.getUTCHours();
                            const minutes = indianDateTime.getUTCMinutes();
                            const seconds = indianDateTime.getUTCSeconds();
                            const monthAbbreviations = [
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December",
                            ];

                            let ordinalsText = "";
                            if (day == 1 || day == 21 || day == 31) {
                              ordinalsText = "st";
                            } else if (day == 2 || day == 22) {
                              ordinalsText = "nd";
                            } else if (day == 3 || day == 23) {
                              ordinalsText = "rd";
                            } else {
                              ordinalsText = "th";
                            }
                            // Formatting the date
                            date = ` ${monthAbbreviations[monthIndex]} ${
                              day < 10 ? "0" : ""
                            }${day}${ordinalsText}, ${year}`;

                            const amPM = hours >= 12 ? "PM" : "AM";
                            const hour12Format = hours % 12 || 12; // Convert midnight (0) to 12
                            const time = `${hour12Format}:${
                              minutes < 10 ? "0" : ""
                            }${minutes} ${amPM}`;
                            // const time = `${hour12Format}:${
                            //   minutes < 10 ? "0" : ""
                            // }${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${amPM}`;

                            return (
                              <span
                                className="w-full truncate text-sm"
                                title={date ? date : "No Date"}
                              >
                                {" "}
                                {date ? date : "No Date"} at{" "}
                                {time ? time : "No Time"}
                              </span>
                            );
                          })()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.message}</p>
                  </div>
                  <div>
                    {/* like button */}
                    <div className="flex justify-around items-center md:gap-3">
                      {/* <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>
              </div> */}
                      <div class="relative inline-block text-left bottom-0">
                        <div>
                          {parseInt(loggedInUser.id) ===
                            parseInt(comment.senderId) && (
                            <button
                              type="button"
                              class="inline-flex w-full justify-center items-center gap-x-1.5  text-sm font-semibold text-gray-900  "
                              id="menu-button"
                              aria-expanded="true"
                              aria-haspopup="true"
                              onClick={() => handleCommentCrudView(comment.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-4 h-4"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </button>
                          )}
                          {commentCrudView === comment.id && (
                            <div
                              ref={menuRef}
                              class="absolute right-0  z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="menu-button"
                              tabindex="-1"
                            >
                              <div class="py-1" role="none">
                                <p
                                  class="text-gray-700  px-3 py-1.5 text-sm flex gap-3 cursor-pointer hover:bg-gray-200"
                                  onClick={() => {
                                    setIsCommentEditing(true);
                                    setNewComment(comment);
                                    setCommentCrudView(null);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                    />
                                  </svg>
                                  Edit
                                </p>
                                <p
                                  className="text-gray-700  px-3 py-1.5 text-sm flex gap-3 cursor-pointer hover:bg-gray-200"
                                  onClick={() => {
                                    handleDeleteComment(comment.id);
                                    setNewComment({
                                      message: "",
                                      file: "",
                                      senderId: "",
                                    });
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                  </svg>
                                  Delete
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
</svg> */}
                  </div>
                </div>
              ) : null}
            </React.Fragment>
          ))}

        {/* <div>
              {comment.file.map((attachment, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(attachment)}
                  alt={`Attachment ${idx}`}
                  style={attachmentStyle}
                />
              ))}
            </div> */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default CommentsView;