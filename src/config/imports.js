import React from "react";

const V1LanderLander = React.lazy(() => import("landers/V1Lander"));
const V1LanderFooter = React.lazy(() => import("landers/V1Footer"));
const V1LanderHeader = React.lazy(() => import("landers/V1Header"));
const V1Advertorial = React.lazy(() => import("landers/V1Advertorial"));
const V1FloatingCard = React.lazy(() => import("landers/V1FloatingCard"));

const V1PrelanderFooter = React.lazy(() => import("prelander/V1PrelanderFooter"));
const V1PrelanderHeader = React.lazy(() => import("prelander/V1PrelanderHeader"));
const V1PrelanderPrelander = React.lazy(() => import("prelander/V1Prelander"));
const V1Testimonials = React.lazy(() => import("prelander/V1Testimonials"));
const V1PrelanderFloatingCard = React.lazy(() => import("prelander/V1FloatingCard"));

export const LANDERS = {
  lander:{
    v1: {
      lander: V1LanderLander,
      header: V1LanderHeader,
      footer: V1LanderFooter,
      advertorial: V1Advertorial,
      floatingCard: V1FloatingCard
    }
  },
  prelander:{
    v1: {
      prelander: V1PrelanderPrelander,
      footer: V1PrelanderFooter,
      header: V1PrelanderHeader,
      testimonials: V1Testimonials,
      floatingCard: V1PrelanderFloatingCard
    }
  }
}