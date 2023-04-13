import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { navlinks } from "../constants";
import { fundlogo } from "../assets";
const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const { connect, address } = useStateContext();

  return (
    <div>
     <div className=" flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] py-4 px-4 mt-12">
      <img src = {fundlogo} className="h-16"/>
     </div>
      <div className=" flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] py-4 px-4 mt-6">
        <div className="flex flex-col justify-center gap-3 ">
          {navlinks.map((link) => (
            <div className=" flex text-white"   onClick={() => {
              if (!link.disabled) {
                setIsActive(link.name);
                navigate(link.link);
              }
            }}>
              <Icon
                key={link.name}
                {...link}
                isActive={isActive}
              
              />
              <h2 className="mt-2 ml-2 cursor-pointer">{link.name}</h2>
            </div>
          ))}
          <div>

          <button
          type="button"
          className={`font-epilogue font-semibold w-[15rem] text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}`}
          onClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
          >
           {address ? "Create a campaign" : "Connect"} 
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
