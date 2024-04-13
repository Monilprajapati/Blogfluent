import React, { useEffect, useRef, useState } from "react";

const InPageNavigation = ({
  routes,
  defaultActiveIndex = 0,
  defaultHidden = [],
  children,
}) => {
  let activeTab = useRef();
  let activeTabLineRef = useRef();
  const [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);

  const changePageState = (btn, i) => {
    let { offsetLeft, offsetWidth } = btn;

    activeTabLineRef.current.style.left = `${offsetLeft}px`;
    activeTabLineRef.current.style.width = `${offsetWidth}px`;

    setInPageNavIndex(i);
  };

  useEffect(() => {
    changePageState(activeTab.current, defaultActiveIndex);
  }, []);
  return (
    <>
      <div
        className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto
    "
      >
        {routes.map((route, index) => {
          return (
            <button
              ref={defaultActiveIndex === index ? activeTab : null}
              key={index}
              className={`p-4 capitalize px-5
          ${inPageNavIndex === index ? "text-black" : "text-dark-grey"}
          ${defaultHidden.includes(route) ? "md:hidden" : ""}
          `}
              onClick={(e) => {
                changePageState(e.target, index);
              }}
            >
              {route}
            </button>
          );
        })}

        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />
      </div>

      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};

export default InPageNavigation;
