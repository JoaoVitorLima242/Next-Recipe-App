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

      {/* likes */}
      <button className="like-button" onClick={addLike}>
        {likes}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

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
          <PortableText
            className="instructions"
            blocks={recipe?.instructions}
          />
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

    return {
        props: { recipe}
    }
}