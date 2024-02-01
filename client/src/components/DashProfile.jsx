import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const hadleChange = async (e) => {};
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("handlesubmit");
  };
  return (
    <>
      {editMode ? (
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl p-5 m-2">Edit your Profile</h1>
          <div className="bg-white w-[90%] px-3 py-5 sm:p-6 mx-auto flex rounded-lg">
            <div className="flex flex-col gap-4 w-full sm:px-10">
              <form
                onSubmit={handleUpdate}
                className="flex flex-col gap-3 w-full"
              >
                <input type="file" hidden />
                <img
                  src={currentUser.profilePic}
                  alt=""
                  className="w-32 h-32 object-cover rounded-full"
                />
                <div className="flex flex-wrap gap-3 sm:gap-6">
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label htmlFor="firstName" className="span1 text-xs">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Enter your first name"
                      onChange={hadleChange}
                      defaultValue={currentUser.firstName}
                      className="input"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label htmlFor="lastName" className="span1 text-xs">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Enter your last name"
                      onChange={hadleChange}
                      defaultValue={currentUser.lastName}
                      className="input"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label htmlFor="email" className="span1 text-xs">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      onChange={hadleChange}
                      defaultValue={currentUser.email}
                      className="input"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label htmlFor="password" className="span1 text-xs">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your new password"
                      onChange={hadleChange}
                      defaultValue={currentUser.password}
                      className="input"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="button"
                  >
                    Cancel Update
                  </button>
                  <button type="submit" className="button2">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl p-5 m-2">My Profile</h1>
          <div className="bg-white w-[90%] p-3 sm:p-6 mx-auto flex rounded-lg">
            <div className="flex flex-col">
              <div className="mx-auto mt-4">
                <img
                  src={currentUser.profilePic}
                  className="h-28 w-28 sm:h-44 sm:w-44 object-cover rounded-full"
                  alt=""
                />
              </div>
              <div className="flex w-full">
                <div className="p-3 sm:p-5 mx-auto ">
                  <div className="flex flex-wrap gap-3 my-5">
                    <div className="w-52  p-2 rounded-lg hover:shadow-lg">
                      <h1 className="text-lg">Full Name</h1>
                      <span className="span2">{`${currentUser.firstName} ${currentUser.lastName}`}</span>
                    </div>
                    <div className="w-52  p-2 rounded-lg hover:shadow-lg">
                      <h1 className="text-lg">Email</h1>
                      <span className="span2">{`${currentUser.email}`}</span>
                    </div>
                    <div className="w-52  p-2 rounded-lg hover:shadow-lg ">
                      <h1 className="text-lg">Phone No.</h1>
                      <span className="span2">
                        {currentUser.mobile
                          ? currentUser.mobile
                          : "Please Provide first!"}
                      </span>
                    </div>
                    <div className="w-52  p-2 rounded-lg hover:shadow-lg ">
                      <h1 className="text-lg">Address</h1>
                      <span className="span2">
                        {currentUser.address
                          ? currentUser.address
                          : "Please Provide first!"}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setEditMode(true)} className="button">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
