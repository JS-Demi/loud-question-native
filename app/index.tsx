import "./global.css";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-primary bg-card h-10 rounded-t-2xl">
        Welcome to Nativewind!
      </Text>
      <Text className="text-foreground font-bold">testtesttt</Text>
    </View>
  );
}
