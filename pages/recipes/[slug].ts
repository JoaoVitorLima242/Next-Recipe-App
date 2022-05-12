import { GetStaticPaths, GetStaticProps } from "next";
import { sanityClient, urlFor, usePreviewSubscription, PortableText } from "../../lib/sanity";

const recipesQuery: string = `*[_type == "recipe" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    mainImage{
        assets->{
            _id,
            url
        }
    },
    ingredient[]{
        unit,
        wholeNumber,
        fraction,
        ingredient->{
            name
        }
    },
    instruction
}`;

export default function oneRecipe() {

};

export const getStaticPaths: GetStaticPaths = async () => {
    
    return {
        paths:[],
        fallback: false,
    }
}
  

export const getStaticProps: GetStaticProps = () => {

    return {
        props: {}
    }
}