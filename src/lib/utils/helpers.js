import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Artificially delay a function call to simulate a slow network connection.
export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to parse the hideous date string returned by the WordPress API to 
// something readable by humans with feelings.
export function formatDate(input) {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// Function to format currency returned from Shopify / WooCommerce
export const formatCurrency = price => {
  return '$' + parseFloat(price).toFixed(2)
}


// convert cents to dollars, optional trailing zeros if round amount
export function centsToPrice(cents, trailing = false) {
  const price = cents / 100

  if (!trailing && price % 1 === 0) {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  } else {
    const parts = price.toFixed(2).split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `${parts.join('.')}`
  }
}

// keep number counters within a range
export function clampRange(value, min = 0, max = 1) {
  return value < min ? min : value > max ? max : value
}

export function hasObject(recs, vals) {
  if (!recs) return false

  return recs.some(function (obj) {
    for (var x in obj) if (x in vals && obj[x] != vals[x]) return false
    return true
  })
}

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const IS_SERVER = typeof window === 'undefined';
