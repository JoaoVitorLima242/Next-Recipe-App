import { GetStaticPaths, GetStaticProps } from "next";
import { Recipe } from "../index";
import { sanityClient, urlFor, usePreviewSubscription, PortableText } from "../../lib/sanity";
import { ParsedUrlQuery } from 'querystring'


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

interface Params extends ParsedUrlQuery {
    slug: string
}


export default function oneRecipe() {
    return 
};

export const getStaticPaths: GetStaticPaths = async () => {

    const paths = await sanityClient.fetch(
        `*[_type == 'recipe' && defined(slug.current)]{
            'params': {
                'slug': slug.current
            }
        }`
    ) 
    
    return {
        paths,
        fallback: true,
    }
}
  

export const getStaticProps: GetStaticProps = async ({params}) => {

    const { slug } = params as Params;
    
    const recipe : Recipe = await sanityClient.fetch(recipesQuery, {slug})

    return {
        props: { data: {recipe}}
    }
}