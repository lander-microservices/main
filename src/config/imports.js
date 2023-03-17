import React from "react";

const Header1 = React.lazy(() => import("components/Header1"));
const Footer1 = React.lazy(() => import("components/Footer1"));

export const COMPONENTS = {
  Header1,
  Footer1,
};

const Lander1 = React.lazy(() => import("landers/Lander1"));
const Lander2 = React.lazy(() => import("landers/Lander2"));
const Lander3 = React.lazy(() => import("landers/Lander3"));
const Lander4 = React.lazy(() => import("landers/Lander4"));
const Lander5 = React.lazy(() => import("landers/Lander5"));

const PreLander1 = React.lazy(() => import("prelander/PreLander1"));

export const LANDERS = {
  Lander1,
  Lander2,
  Lander3,
  Lander4,
  Lander5,
  PreLander1
};
