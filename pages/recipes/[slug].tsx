import { GetStaticPaths, GetStaticProps } from "next";
import { Recipe } from "../index";
import { sanityClient, urlFor, usePreviewSubscription, PortableText } from "../../lib/sanity";
import { ParsedUrlQuery } from 'querystring'


const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    mainImage,
    ingredient[]{
      _key,
      unit,
      wholeNumber,
      fraction,
      ingredient->{
        name
      }
    },
    instructions,
    likes
  }`;

interface Params extends ParsedUrlQuery {
    slug: string;
};

type OneRecipe = {
    recipe: Recipe;
};


export const oneRecipe = ({recipe}: OneRecipe) => {
    return (
        <div></div>
    )
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
    
    const recipe : Recipe = await sanityClient.fetch(recipeQuery, {slug})

    return {
        props: { recipe}
    }
}