"use client"

import Breadcrumb from "@/app/common/Breadcrumbs/Breadcrumb";
import { Input } from "@/app/common/input";
import { API } from "@/lib/fetch";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

import "react-quill/dist/quill.snow.css";
import FadeLoaderCmp from "@/app/common/Loader/FadeLoader/page";
import Back from "@/app/common/BackButton/back";


const validationSchema = Yup.object({
    title: Yup.string()
        .required('Reason is required')
        .test('noWhitespace', 'Remove unwanted spacing at the beginning or end', function (value) {
            return customNoWhitespaceValidator(value);
        })
});


function customNoWhitespaceValidator(value: string) {
    if (value.startsWith(' ')) {
        return false;
    }
    if (value.endsWith(' ')) {
        return false;
    }
    return true;
}


interface ChildProps {
    onDataReceived: (data: Object) => void;
    id: string;
}

const Editor: React.FC<ChildProps> = ({
    onDataReceived, id
}) => {
    const [code, setCode] = useState<any>();
    const [data, setData] = useState<any>();
    const [loader, setLoader] = useState(false);


    useEffect(() => {
        getPage();
    }, []);

    const getPage = async () => {
        setLoader(true)
        const { data } = await API.GetAll(`page/${id}`);
        setCode(data?.page?.content);
        setData(data?.page)
        formik.setValues({
            title: data?.page?.title || "",
        });
        setLoader(false)
    };



    const myColors = [
        "black",
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
        "blue"
    ];
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            [{ color: [] }, { background: [] }, { align: [] }],
            ['clean'],
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
        "align"
    ];
    const formik = useFormik({
        initialValues: {
            title: data?.title || "",
        },
        validationSchema: validationSchema,
        onSubmit: async (value: any, { setSubmitting }) => {
            const input = document.createElement('input');
            await onDataReceived({ title: value?.title, content: code });
            setSubmitting(false);
        }
    });
    const handleProcedureContentChange = (content: any) => {
        setCode(content);
    };

    return (
        <>
            {loader && <FadeLoaderCmp />}
            <Breadcrumb
                pageName={data?.title}
            />
            <div className="rounded-lg border border-stroke bg-white px-3 pt-5 pb-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 xl:pb-1">

                <Back />

                <form onSubmit={formik.handleSubmit}>



                    <div className="p-2">
                        <h6 className="mb-2">Title</h6>
                        <Input
                            type="text"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            placeholder="Title"
                            className="w-full border rounded-none border-gray-4 bg-transparent py-4 pr-10 outline-none  focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                    </div>
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-error  pl-3 pt-1">
                            {formik.errors.title as string}
                        </div>
                    ) : null}
                    <div className="p-2">
                        <h6 className="mb-2">Content</h6>
                        <ReactQuill
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={code}
                            onChange={handleProcedureContentChange}
                        />
                    </div>
                    <div className="p-2">
                        <button type="submit"
                            value="Reset"
                            disabled={formik.isSubmitting}
                            className="bg-mainBtn w-50 rounded-lg border-[1.5px]  py-3 px- font-medium o cursor-pointer p-4 text-white transition hover:bg-opacity-90"
                        >Save</button>
                    </div>
                </form>

            </div>
        </>
    );
}
export default Editor;
