"use client";
import LoaderMain from "@/app/common/Loader/SubLoader/page";
import { API } from "@/lib/fetch";
import ToastService from "@/lib/toastService";
import { useFormik } from "formik";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import OtpInput from "react-otp-input";

interface ChildProps {
  onDataReceived: (data: string) => void;
  onDataReceived2: (data: string) => void;
}

const Code: React.FC<ChildProps> = ({ onDataReceived, onDataReceived2 }) => {
  const [otp, setOtp] = useState("");

  const [loader, setLoader] = useState(false);

  const [childData, setChildData] = useState<string>("");

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const handleInputChange = (e: any, nextInputRef: any) => {
    const { value } = e.target;
    if (value.length === 1 && nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };

  const handleClick = () => {
    setLoader(true);
    onDataReceived(otp);
    setLoader(false);
  };

  const resendOtp = () => {
    onDataReceived2("sa");
  };

  return (
    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
      <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Email Verification
      </h2>
      <span>Enter the code received on your email address</span>
      <div className="mb-4 mt-3">
        <div className="relative">
          <div className="otp-group">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span className="otp-separator">-</span>}
              renderInput={(props, index) => (
                <input
                  {...props}
                  type="text"
                  pattern="[0-9]*" // Only allow numeric input
                  inputMode="numeric" // Set input mode to numeric for mobile devices
                  onKeyDown={(e) => {
                    // Allow numeric keys, Backspace, and Tab
                    if (
                      !/^\d$/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    fontSize: "2.3em",
                    margin: "0 0.2em",
                    textAlign: "center",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="mb-5">
        {!loader && (
          <button
            type="submit"
            onClick={handleClick}
            value="Sign In"
            className="bg-mainBtn sm:w-75  xl:w-75  cursor-pointer rounded-lg border  p-4 text-white transition hover:bg-opacity-90 "
          >
            Submit
          </button>
        )}

        {loader && <LoaderMain />}

        <button
          type="submit"
          onClick={resendOtp}
          value="Sign In"
          className="flex sm:w-75  xl:w-75  items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 mt-3"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default Code;
