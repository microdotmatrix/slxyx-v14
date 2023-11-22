import { notFound } from 'next/navigation';
import { storefront, shopify } from '@/lib/shopify';
import { getProductQuery } from '@/lib/shopify/graphql/queries';
import ProductOptions from '@/components/products/options';

const getProduct = async ({ handle, selectedOptions }) => {
  const res = await storefront.query({
    query: getProductQuery,
    variables: {
      handle,
    }
  });
  return {
    product: shopify.product(res.body.data.product),
    selectedVariant: shopify.product(res.body.data.product.selectedVariant || res.body.data.product.variants[0]),
  };
};

export default async function ProductPage({ params, searchParams }) {
  const selectedOptions = [];
  const linkParams = new URLSearchParams(searchParams);

  // set selected options from the query string
  linkParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });
  
  const { product, selectedVariant } = await getProduct({
    handle: params.handle,
    selectedOptions: selectedOptions
  });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <pre>{JSON.stringify(selectedVariant, null, 2)}</pre>
      <ProductOptions product={product} />
    </>
  )
}