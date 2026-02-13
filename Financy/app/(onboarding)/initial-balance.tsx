import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { useState } from 'react';
import { useDistributionCategories } from '../../hooks/use-distribution-categories';
import { saveInitialBalances } from '../../src/services/distribution-balance.service';
import { router } from 'expo-router';

export default function InitialBalance() {
  const { categories, loading } = useDistributionCategories();
  const [values, setValues] = useState<Record<number, number>>({});
  const userId = 1;

  if (loading) return <Text>Cargando...</Text>;

  const handleContinue = async () => {
    const payload = categories.map(c => ({
      distribution_category_id: c.id_distribution_category,
      balance: values[c.id_distribution_category] || 0,
    }));

    await saveInitialBalances(userId, payload);
    router.replace('/');
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>
        Saldo inicial
      </Text>
      <Text style={{ marginBottom: 10 }}>
        Este dinero no se redistribuye
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

      <Button title="Continuar" onPress={handleContinue} />
    </ScrollView>
  );
};

