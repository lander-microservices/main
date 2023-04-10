import React from "react";
import ReactDOM from "react-dom";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { useStoryblok, StoryblokComponent } from "@storyblok/react";
import Prelander from "./PreLander";
import PuffLoader from "react-spinners/PuffLoader";
import "../globalCss.scss";
import Lander from "./Lander";
import { ExampleComponent } from "wecall-config-lib";

let init = true;
storyblokInit({
  accessToken: "gVJgZvajxLWDT0saMgTqswtt",
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
ReactDOM.render(<App />, document.getElementById("root"));
