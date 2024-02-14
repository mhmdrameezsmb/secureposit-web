import React from "react";
import { BeatLoader } from "react-spinners";
const BeatLoaderCmp = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
      <BeatLoader color="black" />
    </div>
  );
};

export default BeatLoaderCmp;
