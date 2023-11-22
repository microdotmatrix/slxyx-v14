import { storefront, shopify } from '@/lib/shopify'
import { getAllProductsQuery } from '@/lib/shopify/graphql/queries'
import Image from 'next/image'
import Link from 'next/link'

const getProducts = async () => {
  const res = await storefront.query({
    query: getAllProductsQuery,
    variables: {
      first: 10,
      sortKey: 'CREATED_AT',
      reverse: true
    }
  });
  
  return {
    products: shopify.products(res.body.data.products)
  };
}

export default async function Home() {
  const { products } = await getProducts()
  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="flex flex-row gap-2">
          <figure className="flex-1 max-w-2xl">
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText}
              width={product.images[0].width}
              height={product.images[0].height}
            />
          </figure>
          <article className="flex flex-col justify-center flex-1" style={{ fontFamily: 'var(--font-sora)' }}>
            <h1>
              <Link href={`/products/${product.handle}`}>{product.title}</Link>
            </h1>
            <p>{product.description}</p>
          </article>
        </div>
      ))}
    </>
  )
}
