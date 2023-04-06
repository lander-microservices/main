import React from "react";

const Testimonials1 = React.lazy(() => import("components/Testimonials1"));
const Advertorial = React.lazy(() => import("components/Advertorial"));


export const COMPONENTS = {
  Testimonials1,
  Advertorial
};

const V1LanderLander = React.lazy(() => import("landers/V1Lander"));
const V1LanderFooter = React.lazy(() => import("landers/V1Footer"));
const V1LanderHeader = React.lazy(() => import("landers/V1Header"));

const V1PrelanderFooter = React.lazy(() => import("prelander/V1PrelanderFooter"));
const V1PrelanderHeader = React.lazy(() => import("prelander/V1PrelanderHeader"));
const V1PrelanderPrelander = React.lazy(() => import("prelander/V1Prelander"));

export const LANDERS = {
  lander:{
    v1: {
      lander: V1LanderLander,
      header: V1LanderHeader,
      footer: V1LanderFooter
    }
  },
  prelander:{
    v1: {
      prelander: V1PrelanderPrelander,
      footer: V1PrelanderFooter,
      header: V1PrelanderHeader
    }
  }
}