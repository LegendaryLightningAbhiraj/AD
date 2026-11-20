import { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import { getRandomQuote, Quote } from '../lib/newapi';

export default function QuoteCard() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadQuote() {
    try {
      setLoading(true);
      setError('');

      const data = await getRandomQuote();

      setQuote(data);
    } catch (err) {
      setError('Unable to load quote. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuote();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Daily Motivation</Text>

      {loading ? (
        <ActivityIndicator color="#A6F36A" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <Text style={styles.quote}>
            "{quote?.quote}"
          </Text>

          <Text style={styles.author}>
            — {quote?.author}
          </Text>
        </>
      )}

      <Pressable onPress={loadQuote} style={styles.button}>
        <Text style={styles.buttonText}>New Quote</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1B1D23',
    padding: 20,
    margin: 16,
    borderRadius: 16,
  },

  heading: {
    color: '#A6F36A',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  quote: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 25,
  },

  author: {
    color: '#A0A2AC',
    marginTop: 12,
  },

  error: {
    color: '#FF6868',
  },

  button: {
    backgroundColor: '#A6F36A',
    padding: 12,
    borderRadius: 10,
    marginTop: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: '#101114',
    fontWeight: 'bold',
  },
});