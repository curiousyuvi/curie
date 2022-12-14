import Link from "next/link";
import React from "react";
import { BsFillPlusSquareFill, BsPlusSquare } from "react-icons/bs";
import { RiLoginBoxFill, RiLoginBoxLine } from "react-icons/ri";

const NoRooms = () => {
  return (
    <div className="w-full h-full flex flex-col items-center px-2 py-8">
      <p className="text-4xl">{"🧐"}</p>
      <span className="h-2" />
      <p className="text-sm text-center">
        Look like you haven't joined any Room yet.
      </p>
      <span className="h-4" />
      <div className="flex items-center">
        <p className="text-gray-100 font-medium">Join a room </p>
        <Link href="/join_room">
          <button className="p-3 m-2 text-3xl text-white/40 bg-green-500/30 rounded group">
            <RiLoginBoxLine className="group-hover:hidden" />
            <RiLoginBoxFill className="group-hover:flex hidden text-white" />
          </button>
        </Link>
      </div>
      <span className="h-2" />
      <p className="">or</p>
      <span className="h-2" />
      <div className="flex items-center">
        <p className="text-gray-100 font-medium">Create a new room </p>
        <Link href="/create_room">
          <button className="p-3 m-2 text-3xl text-white/40 bg-pink-500/30 rounded group">
            <BsPlusSquare className="group-hover:hidden" />
            <BsFillPlusSquareFill className="group-hover:flex hidden text-white" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoRooms;
