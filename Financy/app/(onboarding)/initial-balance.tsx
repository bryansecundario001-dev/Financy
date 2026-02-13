import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useDistributionCategories } from '../../hooks/use-distribution-categories';
import { hasDistributionBalance, saveInitialBalances } from '../../src/services/distribution-balance.service';

export default function InitialBalance() {

  const { categories, loading } = useDistributionCategories();
  const [values, setValues] = useState<Record<number, number>>({});
  const userId = 1;

  useEffect(() => {
    const check = async () => {
      const exists = await hasDistributionBalance(userId);
      if (exists) {
        router.replace('/(tabs)');
      }
    };
    check();
  }, []);

  if (loading) return null;

  const total = Object.values(values).reduce((a, b) => a + b, 0);

  const handleSave = async () => {
  const payload = categories.map(cat => ({
    distribution_category_id: cat.id_distribution_category,
    balance: values[cat.id_distribution_category] || 0,
  }));

  await saveInitialBalances(userId, payload);
    router.replace('/(tabs)');
  };

  const handleSkip = async () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.title}>Saldo Inicial</Text>
        <Text style={styles.subtitle}>
          Ingresa cuánto dinero tienes actualmente en cada categoría.
        </Text>

        <View style={styles.grid}>
          {categories.map(cat => (
            <View key={cat.id_distribution_category} style={styles.card}>
              <Text style={styles.cardTitle}>{cat.name}</Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.currency}>$</Text>
                <TextInput
                  keyboardType="numeric"
                  placeholder="0.00"
                  value={String(values[cat.id_distribution_category] ?? '')}
                  onChangeText={v =>
                    setValues({
                      ...values,
                      [cat.id_distribution_category]: Number(v) || 0,
                    })
                  }
                  style={styles.input}
                />
              </View>
            </View>
          ))}
        </View>


        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total disponible:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Guardar y continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Omitir</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 32,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  currency: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 24,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#111',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  skip: {
    marginTop: 18,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
  },
});
