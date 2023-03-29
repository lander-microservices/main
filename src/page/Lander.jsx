import React, { useEffect, useState } from "react";
import { COMPONENTS, LANDERS } from "../config/imports";
import { renderRichText, storyblokEditable } from "@storyblok/react";

const Menu = ({ content_block, setHeaderData }) => {
  useEffect(() => {
    setHeaderData(content_block);
  }, []);
  return (
    <COMPONENTS.Header1
      eventID="EventId"
      number="(800) 888-9999"
      headerTitle={content_block.prelander_logo_text}
      tollFreeVisible={content_block.prelander_nav_toll_free}
      content_block={content_block}
    />
  );
};

const Footer = ({ content_block, headerData }) => {
  const renderedRichText = renderRichText(
    content_block.prelander_footer_disclaimer
  );
  return (
    <COMPONENTS.Footer1
      prelander_logo_text={headerData.prelander_logo_text}
      prelander_logo_text_color={headerData.prelander_logo_text_color}
      dis={renderedRichText}
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
  const [headerData, setHeaderData] = useState({});

  const getComponent = (content_block, index) => {
    switch (content_block.component) {
      case "menu":
        if (!headerData.prelander_logo_text) {
          setHeaderData(content_block);
        }
        return <></>;
      case "prelander_hero_section":
        const HeroSection = LANDERS["prelander-1"];
        const prelander_hero_title = renderRichText(
          content_block.prelander_hero_title
        );
        const prelander_hero_subtitle = renderRichText(
          content_block.prelander_hero_subtitle
        );
        const prelander_hero_paragraph = renderRichText(
          content_block.prelander_hero_paragraph
        );
        return <></>;
      // return (
      //   <HeroSection
      //     key={index}
      //     prelander_hero_paragraph={prelander_hero_paragraph}
      //     prelander_hero_subtitle={prelander_hero_subtitle}
      //     prelander_hero_title={prelander_hero_title}
      //     content_block={content_block}
      //   />
      // );
      case "prelander_testimonials_section":
        const prelander_testimonial_headline = renderRichText(
          content_block.prelander_testimonial_headline
        );
        const prelander_testimonial_paragraph = renderRichText(
          content_block.prelander_testimonial_paragraph
        );
        return <></>;
      // return (
      //   <COMPONENTS.Testimonials1
      //     key={index}
      //     prelander_testimonial_paragraph={prelander_testimonial_paragraph}
      //     prelander_testimonial_headline={prelander_testimonial_headline}
      //     content_block={content_block}
      //   />
      // );
      case "prelander_footer_section":
        if (content_block.prelander_footer_menu) {
          return <></>;
        } else return <></>;
    }
    return;
  };

  const findComponent = (componentName) => {
    return blok.lander_blocks.find(
      (block) => block.component === componentName
    );
  };

  console.log("block", blok);
  return (
    <React.Suspense fallback={<></>}>
      <div {...storyblokEditable(blok)}>
        {/* Advertorial */}
        {blok && findComponent("lander_advertorial_section") && (
          <Advertorial
            content_block={findComponent("lander_advertorial_section")}
          />
        )}
        {/* Advertorial */}

        {/* Menu */}
        {blok && findComponent("menu") && (
          <Menu
            setHeaderData={setHeaderData}
            content_block={findComponent("menu")}
          />
        )}
        {/* Menu */}

        {/* Hero */}

        {/* Hero */}

        {/* Paragraph */}

        {/* Paragraph */}

        {/* Footer */}
        {blok && findComponent("lander_footer_section") && (
          <Footer
            headerData={headerData}
            content_block={findComponent("lander_footer_section")}
          />
        )}
        {/* Footer */}
      </div>
    </React.Suspense>
  );
}
