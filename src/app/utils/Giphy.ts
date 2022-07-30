import { GiphyFetch } from '@giphy/js-fetch-api';

const gf = new GiphyFetch('')

export async function getCategories() {
    const { data: categories } = await gf.categories({ limit: 10 })
    return categories;
}


export async function getGifsRelatedCategory(category: string) {
    const { data: gifs } = await gf.subcategories(category, { limit: 12 });
    return gifs;
}