import React from "react";
import ReactDOM from "react-dom";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { useStoryblok, StoryblokComponent } from "@storyblok/react";
import Prelander from "./PreLander";
import "components/GlobalCss";

storyblokInit({
  accessToken: "gVJgZvajxLWDT0saMgTqswtt",
  use: [apiPlugin],
  components: {
    prelander: Prelander,
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
    return <div>Loading...</div>;
  }

  return <StoryblokComponent blok={story.content} />;
};
ReactDOM.render(<App />, document.getElementById("app"));
