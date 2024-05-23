import React from 'react';
import NavigationBar from "./Navbar";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useToaster
} from "../contexts/ToasterContext";
import Toaster from "./Toaster";

export default function Layout({ hasNavigationBack, children }) {
  const navigate = useNavigate();
  const toasterData = useToaster();

  return (
    <div>
      <div>
        <NavigationBar/>
        {hasNavigationBack && (
          <ArrowLeftOutlined
            style={{
              color: "#0d6efd",
              fontSize: "24px",
              marginLeft: "5%",
              marginTop: "1%",
            }}
            onClick={() => navigate(-1)}
          />
        )}
        <div className="container my-2">
          {children}
        </div>
      </div>
      <Toaster
        title={toasterData?.title}
        message={toasterData?.message}
        type={toasterData?.type}
        showToast={toasterData?.show}
        onClose={toasterData?.onClose}
      />
    </div>
  );
}