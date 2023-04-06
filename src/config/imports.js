import React from "react";

const HeaderPreLander = React.lazy(() => import("components/HeaderPreLander"));
const FooterPreLander = React.lazy(() => import("components/FooterPreLander"));
const HeaderLander = React.lazy(() => import("components/HeaderLander"));
const FooterLander = React.lazy(() => import("components/FooterLander"));
const Testimonials1 = React.lazy(() => import("components/Testimonials1"));
const Advertorial = React.lazy(() => import("components/Advertorial"));

const V1Footer = React.lazy(() => import("landers/V1Footer"));
const V1Header = React.lazy(() => import("landers/V1Header"));

export const COMPONENTS = {
  HeaderPreLander,
  FooterPreLander,
  HeaderLander,
  FooterLander,
  Testimonials1,
  Advertorial
};

const V1Lander = React.lazy(() => import("landers/V1Lander"));
const PreLander1 = React.lazy(() => import("prelander/PreLander1"));

export const LANDERS = {
  lander:{
    v1: {
      lander: V1Lander,
      header: V1Header,
      footer: V1Footer
    }
  },
  // lander: Lander1,
  prelander: PreLander1
}