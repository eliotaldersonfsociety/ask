import { fetchProductData } from './ProductPageClient';
import ProductPageClient from './ProductPageClient';

export async function generateStaticParams() {
  const productIds = ['1', '2', '3']; // Obtén estos de tu API o fuente de datos
  return productIds.map(id => ({
    id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productData = await fetchProductData(params.id);

  if (!productData) {
    return <div>Product not found.</div>;
  }

  return <ProductPageClient product={productData} />;
}
