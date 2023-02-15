import React from "react";
import { COMPONENTS } from "../config/imports";

export default function Wrapper({ header, footer, children }) {
  const Header = COMPONENTS[header];
  const Footer = COMPONENTS[footer];
  return (
    <React.Fragment>
      <React.Suspense fallback={<></>}>
        <Header />
      </React.Suspense>
      {children}
      <React.Suspense fallback={<></>}>
        <Footer />
      </React.Suspense>
    </React.Fragment>
  );
}
