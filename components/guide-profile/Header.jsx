"use client";
import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Header = ({ guide }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const handleFollow = () => {
    setIsFollowed((prev) => !prev);
  };
  const handleModal = () => {
    setModalOpen((prev) => !prev);
  };
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <article className="w-full h-[500px] flex items-end">
      <div
        className="w-full h-[500px] absolute -z-20 rounded-b-3xl bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${guide.guide_bg})` }}
      ></div>

      {/* profile */}
      <div className="pb-4 px-4 w-full flex justify-between">
        {/* left */}
        <div className="flex gap-4">
          <div
            className="w-[168px] h-[168px] rounded-3xl z-10 bg-center bg-cover"
            style={{
              backgroundImage: `url(${guide.guide_profile_picture})`,
            }}
          ></div>
          <div className="flex flex-col justify-end gap-2">
            <div className="bg-slate-200 px-2 rounded-lg ">
              <h1 className="text-4xl font-bold">
                {guide.guide_firstname} {guide.guide_lastname}
              </h1>
            </div>
            <div className="flex">
              <p className="text-lg bg-slate-200 px-2 rounded-lg">
                {guide.followers} Follower
              </p>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex items-end gap-4">
          {isFollowed ? (
            <button
              className="border-blue-400 border-2 text-blue-400 bg-white px-2 py-2 rounded-lg flex gap-1 w-[120px] h-11 transform "
              onClick={() => setModalOpen((prev) => !prev)}
            >
              Following
              <KeyboardArrowDownIcon />
            </button>
          ) : (
            <button
              className="border-blue-400 border-2 text-blue-400 bg-white px-2 py-2 rounded-lg w-[120px] flex gap-2 justify-center h-11 transform hover:scale-105"
              onClick={handleFollow}
            >
              Follow
              <PersonAddIcon />
            </button>
          )}

          {/* Modal */}
          <Modal
            open={modalOpen}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <h1 className="text-xl font-semibold">
                Do you want to unfollow {guide.guide_firstname}{" "}
                {guide.guide_lastname}
              </h1>
              <div className="flex gap-4 justify-center mt-5">
                <button
                  className="border-blue-400 border-2 text-blue-400 bg-white  px-2 py-2 rounded-lg w-[120px] flex gap-2 justify-center h-11 hover:bg-blue-400 hover:text-white"
                  onClick={() => {
                    setIsFollowed(false);
                    setModalOpen(false);
                  }}
                >
                  Unfollow
                  <PersonRemoveIcon />
                </button>
                <button
                  className="border-red-400 border-2 text-red-400 bg-white px-2 py-2 rounded-lg w-[120px] flex gap-2 justify-center h-11 "
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </Box>
          </Modal>

          <Link
            href={`/booking?guide_id=${guide.guide_id}`}
            className="w-[120px] h-11  bg-blue-400 text-white rounded-lg transform hover:scale-105 flex justify-center items-center"
          >
            Hire
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Header;
