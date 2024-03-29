import React, { useEffect, useState } from "react";
import { LANDERS } from "../../config/imports";
import { renderRichText, storyblokEditable } from "@storyblok/react";
import {
  sessionStorageKeys,
  useInitRingba,
  useRingba,
} from "wecall-config-lib";
import { useVisitorId } from "wecall-config-lib";
import { useEventID } from "wecall-config-lib";
import { RINGBA_STORAGE_KEYS } from "wecall-config-lib";
import { QUERY_STRINGS } from "wecall-config-lib";
import { STORAGE_KEYS } from "wecall-config-lib";
import { COOKIES } from "wecall-config-lib";
import Cookies from "js-cookie";
import axios from "axios";
import { APIS } from "wecall-config-lib";
import PropagateLoader from "react-spinners/PropagateLoader";
import { replaceShortCodes as shortCodeReplacer } from "wecall-config-lib";
import PuffLoader from "react-spinners/PuffLoader";

const Menu = ({
  content_block,
  handlePixelEventTrigger,
  setHeaderData,
  number,
  theme,
}) => {
  useEffect(() => {
    setHeaderData(content_block);
  }, []);
  const Header = LANDERS.lander[theme].header;
  return (
    <Header
      number={number}
      handlePixelEventTrigger={handlePixelEventTrigger}
      headerTitle={content_block.lander_logo_text}
      tollFreeVisible={content_block.lander_nav_toll_free}
      content_block={content_block}
    />
  );
};

const Footer = ({
  theme,
  content_block,
  headerData,
  handlePixelEventTrigger,
}) => {
  const renderedRichText = renderRichText(
    content_block.lander_footer_disclaimer
  );
  const Footer = LANDERS.lander[theme].footer;
  return (
    <Footer
      lander_logo_text={headerData.lander_logo_text}
      lander_logo_text_color={headerData.lander_logo_text_color}
      dis={renderedRichText}
      handlePixelEventTrigger={handlePixelEventTrigger}
      content_block={content_block}
    />
  );
};

const Advertorial = ({ content_block, theme }) => {
  const AdvertorialComponent = LANDERS.lander[theme].advertorial;

  if (content_block.lander_hero_section_advertorial_display === "yes")
    return <AdvertorialComponent content_block={content_block} />;
  else return <></>;
};

export default function Lander({ blok }) {
  const lander_show_cta_section = blok.lander_show_cta_section;
  const lander_show_quiz_section = blok.lander_show_quiz_section;
  const theme = blok.theme;
  const acc_id = blok.lander_acc_id;
  const domainName = window.location.host.replace("prelander.", "");
  const generator = blok.lander_generator;
  const utm_source = blok.lander_utm_source;

  const [headerData, setHeaderData] = useState({});

  const [clickId, setClickId] = useState();
  const [stateCityResponse, setStateCityResponse] = useState({
    state: "",
    city: "",
    zip: "",
  });

  const testRingba = {
    key: "JS8d271f1ea8034bda8e8c7f24e346e5cb",
    user: "pranavtest",
    number: "1-866-578-2331",
  };

  let ringba = {};

  ringba = {
    key: blok.lander_ringba_number_pool_key,
    number: blok.lander_ringba_static_number,
  };

  // console.log("RINGBA", ringba);

  // const { number } = useInitRingba({
  //   ringbaKey: {
  //     key: testRingba.key,
  //     number: testRingba.number,
  //   },
  // });
  const { number } = useInitRingba({
    ringbaKey: {
      key: blok.lander_ringba_number_pool_key,
      number: blok.lander_ringba_static_number,
    },
  });

  const fbc = Cookies.get("_fbc" || "");
  const fbp = Cookies.get("_fbp" || "");

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  const { storeRgbaData, removeRingba } = useRingba();

  const visitorId = useVisitorId();
  const eventID = useEventID();
  const findComponent = (componentName) => {
    return blok.lander_blocks.find(
      (block) => block.component === componentName
    );
  };

  const getRichText = (texts) => {
    let renderedTexts = renderRichText(texts);
    renderedTexts = renderedTexts.replaceAll(
      '<span style="background-color:',
      '<span style="color:'
    );
    return renderedTexts;
  };

  const cityAddress = async () => {
    const options = {};
    const onSuccess = (success) => {
      const country = success.country
        ? success.country.names
          ? success.country.names.en
          : ""
        : "";
      const city = success.city
        ? success.city.names
          ? success.city.names.en
          : ""
        : "";
      const state = success.subdivisions
        ? success.subdivisions[0]
          ? success.subdivisions[0].names.en
          : ""
        : "";

      const postalCode = success.postal.code;
      localStorage.setItem(sessionStorageKeys.zip, postalCode);
      localStorage.setItem(sessionStorageKeys.city, city);
      localStorage.setItem(sessionStorageKeys.state, state);
      setStateCityResponse({ state, city, country, zip: postalCode });
    };
    const onError = (error) => {};
    if (window.geoip2) await window.geoip2.city(onSuccess, onError, options);
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
    const comp = findComponent("lander_paragraph");
    comp.lander_paragraph_holder.forEach((component) => {
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
    // console.log("contactButtonClicked");
    const contactButtonClicked = sessionStorage.getItem("ContactButtonClicked");
    console.log("contactButtonClicked", contactButtonClicked);
    if (contactButtonClicked) return;
    console.log("contactButtonClicked2", contactButtonClicked);

    if (showQuizSection === "yes") {
      setBlankData();
    }

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

    if (params.get("utm_source") == "facebook") {
      window.fbcFunc &&
        window.fbcFunc("track", eventName, {
          eventID: eventID,
        });
    }

    if (params.get("utm_source") === "tiktok") {
      window.tikTokEvent.track(
        eventName,
        {},
        {
          eventID: eventID,
        }
      );
    }

    sessionStorage.setItem("ContactButtonClicked", "true");
  };

  const addPixelEventListenerToAllButtons = () => {
    const contactButtonClicked = sessionStorage.getItem("ContactButtonClicked");

    if (contactButtonClicked) return;

    const callNowButtons = window.document.querySelectorAll(".callnow");
    const listenerFunc = () => handlePixelEventTrigger("Contact");
    callNowButtons.forEach((i) => {
      i.removeEventListener("click", listenerFunc);
      i.addEventListener("click", listenerFunc);
    });

    sessionStorage.setItem("ContactButtonClicked", "true");
  };

  useEffect(() => {
    setInitialData();
    window.document.title = blok.lander_meta_title;
  }, []);

  useEffect(() => {
    if (clickId && clickId.length > 0) {
      storeRgbaData(RINGBA_STORAGE_KEYS.vl_click_id, clickId);
      Cookies.set(RINGBA_STORAGE_KEYS.vl_click_id, clickId);
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
    if (eventID && eventID.length) {
      storeRgbaData(RINGBA_STORAGE_KEYS.event_id, eventID);
      Cookies.set(RINGBA_STORAGE_KEYS.event_id, eventID);
      Cookies.set(RINGBA_STORAGE_KEYS.event_id, eventID, {
        domain: domainName,
      });
      localStorage.setItem(sessionStorageKeys.eventID, eventID);
    }
  }, [eventID]);

  const showQuizSection =
    lander_show_quiz_section &&
    lander_show_quiz_section.toLowerCase() === "yes";

  useEffect(() => {
    const scriptId = "volumScript";
    const volumScript = window.document.getElementById(scriptId);
    if (volumScript) {
    } else {
      const baseUrl = "https://lander-main-microservice.netlify.app/";
      const src = showQuizSection
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
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      localStorage.removeItem("ringbaNumber_" + ringba.key);
      return;
    });
  }, []);

  const Lander = LANDERS.lander[theme].lander;
  const FloatingCard = LANDERS.lander[theme].floatingCard;
  return (
    <React.Suspense
      fallback={
        <>
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
        </>
      }
    >
      {!clickId ? (
        <GetClickId
          clickId={clickId}
          showQuizSection={showQuizSection}
          setClickId={setClickId}
        />
      ) : undefined}

      <div {...storyblokEditable(blok)}>
        <div className="fixed-nav">
          {/* Advertorial */}

          {blok && findComponent("lander_advertorial_section") && (
            <Advertorial
              theme={theme}
              content_block={findComponent("lander_advertorial_section")}
            />
          )}
          {/* Advertorial */}

          {/* Menu */}
          {blok && findComponent("lander_menu") && (
            <Menu
              setHeaderData={setHeaderData}
              number={number}
              theme={theme}
              handlePixelEventTrigger={handlePixelEventTrigger}
              content_block={findComponent("lander_menu")}
            />
          )}
          {/* Menu */}
        </div>

        {/* Hero and Paragraph */}
        {blok &&
          findComponent("lander_paragraph") &&
          findComponent("lander_hero_section") && (
            <Lander
              shortCodeReplacer={shortCodeReplacer}
              init={() => {}}
              getRichText={getRichText}
              lander_bg_color={blok.lander_bg_color}
              lander_paragraph={findComponent("lander_paragraph")}
              lander_hero_section={findComponent("lander_hero_section")}
              number={number}
              RINGBA_STORAGE_KEYS={RINGBA_STORAGE_KEYS}
              lander_show_cta_section={lander_show_cta_section}
              lander_show_quiz_section={lander_show_quiz_section}
              handlePixelEventTrigger={handlePixelEventTrigger}
              PropagateLoader={PropagateLoader}
              storeRgbaData={storeRgbaData}
              stateCityResponse={stateCityResponse}
              callClickCb={() => handlePixelEventTrigger("Contact")}
            />
          )}
        {/* Hero and Paragraph */}

        {/* Footer */}
        {blok && findComponent("lander_footer_section") && (
          <Footer
            headerData={headerData}
            tikTokEvent={window.tikTokEvent}
            fbcFunc={window.fbcFunc}
            eventID={eventID}
            theme={theme}
            handlePixelEventTrigger={handlePixelEventTrigger}
            content_block={findComponent("lander_footer_section")}
          />
        )}
        {/* Footer */}
        {blok.lander_floating_card === "yes" ? (
          <React.Suspense
            fallback={
              <div
                style={{
                  width: "100%",
                  height: "100%",
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
            }
          >
            <FloatingCard />
          </React.Suspense>
        ) : undefined}
      </div>
    </React.Suspense>
  );
}

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
              localStorage.setItem("vl_click_id", clickId);
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
