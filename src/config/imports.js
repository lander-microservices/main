import React from "react";

const HeaderPreLander = React.lazy(() => import("components/HeaderPreLander"));
const FooterPreLander = React.lazy(() => import("components/FooterPreLander"));
const HeaderLander = React.lazy(() => import("components/HeaderLander"));
const FooterLander = React.lazy(() => import("components/FooterLander"));
const Testimonials1 = React.lazy(() => import("components/Testimonials1"));
const Advertorial = React.lazy(() => import("components/Advertorial"));

export const COMPONENTS = {
  HeaderPreLander,
  FooterPreLander,
  HeaderLander,
  FooterLander,
  Testimonials1,
  Advertorial
};

const Lander1 = React.lazy(() => import("landers/Lander1"));
const PreLander1 = React.lazy(() => import("prelander/PreLander1"));

export const LANDERS = {
  lander: Lander1,
  prelander: PreLander1
}