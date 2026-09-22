import React from 'react'
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "purple",
};

const SmallSpinner = ({text}) => {
  return (
    <>
    <ClipLoader
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <small className="text-[16px]">{text}</small>
      </>
  )
}
export default SmallSpinner