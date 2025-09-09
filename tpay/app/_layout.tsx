import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./redux/store";
import { Stack } from "expo-router";

// Move InnerLayout inside Provider using a custom wrapper
function InnerLayout() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="(auth)" />   /* Auth stack */
      ) : (
        <Stack.Screen name="(tabs)" />   /* App stack */
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <InnerLayout />
    </Provider>
  );
}
