import { useRouter } from "next/navigation";

const Back = () => {
  const router = useRouter();

  const back = () => {
    router.back();
  };

  return (
    <div className="flex justify-start gap-3 pb-3 ">
      <div>
        <button
          onClick={back}
          type="submit"
          value="Reset"
          className="flex bg-softGreen w-full rounded-lg border-[1.5px]  font-medium o cursor-pointer rounded-lg p-3 text-white transition hover:bg-opacity-90 "
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          Back
        </button>
      </div>
    </div>
  );
};

export default Back;
