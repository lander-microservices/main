import { renderRichText, storyblokEditable } from "@storyblok/react";
import shortCodeReplacer from "components/shortCodeReplacer";
import { useInitRingba } from "components/useRingba";
import React, { useEffect, useState } from "react";
import { COMPONENTS, LANDERS } from "../config/imports";
import axios from "axios";
import APIS from "components/apis";
import { COOKIES } from "components/landerToQuizCookie";
import { QUERY_STRINGS } from "components/queryStrings";
import { RINGBA_STORAGE_KEYS } from "components/ringbaStorageKeys";
import { STORAGE_KEYS } from "components/storageKeys";
import { useEventID } from "components/useEventId";
import { useRingba } from "components/useRingba";
import { useVisitorId } from "components/useVisitorId";
import Cookies from "js-cookie";

const Prelander = ({ blok }) => {
  console.log("Block", blok)
  const acc_id = blok.prelander_acc_id;
  const domainName = window.location.host.replace("lander.", "");
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

  const getComponent = (content_block, index) => {
    switch (content_block.component) {
      case "menu":
        if (!headerData.prelander_logo_text) {
          setHeaderData(content_block);
        }
        const Menu = LANDERS.prelander[blok.theme].header;
        return (
          <Menu
            eventID="EventId"
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
          />
        );
      case "prelander_testimonials_section":
        const prelander_testimonial_headline = renderRichText(
          content_block.prelander_testimonial_headline
        );
        const prelander_testimonial_paragraph = renderRichText(
          content_block.prelander_testimonial_paragraph
        );
        const Testimonials = LANDERS.prelander[blok.theme].testimonials
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
    console.log("AccId", acc_id);
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
    if (stateCityResponse.state === "") {
      cityAddress();
    }
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
    if (visitorId) {
      storeRgbaData(RINGBA_STORAGE_KEYS.visitorId, visitorId);
      Cookies.set("visitor_id", visitorId);
      Cookies.set("visitor_id", visitorId, {
        domain: domainName,
      });
    }
  }, [visitorId]);
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
        props.setClickId(window.clickId);
      }, 400);
      return () => clearInterval(interval);
    }
  }, []);
  return <></>;
}

export default Prelander;
