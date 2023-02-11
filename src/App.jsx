import React from "react";
import ReactDOM from "react-dom";
import Header from "components/Header";
import Footer from "components/Footer";

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: main</div>
    <Header />
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <Footer />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
