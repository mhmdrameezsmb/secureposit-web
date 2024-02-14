import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface MyContextType {
  isFlag: boolean;
  img: any;
  view: boolean;
  isFlagDelete: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
  setFlagDelete: Dispatch<SetStateAction<boolean>>;
  setView: Dispatch<SetStateAction<boolean>>;
  setImg: Dispatch<SetStateAction<any>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFlag, setFlag] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(true);
  const [isFlagDelete, setFlagDelete] = useState<boolean>(false);
  const [img, setImg] = useState<any>("dddd sajeer");

  const contextValue: MyContextType = {
    isFlag,
    setFlag,
    img,
    setImg,
    view,
    setView,
    isFlagDelete,
    setFlagDelete,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }

  return context;
};
