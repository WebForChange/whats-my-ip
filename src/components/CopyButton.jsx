import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

function CopyButton(props) {
  return (
    <button
      className="bg-zinc-800 hover:bg-zinc-500 text-white ml-4 font-bold p-1 rounded inline-flex items-center justify-center w-7 h-7"
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faCopy} />
    </button>
  );
}

export default CopyButton;
