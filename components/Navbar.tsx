import Link from "next/link";
import React from "react";

const navOptions = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Submissions",
    link: "/submissions",
  },
];

const Navbar = ({ activeProp }: any) => {
  const [active, setActive] = React.useState(activeProp ? activeProp : "Home");

  return (
    <div className="max-w-[100vw] overflow-x-hidden flex items-center justify-between md:px-[4rem] pt-[2rem] px-[0.5rem]">
      <div className="flex items-center max-md:hidden">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 scale-75"
        >
          <path
            d="M18 0L22.8616 13.1384L36 18L22.8616 22.8616L18 36L13.1384 22.8616L0 18L13.1384 13.1384L18 0Z"
            fill="white"
            style={{ fill: "white", fillOpacity: 1 }}
          />
        </svg>
        <h1 className="gilroy">SAMEER.GUPTA</h1>
      </div>
      <div className="flex items-center max-md:scale-75 md:hidden">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1/2 scale-[65%]"
        >
          <path
            d="M18 0L22.8616 13.1384L36 18L22.8616 22.8616L18 36L13.1384 22.8616L0 18L13.1384 13.1384L18 0Z"
            fill="white"
            style={{ fill: "white", fillOpacity: 1 }}
          />
        </svg>
        <h1 className="gilroy font-medium">S.G</h1>
      </div>
      <div className="fixed z-[100] left-[50%] translate-x-[-50%] rounded-full bg-[#232323] py-[1rem] px-[1rem] flex justify-between gilroy text-[0.85rem] max-md:scale-[60%] max-md:text-[1rem]">
        {navOptions.map((option, index) => {
          return (
            <>
              {active === option.name ? (
                <a
                  href={option.link}
                  className="flex px-[1.75rem] items-center"
                >
                  <svg
                    width="6"
                    height="7"
                    viewBox="0 0 6 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <circle
                      cx="3"
                      cy="3.5"
                      r="3"
                      fill="white"
                      //   style="fill:white;fill-opacity:1;"
                    />
                  </svg>
                  <h2 className="text-white">{option.name}</h2>
                </a>
              ) : (
                <a
                  href={option.link}
                  className="flex px-[1.75rem] text-[#8E8E8F]"
                  onClick={() => setActive(option.name)}
                >
                  <h2>{option.name}</h2>
                </a>
              )}
            </>
          );
        })}
      </div>
      <div className="flex justify-between items-center bg-white py-[1rem] px-[2rem] rounded-full max-md:py-[0.5rem] max-md:px-[1rem] scale-75">
        <h1 className="text-black gilroy text-[0.8rem] mr-4 max-md:text-[0.5rem] max-md:mr-2 max-md:hidden">
          {/* Let&apos;s Chat */}
        </h1>
        <svg
          width="6"
          height="7"
          viewBox="0 0 6 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-md:hidden"
        >
          <circle
            cx="3"
            cy="3.5"
            r="3"
            fill="#1D1D1F"
            // style="fill:#1D1D1F;fill:color(display-p3 0.1137 0.1137 0.1216);fill-opacity:1;"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#000"
          className="w-4 h-4 md:hidden"
        >
          <path
            fill-rule="evenodd"
            d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
