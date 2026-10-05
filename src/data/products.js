export async function getProducts() {
   const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products.map(normalizeProduct);
}

export async function getProductById(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return normalizeProduct(data);
}

function normalizeProduct(p) {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    image: p.thumbnail,
    description: p.description,
    category: p.category,
  };
}