import React from "react";
import { BsFillPlusSquareFill, BsPlusSquare } from "react-icons/bs";
import { IoArrowRedo, IoArrowRedoOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const NoRooms = () => {
  return (
    <div className="w-full h-full flex flex-col items-center p-1 py-8">
      <p className="text-4xl">{"🧐"}</p>
      <span className="h-2" />
      <p className="text-sm text-center">
        Look like you haven't joined any Room yet.
      </p>
      <span className="h-4" />
      <div className="flex items-center">
        <p className="text-gray-100 font-medium">Join a room </p>
        <NavLink to="/join_room">
          <button className="p-3 m-2 text-xl text-white/40 bg-green-500/30 rounded group">
            <IoArrowRedoOutline className="group-hover:hidden" />
            <IoArrowRedo className="group-hover:flex hidden text-white" />
          </button>
        </NavLink>
      </div>
      <span className="h-2" />
      <p className="">or</p>
      <span className="h-2" />
      <div className="flex items-center">
        <p className="text-gray-100 font-medium">Create a new room </p>
        <NavLink to="/create_room">
          <button className="p-3 m-2 text-xl text-white/40 bg-pink-500/30 rounded group">
            <BsPlusSquare className="group-hover:hidden" />
            <BsFillPlusSquareFill className="group-hover:flex hidden text-white" />
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default NoRooms;
