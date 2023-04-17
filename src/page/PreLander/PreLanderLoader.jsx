import React from "react";
import Prelander from "./PreLander";

export default function LanderLoader({ blok }) {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <PuffLoader color="#274066" />
            <p style={{ margin: 0, padding: 0 }}>Loading...</p>
          </div>
        </div>
      }
    >
      <Prelander blok={blok} />
    </React.Suspense>
  );
}
