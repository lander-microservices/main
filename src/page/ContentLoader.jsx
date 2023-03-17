import React from "react";
import { LANDERS } from "../config/imports";

export default function ContentLoader({
  routeConfig,
  pageConfig,
  defaultRedirect,
}) {
  const currentRoute = window.location.pathname;
  const findPathName = routeConfig.find((path) =>{
    return currentRoute.replace('/', '') === path.path
  }
  );

  if (!findPathName) {
    console.log(findPathName)
    return <p>Error While Loading Page</p>
    // window.location.href = defaultRedirect
  } 
  if (findPathName) {
    let Lander;
    Lander = LANDERS[findPathName.component];
    return (
      <React.Suspense fallback={<></>}>
            <Lander init={()=> {}} number="(800)888888" callClickCb={()=>{}} voluumUrl={pageConfig.voluumUrl} />
      </React.Suspense>
    );
  }
}
