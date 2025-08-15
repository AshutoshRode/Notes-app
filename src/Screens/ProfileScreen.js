import React from "react";
import { useSelector } from "react-redux";

function ProfileScreen() {
  const { response } = useSelector((store) => store.userSignin);

  if (!response) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        You must be logged in to view this page.
      </div>
    );
  }

  const user = response.data;
  const userName = user?.firstName || user?.name || "User";
  const lastName = user?.lastName || user?.name || "User";
  const userEmail = user?.email || "No email provided";

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-blue-700 mb-4">
        Profile 
      </h1>
      <div className="space-y-4">
        <p>
          <span className="font-medium text-gray-700">Name: </span>
          {userName } {lastName}
        </p>
        <p>
          <span className="font-medium text-gray-700">Email: </span>
          {userEmail}
        </p>
        {/* <p>
          <span className="font-medium text-gray-700">User ID: </span>
          {user?.id || "N/A"}
        </p> */}
      </div>
    </div>
  );
}

export default ProfileScreen;
