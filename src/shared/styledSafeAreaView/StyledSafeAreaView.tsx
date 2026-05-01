import {
  SafeAreaView as RNSafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const SafeAreaViewStyled = withUniwind(RNSafeAreaView);

export function StyledSafeAreaView(props: SafeAreaViewProps) {
  return <SafeAreaViewStyled {...props} />;
}
