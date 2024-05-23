import React, {forwardRef} from "react";
import {Link} from "react-router-dom";
import {MoreOutlined} from "@ant-design/icons";

export const MoreToggleIcon = forwardRef(({ onClick }, ref) => (
  <Link
    to="#"
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <MoreOutlined />
  </Link>
));