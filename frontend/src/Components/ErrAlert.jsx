import React from "react";
import "./ErrAlert.css";

import {ReactComponent as ErrIcon} from "../Assets/icons/err_icon.svg";

export default function ErrAlert({text}) {
  return (
    <div className="err-alert">
      <ErrIcon />
      <span>{text}</span>
    </div>
  );
}
