import { isShopifyError, shopify } from './utils';

// @ts-ignore
const query = async ({ query, variables, options = {} }) => {
  try {
    const result = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache: options?.cache ?? 'default',
      ...(options?.tags && { next: { tags: options?.tags } })
    });
    
    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }
    return {
      status: result.status,
      body
    };
  }
  catch (e) {
    if (isShopifyError(e)) {
      throw {
        status: e.status || 500,
        message: e.message,
        query
      };
    }
    throw {
      error: e,
      query
    };
  }
}

const mutation = async ({ query, variables, options = {} }) => { 
  return await query({
    query,
    variables,
    options: {
      ...options,
      cache: "no-cache",
    }
  });
}

const storefront = {
  query,
  mutation,
}

export {
  storefront,
  shopify
};