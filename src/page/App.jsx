import React from "react";
import ReactDOM from "react-dom";
import ContentLoader from "./ContentLoader";

import "./index.css";
import Wrapper from "./Wrapper";

const App = () => (
    <Wrapper header={'Header1'} footer={'Footer1'}>
      <ContentLoader page={"Lander2"}></ContentLoader>
    </Wrapper>
);
ReactDOM.render(<App />, document.getElementById("app"));
