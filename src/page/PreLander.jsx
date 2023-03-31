import React, { useState, useEffect } from "react";
import { storyblokEditable, renderRichText } from "@storyblok/react";
import { COMPONENTS, LANDERS } from "../config/imports";
import { useInitRingba } from "components/useRingba";
import shortCodeReplacer from "components/shortCodeReplacer";

const Prelander = ({ blok }) => {
  const { number } = useInitRingba({ ringbaKey: {
    key: blok.prelander_ringba_number_pool_key,
    number: blok.prelander_ringba_static_number
  } })
  const [headerData, setHeaderData] = useState({});
  const [stateCityResponse, setStateCityResponse] = useState({
    state: "",
    city: "",
    zip: "",
  });

  console.log("blok", blok)

  const getComponent = (content_block, index) => {
    switch (content_block.component) {
      case "menu":
        if (!headerData.prelander_logo_text) {
          setHeaderData(content_block);
        }
        return (
          <COMPONENTS.HeaderPreLander
            eventID="EventId"
            key={index}
            number={number}
            headerTitle={content_block.prelander_logo_text}
            tollFreeVisible={content_block.prelander_nav_toll_free}
            content_block={content_block}
          />
        );
      case "prelander_hero_section":
        const HeroSection = LANDERS["prelander"];
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
        return (
          <COMPONENTS.Testimonials1
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
        return (
          <COMPONENTS.FooterPreLander
            key={index}
            prelander_logo_text={headerData.prelander_logo_text}
            prelander_logo_text_color={headerData.prelander_logo_text_color}
            dis={renderedRichText}
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
      console.log(success);
      setStateCityResponse({ state, city, country, zip: postalCode });
    };
    const onError = (error) => {
      console.log(error);
    };
    if (window.geoip2) await window.geoip2.city(onSuccess, onError, options);
  };

  useEffect(() => {
    if (stateCityResponse.state === "") {
      cityAddress();
    }
  }, []);
  return (
    <React.Suspense fallback={<></>}>
      <div {...storyblokEditable(blok)}>
        {blok.prelander_blocks.map((content_block, index) =>
          getComponent(content_block, index)
        )}
      </div>
    </React.Suspense>
  );
};

export default Prelander;
