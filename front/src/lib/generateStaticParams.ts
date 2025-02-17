// lib/generateStaticParams.ts (or any server-side code file)

export async function generateStaticParams() {
  // Fetch the list of products to pre-render at build time
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const products = await res.json();

  // Return an array of dynamic parameters (product IDs) for each page
  return products.map((product: { id: string }) => ({
    id: product.id,
  }));
}
