import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDistributionCategories } from '../../hooks/use-distribution-categories';
import {
  saveDistributionConfiguration,
  saveDefaultDistribution,
  hasDistributionConfiguration 
} from '../../src/services/distribution-configuration.service';
import { hasDistributionBalance } from '../../src/services/distribution-balance.service';
import { router } from 'expo-router';
import { init_database } from '../../src/db';

export default function Index() {
  useEffect(() => {
    init_database();
  }, []);

  const { categories, loading } = useDistributionCategories();
  const [values, setValues] = useState<Record<number, number>>({});
  const userId = 1;

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Cargando configuración...</Text>
      </View>
    );
  }

  const total = Object.values(values).reduce((a, b) => a + b, 0);
  const remaining = 100 - total;

  const handleSave = async () => {
    const payload = categories.map(c => ({
      distribution_category_id: c.id_distribution_category,
      percentage: values[c.id_distribution_category] || 0,
    }));

    await saveDistributionConfiguration(userId, payload);
    router.push('/initial-balance');
  };

  const handleSkip = async () => {
    await saveDefaultDistribution(userId);
    router.push('/initial-balance');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Header */}
        <Text style={styles.title}>Distribuye tu ingreso</Text>
        <Text style={styles.subtitle}>
          Define cómo quieres organizar tu dinero cada mes.
        </Text>

        {/* Progreso */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Total asignado: {total}%
          </Text>
          <Text
            style={[
              styles.remaining,
              { color: remaining === 0 ? '#16A34A' : '#DC2626' },
            ]}
          >
            {remaining === 0
              ? 'Perfecto ✔'
              : `Faltan ${remaining}%`}
          </Text>
        </View>

        {/* Categorías */}
        <View style={styles.grid}>
          {categories.map(cat => (
          <View key={cat.id_distribution_category} style={styles.card}>
            <Text style={styles.cardTitle}>{cat.name}</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                keyboardType="numeric"
                placeholder="0"
                value={String(values[cat.id_distribution_category] ?? '')}
                onChangeText={v =>
                  setValues({
                    ...values,
                    [cat.id_distribution_category]: Number(v) || 0,
                  })
                }
                style={styles.input}
              />
              <Text style={styles.percentSymbol}>%</Text>
            </View>
          </View>
        ))}
      </View>
  

        {/* Botón principal */}
        <TouchableOpacity
          style={[
            styles.button,
            total !== 100 && { opacity: 0.5 },
          ]}
          disabled={total !== 100}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Guardar distribución</Text>
        </TouchableOpacity>

        {/* Secundario */}
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Usar distribución recomendada</Text>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 16,
    color: '#6B7280',
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
  progressContainer: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 15,
    fontWeight: '600',
  },
  remaining: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
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
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  percentSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#111',
    paddingVertical: 16,
    borderRadius: 16,
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

