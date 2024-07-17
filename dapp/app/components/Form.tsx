import React, { useState } from "react";
import { User } from "../types/User";
import useDTwitter from "../hooks/useEthereum";

const Form = ({
  userData,
  setUserData,
}: {
  userData: User;
  setUserData: any;
}) => {
  const { createUser } = useDTwitter();

  const handleChangeName = (e) => {
    const { value } = e.target;
    setUserData({
      ...userData,
      name: value,
    });
  };
  const handleChangeUsername = (e) => {
    const { value } = e.target;
    setUserData({
      ...userData,
      username: value,
    });
  };
  const handleChangeBio = (e) => {
    const { value } = e.target;
    setUserData({
      ...userData,
      bio: value,
    });
  };

  const handleFileChange = (e) => {
    setUserData({
      ...userData,
      avatar: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    createUser(userData.name, userData.username, userData.bio, userData.avatar);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChangeName}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 font-bold mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChangeUsername}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          onChange={handleChangeBio}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="avatar" className="block text-gray-700 font-bold mb-2">
          Avatar
        </label>
        <input
          type="text"
          id="avatar"
          name="avatar"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </form>
  );
};

export default Form;
