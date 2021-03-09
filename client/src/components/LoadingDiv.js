import React from "react";

import ClipLoader from "react-spinners/ClipLoader";

const LoadingDiv = () => {
  return (
    <div className="loadingDiv">
      <ClipLoader size={150} />
    </div>
  );
};

export default LoadingDiv;
