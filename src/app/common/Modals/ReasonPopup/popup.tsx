"use client";

import { useMyContext } from "@/lib/context/PostContext";
import ToastService from "@/lib/toastService";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import BeatLoaderCmp from "../../Loader/BeatLoader/BeatLoader";

const validationSchema = Yup.object({
  reason: Yup.string()
    .required("Reason is required")
    .test(
      "noWhitespace",
      "Remove unwanted spacing at the beginning or end",
      function (value) {
        return customNoWhitespaceValidator(value);
      }
    ),
});

function customNoWhitespaceValidator(value: string) {
  if (value.startsWith(" ")) {
    return false;
  }
  if (value.endsWith(" ")) {
    return false;
  }
  return true;
}

export interface AlertPopupActionDataReason {
  action: "cancel" | "continue";
  data?: any;
  file?: any;
  id?: any;
}
export interface AlertPopupProps {
  id: any;
  title: string;
  description: string;
  open: boolean;
  actionClick?: (obj: AlertPopupActionDataReason) => void;
  onOpenChange?: (status: boolean) => void;
}
export default function AlertPopup({
  id,
  title,
  description,
  open,
  actionClick = () => {},
  onOpenChange,
}: AlertPopupProps) {
  console.log(id, "rr");

  const { isFlag, setFlag } = useMyContext();

  const [reason, setReason] = useState<any>();

  const [error, setError] = useState<boolean>(false);
  const [file, setFile] = useState("Click to upload");
  const [fileData, setFileData] = useState(null);
  const [uploading, setUploading] = useState(false);

  const data = (e: any) => {
    // console.log(e.target.value, "sa");
    setReason(e.target.value);
    if (e.target.value == "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (value: any, { setSubmitting }) => {
      setUploading(true);
      setFlag(true);
      actionClick({
        action: "continue",
        data: value?.reason,
        file: fileData,
        id: id,
      });
      setReason("");
      setFile("Click to upload");
      setFileData(null);

      formik.setValues({
        reason: "",
      });
    },
  });

  const handleFileChange = (e: any) => {
    console.log(e.target.files[0]?.type);

    if (e.target.files[0]?.name) {
      const types = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

      const file = e.target.files[0]?.type;

      if (!types.includes(file)) {
        ToastService.error(
          "Supports only .jpg, .jpeg, .png, .pdf formats only"
        );
        return;
      } else {
        setFile(e.target.files[0]?.name);
        setFileData(e.target.files[0]);
      }
    } else {
      setFile("Click to upload");
    }
  };

  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Content style={{ maxWidth: 520 }}>
        <form onSubmit={formik.handleSubmit}>
          <>
            <AlertDialog.Title>{title}</AlertDialog.Title>

            <AlertDialog.Description size="5">
              {description}

              {isFlag && <BeatLoaderCmp />}
              <textarea
                id="reason"
                name="reason"
                rows={3}
                placeholder="Type your reason"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.reason}
              />
              {formik.touched.reason && formik.errors.reason && !isFlag ? (
                <div className="text-error  pl-3 pt-1">
                  {formik.errors.reason as string}
                </div>
              ) : null}

              {!isFlag && (
                <div className="flex items-center justify-center w-full pt-3">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      {/* <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p> */}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {file}
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              )}

              {isFlag && (
                <div className="flex items-center justify-center w-full pt-3">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      {/* <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p> */}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {file}
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </AlertDialog.Description>

            {!isFlag && (
              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button
                    variant="solid"
                    style={{ backgroundColor: "#da593f" }}
                    onClick={() => {
                      actionClick({ action: "cancel" });
                      setFile("Click to upload");
                    }}
                  >
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button
                    variant="solid"
                    style={{ backgroundColor: "black" }}
                    // color="green"
                    // onClick={submit}
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    Continue
                  </Button>
                </AlertDialog.Action>
              </Flex>
            )}
          </>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
