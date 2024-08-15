import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faTags, faUserGroup } from "@fortawesome/free-solid-svg-icons";
const Sidebar = () => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      className="w-max h-full bg-slate-50 dark:bg-slate-800 border-r-[1px] dark:border-slate-600 flex  flex-wrap dark:text-slate-50 hover:drop-shadow-lg"
      onMouseOver={() => {
        setExpanded(true);
      }}
      onMouseOut={() => {
        setExpanded(false);
      }}
    >
      <div className="w-max h-fit p-4 flex flex-col gap-4 sticky top-[56px] transf">
        <div className="flex items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg select-none">
          <FontAwesomeIcon
            className="w-6 h-6 p-4 rounded-full"
            style={{ color: "#888d91" }}
            icon="fa-solid fa-note-sticky"
          />
          <span className={"inline-block px-4 " + (!expanded ? "hidden" : "")}>
            Notes
          </span>
        </div>
        <div className="flex items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg select-none">
          <FontAwesomeIcon
            className="w-6 h-6 p-4 rounded-full"
            style={{ color: "#888d91" }}
            icon={faTags}
          />
          <span className={"inline-block px-4 " + (!expanded ? "hidden" : "")}>
            Tags
          </span>
        </div>
        <div className="flex items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg select-none">
          <FontAwesomeIcon
            className="w-6 h-6 p-4 rounded-full"
            style={{ color: "#888d91" }}
            icon={faGears}
          />
          <span className={"inline-block px-4 " + (!expanded ? "hidden" : "")}>
            Settings
          </span>
        </div>
        <div className="flex w-max items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg select-none">
          <FontAwesomeIcon
            className="w-6 h-6 p-4 rounded-full"
            style={{ color: "#888d91" }}
            icon={faUserGroup}
          />
          <span className={"inline-block px-4 " + (!expanded ? "hidden" : "")}>
            Shared Notes
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
