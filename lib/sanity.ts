import {
    createClient,
    createPreviewSubscriptionHook,
    createImageUrlBuilder,
    createPortableTextComponent
} from "next-sanity";

type Config = {
    projectId: string,
    dataset: string,
    apiVersion: string,
    useCdn: boolean,
}

const config : Config = {
    projectId: 'c8c16o8d',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: false,
}

// Sanity has by default type any in funcs and props.

export const sanityClient = createClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const urlFor = (source: any) => createImageUrlBuilder(config).image(source);

export const PortableText = createPortableTextComponent({
    ...config, 
    serializers: {},
});