import type {LoaderFunctionArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

import type {
    ISbStoriesParams
} from "@storyblok/react";
import {
    getStoryblokApi,
    useStoryblokState,
    StoryblokComponent,
} from "@storyblok/react";
import type {MetaFunction} from "@remix-run/cloudflare";

export const meta: MetaFunction<typeof loader> = ({data}) => {
    const story = data?.story

    const title = story.content?.seo?.title || story.name
    const description = story.content?.seo?.description
    const url = new URL(data?.url as string)
    const fullUrl = `${url.origin}/${story.full_slug}`

    const brandName = "Your Brand"

    return [
        {title: `${title} · ${brandName}`},
        description && {name: "description", content: description, lang: story.lang === 'default' ? 'de' : story.lang},
        {name: "created", content: story?.published_at},
        {name: "robots", content: "index, follow"},
        {property: "og:type", content: "website"},
        {name: "twitter:title", property: "og:title", content: title},
        {name: "twitter:url", property: "og:url", content: fullUrl},
        {name: "twitter:card", content: "summary"},
        {name: "twitter:domain", property: "og:site_name", content: brandName},
        description && {name: "twitter:description", property: "og:description", content: description},
    ];
};

export const loader = async ({params, request}: LoaderFunctionArgs) => {
    let slug = params["*"] ?? "home";
    const preview = process.env.NODE_ENV !== "production" || params.preview === "true";

    let sbParams: ISbStoriesParams = {
        version: "draft"
    };

    if (preview) {
        sbParams.version = "draft"
        sbParams.cv = Date.now()
    }

    let {data} = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams);
    return json({
        story: data?.story,
        preview,
        url: request.url
    });
};

export default function Page() {
    let data = useLoaderData<typeof loader>();
    const story = useStoryblokState(data.story);

    return (
        <>
            <StoryblokComponent blok={story?.content}/>
        </>
    )
}