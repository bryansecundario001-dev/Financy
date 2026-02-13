import { View, Text, Button, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { useDistributionCategories } from '../../hooks/use-distribution-categories';
import {
  saveDistributionConfiguration,
  saveDefaultDistribution,
} from '../../src/services/distribution-configuration.service';
import { router } from 'expo-router';
import { init_database } from '../../src/db';
import { useEffect } from 'react';

export default function DistributionSetup () {

    useEffect(() => {
    init_database();
  }, []);

  const { categories, loading } = useDistributionCategories();
  const [values, setValues] = useState<Record<number, number>>({});

  const userId = 1;

  if (loading) return <Text>Cargando...</Text>;

  const total = Object.values(values).reduce((a, b) => a + b, 0);

  const handleSave = async () => {
    const payload = categories.map(c => ({
      distribution_category_id: c.id_distribution_category,
      percentage: values[c.id_distribution_category] || 0,
    }));

    await saveDistributionConfiguration(userId, payload);
    router.push('/(tabs)');
  };

  const handleSkip = async () => {
    await saveDefaultDistribution(userId);
    router.push('/initial-balance');
  };

  return (

    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>
        Distribuye tu ingreso
      </Text>

      {categories.map(cat => (
        <View key={cat.id_distribution_category} style={{ marginVertical: 10 }}>
          <Text>{cat.name}</Text>
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
            style={{
              borderWidth: 1,
              borderRadius: 6,
              padding: 8,
            }}
          />
        </View>
      ))}

      <Text>Total: {total}%</Text>

      <Button
        title="Guardar"
        onPress={handleSave}
        disabled={total !== 100}
      />

      <Button title="Omitir (usar recomendado)" onPress={handleSkip} />
    </ScrollView>
  );
};
