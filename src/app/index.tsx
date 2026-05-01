import { Button, Spinner, useThemeColor } from "heroui-native";
import { Plus, Settings } from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { FadeIn, LinearTransition } from "react-native-reanimated";
import { StyledSafeAreaView } from "shared/styledSafeAreaView";

export default function Index() {
  const themeColorAccentForeground = useThemeColor("accent-foreground");
  const [isDownloading, setIsDownloading] = useState(false);
  return (
    <StyledSafeAreaView className="flex-1 bg-background justify-between flex-col px-global-px">
      <Button
        isIconOnly
        variant="ghost"
        // className="text-foreground"
        onPress={() => {
          Alert.alert("test");
        }}
      >
        <Plus color={themeColorAccentForeground} />
      </Button>
      <Button
        layout={LinearTransition.springify()}
        variant="primary"
        onPress={() => {
          setIsDownloading(true);
          setTimeout(() => {
            setIsDownloading(false);
          }, 3000);
        }}
        isIconOnly={isDownloading}
        className="self-center"
      >
        {isDownloading ? (
          <Spinner
            entering={FadeIn.delay(50)}
            color={themeColorAccentForeground}
          />
        ) : (
          "Download now"
        )}
      </Button>
      <View className="flex gap-2 flex-row ">
        <Button isIconOnly variant="ghost">
          <Settings color={themeColorAccentForeground} />
        </Button>
        <Button className="grow" onPress={() => Alert.alert("Pressed!")}>
          Начать игру
        </Button>
      </View>
    </StyledSafeAreaView>
  );
}
