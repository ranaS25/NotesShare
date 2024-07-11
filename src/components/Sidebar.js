import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  return (
    <div className="min-w-fit h-full bg-slate-50 dark:bg-slate-800 border-r-2 flex flex-col p-4 justify-start gap-5 flex-wrap hover:min-w-80">
      <FontAwesomeIcon
        className="w-6 h-6 p-4 hover:bg-slate-200 rounded-full"
        style={{ color: "#888d91" }}
        icon="fa-solid fa-note-sticky"
      />
    </div>
  );
};

export default Sidebar;
