import Picker, { IEmojiData } from "emoji-picker-react";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { FaAccessibleIcon, FaAt, FaTag } from "react-icons/fa";
import { IoAt, IoPerson, IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ChooseAvatar from "../components/ChooseAvatar";
import PrimaryButton from "../components/PrimaryButton";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

export default function CreateUser() {
  const { createUser, searchUser } = useUser();
  const { loadUser } = useAuth();
  const [createUserForm, setCreateUserForm] = useState<{
    name: string;
    username: string;
    status_text: string;
    status_emote: string;
    avatar_url: string;
  }>({
    name: "",
    username: "",
    status_text: "vibing",
    status_emote: "😎",
    avatar_url: "",
  });

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const key = event.target.id;
    const value = event.target.value;
    setCreateUserForm({ ...createUserForm, [key]: value });
  };
  const [loading, setLoading] = useState(false);
  const handleEmojiPick = (event: any, data: IEmojiData) => {
    setCreateUserForm({ ...createUserForm, status_emote: data.emoji });
    setEmojiPickerOpen(false);
  };

  const handleEmojiButtonClick = () => {
    setEmojiPickerOpen(true);
  };

  const handlePickerDisperse = () => {
    setEmojiPickerOpen(false);
  };

  const setAvatar = (avatar_url: string) => {
    setCreateUserForm({ ...createUserForm, avatar_url });
  };

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [validationIssue, setValidationIssue] = useState<{
    name: string;
    username: string;
    status_text: string;
  }>({
    name: "",
    username: "",
    status_text: "",
  });
  const validate: () => Promise<boolean> = async () => {
    if (createUserForm.name === "") {
      setValidationIssue({ ...validationIssue, name: "Name can't be empty" });
      return false;
    } else if (createUserForm.name.length < 3) {
      setValidationIssue({
        ...validationIssue,
        name: "Name can't be less than three charachters",
      });
      return false;
    }

    if (createUserForm.username === "") {
      setValidationIssue({
        ...validationIssue,
        username: "Username can't be empty",
      });
      return false;
    } else if (createUserForm.username.length < 3) {
      setValidationIssue({
        ...validationIssue,
        username: "Username can't be less than three charachters",
      });
      return false;
    } else {
      const usersWithUsername = await searchUser(createUserForm.username, true);
      if (usersWithUsername?.length !== 0) {
        setValidationIssue({
          ...validationIssue,
          username: "❌ This username is not available",
        });
        return false;
      }
    }

    if (createUserForm.status_text === "") {
      setValidationIssue({
        ...validationIssue,
        status_text: "Status can't be empty",
      });
      return false;
    }

    setValidationIssue({ name: "", username: "", status_text: "" });
    return true;
  };
  const handleCreateProfileClick = async () => {
    setLoading(true);
    const isValidated = await validate();
    if (isValidated)
      await createUser({
        uid: localStorage.getItem("UID") || "",
        name: createUserForm.name,
        username: createUserForm.username,
        status: createUserForm.status_emote + " " + createUserForm.status_text,
        avatar_url: createUserForm.avatar_url,
        rooms: [],
      });
    await loadUser();
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg h-full flex justify-center items-center relative overflow-hidden rounded-lg">
      {emojiPickerOpen ? (
        <>
          <div
            className="absolute bg-black/10 backdrop-blur-xs w-full h-full flex justify-center items-center z-10 duration-200 "
            onClick={handlePickerDisperse}
          ></div>
          <Picker
            onEmojiClick={handleEmojiPick}
            pickerStyle={{
              boxShadow: "none",
              border: "none",
              color: "black",
              position: "absolute",
              zIndex: "20",
            }}
          />
        </>
      ) : (
        <></>
      )}

      <div className="w-full h-full max-w-lg bg-indigo-700/50 p-6 rounded-lg flex flex-col items-center">
        <h1 className="font-medium text-3xl text-gray-100 my-4">
          Create your Profile
        </h1>
        <div className="w-full px-4 py-3">
          <label className="font-medium">What's your name?</label>
          <div className="mt-2 w-full relative flex justify-start items-center">
            <input
              type="text"
              id="name"
              autoComplete="off"
              value={createUserForm.name}
              onChange={handleFormChange}
              className="peer pl-9 bg-transparent appearance-none text-xl outline-none outline-1 autofill:bg-none focus:outline-2 border-none focus:outline-indigo-500 outline-gray-300/30 w-full px-2 h-12 rounded-md duration-100"
              placeholder="John Doe"
            />
            <IoPersonOutline className="absolute text-xl mx-2 peer-focus:hidden duration-100" />
            <IoPerson className="hidden absolute text-xl mx-2 peer-focus:flex peer-focus:text-indigo-500 duration-100" />
          </div>
          <label className="text-red-500 text-sm">{validationIssue.name}</label>
        </div>

        <div className="w-full px-4 py-3">
          <label className="font-medium">Choose a Username</label>
          <div className="mt-2 w-full relative flex justify-start items-center">
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={createUserForm.username}
              onChange={handleFormChange}
              className="peer pl-9 appearance-none bg-transparent text-xl outline-none outline-1 autofill:bg-none focus:outline-2 border-none focus:outline-indigo-500 outline-gray-300/30 w-full px-2 h-12 rounded-md"
              placeholder="johnDoe98"
            />
            <IoAt className="absolute text-2xl text-gray-300 mx-2 peer-focus:text-indigo-500" />
          </div>
          <label className="text-red-500 text-sm">
            {validationIssue.username}
          </label>
        </div>

        <div className="w-full px-4 py-3">
          <label className="font-medium">Write some funky status</label>
          <div className="mt-2 w-full flex items-center">
            <button
              onClick={handleEmojiButtonClick}
              className="appearance-none p-0 m-0 mr-[0.1rem] px-4 h-[3.4rem] bg-indigo-700/50 text-2xl rounded-md rounded-r-none border border-gray-300/30 border-r-0"
            >
              {createUserForm.status_emote}
            </button>
            <input
              type="text"
              id="status_text"
              autoComplete="off"
              value={createUserForm.status_text}
              onChange={handleFormChange}
              className="peer appearance-none bg-transparent text-xl outline-none outline-1 autofill:bg-none focus:outline-2 border-none focus:outline-indigo-500 outline-gray-300/30 w-full px-2 h-12 rounded-md rounded-l-none"
              placeholder="status"
            />
          </div>
          <label className="text-red-500 text-sm">
            {validationIssue.status_text}
          </label>
        </div>

        <ChooseAvatar setAvatar={setAvatar} />
        <PrimaryButton onClick={handleCreateProfileClick}>
          {loading ? "Loading..." : "CREATE PROFILE"}
        </PrimaryButton>
      </div>
    </div>
  );
}
