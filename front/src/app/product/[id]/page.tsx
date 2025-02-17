// src/app/product/[id]/page.tsx

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;

const fetchProductData = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`,
      },
    });

    if (!res.ok) throw new Error(`Error fetching product: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/products`, {
    headers: {
      Authorization: `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching products list: ${res.statusText}`);
  }

  const products = await res.json();

  // Generamos los parámetros estáticos para cada producto
  return products.map((product: { id: string }) => ({
    params: { id: product.id }, // Usamos 'params' como clave
  }));
}

export default function ProductPage() {
  // Tu código del componente aquí
}

