import React, { useState } from "react";
import {
  storyblokEditable,
  renderRichText,
  useStoryblokApi,
} from "@storyblok/react";
import { COMPONENTS, LANDERS } from "../config/imports";

const Prelander = ({ blok }) => {
  const [testimonials, setTestimonials] = useState([]);
  const storyblokApi = useStoryblokApi();

  const getStoryBlockTestimonials = async (content) => {
    try {
      let str = "";
      if (testimonials.length === 0) {
        content.prelander_testimonials_list.forEach((i) => (str += i + ","));
        let response = await storyblokApi.get(`cdn/stories?by_uuids=${str}`, {
          version: "draft",
        });
        setTestimonials(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getComponent = (content_block) => {
    switch (content_block.component) {
      case "menu":
        return (
          <COMPONENTS.Header1
            eventID="EventId"
            number="(800) 888-9999"
            headerTitle="QualifyBenefits.co"
            tollFreeVisible={content_block.prelander_nav_toll_free}
            content_block={content_block}
          />
        );
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
        return (
          <HeroSection
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
          <COMPONENTS.Footer1
            dis={renderedRichText}
            content_block={content_block}
          />
        );
    }
    return;
  };
  return (
    <React.Suspense fallback={<></>}>
      <div {...storyblokEditable(blok)}>
        {console.log('blok', blok)}
        {blok.prelander_blocks.map((content_block) =>
          getComponent(content_block)
        )}
      </div>
    </React.Suspense>
  );
};

export default Prelander;