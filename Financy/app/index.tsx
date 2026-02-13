import { useEffect } from 'react';
import { router } from 'expo-router';
import { init_database } from '../src/db';
import { hasDistributionConfiguration } from '../src/services/distribution-configuration.service';
import { hasDistributionBalance } from '../src/services/distribution-balance.service';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {

  useEffect(() => {
    const bootstrap = async () => {
      await init_database();

      const userId = 1;

      const hasDistribution = await hasDistributionConfiguration(userId);

      if (!hasDistribution) {
        router.replace('/(onboarding)');
        return;
      }

      const hasBalance = await hasDistributionBalance(userId);

      if (!hasBalance) {
        router.replace('/initial-balance');
        return;
      }

      router.replace('/(tabs)');
    };

    bootstrap();
  }, []);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
