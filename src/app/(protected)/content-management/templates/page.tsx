"use client";
import Breadcrumb from "@/app/common/Breadcrumbs/Breadcrumb";
import FadeLoaderCmp from "@/app/common/Loader/FadeLoader/page";
import { API } from "@/lib/fetch";
import { Tooltip } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Tabs = () => {
    const [openTab, setOpenTab] = React.useState(1);

    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);

    const headers = [
        "Sl.No",
        "Title",
        "Actions",
    ];
    const limit = 5;

    const handlePageChange = async (newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        getEmailTemplates();
    }, []);

    const getEmailTemplates = async () => {
        const limit = -1;
        setIsLoading(true);
        const { data } = await API.GetAll("template", {
            limit,
            where: {

                send_email: true,
            },
        });
        console.log(data);
        setData(data?.templates);
        setIsLoading(false);
    };

    const getPushTemplates = async () => {
        const limit = -1;
        setIsLoading(true);
        const { data } = await API.GetAll("template", {
            limit,
            where: {
                send_push: true,
            },
        });
        console.log(data);
        setData(data?.templates);
        setIsLoading(false);
    };

    const tab = (data: any) => {
        console.log(data);

        if (data == 1) {
            getEmailTemplates();
        } else {
            getPushTemplates();
        }
    };

    return (
        <>
            <Breadcrumb pageName="SMS Template" />

            <div className="flex flex-col rounded-lg  bg-white px-3 pt-3 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 xl:pb-5 flex flex-wrap ">
                <div className="w-full ">
                    <div className="rounded-lg border border-stroke bg-white px-3 pt-3 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 xl:pb-1">
                        <div className="max-w-full overflow-x-auto">
                            {isLoading && <FadeLoaderCmp />}
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-black dark:bg-meta-4 text-white">
                                        {headers.map((header, key) => {
                                            return (
                                                <th key={key} className="text-left p-[15px]">
                                                    {header}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                {isLoading && <FadeLoaderCmp />}
                                <tbody>
                                    {data?.map((item: any, key: any) => {
                                        return (
                                            <tr key={key}>
                                                <td className="py-2 px-4 border-b border-[#eee] ">
                                                    <h5 className="text-sm font-medium text-black dark:text-white">
                                                        {(currentPage - 1) * limit + key + 1}
                                                    </h5>
                                                </td>

                                                <td className="py-2 px-4 border-b border-[#eee] ">
                                                    <h5 className="text-sm font-medium text-black dark:text-white">
                                                        {item?.title}
                                                    </h5>
                                                </td>

                                                <td className="py-2 px-4 border-b border-[#eee] ">
                                                    <div className="flex items-center space-x-3.5">
                                                        <Tooltip content="Edit">
                                                            <button
                                                                className="hover:text-primary"
                                                                onClick={() => {
                                                                    router.push(
                                                                        `/content-management/templates/view/${item?.id}`
                                                                    );
                                                                }}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="20px"
                                                                    height="20px"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                                                        stroke="#000000"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                                                        stroke="#000000"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}


                                    {data?.length == 0 && <td className="border-b border-[#eee] py-5 px-0 dark:border-strokedark " colSpan={3}>
                                        <h5 className="flex justify-center text-sm font-medium text-black dark:text-white">
                                            No data found.
                                        </h5></td>}

                                </tbody>
                            </table>
                            <div className="container mx-auto p-4 text-right"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tabs;
