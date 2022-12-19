import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import ThemePicker from "./ThemePicker";

const ProfileSettings = () => {
  const { colors } = useTheme();

  return (
    <SettingsContainer backgroundColor={colors.primary}>
      <Text style={{ color: colors.onPrimary, marginLeft: 10 }} variant="labelLarge">
        Settings
      </Text>
      <ThemePicker />
    </SettingsContainer>
  );
};

export default ProfileSettings;

const SettingsContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 10px 5px;
  border-radius: 10px;
  margin: 5px 0;
`;
