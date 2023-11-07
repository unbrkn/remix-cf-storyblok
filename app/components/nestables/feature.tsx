import {storyblokEditable} from "@storyblok/react";
import type {FeatureStoryblok} from "../../../types/component-types-sb";

const Feature = ({blok}: FeatureStoryblok) => {
    return (
        <div {...storyblokEditable(blok)} key={blok._uid}
             className="w-full p-12 bg-[#f7f6fd] rounded-[5px] text-center">
            <h3 className="text-2xl text-[#1d243d] font-bold"> {blok.name} </h3>
        </div>
    );
};

export default Feature;