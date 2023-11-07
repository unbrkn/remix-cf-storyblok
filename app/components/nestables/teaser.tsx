import { storyblokEditable } from "@storyblok/react";
import type {TeaserStoryblok} from "../../../types/component-types-sb";

const Teaser = ({ blok }: TeaserStoryblok) => {
    return (
        <div {...storyblokEditable(blok)} key={blok._uid} className="py-32 text-6xl text-[#50b0ae] font-bold text-center">
            {blok.headline}
        </div>
    );
};

export default Teaser;