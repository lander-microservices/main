import React from "react";
import ReactDOM from "react-dom";
import ContentLoader from "./ContentLoader";

import "./index.css";
import Wrapper from "./Wrapper";

const App = () => {
  const wrapperConfig = {
    headerConfig: {
      eventID: "EventId",
      number: "(800) 888 99",
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
        path: "lander-2",
        component: "Lander2",
      },
    ],
    pageConfig: {},
  };
  return (
    <Wrapper {...wrapperConfig}>
      <ContentLoader {...wrapperConfig}></ContentLoader>
    </Wrapper>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
