import React from "react";
import ReactDOM from "react-dom";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { useStoryblok, StoryblokComponent } from "@storyblok/react";
import PuffLoader from "react-spinners/PuffLoader";
import Lander from "./Lander/Lander";
import Prelander from "./PreLander/PreLander";

localStorage.removeItem("ringbaData");
window.dev = true;

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
ReactDOM.render(<App />, document.getElementById("root"));
