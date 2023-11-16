import React, { Component } from "react";
import ReactDOM from "react-dom";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { useStoryblok, StoryblokComponent } from "@storyblok/react";
import PuffLoader from "react-spinners/PuffLoader";
import Lander from "./Lander/Lander";
import Prelander from "./PreLander/PreLander";

const ERROR_API = "http://api.logger.analytics.improveourcredit.com/funnel-logger";

const errorApi = async (error, errorInfo, localStorage) => {
  fetch(ERROR_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      error: error.toString(),

      domainName: window.location.host,
      completeUrl: window.location.href,
      sessionStorage: {},
      localStorage: localStorage? localStorage :  {},
      otherError: errorInfo,
      // You can add more details like user info, browser, etc.
    }),
  });
};

window.onerror = function (message, source, lineno, colno, error) {
  // Log or handle the error
  console.error('An error occurred:', message, 'at line:', lineno, 'of file:', source);
  // Optionally, send the error information to your server
  sendErrorToServer("error", "error", { localStorage: {message, source, lineno, colno, error} });
  return true; // Prevents the default browser error handler
};


localStorage.removeItem("ringbaData");
window.dev = false;

storyblokInit({
  accessToken: window.domain_settings.storyblockAccessToken,
  use: [apiPlugin],
  components: {
    prelander: Prelander,
    lander: Lander,
  },
  apiOptions: { region: "us" },
});

const App = () => {
  let slug =
    window.location.pathname === "/"
      ? "home"
      : window.location.pathname.replace("/", "");

  const story = useStoryblok(slug, { version: "draft" });
  if (!story || !story.content) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <PuffLoader color="#274066" />
          <p style={{ margin: 0, padding: 0 }}>Loading...</p>
        </div>
      </div>
    );
  }

  return <StoryblokComponent blok={story.content} />;
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.logErrorToAPI(error, errorInfo);
  }

  logErrorToAPI(error, errorInfo) {
    // Send error details to your API

    errorApi(error, errorInfo.componentStack);
  }

  render() {
    // if (this.state.hasError) {
    //   // Fallback UI
    //   return <h1>Something went wrong.</h1>;
    // }

    return this.props.children;
  }
}

export default ErrorBoundary;

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
