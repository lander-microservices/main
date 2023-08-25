import {
  renderRichText as originalRenderedTexts,
  storyblokEditable,
} from "@storyblok/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import {
  APIS,
  COOKIES,
  QUERY_STRINGS,
  RINGBA_STORAGE_KEYS,
  STORAGE_KEYS,
  sessionStorageKeys,
  replaceShortCodes as shortCodeReplacer,
  useEventID,
  useInitRingba,
  useRingba,
  useVisitorId,
} from "wecall-config-lib";
import { LANDERS } from "../../config/imports";

const Prelander = ({ blok }) => {
  const acc_id = blok.prelander_acc_id;
  const domainName = window.location.host.replace("prelander.", "");
  const generator = blok.prelander_generator;
  const utm_source = blok.prelander_utm_source;
  // blok.prelander_show_quiz_section

  const prelander_hero_section = blok.prelander_blocks.find((i) => {
    return i.component === "prelander_hero_section";
  });
  const showQuizSection = prelander_hero_section.prelander_show_quiz_section;

  const [clickId, setClickId] = useState();
  const fbc = Cookies.get("_fbc" || "");
  const fbp = Cookies.get("_fbp" || "");
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  const renderRichText = (texts) => {
    let renderedTexts = originalRenderedTexts(texts);
    if(renderedTexts && renderedTexts.length > 0){
      renderedTexts = renderedTexts.replaceAll(
        '<span style="background-color:',
        '<span style="color:'
      );
    } else renderedTexts = "";
    return renderedTexts;
  };

  const { storeRgbaData } = useRingba();

  const visitorId = useVisitorId();
  const eventID = useEventID();

  const testRingba = {
    key: "JS511d482ee8884fa88a77d940d63dbe42",
    user: "pranavtest",
    number: "1-866-578-2331",
  };

  let ringba = {};

  // if(window.dev){
  //   ringba = testRingba
  // } else
  ringba = {
    key: blok.prelander_ringba_number_pool_key,
    number: blok.prelander_ringba_static_number,
    user: blok.prelander_generator,
  };

  // console.log("RINGBA", ringba);

  const { number } = useInitRingba({
    ringbaKey: {
      key: testRingba.key,
      number: testRingba.number,
    },
  });

  // const { number } = useInitRingba({
  //   ringbaKey: {
  //     key: blok.prelander_ringba_number_pool_key,
  //     number: blok.prelander_ringba_static_number,
  //   },
  // });

  const [headerData, setHeaderData] = useState({});
  const [stateCityResponse, setStateCityResponse] = useState({
    state: "",
    city: "",
    zip: "",
  });

  const getRichText = (texts) => {
    return renderRichText(texts);
  };

  const findComponent = (componentName) => {
    return blok.prelander_blocks.find(
      (block) => block.component === componentName
    );
  };

  const getComponent = (content_block, index) => {
    switch (content_block.component) {
      case "menu":
        console.log("menu", content_block);
        if (!headerData.prelander_logo_text) {
          setHeaderData(content_block);
        }
        const Menu = LANDERS.prelander[blok.theme].header;
        return (
          <Menu
            eventID={eventID}
            key={index}
            number={number}
            handlePixelEventTrigger={handlePixelEventTrigger}
            headerTitle={content_block.prelander_logo_text}
            tollFreeVisible={content_block.prelander_nav_toll_free}
            content_block={content_block}
          />
        );
      case "prelander_hero_section":
        const HeroSection = LANDERS.prelander[blok.theme].prelander;
        const prelander_hero_title = shortCodeReplacer(
          renderRichText(content_block.prelander_hero_title),
          stateCityResponse
        );
        const prelander_hero_subtitle = shortCodeReplacer(
          renderRichText(content_block.prelander_hero_subtitle),
          stateCityResponse
        );
        const prelander_hero_paragraph = shortCodeReplacer(
          renderRichText(content_block.prelander_hero_paragraph),
          stateCityResponse
        );
        return (
          <HeroSection
            key={index}
            prelander_hero_paragraph={prelander_hero_paragraph}
            prelander_hero_subtitle={prelander_hero_subtitle}
            prelander_hero_title={prelander_hero_title}
            content_block={content_block}
            PropagateLoader={PropagateLoader}
            storeRgbaData={storeRgbaData}
            handlePixelEventTrigger={handlePixelEventTrigger}
            getRichText={getRichText}
            RINGBA_STORAGE_KEYS={RINGBA_STORAGE_KEYS}
            number={number}
          />
        );
      case "prelander_testimonials_section":
        const prelander_testimonial_headline = renderRichText(
          content_block.prelander_testimonial_headline
        );
        const prelander_testimonial_paragraph = renderRichText(
          content_block.prelander_testimonial_paragraph
        );
        const Testimonials = LANDERS.prelander[blok.theme].testimonials;
        return (
          <Testimonials
            key={index}
            prelander_testimonial_paragraph={prelander_testimonial_paragraph}
            prelander_testimonial_headline={prelander_testimonial_headline}
            content_block={content_block}
          />
        );
      case "prelander_footer_section":
        const renderedRichText = renderRichText(
          content_block.prelander_footer_disclaimer
        );
        const Footer = LANDERS.prelander[blok.theme].footer;
        return (
          <Footer
            key={index}
            prelander_logo_text={headerData.prelander_logo_text}
            prelander_logo_subheadline={headerData.prelander_logo_subheadline}
            prelander_logo_text_color={headerData.prelander_logo_text_color}
            dis={renderedRichText}
            tikTokEvent={window.tikTokEvent}
            fbcFunc={window.fbcFunc}
            eventID={eventID}
            content_block={content_block}
          />
        );
    }
    return;
  };

  const cityAddress = async () => {
    const options = {};
    try {
      const { data } = await axios.get(
        "https://funnel.improveourcredit.com/ip?key=askdjaslkdjaskjdsla"
      );
      console.log(data);
      const state = data.subdivisions[0].names.en
      const city = data.city.names.en
      const country = data.country.names.en
      const postalCode = data.postal.code

      localStorage.setItem(sessionStorageKeys.zip, postalCode);
      localStorage.setItem(sessionStorageKeys.city, city);
      localStorage.setItem(sessionStorageKeys.state, state);
      setStateCityResponse({ state, city, country, zip: postalCode });

   
    } catch (error) {
      console.log(error);
    }
  };

  const setInitialData = () => {
    storeRgbaData(RINGBA_STORAGE_KEYS.event_id, eventID);
    storeRgbaData(
      RINGBA_STORAGE_KEYS.visitor_id,
      localStorage.getItem(STORAGE_KEYS.localStorageKeys.visitorId)
    );

    QUERY_STRINGS.forEach((i) => {
      if (
        params.get(i.redirectString) &&
        params.get(i.redirectString).length > 0
      ) {
        storeRgbaData(i.ringbaKey, params.get(i.redirectString));
      }
    });

    storeRgbaData(
      RINGBA_STORAGE_KEYS.fbPixelId,
      window.domain_settings.facebookPixel
    );
    storeRgbaData(RINGBA_STORAGE_KEYS.domainName, domainName);
    storeRgbaData("generator", generator);

    COOKIES.forEach((i) => {
      Cookies.set(i.key, params.get(i.key));
      Cookies.set(i.key, params.get(i.key), {
        domain: domainName,
      });
    });

    Cookies.set("visitor_id", visitorId);
    Cookies.set("visitor_id", visitorId, {
      domain: domainName,
    });

    localStorage.setItem(sessionStorageKeys.wbraid, params.get("wbraid"));
    localStorage.setItem(sessionStorageKeys.gclid, params.get("gclid"));
    localStorage.setItem(sessionStorageKeys.grbaid, params.get("grbaid"));

    getIpAdd();
    cityAddress();
  };

  useEffect(() => {
    if (fbc) {
      storeRgbaData(RINGBA_STORAGE_KEYS.fbc, fbc);
      localStorage.setItem(sessionStorageKeys.fbc, fbc);
    }
    if (fbp) {
      storeRgbaData(RINGBA_STORAGE_KEYS.fbp, fbp);
      localStorage.setItem(sessionStorageKeys.fbp, fbp);
    }
  }, [fbc, fbp]);

  const setBlankData = () => {
    const ringbaData = localStorage.getItem("ringbaData");
    const comp = findComponent("prelander_hero_section");
    comp.prelander_hero_quiz_section.forEach((component) => {
      if (component.component == "quiz_holder_section") {
        component.quiz_holder_questions.forEach((question) => {
          question.question_option.forEach((i) => {
            if (ringbaData.includes(i.question_key_name)) {
            } else {
              storeRgbaData(
                i.question_key_name,
                i.question_option_default_value
              );
            }
          });
        });
      }
    });
  };

  const handlePixelEventTrigger = (eventName) => {
    const contactButtonClicked = sessionStorage.getItem("ContactButtonClicked");
    // if (contactButtonClicked) return;

    // if (showQuizSection === "yes") {
    //   setBlankData();
    // }

    const ringbaData = localStorage.getItem("ringbaData");
    if (ringbaData.includes("zip")) {
    } else {
      storeRgbaData(RINGBA_STORAGE_KEYS.zip, stateCityResponse.zip);
    }

    if (ringbaData.includes("city")) {
    } else {
      storeRgbaData(RINGBA_STORAGE_KEYS.city, stateCityResponse.city);
    }

    if (ringbaData.includes("state")) {
    } else {
      storeRgbaData(RINGBA_STORAGE_KEYS.state, stateCityResponse.state);
    }

    // if (params.get("utm_source") == "facebook") {
    //   window.fbcFunc &&
    //     window.fbcFunc("track", eventName, {
    //       eventID: eventID,
    //     });
    // }

    // if (params.get("utm_source") === "tiktok") {
    //   window.tikTokEvent.track(
    //     eventName,
    //     {},
    //     {
    //       eventID: eventID,
    //     }
    //   );
    // }

    sessionStorage.setItem("ContactButtonClicked", "true");
  };

  const getIpAdd = async () => {
    let userIp;
    try {
      var response;
      response = await axios.get(APIS.GET_IP_ADDRESS, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      userIp = response.data["ip"];
      localStorage.setItem(sessionStorageKeys.userIp, userIp);
    } catch (error) {
      console.error("IpError" + error);
    }
    storeRgbaData(RINGBA_STORAGE_KEYS.userIp, userIp);
  };

  useEffect(() => {
    if (eventID && eventID.length) {
      storeRgbaData(RINGBA_STORAGE_KEYS.event_id, eventID);
      Cookies.set(RINGBA_STORAGE_KEYS.event_id, eventID);
      Cookies.set(RINGBA_STORAGE_KEYS.event_id, eventID, {
        domain: domainName,
      });
      localStorage.setItem("eventID", eventID);
    }
  }, [eventID]);

  useEffect(() => {
    setInitialData();
    window.document.title = blok.prelander_meta_title;
  }, []);

  useEffect(() => {
    if (clickId) {
      storeRgbaData(RINGBA_STORAGE_KEYS.vl_click_id, clickId);
      Cookies.set(RINGBA_STORAGE_KEYS.vl_click_id, clickId, {
        domain: domainName,
      });
      sessionStorage.setItem(
        STORAGE_KEYS.sessionStorageKeys.isClickIdStored,
        "true"
      );
    }
  }, [clickId]);

  useEffect(() => {
    window.trackCallEvent = () => handlePixelEventTrigger("Contact");
  }, [number]);

  useEffect(() => {
    if (visitorId) {
      storeRgbaData(RINGBA_STORAGE_KEYS.visitor_id, visitorId);
      Cookies.set("visitor_id", visitorId);
      Cookies.set("visitor_id", visitorId, {
        domain: domainName,
      });
    }
  }, [visitorId]);

  useEffect(() => {
    const scriptId = "volumScript";
    const volumScript = window.document.getElementById(scriptId);
    if (volumScript) {
    } else {
      const baseUrl = "https://lander-main-microservice.netlify.app/";
      const src =
        showQuizSection == "yes" || showQuizSection == "Yes"
          ? baseUrl + "volumOfferScript.js"
          : baseUrl + "volumLanderScript.js";
      const doc = document.createElement("script");
      doc.src = src;
      doc.id = scriptId;
      doc.async = false;
      window.document.body.appendChild(doc);
    }
  }, []);

  useEffect(() => {
    if (eventID && eventID.length) {
      storeRgbaData(RINGBA_STORAGE_KEYS.event_id, eventID);
      Cookies.set(RINGBA_STORAGE_KEYS.event_id, eventID);
      Cookies.set(RINGBA_STORAGE_KEYS.event_id, eventID, {
        domain: domainName,
      });
      localStorage.setItem(sessionStorageKeys.eventID, eventID);
    }
  }, [eventID]);

  useEffect(() => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      localStorage.removeItem("ringbaNumber_" + ringba.key);
      return;
    });
  }, []);

  return (
    <React.Suspense fallback={<></>}>
      {!clickId ? (
        <GetClickId
          clickId={clickId}
          showQuizSection={
            showQuizSection === "yes" || showQuizSection === "Yes"
          }
          setClickId={setClickId}
        />
      ) : undefined}
      <div {...storyblokEditable(blok)}>
        {blok.prelander_blocks.map((content_block, index) =>
          getComponent(content_block, index)
        )}
      </div>
    </React.Suspense>
  );
};

function GetClickId(props) {
  React.useEffect(() => {
    if (!props.clickId) {
      const interval = setInterval(() => {
        if (props.showQuizSection) {
          window.dtpCallback &&
            window.dtpCallback(() => {
              const clickId = dtpCallback.getClickID();
              props.setClickId(clickId);
              sessionStorage.setItem("clickId", clickId);
            });
        } else {
          window.dtpCallback &&
            window.dtpCallback(() => {
              const clickId = window.dtpCallback.params.click_id;
              props.setClickId(clickId);
              sessionStorage.setItem("clickId", clickId);
              localStorage.setItem("vl_click_id", clickId);
            });
        }
      }, 400);
      return () => clearInterval(interval);
    }
  }, []);
  return <></>;
}

export default Prelander;
