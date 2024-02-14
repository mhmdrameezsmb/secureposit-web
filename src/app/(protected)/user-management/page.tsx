"use client";
import Breadcrumb from "@/app/common/Breadcrumbs/Breadcrumb";
import SearchFilter from "@/app/common/Filter/SearchFilter";
import FadeLoaderCmp from "@/app/common/Loader/FadeLoader/page";
import DeleteModal, {
  AlertPopupActionData,
} from "@/app/common/Modals/DeletePopup/popup";
import Pagination from "@/app/common/pagination";
import { API } from "@/lib/fetch";
import ToastService from "@/lib/toastService";
import { dateFormat, debounce, formatPhoneNumber } from "@/lib/utils";
import { stat } from "fs";
import Link from "next/link";
import { Tooltip } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMyContext } from "@/lib/context/PostContext";
import  BlockModal from '@/app/common/Modals/BlockPopup/popup'

const Page = ({ searchParams }: { searchParams: any }) => {
  const { isFlag, setFlag, setView, setFlagDelete } = useMyContext();

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<any>();
  const [id, setId] = useState<any>();
  const [id2, setId2] = useState<any>();
  const [search, setSearch] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [active, setActive] = useState<string>('all')
  const [phoneVerification, setPhoneVerification] = useState<string>('all')
  const [totalCount, setTotalCount] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);

  const [showBlockModal, setShowBlockModal] = useState<boolean>(false);

  const headers = [
    "Sl.No",
    "Phone Number",
    "Unique ID",
    "Registration Date",
    "Actions",
  ];
  const limit = 10;
  // const page = Number(searchParams.page || 1);
  // const search = searchParams.search || "";

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
  };
  const getParents = async () => {
    setIsLoading(true);
    let where: any = {
      // status: {
      //   // $notIn: [4],
      // }
    }
    if (active == "blocked" || active == "unblocked") {
      where.active = active == "unblocked" ? true : false
    }
    if (phoneVerification == "verified") {
      where.status = 1
    }
    if (phoneVerification == "pending") {
      // where["$in"] = [{ status: 2 }, { status: 3 }, { status: 4 }]
      where.status = {
        $in: [2, 3, 4],
      };
    }
    const { data } = await API.GetAll("user", {
      limit,
      offset: (currentPage - 1) * limit,
      search,
      where: {
        role: "Parent",
        ...where
      },
      sort: [["created_at", "desc"]],
    });
    setIsLoading(false);
    return data;
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    fetchData2();
  }, [search, active, phoneVerification]);

  const fetchData = async () => {
    setData([])
    const data = await getParents();
    setData(data);
    setTotalCount(data?.count);
    setTotalPages(Math.ceil(data?.count / limit));
  };


  const fetchData2 = async () => {
    setData([])
    setCurrentPage(1)
    const data = await getParents();
    setData(data);
    setTotalCount(data?.count);
    setTotalPages(Math.ceil(data?.count / limit));
  };

  const deleteItem = async (item: any) => {
    setView(true)

    setShow(true);
    setId(item?.id);
  };


  const blockItem = async (item: any) => {
    setId(item?.id);
    setShowBlockModal(true);
  };


  const blockOrUnblock = async (item: any) => {
    console.log(item.id);

    setId2(item)


    setDesc(`Are you sure you want to  ${item.active ? "block" : "unblock"} this account?`)
    
    setShowBlockModal(true)

  //   if (data.action === "continue") {
  //  console.log("sa");
  //  setShowBlockModal(false)

   
  //   } else {
  //   setShowBlockModal(false)

  //     setShow(false);
  //   }
   
    // fetchData();
  };


  
  const blockOrUnblock2 = async (data: any) => {


    console.log(id2);

    // console.log(item.id);
    
    if (data.action === "continue") {
   console.log("sa");
   const { error, message } = await API.UpdateById("user", id2.id, {
    active: !id2.active,
  });
  if (!!error) {
    ToastService.error(message);
    return;
  }
  ToastService.success(
    `Account ${id2.active ? "blocked" : "unblocked"} successfully`
  );
  fetchData();

   setShowBlockModal(false)

   
    } else {
    setShowBlockModal(false)

      setShow(false);
    }
   
  };
  

  const deleteItems = async (data: AlertPopupActionData) => {
    console.log("reason", data?.data?.reason);
    if (data.action === "continue") {
      const { error, message } = await API.DeleteById("user", id);
      if (!!error) {
        ToastService.error(message);
        return;
      }
      ToastService.success(`Account deleted successfully`);
      setFlagDelete(false)
      setShow(false);
      setData([]);
      fetchData();
    } else {
      setShow(false);
    }
  };

  const handleDataReceived = async (data: any) => {
    console.log(data, "sa");
    setSearch(data)
  };

  const handleDataReceived2 = async (data: any) => {
    console.log(data, "sa 2");
    setPhoneVerification(data)
  };

  const handleDataReceived3 = async (data: any) => {
    console.log(data, "sa 3");
    setActive(data)
  };

  const reset = async (data: any) => {
    console.log(data, "reset");
    setSearch('')
    setActive('all')
    setPhoneVerification('all')
  };
  const debouncedChangeSearch = debounce(handleDataReceived, 500);

  return (
    <>
      <BlockModal
        open={showBlockModal}
        title="Block/Unblock"
        description={desc}
        actionClick={blockOrUnblock2}
      />
      <DeleteModal
        open={show}
        title="Delete"
        description="Are you sure you want to delete this account?"
        actionClick={deleteItems}
      />

      <Breadcrumb pageName="User" totalCount={totalCount} />

      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="max-w-full overflow-x-auto">
          {isLoading && <FadeLoaderCmp />}
          <table className="w-full table-auto">
            <thead className="w-100">
              <tr className=" bg-black dark:bg-meta-4  whitespace-nowrap text-white">
                {headers.map((header, key) => {
                  return <th key={key} className="text-center p-[10px]">{header}</th>;
                })}
              </tr>
            </thead>
            {isLoading && <FadeLoaderCmp />}
            <tbody className="text-center">
              {data?.users?.map((item: any, key: any) => {
                return (
                  <tr key={key}>
                    <td className="py-1 px-1 border-b border-[#eee] ">
                      <h5 className="text-sm font-medium text-black dark:text-white">
                        {(currentPage - 1) * limit + key + 1}
                      </h5>
                    </td>
                    {/* <td className="py-1 px-1 border-b border-[#eee] ">
                      <h5 className="text-sm font-medium text-black dark:text-white">
                        {item.name}
                      </h5>
                    </td>
                    <td className="py-1 px-1 border-b border-[#eee] ">
                      <h5 className="text-sm font-medium text-black dark:text-white">
                        {item.email || "NA"}
                      </h5>
                    </td> */}
                    <td className="py-1 px-1 border-b border-[#eee] ">
                      <h5 className="text-sm font-medium text-black dark:text-white whitespace-nowrap">
                        {item?.phone != null ? formatPhoneNumber(item.phone_code + "" + item.phone) : "NA"}
                      </h5>
                    </td>
                    <td className="py-1 px-1 border-b border-[#eee] ">
                      <h5 className="text-sm font-medium text-black dark:text-white">
                        A24FH5
                      </h5>
                    </td>
                    <td className="py-1 px-1 border-b border-[#eee]  ">
                      <h5 className="text-sm font-medium text-black dark:text-white whitespace-nowrap">
                        {dateFormat(item.created_at)}
                      </h5>
                    </td>
                    <td className="py-1 px-1 border-b border-[#eee] ">
                      <div className="flex items-center space-x-4.5 justify-center">
                        {!item.active && (
                          <Tooltip content="Unblock">
                            <button
                              className="hover:text-primary"
                              onClick={() => blockOrUnblock(item)}
                              data-tooltip-id="unblock" data-tooltip-content="Unblock"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16"
                                width="16"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#de1717"
                                  d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
                                />
                              </svg>
                            </button>
                          </Tooltip>
                        )}
                        {item.active && (
                          <Tooltip content="Block">
                            <button
                              className="hover:text-primary"
                              onClick={() => blockOrUnblock(item)}
                              data-tooltip-id="block" data-tooltip-content="Block"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16"
                                width="16"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#a7b0bd"
                                  d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
                                />
                              </svg>
                            </button>
                          </Tooltip>
                        )}
                        <Tooltip content="Delete">
                          <button
                            className="hover:text-primary"
                            onClick={() => deleteItem(item)}
                            data-tooltip-id="delete" data-tooltip-content="Delete"
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>Delete</title>
                              <path
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill=""
                              />
                              <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                              />
                              <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                              />
                              <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                              />
                            </svg>
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {data?.count == 0 && <td className="border-b border-[#eee] py-5 px-0 dark:border-strokedark " colSpan={8}>
                <h5 className="flex justify-center text-sm font-medium text-black dark:text-white">
                  No data found.
                </h5></td>}
            </tbody>
          </table>
          <div className="container mx-auto p-4 text-right">
            {/* Your content here */}
            {
              data?.count > 0 &&
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            }
          </div>
        </div>
      </div >
    </>
  );
};

export default Page;
