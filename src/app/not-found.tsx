"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <div className="h-screen w-screen bg-gray-100 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-projectYellow">
          <div className="max-w-md">
            <p>
              {/* <img src={"/images/logo/logo.svg"} width={500} height={500} alt="">

                        </img> */}
            </p>
            <div className="text-5xl font-dark font-bold ">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn&apos;t find this page.{" "}
            </p>
            <p className="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>

            <button
              onClick={() => {
                router.push(`/dashboard`);
              }}
              value="Sign In"
              className="bg-mainBtn w-full cursor-pointer rounded-lg p-4 text-projectYellow transition hover:bg-opacity-90 "
            >
              Back To Home
            </button>
          </div>
          <div className="max-w-lg"></div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
