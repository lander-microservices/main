import React, { useEffect, useState } from "react";
import { COMPONENTS, LANDERS } from "../config/imports";
import { renderRichText, storyblokEditable } from "@storyblok/react";
import { useInitRingba, useRingba } from "components/useRingba";
import { useVisitorId } from "components/useVisitorId";
import { useEventID } from "components/useEventId";
import { RINGBA_STORAGE_KEYS } from "components/ringbaStorageKeys";
import { QUERY_STRINGS } from "components/queryStrings";
import { STORAGE_KEYS } from "components/storageKeys";
import { COOKIES } from "components/landerToQuizCookie";
import Cookies from "js-cookie";
import axios from "axios";
import APIS from "components/apis";
import PropagateLoader from "react-spinners/PropagateLoader";

const Menu = ({
  content_block,
  handlePixelEventTrigger,
  setHeaderData,
  number,
  lander_name
}) => {
  useEffect(() => {
    setHeaderData(content_block);
  }, []);
  const Header = LANDERS.lander[lander_name].header
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

const Footer = ({ lander_name, content_block, headerData, handlePixelEventTrigger }) => {
  const renderedRichText = renderRichText(
    content_block.lander_footer_disclaimer
  );
  const Footer = LANDERS.lander[lander_name].footer
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

const Advertorial = ({ content_block }) => {
  if (content_block.lander_hero_section_advertorial_display === "yes")
    return <COMPONENTS.Advertorial content_block={content_block} />;
  else return <></>;
};

export default function Lander({ blok }) {
  const lander_show_cta_section = blok.lander_show_cta_section
  const lander_show_quiz_section =  blok.lander_show_quiz_section
  const lander_name = blok.lander_name;
  const acc_id = blok.lander_acc_id;
  const domainName = window.location.host.replace("lander.", "");
  const generator = blok.lander_generator;
  const utm_source = blok.lander_utm_source;

  const [headerData, setHeaderData] = useState({});

  const [clickId, setClickId] = useState();
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

  const { visitorId } = useVisitorId();
  const eventID = useEventID();
  const findComponent = (componentName) => {
    return blok.lander_blocks.find(
      (block) => block.component === componentName
    );
  };

  const getRichText = (texts) => {
    return renderRichText(texts);
  };

  const setInitialData = () => {
    QUERY_STRINGS.forEach((i) => {
      storeRgbaData(i.ringbaKey, params.get(i.redirectString));
    });

    storeRgbaData(RINGBA_STORAGE_KEYS.fbc, fbc);
    storeRgbaData(RINGBA_STORAGE_KEYS.fbp, fbp);
    storeRgbaData(
      RINGBA_STORAGE_KEYS.fbPixelId,
      window.domain_settings.fbPixelId
    );
    storeRgbaData(RINGBA_STORAGE_KEYS.domainName, domainName);
    storeRgbaData("generator", generator);
    storeRgbaData(RINGBA_STORAGE_KEYS.acc_id, acc_id);

    COOKIES.forEach((i) => {
      Cookies.set(i.key, params.get(i.key));
      Cookies.set(i.key, params.get(i.key), {
        domain: domainName,
      });
    });

    Cookies.set("acc_id", acc_id);
    Cookies.set("acc_id", acc_id, {
      domain: domainName,
    });

    Cookies.set("visitor_id", visitorId);
    Cookies.set("visitor_id", visitorId, {
      domain: domainName,
    });

    getIpAdd();
    cityAddress();
  };

  const cityAddress = async () => {
    const options = {};
    const onSuccess = (success) => {
      const city = success.city
        ? success.city.names
          ? success.city.names.en
          : ""
        : "";
      const state = success.subdivisions
        ? success.subdivisions[0]
          ? success.subdivisions[0].iso_code
          : ""
        : "";
      storeRgbaData(RINGBA_STORAGE_KEYS.city, city);
      storeRgbaData(RINGBA_STORAGE_KEYS.state, state);
      storeRgbaData(RINGBA_STORAGE_KEYS.zip, success.postal.code);
    };
    const onError = (error) => {};
    if (window.geoip2) await window.geoip2.city(onSuccess, onError, options);
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
    } catch (error) {
      console.error("IpError" + error);
    }
    storeRgbaData(RINGBA_STORAGE_KEYS.userIp, userIp);
  };

  const handlePixelEventTrigger = (eventName) => {
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
  };

  const addPixelEventListenerToAllButtons = () => {
    const callNowButtons = window.document.querySelectorAll(".callnow");
    const listenerFunc = () => handlePixelEventTrigger("Contact");
    callNowButtons.forEach((i) => {
      i.removeEventListener("click", listenerFunc);
      i.addEventListener("click", listenerFunc);
    });
  };

  useEffect(() => {
    setInitialData();
    window.document.title = blok.lander_meta_title;
  },[]);

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
    addPixelEventListenerToAllButtons();
  }, [number]);

  useEffect(() => {
    if(visitorId){
      storeRgbaData(RINGBA_STORAGE_KEYS.visitorId, visitorId);
      Cookies.set("visitor_id", visitorId);
      Cookies.set("visitor_id", visitorId, {
        domain: domainName,
      });
    }
  },[visitorId])

  useEffect(() => {
    if(eventID && eventID.length){
      storeRgbaData(RINGBA_STORAGE_KEYS.event_id, eventID);
      Cookies.set(RINGBA_STORAGE_KEYS.event_id, eventID);
      Cookies.set(RINGBA_STORAGE_KEYS.event_id, eventID, {
        domain: domainName,
      });
    }
  },[eventID])

  const Lander = LANDERS.lander[lander_name].lander
  return (
    <React.Suspense fallback={<></>}>
      {!clickId ? (
        <GetClickId clickId={clickId} setClickId={setClickId} />
      ) : undefined}

      <div {...storyblokEditable(blok)}>
        {/* Advertorial */}
        {blok && findComponent("lander_advertorial_section") && (
          <Advertorial
            content_block={findComponent("lander_advertorial_section")}
          />
        )}
        {/* Advertorial */}

        {/* Menu */}
        {blok && findComponent("lander_menu") && (
          <Menu
            setHeaderData={setHeaderData}
            number={number}
            lander_name={lander_name}
            handlePixelEventTrigger={handlePixelEventTrigger}
            content_block={findComponent("lander_menu")}
          />
        )}
        {/* Menu */}

        {/* Hero and Paragraph */}
        {blok &&
          findComponent("lander_paragraph") &&
          findComponent("lander_hero_section") && (
            <Lander
              init={() => {}}
              getRichText={getRichText}
              lander_bg_color={blok.lander_bg_color}
              lander_paragraph={findComponent("lander_paragraph")}
              lander_hero_section={findComponent("lander_hero_section")}
              number={number}
              lander_show_cta_section={lander_show_cta_section}
              lander_show_quiz_section={lander_show_quiz_section}
              handlePixelEventTrigger={handlePixelEventTrigger}
              PropagateLoader={PropagateLoader}
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
            lander_name={lander_name}
            handlePixelEventTrigger={handlePixelEventTrigger}
            content_block={findComponent("lander_footer_section")}
          />
        )}
        {/* Footer */}
      </div>
    </React.Suspense>
  );
}

function GetClickId(props) {
  React.useEffect(() => {
    if (!props.clickId) {
      const interval = setInterval(() => {
        props.setClickId(window.clickId);
      }, 400);
      return () => clearInterval(interval);
    }
  }, []);
  return <></>;
}
