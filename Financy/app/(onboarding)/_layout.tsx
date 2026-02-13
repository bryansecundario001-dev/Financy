import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="distribution-setup" />
      <Stack.Screen name="initial-balance" />
    </Stack>
  );
}
