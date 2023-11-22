import { useMemo } from 'react'
import Cookies from 'js-cookie'

export const storage = {
  set: (name, item) => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      localStorage.setItem(name, JSON.stringify(item));
    }
  },
  get: (name) => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(name);
      if (item) {
        return JSON.parse(item);
      }
    }
  },
  remove: (name) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(name);
    }
  }
};

export const isClient = typeof document !== 'undefined'

export const cartLocalStorageManager = (key) => {
  return {
    set: (id) => {
      if (!isClient) return
      window.localStorage.setItem(`${key}-cart-id`, JSON.stringify(id))
    },
    get: () => {
      if (!isClient) return
      return window.localStorage.getItem(`${key}-cart-id`)
    },
    clear: () => {
      if (!isClient) return
      return window.localStorage.removeItem(`${key}-cart-id`)
    }
  }
}

export const useCartSession = (key) => {
  const cartLocalStorage = useMemo(() => {
    return cartLocalStorageManager(key)
  }, [key])

  return cartLocalStorage
}

/**
 * Usage example:
 * 
 * const cartKey = 'example-cart-key
 * const cartSession = useCartSession(cartKey)
 * const cartId = cartSession.get('example-cart-key')
 *
 * if (!cartId) {
 *   cartSession.set(data.id)
 * }
 * 
**/

export const useCartCookieManager = (key) => {
  return useMemo(() => {
    return {
      set: (id) => {
        if (!isClient) return
        Cookies.set(key, id, {
          sameSite: 'strict',
          secure: true,
          expires: 365 // one year
        })
      },
      get: () => {
        if (!isClient) return
        return Cookies.get(key)
      },
      clear: () => {
        if (!isClient) return
        return Cookies.remove(key)
      }
    }
  }, [key])
}
