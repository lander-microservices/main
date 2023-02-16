import React from "react";
import { LANDERS } from "../config/imports";

export default function ContentLoader({
  routeConfig,
  pageConfig,
  defaultRedirect,
}) {
  const currentRoute = window.location.pathname;
  const findPathName = routeConfig.find((path) =>
    currentRoute.includes(path.path)
  );

  console.log('CurrentRoute', currentRoute, findPathName);

  if (!findPathName) {
    window.location.href = defaultRedirect
  } 
  if (findPathName) {
    let Lander;
    Lander = LANDERS[findPathName.component];
    return (
      <React.Suspense fallback={<></>}>
            <Lander init={()=> {}} number="(800)888888" callClickCb={()=>{}} />
      </React.Suspense>
    );
  }
}
