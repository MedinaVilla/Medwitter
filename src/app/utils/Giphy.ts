import { GiphyFetch } from '@giphy/js-fetch-api';

const gf = new GiphyFetch('M0SP3QHae3vgBSEkz0UKU0I64hfZO4TR')

export async function getCategories() {
    const { data: categories } = await gf.categories({ limit: 10 })
    return categories;
}


export async function getGifsRelatedCategory(category: string) {
    const { data: gifs } = await gf.subcategories(category, { limit: 12 });
    return gifs;
}

export async function getEmojis() {
    const { data: gifs } = await gf.emoji()
    return gifs;
}