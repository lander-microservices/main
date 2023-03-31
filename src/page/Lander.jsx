import React, { useEffect, useState } from "react";
import { COMPONENTS, LANDERS } from "../config/imports";
import { renderRichText, storyblokEditable } from "@storyblok/react";
import { useInitRingba } from "components/useRingba";

const Menu = ({ content_block, setHeaderData, number }) => {
  useEffect(() => {
    setHeaderData(content_block);
  }, []);
  return (
    <COMPONENTS.HeaderLander
      eventID="EventId"
      number={number}
      headerTitle={content_block.lander_logo_text}
      tollFreeVisible={content_block.lander_nav_toll_free}
      content_block={content_block}
    />
  );
};

const Footer = ({ content_block, headerData }) => {
  const renderedRichText = renderRichText(
    content_block.lander_footer_disclaimer
  );
  return (
    <COMPONENTS.FooterLander
      lander_logo_text={headerData.lander_logo_text}
      lander_logo_text_color={headerData.lander_logo_text_color}
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
  const { number } = useInitRingba({ ringbaKey: {
    key: blok.lander_ringba_number_pool_key,
    number: blok.lander_ringba_static_number
  } })
  console.log("Block", blok);
  console.log("number", number);

  const findComponent = (componentName) => {
    return blok.lander_blocks.find(
      (block) => block.component === componentName
    );
  };

  const getRichText = (texts) => {
    return renderRichText(texts);
  };
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
        {blok && findComponent("lander_menu") && (
          <Menu
            setHeaderData={setHeaderData}
            number={number}
            content_block={findComponent("lander_menu")}
          />
        )}
        {/* Menu */}

        {/* Hero and Paragraph */}
        {blok &&
          findComponent("lander_paragraph") &&
          findComponent("lander_hero_section") && (
            <LANDERS.lander
              init={() => {}}
              getRichText={getRichText}
              lander_bg_color={blok.lander_bg_color}
              lander_paragraph={findComponent("lander_paragraph")}
              lander_hero_section={findComponent("lander_hero_section")}
              number={number}
              callClickCb={() => {}}
            />
          )}
        {/* Hero and Paragraph */}

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
