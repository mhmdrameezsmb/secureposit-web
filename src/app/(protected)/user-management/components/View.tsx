"use client"
import Back from "@/app/common/BackButton/back";
import FadeLoaderCmp from "@/app/common/Loader/FadeLoader/page";
import { API } from "@/lib/fetch";
import { formatPhoneNumber } from "@/lib/utils";
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
const View = ({ id }: any) => {
    // console.log(user);
    // console.log(cardDetails);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<any>();
    const [cardDetails, setCard] = useState<any>();



    console.log(id, "ss");

    useEffect(() => {
        getData()
    }, []);



    const getData = async () => {
        setIsLoading(true);

        const { data } = await API.GetById("user", id, {
            populate: ["parent_language.language", "parent_profile", "child", "status_info"]
        });

        console.log(data.user, "dfg");

        setUser(data?.user)

        getCardDetails(data?.user?.parent_profile?.stripe_customer_id)


        setIsLoading(false);

        // return data
    }
    const getCardDetails = async (stripe_customer_id: string) => {
        const { data } = await API.Post("payment/list-payment-methods", {
            stripe_customer_id: stripe_customer_id
        });
        // return data


        console.log(data, "card");

        setCard(data)
    }
    return (
        <>
            {isLoading && <FadeLoaderCmp />}


            <div className="rounded-lg border border-stroke bg-white px-3 pt-3 pb-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 xl:pb-1">


                <Back />

                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center ">
                    <div className="flex justify-center">
                        <h2 className="text-2xl font-light text-black sm:text-4xl sm:leading-tight">
                            {user?.avatar ?
                                <img alt="profile-image" src={user?.avatar} width={150} height={150} /> :
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="black"
                                    width="105px"
                                    height="105px"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M10.1907 18.5V17.1736H8.13445C7.29051 17.1052 6.48827 16.7892 5.83501 16.2677C5.18175 15.7462 4.70862 15.0441 4.47891 14.2554L4.28471 13.9016H3.88489C3.71759 13.8803 3.56365 13.8019 3.45079 13.6806C3.34793 13.5546 3.29163 13.399 3.29086 13.2384C3.29126 13.1221 3.32274 13.0079 3.38225 12.9068C3.44157 12.8051 3.52847 12.721 3.63357 12.6636L3.97627 12.4757V11.2156C3.99031 11.1228 4.0252 11.0342 4.0785 10.9559C4.13179 10.8776 4.20218 10.8115 4.28471 10.7624C4.34794 10.702 4.42288 10.6543 4.50522 10.6221C4.58756 10.5898 4.67567 10.5737 4.7645 10.5745H11.6186C11.7095 10.5714 11.8001 10.5864 11.8847 10.6187C11.9693 10.6509 12.0461 10.6996 12.1104 10.7619C12.1747 10.8241 12.2251 10.8984 12.2584 10.9803C12.2917 11.0622 12.3072 11.1498 12.304 11.2377V14.5538H9.44815C9.38334 14.385 9.27287 14.2361 9.12829 14.1227C8.98921 14.0059 8.819 13.9293 8.63708 13.9016C8.45145 13.88 8.26316 13.9028 8.08875 13.968C7.91684 14.035 7.76685 14.1458 7.65466 14.2885C7.54539 14.4305 7.47824 14.5987 7.46046 14.7749C7.43553 14.9519 7.46327 15.1321 7.54042 15.2944C7.61569 15.4607 7.73858 15.6026 7.89455 15.7034C8.0455 15.8076 8.22356 15.8689 8.40861 15.8803H13.6292C13.9918 15.8774 14.3388 15.7367 14.5952 15.4886C14.8516 15.2404 14.997 14.9047 15 14.5538V13.2274C15.0002 13.0521 14.9639 12.8785 14.8933 12.7171C14.8226 12.5556 14.719 12.4096 14.5888 12.2878C14.464 12.1641 14.3147 12.066 14.1498 11.9995C13.9849 11.933 13.8078 11.8995 13.6292 11.9009V10.5745C13.5647 9.20775 12.9583 7.91766 11.9359 6.97253C10.9136 6.02741 9.55409 5.5 8.14016 5.5C6.72623 5.5 5.36672 6.02741 4.34439 6.97253C3.32206 7.91766 2.7156 9.20775 2.65114 10.5745V11.8678C2.26166 12.214 2.02791 12.6942 2 13.2053C2.00247 13.6047 2.13876 13.9925 2.3884 14.3106C2.62582 14.6192 2.95148 14.8536 3.32513 14.9849C3.68436 15.9613 4.33125 16.8145 5.18592 17.4392C6.04059 18.0638 7.06562 18.4326 8.13445 18.5H10.1907Z" />
                                    <path d="M16 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4H15V9H20V20H6C6 20.5304 6.21071 21.0391 6.58579 21.4142C6.96086 21.7893 7.46957 22 8 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V8L16 2Z" />
                                </svg>
                            }
                        </h2>
                    </div>
                    <div className="flex items-center bg-gray-100 dark:bg-gray-900 pb-3 pt-3 break-all">
                        <div className="container">
                            <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                                <div className="p-5 bg-gray rounded-lg border border-stroke shadow-sm">
                                    <div className="flex items-center space-x-7">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-gray-200 font-bold">
                                                Full Name
                                            </div>
                                            <div className="text-1xl text-gray-200">{user?.name}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray rounded-lg border border-stroke  shadow-sm">
                                    <div className="flex items-center space-x-7">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 -2.5 20 20" version="1.1">
                                                <defs>
                                                </defs>
                                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -922.000000)" fill="#000000">
                                                        <g id="icons" transform="translate(56.000000, 160.000000)">
                                                            <path d="M262,764.291 L254,771.318 L246,764.281 L246,764 L262,764 L262,764.291 Z M246,775 L246,766.945 L254,773.98 L262,766.953 L262,775 L246,775 Z M244,777 L264,777 L264,762 L244,762 L244,777 Z" id="email-[#1573]">

                                                            </path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-gray-200 font-bold">Email</div>
                                            <div className="text-1xl  text-gray-200">
                                                {user?.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray rounded-lg border border-stroke  shadow-sm">
                                    <div className="flex items-center space-x-7">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                <path d="M4.85904 6C6.67396 4.14864 9.20308 3 12.0005 3C14.7979 3 17.327 4.14864 19.1419 6M16.4727 9C15.374 7.7725 13.7774 7 12.0004 7C10.2234 7 8.62687 7.7725 7.52823 9M3.39199 16.571C8.17161 11.8351 15.8855 11.8704 20.6215 16.6501C20.7659 16.7958 20.9059 16.9442 21.0414 17.0952C21.3243 17.4105 21.4658 17.5681 21.5288 17.7917C21.5802 17.9738 21.5733 18.2118 21.5113 18.3906C21.4352 18.6101 21.2653 18.7784 20.9255 19.1151L19.7298 20.2999C19.443 20.5841 19.2996 20.7262 19.1299 20.8008C18.98 20.8667 18.8162 20.8948 18.6529 20.8826C18.468 20.8688 18.2855 20.7826 17.9204 20.6102L15.9673 19.6878C15.5425 19.4872 15.3301 19.3869 15.1924 19.2285C15.0709 19.0889 14.9906 18.9183 14.9604 18.7357C14.9261 18.5286 14.9841 18.301 15.1001 17.8458L15.3402 16.9037C13.2037 16.0897 10.8142 16.0772 8.67073 16.8732L8.9022 17.8174C9.01404 18.2737 9.06997 18.5018 9.03377 18.7085C9.00184 18.8908 8.91997 19.0607 8.79725 19.1992C8.65807 19.3563 8.44477 19.4546 8.01817 19.6513L6.05668 20.5558C5.69003 20.7248 5.50669 20.8094 5.32171 20.8215C5.1583 20.8322 4.99477 20.8026 4.84548 20.7353C4.67646 20.6592 4.53437 20.5158 4.25018 20.2289L3.06537 19.0332C2.72866 18.6934 2.56031 18.5235 2.48628 18.3034C2.42596 18.124 2.42117 17.886 2.47422 17.7043C2.53934 17.4813 2.68224 17.325 2.96804 17.0124C3.10495 16.8626 3.24627 16.7154 3.39199 16.571Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-gray-200 font-bold">Phone</div>
                                            <div className="text-1xl  text-gray-200">{formatPhoneNumber(user?.phone_code + "" + user?.phone)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray rounded-lg border border-stroke  shadow-sm">
                                    <div className="flex items-center space-x-7">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-gray-200 font-bold">Address</div>
                                            <div className="text-1xl  text-gray-200">{user?.parent_profile?.address || "NA"}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray rounded-lg border border-stroke  shadow-sm">
                                    <div className="flex items-center space-x-7">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 289.208 289.208">
                                                <g>
                                                    <path d="M284.275,176.745c5.099-3.41,6.468-10.308,3.058-15.405l-38.876-58.124c-5.15-7.695-13.022-11.707-21.287-11.707h-16.658   c-9.588,0-17.229,5.802-22.101,13.327c-0.487,0.753,2.422-3.679-37.983,56.486c-3.42,5.092-2.063,11.991,3.028,15.411   c5.089,3.418,11.99,2.065,15.411-3.028l16.656-24.802l0.034,112.663c0,7.667,6.215,13.882,13.882,13.882   c7.667,0,13.882-6.215,13.882-13.882v-62.471h11.107v62.471c0,7.667,6.215,13.882,13.882,13.882   c7.667,0,13.882-6.215,13.882-13.882c0-119.736-0.033-111.963-0.033-112.865l16.712,24.986   C272.285,178.793,279.188,180.15,284.275,176.745z" />
                                                    <path d="M218.874,80.75c14.696,0,26.615-11.908,26.615-26.614c0-9.582-5.076-17.983-12.686-22.668   c1.573-1.112,3.405-2.139,5.57-3.017c0.909-0.368,1.521-1.231,1.567-2.211c0.047-0.981-0.481-1.897-1.352-2.35   c-4.209-2.186-9.338-2.231-14.178-1.303c0.821-1.538,1.855-3.109,3.183-4.702c0.628-0.754,0.761-1.804,0.34-2.689   c-0.421-0.886-1.318-1.446-2.3-1.436c-9.728,0.111-18.649,9.972-22.203,15.869c-0.826,1.37-1.446,2.821-1.837,4.284   c-5.71,4.881-9.335,12.129-9.335,20.223C192.259,68.842,204.178,80.75,218.874,80.75z" />
                                                    <path d="M100.382,104.202C95.588,96.932,87.96,91.509,78.63,91.509H61.971c-9.491,0-17.747,5.292-21.977,13.086   c-0.514,0.74-37.605,55.979-38.107,56.728c-3.42,5.092-2.063,11.991,3.028,15.411c5.089,3.418,11.99,2.065,15.411-3.028   l16.656-24.802v0.307l-15.118,61.638c-0.706,2.875-0.051,5.915,1.776,8.244c1.828,2.33,4.624,3.69,7.585,3.69h5.791v38.784   c0,7.667,6.215,13.882,13.882,13.882s13.882-6.215,13.882-13.882v-38.784h11.106v38.784c0,7.667,6.215,13.882,13.882,13.882   c7.667,0,13.882-6.215,13.882-13.882v-38.784h5.726c2.961,0,5.757-1.36,7.585-3.69c1.827-2.329,2.482-5.369,1.776-8.244   l-15.119-61.642h-0.001v-0.403l16.724,24.902c3.421,5.094,10.323,6.445,15.411,3.028c5.092-3.42,6.448-10.319,3.028-15.411   C97.759,100.238,100.862,104.931,100.382,104.202z" />
                                                    <path d="M17.233,88.896c0.978,0.081,1.912-0.414,2.396-1.268c7.311-12.904,18.78-11.81,21.349-16.575   c0.354-0.658,0.633-1.336,0.839-2.025c0.783,0.844,1.885,1.34,3.044,1.34c0.458,0,0.925-0.076,1.381-0.237   c0.77-0.271,1.401-0.751,1.873-1.347c4.763,7.21,12.935,11.967,22.221,11.967c9.285,0,17.458-4.757,22.22-11.967   c0.472,0.596,1.103,1.076,1.874,1.347c0.457,0.161,0.923,0.237,1.381,0.237c1.159,0,2.261-0.496,3.044-1.34   c0.206,0.689,0.484,1.367,0.839,2.025c2.568,4.765,14.037,3.671,21.348,16.575c0.483,0.854,1.418,1.349,2.396,1.268   c0.979-0.081,1.819-0.724,2.155-1.646c3.329-9.14-2.747-20.968-7.012-26.376c-3.668-4.653-9.315-7.166-14.532-4.355   c-0.186,0.1-0.357,0.215-0.534,0.323l0.043-0.122c0.763-2.17-0.378-4.547-2.548-5.31c-1.479-0.521-3.04-0.143-4.134,0.827   c-0.976-13.8-12.483-24.706-26.539-24.706c-14.058,0-25.565,10.907-26.54,24.707c-1.096-0.97-2.658-1.348-4.134-0.828   c-2.17,0.763-3.311,3.14-2.548,5.31l0.043,0.122c-0.177-0.109-0.349-0.224-0.533-0.323c-5.217-2.811-10.864-0.299-14.533,4.355   c-4.265,5.408-10.341,17.236-7.012,26.376C15.414,88.172,16.255,88.815,17.233,88.896z" />
                                                </g>
                                            </svg>
                                        </div>

                                        <div className="text-left">
                                            <div className="text-gray-200  font-bold">Number of Children</div>
                                            <div className="text-1xl text-gray-200">{user?.child?.length}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray rounded-lg border border-stroke  shadow-sm">
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 289.208 289.208">
                                                    <g>
                                                        <path d="M284.275,176.745c5.099-3.41,6.468-10.308,3.058-15.405l-38.876-58.124c-5.15-7.695-13.022-11.707-21.287-11.707h-16.658   c-9.588,0-17.229,5.802-22.101,13.327c-0.487,0.753,2.422-3.679-37.983,56.486c-3.42,5.092-2.063,11.991,3.028,15.411   c5.089,3.418,11.99,2.065,15.411-3.028l16.656-24.802l0.034,112.663c0,7.667,6.215,13.882,13.882,13.882   c7.667,0,13.882-6.215,13.882-13.882v-62.471h11.107v62.471c0,7.667,6.215,13.882,13.882,13.882   c7.667,0,13.882-6.215,13.882-13.882c0-119.736-0.033-111.963-0.033-112.865l16.712,24.986   C272.285,178.793,279.188,180.15,284.275,176.745z" />
                                                        <path d="M218.874,80.75c14.696,0,26.615-11.908,26.615-26.614c0-9.582-5.076-17.983-12.686-22.668   c1.573-1.112,3.405-2.139,5.57-3.017c0.909-0.368,1.521-1.231,1.567-2.211c0.047-0.981-0.481-1.897-1.352-2.35   c-4.209-2.186-9.338-2.231-14.178-1.303c0.821-1.538,1.855-3.109,3.183-4.702c0.628-0.754,0.761-1.804,0.34-2.689   c-0.421-0.886-1.318-1.446-2.3-1.436c-9.728,0.111-18.649,9.972-22.203,15.869c-0.826,1.37-1.446,2.821-1.837,4.284   c-5.71,4.881-9.335,12.129-9.335,20.223C192.259,68.842,204.178,80.75,218.874,80.75z" />
                                                        <path d="M100.382,104.202C95.588,96.932,87.96,91.509,78.63,91.509H61.971c-9.491,0-17.747,5.292-21.977,13.086   c-0.514,0.74-37.605,55.979-38.107,56.728c-3.42,5.092-2.063,11.991,3.028,15.411c5.089,3.418,11.99,2.065,15.411-3.028   l16.656-24.802v0.307l-15.118,61.638c-0.706,2.875-0.051,5.915,1.776,8.244c1.828,2.33,4.624,3.69,7.585,3.69h5.791v38.784   c0,7.667,6.215,13.882,13.882,13.882s13.882-6.215,13.882-13.882v-38.784h11.106v38.784c0,7.667,6.215,13.882,13.882,13.882   c7.667,0,13.882-6.215,13.882-13.882v-38.784h5.726c2.961,0,5.757-1.36,7.585-3.69c1.827-2.329,2.482-5.369,1.776-8.244   l-15.119-61.642h-0.001v-0.403l16.724,24.902c3.421,5.094,10.323,6.445,15.411,3.028c5.092-3.42,6.448-10.319,3.028-15.411   C97.759,100.238,100.862,104.931,100.382,104.202z" />
                                                        <path d="M17.233,88.896c0.978,0.081,1.912-0.414,2.396-1.268c7.311-12.904,18.78-11.81,21.349-16.575   c0.354-0.658,0.633-1.336,0.839-2.025c0.783,0.844,1.885,1.34,3.044,1.34c0.458,0,0.925-0.076,1.381-0.237   c0.77-0.271,1.401-0.751,1.873-1.347c4.763,7.21,12.935,11.967,22.221,11.967c9.285,0,17.458-4.757,22.22-11.967   c0.472,0.596,1.103,1.076,1.874,1.347c0.457,0.161,0.923,0.237,1.381,0.237c1.159,0,2.261-0.496,3.044-1.34   c0.206,0.689,0.484,1.367,0.839,2.025c2.568,4.765,14.037,3.671,21.348,16.575c0.483,0.854,1.418,1.349,2.396,1.268   c0.979-0.081,1.819-0.724,2.155-1.646c3.329-9.14-2.747-20.968-7.012-26.376c-3.668-4.653-9.315-7.166-14.532-4.355   c-0.186,0.1-0.357,0.215-0.534,0.323l0.043-0.122c0.763-2.17-0.378-4.547-2.548-5.31c-1.479-0.521-3.04-0.143-4.134,0.827   c-0.976-13.8-12.483-24.706-26.539-24.706c-14.058,0-25.565,10.907-26.54,24.707c-1.096-0.97-2.658-1.348-4.134-0.828   c-2.17,0.763-3.311,3.14-2.548,5.31l0.043,0.122c-0.177-0.109-0.349-0.224-0.533-0.323c-5.217-2.811-10.864-0.299-14.533,4.355   c-4.265,5.408-10.341,17.236-7.012,26.376C15.414,88.172,16.255,88.815,17.233,88.896z" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-gray-400  font-bold ">Name and Age of Children</div>
                                            <div className="text-1xl text-gray-900">
                                                {user?.child?.length ? <Popover.Root>
                                                    <Popover.Trigger >
                                                        <svg className="p-1" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                                            <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Popover.Trigger>
                                                    <Popover.Portal>
                                                        <Popover.Content className="PopoverContent" sideOffset={5}>



                                                            <ScrollArea.Root className="ScrollAreaRoot">
                                                                <ScrollArea.Viewport className="ScrollAreaViewport">
                                                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                                                                        <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
                                                                            <thead className="text-xs text-gray-700 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                                                                                <tr>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="px-6 py-3"
                                                                                    >
                                                                                        NAME
                                                                                    </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="px-6 py-3"
                                                                                    >
                                                                                        AGE
                                                                                    </th>

                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {user?.child?.map(
                                                                                    (item: any, key: any) => {
                                                                                        return (
                                                                                            <>
                                                                                                <tr
                                                                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                                                                    key={key}
                                                                                                >
                                                                                                    <th
                                                                                                        scope="row"
                                                                                                        className="px-6 py-4 font-medium text-gray-900  dark:text-white break-all"
                                                                                                    >
                                                                                                        {item?.name}
                                                                                                    </th>
                                                                                                    <td className="px-6 py-4">
                                                                                                        {item?.age}
                                                                                                    </td>

                                                                                                </tr>
                                                                                            </>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>

                                                                </ScrollArea.Viewport>
                                                                <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                                                                    <ScrollArea.Thumb className="ScrollAreaThumb" />
                                                                </ScrollArea.Scrollbar>
                                                                <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
                                                                    <ScrollArea.Thumb className="ScrollAreaThumb" />
                                                                </ScrollArea.Scrollbar>
                                                                <ScrollArea.Corner className="ScrollAreaCorner" />
                                                            </ScrollArea.Root>





                                                            <Popover.Close className="PopoverClose" aria-label="Close">
                                                                <Cross2Icon />
                                                            </Popover.Close>
                                                            <Popover.Arrow className="PopoverArrow" />
                                                        </Popover.Content>
                                                    </Popover.Portal>
                                                </Popover.Root> : "-"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray rounded-lg border border-stroke  shadow-sm">
                                    <div className="flex items-center space-x-7">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 14L5.90909 11.3333M11 14L9.90909 11.3333M9.90909 11.3333L7.72727 6L5.90909 11.3333M9.90909 11.3333H5.90909" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M13 11.8462H16.5M20 11.8462H18.25M16.5 11.8462V10M16.5 11.8462H17.375H18.25M18.25 11.8462C18.0556 13.2821 16.2667 17.0154 13 18M18.8333 18C17.6667 17.3846 14.6333 15.1692 14.1667 13.6923" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-gray-200  font-bold">Languages Spoken</div>
                                            {user?.parent_language?.length ?
                                                user?.parent_language?.map((language: any, key: any) => {
                                                    return (
                                                        <span key={key} className="break-all" >{`${key >= 1 ? "," : ""}${language?.language?.name}`}</span>
                                                    )
                                                }) : "NA"
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray rounded-lg border border-stroke  shadow-sm">
                                    <div className="flex items-center space-x-7">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="-1 0 19 19" className="cf-icon-svg"><path d="M16.417 9.579A7.917 7.917 0 1 1 8.5 1.662a7.917 7.917 0 0 1 7.917 7.917zm-11.293.252A1.31 1.31 0 0 0 5.648 8.1c-.267-.76-.934-1.22-1.49-1.024a1.31 1.31 0 0 0-.524 1.73c.267.761.934 1.22 1.49 1.025zm6.664.747a4.606 4.606 0 0 0-6.518 0 1.945 1.945 0 0 0 2.75 2.75.72.72 0 0 1 1.017 0 1.945 1.945 0 0 0 2.75-2.75zM5.84 6.986c.087.918.7 1.61 1.372 1.547.67-.064 1.143-.86 1.057-1.777-.087-.917-.701-1.61-1.372-1.546-.67.063-1.144.859-1.057 1.776zm4.003 1.547c.671.063 1.285-.63 1.372-1.547.087-.917-.386-1.713-1.057-1.776-.67-.064-1.285.629-1.372 1.546-.086.918.387 1.713 1.057 1.777zM12.9 7.076c-.556-.195-1.223.263-1.49 1.024a1.31 1.31 0 0 0 .524 1.73c.556.196 1.223-.263 1.49-1.024a1.31 1.31 0 0 0-.524-1.73z" /></svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-gray-200  font-bold">Pet Info</div>
                                            <div className="text-1xl text-gray-200">{user?.parent_profile?.pet_info || "NA"}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray rounded-lg border border-stroke  shadow-sm">
                                    <div className="flex items-center space-x-7">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                                <path d="M6 15H8M3 11H21M3 8H21M12 15H16M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-gray-200  font-bold">Billing Info</div>
                                            <div className="text-1xl text-gray-200 flex">
                                                {cardDetails && cardDetails[0]?.card?.brand == 'mastercard' && <Image alt="credit-card-logo" src="/images/credit-card-logos/mastercard.jpg" width={40} height={40} />}
                                                {cardDetails && cardDetails[0]?.card?.brand == 'visa' && <Image alt="credit-card-logo" src="/images/credit-card-logos/visa.jpg" width={40} height={40} />}
                                                {cardDetails && cardDetails[0]?.card?.brand == 'amex' && <Image alt="credit-card-logo" src="/images/credit-card-logos/americanexpress.png" width={40} height={40} />}
                                                {cardDetails && cardDetails[0]?.card?.brand == 'discover' && <Image alt="credit-card-logo" src="/images/credit-card-logos/discover.png" width={40} height={40} />}
                                                {cardDetails && cardDetails[0]?.card?.brand == 'jcb' && <Image alt="credit-card-logo" src="/images/credit-card-logos/jcb.png" width={40} height={40} />}
                                                {cardDetails && cardDetails[0]?.card?.brand == 'dinersclub' && <Image alt="credit-card-logo" src="/images/credit-card-logos/dinnersclub.jpg" width={40} height={40} />}
                                                {cardDetails && cardDetails[0]?.card?.brand == 'unionpay' && <Image alt="credit-card-logo" src="/images/credit-card-logos/unionpay.png" width={40} height={40} />}&nbsp;
                                                {cardDetails && cardDetails[0]?.card?.last4 ? `XXXX XXXX XXXX ${cardDetails[0]?.card?.last4}` : "NA"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray rounded-lg border border-stroke  shadow-sm">
                                    <div className="flex items-center space-x-7">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 52 52">
                                                <path d="M27.4133467,3.10133815 L32.0133467,18.1013381 C32.2133467,18.7013381 32.8133467,19.0013381 33.4133467,19.0013381 L48.4133467,19.0013381 C49.9133467,19.0013381 50.5133467,21.0013381 49.3133467,21.9013381 L37.1133467,30.9013381 C36.6133467,31.3013381 36.4133467,32.0013381 36.6133467,32.6013381 L42.4133467,48.0013381 C42.8133467,49.4013381 41.3133467,50.6013381 40.1133467,49.7013381 L27.0133467,39.9013381 C26.5133467,39.5013381 25.8133467,39.5013381 25.2133467,39.9013381 L12.0133467,49.7013381 C10.8133467,50.6013381 9.21334668,49.4013381 9.71334668,48.0013381 L15.3133467,32.6013381 C15.5133467,32.0013381 15.3133467,31.3013381 14.8133467,30.9013381 L2.61334668,21.9013381 C1.41334668,21.0013381 2.11334668,19.0013381 3.51334668,19.0013381 L18.5133467,19.0013381 C19.2133467,19.0013381 19.7133467,18.8013381 19.9133467,18.1013381 L24.6133467,3.00133815 C25.0133467,1.60133815 27.0133467,1.70133815 27.4133467,3.10133815 Z M26.0133467,12.8023264 C26,14.1700393 26,33.5426636 26,34.4953918 C26.1865845,34.6476135 28.9331193,36.6890643 34.2396046,40.6197441 C34.9394191,41.144605 35.8141872,40.4447905 35.5809157,39.6283403 L35.5809157,39.6283403 L32.3085327,31.0201416 C31.9597778,30.2501831 32.3085327,29.7487793 32.7398682,29.4849854 L32.7398682,29.4849854 L39.6048489,24.6961622 C40.3046634,24.1713013 39.9547562,23.0049438 39.0799881,23.0049438 L39.0799881,23.0049438 L31.0206299,23.0049438 C30.6707226,23.0049438 29.7518921,22.8880615 29.5025635,21.9888306 L29.5025635,21.9888306 L26.8332347,13.4436151 C26.7175852,13.0388421 26.3602784,12.8204102 26.0133467,12.8023264 Z" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-gray-200  font-bold">Aggregate Rating</div>
                                            <div className="text-1xl text-gray-200">-</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gray rounded-lg border border-stroke  shadow-sm">
                                    <div className="flex items-center space-x-7">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 16 16">
                                                <path fill="#000000" fillRule="evenodd" d="M8,0 C8.55228,0 9,0.447715 9,1 L11,1 L11,2 L13,2 C13.5523,2 14,2.44772 14,3 L14,15 C14,15.5523 13.5523,16 13,16 L3,16 C2.44772,16 2,15.5523 2,15 L2,3 C2,2.44772 2.44772,2 3,2 L5,2 L5,1 L7,1 C7,0.447715 7.44772,0 8,0 Z M5,4 L4,4 L4,14 L12,14 L12,4 L11,4 L11,5 L5,5 L5,4 Z M6,10 L10,10 C10.5523,10 11,10.4477 11,11 C11,11.51285 10.613973,11.9355092 10.1166239,11.9932725 L10,12 L6,12 C5.44772,12 5,11.5523 5,11 C5,10.48715 5.38604429,10.0644908 5.88337975,10.0067275 L6,10 Z M10,7 C10.5523,7 11,7.44772 11,8 C11,8.55228 10.5523,9 10,9 L6,9 C5.44772,9 5,8.55228 5,8 C5,7.44772 5.44772,7 6,7 L10,7 Z M8,2 C7.44772,2 7,2.44772 7,3 C7,3.55228 7.44772,4 8,4 C8.55228,4 9,3.55228 9,3 C9,2.44772 8.55228,2 8,2 Z" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-gray-200  font-bold">Individual Reviews</div>
                                            <div className="text-1xl text-gray-200">-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="rounded-lg border border-stroke bg-white px-3 pt-3 pb-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 xl:pb-1 mb-5 mt-3">
                <h2 className="text-2xl font-bold mb-2">Product Desc</h2>
                <p className="text-gray-700 mb-4">
                    Product description goes here. Provide detailed information about the
                    product.
                    The Paragraphs module in Drupal provides editors with a component driven architecture for building pages. Morpht has been developing Paragraph approaches to site building since 2015. This case study captures some of the content from a Drupal 7 Paragraphs Demo site which was built to showcase what could be done with Paragraphs.
                </p>
            </div> */}
        </>
    );
};

export default View;
