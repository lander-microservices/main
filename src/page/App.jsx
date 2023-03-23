import React from "react";
import ReactDOM from "react-dom";
import ContentLoader from "./ContentLoader";

import "./index.css";
import Wrapper from "./Wrapper";



const App = () => {
  const wrapperConfig = {
    headerConfig: {
      eventID: "EventId",
      number: "(800) 888-9999",
      headerTitle: "QualifyBenefits.co",
    },
    footerConfig: {
      footerTitle: "QualifyBenefits.co",
      fullName: "QualifyBenefits",
      eventID: "EventID",
      privacyPolicyRoute: "",
      termsAndConditionsRoute: "",
      partnerListRoute: "",
    },
    header: "Header1",
    footer: "Footer1",

    defaultRedirect: "qualifybenefits.co",

    routeConfig: [
      {
        path: "lander-1",
        component: "Lander1",
      },
      {
        path: "prelander-1",
        component: "PreLander1",
      },
    ],
    pageConfig: {
      voluumUrl: "https://track.qualifybenefits.co/click"
    },
  };
  return (
    <Wrapper {...wrapperConfig}>
      <ContentLoader {...wrapperConfig}></ContentLoader>
    </Wrapper>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
