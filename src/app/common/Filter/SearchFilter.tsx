import { useState } from "react";
interface ChildProps {
  onDataReceived: (data: string) => void;
  onDataReceived2: (data: string) => void;
  onDataReceived3: (data: string) => void;
  reset: (data: string) => void;
}

const SearchFilter: React.FC<ChildProps> = ({
  onDataReceived,
  onDataReceived2,
  onDataReceived3,
  reset,
}) => {
  const [query, setQuery] = useState("");

  const [userInfo2, setUserInfo2] = useState({ name: "" });
  const [userInfo, setUserInfo] = useState({ name: "" });
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  const handleKeyPress = (data: any) => {
    // console.log(userInfo2);

    // const numbers = [input1, input2, input3, input4];
    // const concatenated = numbers.join('');
    onDataReceived(userInfo2?.name);
  };

  const updateState2 = (field: any) => (e: any) => {
    const state = userInfo;
    const newState = { ...state, [field]: e.target.value };
    setUserInfo2(newState);
    setQuery(e.target.value);
  };

  const resetData = () => {
    setSelectedOption("");
    setSelectedOption2("");
    setUserInfo2({ name: "" });
    reset("done");
  };

  const select1 = (e: any) => {
    setSelectedOption(e.target.value);
    onDataReceived2(e.target.value);
  };

  const select2 = (e: any) => {
    setSelectedOption2(e.target.value);
    onDataReceived3(e.target.value);
  };
  return (
    <div className="mb-5 rounded-lg border border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex gap-3 p-5">
        <div>
          <input
            onChange={updateState2("name")}
            // value={searchInput}
            onKeyUp={handleKeyPress}
            value={userInfo2.name}
            type="text"
            placeholder="Search"
            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
          />
        </div>

        <div className="relative">
          <div>
            <select
              value={selectedOption}
              onChange={(e) => select1(e)}
              // onInput={(e) => select1(e)}
              className=" w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            >
              <option value="" disabled selected>
                Select Phone Verification
              </option>
              <option value="all">All</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none top-0">
              <svg
                className="fill-current h-5 w-5 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 12L5 7l1.5-1.5L10 9l3.5-3.5L15 7l-5 5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative">
          <div>
            <select
              value={selectedOption2}
              onChange={(e) => select2(e)}
              // onInput={(e) => select2(e)}
              className=" w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            >
              <option value="" disabled selected>
                Select Status
              </option>
              <option value="all">All</option>
              <option value="blocked">Blocked</option>
              <option value="unblocked">Unblocked</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none top-0">
              <svg
                className="fill-current h-5 w-5 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 12L5 7l1.5-1.5L10 9l3.5-3.5L15 7l-5 5z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={resetData}
            type="submit"
            value="Reset"
            className="bg-mainBtn w-full rounded-lg border-[1.5px]  py-3 px-5 font-medium o cursor-pointer rounded-lg p-4 text-white transition hover:bg-opacity-90 "
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
