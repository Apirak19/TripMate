"use client";
import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
      setModalOpen((prev)=>!prev)
   }
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
              className="border-blue-400 border-2 text-blue-400 bg-white px-2 py-2 rounded-lg flex gap-1"
              onClick={setModalOpen((prev) => !prev)}
            >
              Following
              <KeyboardArrowDownIcon />
            </button>
          ) : (
            <button
              className="border-blue-400 border-2 text-blue-400 bg-white px-2 py-2 rounded-lg w-[100px] flex gap-2"
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
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>

          <Link href={`/booking?guide_id=${guide.guide_id}`}>
            <button className="bg-blue-400 text-white px-4 py-2 rounded-lg w-[100px]">
              Hire
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Header;
