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
  
  // Generamos los parámetros estáticos para cada producto
  return products.map((product: { id: string }) => ({
    id: product.id, // El ID del producto
  }));
}
