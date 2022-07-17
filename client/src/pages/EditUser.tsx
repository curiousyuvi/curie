import Picker, { IEmojiData } from "emoji-picker-react";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { IoArrowBack, IoPerson, IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ChooseAvatar from "../components/ChooseAvatar";
import PrimaryButton from "../components/PrimaryButton";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

export default function EditUser() {
  const { updateUser } = useUser();
  const { user } = useAuth();
  const { loadUser } = useAuth();
  const previousAvatar = user?.avatar_url || "";
  const [createUserForm, setCreateUserForm] = useState<{
    name: string;
    status_text: string;
    status_emote: string;
    avatar_url: string;
  }>({
    name: user?.name || "",
    status_text: user?.status.split(" ")[1] || "",
    status_emote: user?.status.split(" ")[0] || "",
    avatar_url: user?.avatar_url || "",
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
    status_text: string;
  }>({
    name: "",
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

    if (createUserForm.status_text === "") {
      setValidationIssue({
        ...validationIssue,
        status_text: "Status can't be empty",
      });
      return false;
    }

    setValidationIssue({ name: "", status_text: "" });
    return true;
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleUpdateProfileClick = async () => {
    setLoading(true);
    await loadUser();
    if (await validate()) {
      if (
        await updateUser(localStorage.getItem("UID") || "", {
          name: createUserForm.name,
          status:
            createUserForm.status_emote + " " + createUserForm.status_text,
          avatar_url: createUserForm.avatar_url,
        })
      )
        await loadUser();
      navigate(-1);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full rounded-br-lg flex flex-col items-center bg-blue-900/70">
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
      <div className="w-full h-full p-2 rounded-lg flex flex-col items-center">
        <div className="w-full h-12 flex justify-between items-center">
          <button
            className="text-2xl hover:text-white duration-100 mx-2"
            onClick={handleBackClick}
          >
            <IoArrowBack />
          </button>
          <h1 className="text-gray-200 text-2xl">Edit Profile</h1>
          <span className="w-10" />
        </div>
        <div className="w-full flex flex-col max-w-lg items-center">
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
            <label className="text-red-500 text-sm">
              {validationIssue.name}
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
          <label className="font-medium w-full flex justify-start px-4 mt-6 my-2">
            Choose an Avatar
          </label>
          <ChooseAvatar
            previousAvatar={previousAvatar}
            setAvatar={setAvatar}
            sprites={"miniavs"}
          />
          <span className="h-8"></span>
          <PrimaryButton onClick={handleUpdateProfileClick}>
            {loading ? "Loading..." : "UPDATE PROFILE"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
