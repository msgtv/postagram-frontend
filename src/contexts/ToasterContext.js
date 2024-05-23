import React, {useState, createContext, useContext} from "react";

const ToasterContext = createContext(null);
const SetToasterContext = createContext(null);

export function ToasterProvider({ children }) {
  const [toaster, setToaster] = useState({
    title: "",
    message: "",
    type: "",
    show: false,
    onClose: () => setToaster({...toaster, show: false})
  });

  return (
    <ToasterContext.Provider value={toaster}>
      <SetToasterContext.Provider value={setToaster}>
        {children}
      </SetToasterContext.Provider>
    </ToasterContext.Provider>
  );
}

export const useToaster = () => useContext(ToasterContext);
export const useSetToaster = () => useContext(SetToasterContext);