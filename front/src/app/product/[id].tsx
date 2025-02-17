import { GetStaticPaths, GetStaticProps } from 'next';
import ProductPage from '../../components/ProductPage'; // Importa tu componente de página

// Generar las rutas estáticas para todos los productos
export const generateStaticParams = async () => {
  // Obtener la lista de productos desde la API
  const response = await fetch('https://texasstore-108ac1a.ingress-haven.ewp.live/wp-json/wc/v3/products', {
    headers: {
      Authorization: `Basic ${Buffer.from('ck_10f8bd17af5190cd0c2f0f17aaa8098a1cdf1f46:cs_1a7d245efb14ac7d786712aeb568f2a11adddb73').toString('base64')}`,
    },
  });

  const products = await response.json();

  // Generar una lista de rutas estáticas de productos con sus ids
  return products.map((product: { id: string }) => ({
    id: product.id.toString(),
  }));
};

// Obtener los datos específicos de cada producto para la página
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  // Fetch los datos del producto desde la API
  const productData = await fetchProductData(id as string);

  // Si no se encuentra el producto, devolver una página 404
  if (!productData) {
    return { notFound: true };
  }

  return {
    props: {
      productData,
    },
  };
};

// Componente de la página que recibe los datos del producto
export default function Product({ productData }) {
  return <ProductPage product={productData} />;
}

// Función para obtener los datos del producto de la API
async function fetchProductData(id: string) {
  const res = await fetch(`https://texasstore-108ac1a.ingress-haven.ewp.live/wp-json/wc/v3/products/${id}`, {
    headers: {
      Authorization: `Basic ${Buffer.from('ck_10f8bd17af5190cd0c2f0f17aaa8098a1cdf1f46:cs_1a7d245efb14ac7d786712aeb568f2a11adddb73').toString('base64')}`,
    },
  });

  if (!res.ok) {
    console.error("Error fetching product:", res.statusText);
    return null;
  }

  return await res.json();
}
