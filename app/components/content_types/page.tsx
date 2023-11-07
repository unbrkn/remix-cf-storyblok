import {storyblokEditable, StoryblokComponent} from "@storyblok/react";
import type {FeatureStoryblok, GridStoryblok, PageStoryblok, TeaserStoryblok} from "../../../types/component-types-sb";

const Page = ({blok}: PageStoryblok) => (
    <main {...storyblokEditable(blok)} key={blok._uid} className="px-4">
        {blok.body.map((nestedBlok: FeatureStoryblok | TeaserStoryblok | GridStoryblok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid}/>
        ))}
    </main>
);

export default Page;