"use client";

import Breadcrumb from "@/app/common/Breadcrumbs/Breadcrumb";
import { API } from "@/lib/fetch";
import { log } from "console";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

import "react-quill/dist/quill.snow.css";

interface ChildProps {
  onDataReceived: (data: string) => void;
  id: string;
}

const Editor: React.FC<ChildProps> = ({ onDataReceived, id }) => {
  console.log(id, "in a");

  const [code, setCode] = useState("");
  const [head, setHead] = useState("");

  const [data, setData] = useState<any>();

  useEffect(() => {
    getParents();
  }, []);

  const getParents = async () => {
    const { data } = await API.GetAll(`page/${id}`);
    console.log(data?.page?.title);
    setCode(data?.page?.content);
    setHead(data?.page?.title);
  };

  const myColors = [
    "purple",
    "#785412",
    "#452632",
    "#856325",
    "#963254",
    "#254563",
    "white",
    "green",
    "orange",
    "red",
    "blue",
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: [] }, { background: [] }, { align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
  ];

  const handleProcedureContentChange = (content: any) => {
    setCode(content);
  };

  const save = async () => {
    const input = document.createElement("input");

    onDataReceived(code);
  };
  return (
    <>
      <Breadcrumb pageName={head} pageUrl="content-management" subHead={head} />

      <div className="rounded-lg border border-stroke bg-white px-3 pt-5 pb-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 xl:pb-1">
        <div className="p-5">
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={code}
            onChange={handleProcedureContentChange}
          />
        </div>
        <div className="p-5">
          <button
            type="submit"
            value="Reset"
            className="bg-mainBtn w-50 rounded-lg border-[1.5px]  py-3 px- font-medium o cursor-pointer rounded-lg p-4 text-white transition hover:bg-opacity-90"
            onClick={save}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
export default Editor;
