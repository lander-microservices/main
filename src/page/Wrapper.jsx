import React from "react";
import { COMPONENTS } from "../config/imports";

export default function Wrapper({ headerConfig, footerConfig, header, footer, children }) {
  const Header = COMPONENTS[header];
  const Footer = COMPONENTS[footer];
  return (
    <React.Fragment>
      <React.Suspense fallback={<></>}>
        <Header {...headerConfig} />
      </React.Suspense>
      {children}
      <React.Suspense fallback={<></>}>
        <Footer {...footerConfig} />
      </React.Suspense>
    </React.Fragment>
  );
}
