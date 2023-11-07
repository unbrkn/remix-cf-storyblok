import type {LinksFunction} from "@remix-run/cloudflare";
import {cssBundleHref} from "@remix-run/css-bundle";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "~/components/nestables/feature";
import Grid from "~/components/nestables/grid";
import Teaser from "~/components/nestables/teaser";
import Page from "~/components/content_types/page";

import  "./styles/tailwind.css";

storyblokInit({
    accessToken: "sOonjAFQvQ92oF3B3yFFTAtt",
    use: [apiPlugin],
    components: {
        feature: Feature,
        grid: Grid,
        teaser: Teaser,
        page: Page,
    }
});

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{rel: "stylesheet", href: cssBundleHref}] : []),
];

export default function App() {
    return (
        <html lang="de">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
