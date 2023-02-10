import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../Firebase.config";
import { useState } from "react";

import logo from "../img/logo.png";
import avatar from "../img/avatar.png";

import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();

  const onLoginHandler = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logoutHandler = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className=" fixed z-40 w-screen p-3 px-4 md:p-6 md:px-16">
      {/* Desktop & Tabs*/}
      <nav className="hidden md:flex h-full items-center justify-between">
        <Link to="/" className=" flex items-center gap-2 ">
          <img className=" w-8 object-cover" src={logo} alt="BilBerry's logo" />
          <p className=" text-headingColor font-bold text-xl">Bil-Berry</p>
        </Link>
        <div className=" flex items-center gap-8">
          <ul className="flex items-center gap-8 ml-auto">
            <li className=" text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              Home
            </li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              Menu
            </li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              About Us
            </li>
            <li className="text-base cursor-pointer text-textColor hover:text-headingColor duration-100 transition-all ease-in-out">
              Service
            </li>
          </ul>
          <motion.div
            whileTap={{ scale: 1.2 }}
            className=" flex justify-center items-center relative"
          >
            <MdShoppingBasket className=" text-textColor text-2xl cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out" />
            <div className=" absolute -top-2 -right-2 h-5 w-5 bg-cartNumBg rounded-full flex items-center justify-center">
              <p className=" text-xs text-white font-semibold">2</p>
            </div>
          </motion.div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className=" w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              src={user ? user.photoURL : avatar}
              alt="user avatar"
              onClick={onLoginHandler}
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.1 }}
                className="bg-gray-50  absolute w-40 right-0 rounded-lg top-11 shadow-xl"
              >
                {user && user.email === "subendernath@gmail.com" && (
                  <Link to="createItem">
                    <p className="flex items-center gap-3 px-4 py-2 hover:bg-slate-200 transition-all text-textColor text-base duration-100 ease-out cursor-pointer rounded-lg">
                      New Item
                      <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="flex items-center gap-3 px-4 py-2  hover:bg-slate-200 transition-all rounded-lg text-textColor text-base duration-100 ease-out cursor-pointer"
                  onClick={logoutHandler}
                >
                  Logout
                  <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile*/}
      <div className=" flex md:hidden h-full justify-between">
        <Link to="/" className=" flex items-center gap-2 ">
          <img className=" w-8 object-cover" src={logo} alt="BilBerry's logo" />
          <p className=" text-headingColor font-bold text-xl">Bil-Berry</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            className=" w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            src={user ? user.photoURL : avatar}
            alt="user avatar"
            onClick={onLoginHandler}
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.1 }}
              className="bg-gray-50  absolute w-40 right-0 rounded-lg top-11 shadow-xl"
            >
              {user && user.email === "subendernath@gmail.com" && (
                <Link to="createItem">
                  <p className="flex items-center gap-3 px-4 py-2 hover:bg-slate-200 transition-all text-textColor text-base duration-100 ease-out cursor-pointer rounded-lg">
                    New Item
                    <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col   gap-1 ml-auto">
                <li className=" text-base cursor-pointer px-4 py-2 text-textColor hover:bg-slate-200 transition-all  hover:text-textColor hover:text-base duration-100 ease-out rounded-lg">
                  Home
                </li>
                <li className="text-base px-4 py-2 cursor-pointer text-textColor hover:bg-slate-200 transition-all  hover:text-textColor hover:text-base duration-100 ease-out rounded-lg">
                  Menu
                </li>
                <li className="px-4 py-2 text-base cursor-pointer text-textColor hover:bg-slate-200 transition-all  hover:text-textColor hover:text-base duration-100 ease-out rounded-lg">
                  About Us
                </li>
                <li className="px-4 py-2 text-base cursor-pointer text-textColor hover:bg-slate-200 transition-all  hover:text-textColor hover:text-base duration-100 ease-out rounded-lg">
                  Service
                </li>
              </ul>

              <p
                className="flex items-center m-2 gap-3 px-4 py-2 bg-gray-300  hover:bg-slate-200 transition-all  text-textColor text-base duration-100 ease-out cursor-pointer rounded-md shadow-sm"
                onClick={logoutHandler}
              >
                Logout
                <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
