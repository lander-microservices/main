import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { useStoryblok, StoryblokComponent } from "@storyblok/react";
import PuffLoader from "react-spinners/PuffLoader";
import Lander from "./Lander/Lander";
import Prelander from "./PreLander/PreLander";

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


function Renderer(){
  const [pageRender, setPageRender] = useState(false);

  useEffect(()=>{
    const interval = setInterval(()=>{
      if (window.domain_settings){
        setPageRender(true);
        clearInterval(interval);
      }
    }, 50)

    return () => clearInterval(interval);
  },[])

  if (!pageRender){
    return <></>
  }
  return (
    <App />
  )
}

ReactDOM.render(<Renderer />, document.getElementById("root"));
