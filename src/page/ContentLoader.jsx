import React from "react";
import { LANDERS } from "../config/imports";

export default function ContentLoader({ page }) {
  const Lander = LANDERS[page]
  return (
    <React.Suspense fallback={<></>}>
      <Lander />
    </React.Suspense>
  );
}
