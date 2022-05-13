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


export default function oneRecipe ({recipe}: OneRecipe) {
    return (
        <article className="recipe">
        <h1>{recipe.name}</h1>
        {/* the content for the recipe */}
        <main className="content">
            <img src={urlFor(recipe?.mainImage).url()} />

            <div className="breakdown">
            <ul className="ingredients">
                {recipe.ingredient?.map((ingredient) => (
                <li key={ingredient._key} className="ingredient">
                    {ingredient?.wholeNumber}
                    {ingredient?.fraction} {ingredient?.unit}
                    <br />
                    {ingredient?.ingredient?.name}
                </li>
                ))}
            </ul>

            <PortableText blocks={recipe?.instructions}/>
            </div>
        </main>
        </article>
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

    console.log(recipe.instructions)

    return {
        props: { recipe}
    }
}