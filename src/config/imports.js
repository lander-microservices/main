import React from "react";

const Header1 = React.lazy(() => import("components/Header1"));
const Footer1 = React.lazy(() => import("components/Footer1"));
const Testimonials1 = React.lazy(() => import("components/Testimonials1"));

export const COMPONENTS = {
  Lander: {
    Headers: {
      v1: React.lazy(() => import("components/prelander/header/v1")),
    },
    Footers: {
      v1: React.lazy(() => import("components/prelander/footer/v1")),
    }
  },
  PreLander: {
    Headers: {
      v1: React.lazy(() => import("components/prelander/header/v1")),
    },
    Footers: {
      v1: React.lazy(() => import("components/prelander/footer/v1")),
    }
  },
  Testimonials1
};

// Header1,
// Footer1,
// Testimonials1

const Lander1 = React.lazy(() => import("landers/Lander1"));
const Lander2 = React.lazy(() => import("landers/Lander2"));
const Lander3 = React.lazy(() => import("landers/Lander3"));
const Lander4 = React.lazy(() => import("landers/Lander4"));
const Lander5 = React.lazy(() => import("landers/Lander5"));

const PreLander1 = React.lazy(() => import("prelander/PreLander1"));

export const LANDERS =
{
  'lander-1': Lander1,
  'lander-2': Lander2,
  'lander-3': Lander3,
  'lander-4': Lander4,
  'prelander-1': PreLander1
}
  // Lander1,
  // Lander2,
  // Lander3,
  // Lander4,
  // Lander5,
  // PreLander1
