import { renderRichText, storyblokEditable } from "@storyblok/react";
import { replaceShortCodes as shortCodeReplacer } from "wecall-config-lib";
import { useInitRingba } from "wecall-config-lib";
import React, { useEffect, useState } from "react";
import { LANDERS } from "../../config/imports";
import axios from "axios";
import { APIS } from "wecall-config-lib";
import { COOKIES } from "wecall-config-lib";
import { QUERY_STRINGS } from "wecall-config-lib";
import { RINGBA_STORAGE_KEYS } from "wecall-config-lib";
import { STORAGE_KEYS } from "wecall-config-lib";
import { useEventID } from "wecall-config-lib";
import { useRingba } from "wecall-config-lib";
import { useVisitorId } from "wecall-config-lib";
import Cookies from "js-cookie";
import PropagateLoader from "react-spinners/PropagateLoader"

const Prelander = ({ blok }) => {
  const acc_id = blok.prelander_acc_id;
  const domainName = window.location.host.replace("prelander.", "");
  const generator = blok.prelander_generator;
  const utm_source = blok.prelander_utm_source;

  const [clickId, setClickId] = useState();
  const fbc = Cookies.get("_fbc" || "");
  const fbp = Cookies.get("_fbp" || "");
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  const { storeRgbaData, removeRingba } = useRingba();

  const { visitorId } = useVisitorId();
  const eventID = useEventID();

  const testRingba = {
    key: "JS8d271f1ea8034bda8e8c7f24e346e5cb",
    user: "pranavtest",
    number: "1-866-578-2331",
  };
  // const { number } = useInitRingba({
  //   ringbaKey: {
  //     key: testRingba.key,
  //     number: testRingba.number,
  //   },
  // });

  const { number } = useInitRingba({
    ringbaKey: {
      key: blok.prelander_ringba_number_pool_key,
      number: blok.prelander_ringba_static_number,
    },
  });
  const [headerData, setHeaderData] = useState({});
  const [stateCityResponse, setStateCityResponse] = useState({
    state: "",
    city: "",
    zip: "",
  });

  const getRichText = (texts) => {
    return renderRichText(texts);
  };

  const getComponent = (content_block, index) => {
    switch (content_block.component) {
      case "menu":
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

      storeRgbaData(RINGBA_STORAGE_KEYS.city, city);
      storeRgbaData(RINGBA_STORAGE_KEYS.state, state);
      storeRgbaData(RINGBA_STORAGE_KEYS.zip, success.postal.code);
      const postalCode = success.postal.code;
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

    getIpAdd();
    cityAddress();
  };

  useEffect(() => {
    if (fbc) {
      storeRgbaData(RINGBA_STORAGE_KEYS.fbc, fbc);
    }
    if (fbp) {
      storeRgbaData(RINGBA_STORAGE_KEYS.fbp, fbp);
    }
  }, [fbc, fbp]);

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
      const src = baseUrl + "volumLanderScript.js";
      const doc = document.createElement("script");
      doc.src = src;
      doc.id = scriptId;
      doc.async = false;
      window.document.body.appendChild(doc);
    }
  }, []);

  return (
    <React.Suspense fallback={<></>}>
      {!clickId ? (
        <GetClickId clickId={clickId} setClickId={setClickId} />
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
        window.dtpCallback(() => {
          const clickId = window.dtpCallback.params.click_id;
          props.setClickId(clickId);
          sessionStorage.setItem("clickId", clickId);
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, []);
  return <></>;
}

export default Prelander;
