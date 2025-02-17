// src/app/product/[id]/page.tsx

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    headers: {
      Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_API_KEY}:${process.env.NEXT_PUBLIC_API_SECRET}`)}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching products list: ${res.statusText}`);
  }

  const products = await res.json();

  // Generate static parameters for each product
  return products.map((product: { id: string }) => ({
    params: { id: product.id }, // Use 'params' key
  }));
}

export default function ProductPage() {
  // Your component code here
}
