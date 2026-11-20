export interface Quote {
  id: number;
  quote: string;
  author: string;
}

const API_URL = 'https://dummyjson.com/quotes/random';

export async function getRandomQuote(): Promise<Quote> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data: Quote = await response.json();

  return data;
}