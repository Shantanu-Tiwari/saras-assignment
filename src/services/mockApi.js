const api = 'https://dummyjson.com/products/search'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export async function fetchSearchResults(query, page = 1, limit = 15) {
  await delay(1000);// added delay to let the loading state appear
  const skip = (page - 1) * limit;
  const url = `${api}?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;

  try{
    const response = await fetch(url);
    const data = await response.json();

    return data.products.map(product => ({
      id: product.id,
      title: product.title,
      category: product.category,
      snippet: product.description,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}
