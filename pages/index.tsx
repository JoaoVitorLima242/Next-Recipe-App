import type { GetStaticProps } from 'next'
import Link from 'next/link';
import Head from "next/head"
import {sanityClient, urlFor} from "../lib/sanity";

export type Recipe = {
  _id: string,
  mainImage: {
    _type: string,
    asset: {_rel: string, _type: string}
  },
    name: string,
    slug: { _type: string, current: string },
    ingredient: Ingredient[],
    instruction,
    likes

}

export type Ingredient = {
  _key: string,
  unit: string,
  wholeNumber: number,
  fraction: string,
  ingredient: {name: string},
}

type Props = {
  recipes: Recipe[]
}

const recipesQuery: string = `*[_type == "recipe"]{
  _id,
  name,
  slug,
  mainImage
}`;

const Home = ({ recipes }: Props) => {


  return (
    <div>
      <Head>
        <title>Kap's Kitchen 🍍</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to Kaps's Kitchen</h1>

      <ul className="recipes-list">
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <li key={recipe._id} className="recipe-card">
              <Link href={`/recipes/${recipe.slug.current}`}>
                <a>
                  <img src={urlFor(recipe.mainImage).url()} /><br/>
                  <span>{recipe.name}</span>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}


export const getStaticProps : GetStaticProps = async () => {
  const recipes : Recipe = await sanityClient.fetch(recipesQuery);

  return {
    props: {recipes},
  }
}

export default Home;