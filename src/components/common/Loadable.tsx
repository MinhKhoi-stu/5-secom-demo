import React, { Suspense } from "react";
import Loading from "./Loading";

type PropsType = {
  children?: React.ReactNode;
};

function Loadable(props: PropsType) {
  return (
    <Suspense fallback={<Loading height={300} />}>{props.children}</Suspense>
  );
}

export default Loadable;
