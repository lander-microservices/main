import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { useStoryblok, StoryblokComponent } from "@storyblok/react";
import Prelander from "./PreLander";
import PropagateLoader from "react-spinners/PropagateLoader"
import "components/GlobalCss";

let init = false;

const Main = () => {
  const [storyBookInit, setStoryBookInit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.domain_settings && !init) {
        storyblokInit({
          accessToken: window.domain_settings.storyblockAccessToken,
          use: [apiPlugin],
          components: {
            prelander: Prelander,
          },
          apiOptions: { region: "us" },
        });
        init = true;
        setStoryBookInit(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  if (storyBookInit) return <App />;
  else return <></>;
};

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
        <PropagateLoader color="#36d7b7" />
      </div>
    );
  }

  return <StoryblokComponent blok={story.content} />;
};
ReactDOM.render(<Main />, document.getElementById("root"));
