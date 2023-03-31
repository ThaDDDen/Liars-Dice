import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Snackbar, Text, useTheme } from "react-native-paper";

import { SnackMessage } from "../types/types";

interface Props {
  children: ReactNode;
}

interface SnackContext {
  setSnackMessage: React.Dispatch<React.SetStateAction<SnackMessage>>;
  snackMessage: SnackMessage;
  clearResponseMessage: () => void;
}

const SnackContext = createContext<SnackContext>({
  setSnackMessage: () => console.warn("no provider found"),
  snackMessage: {} as SnackMessage,
  clearResponseMessage: () => console.warn("No provider found."),
});

const inistialResponseState: SnackMessage = {
  status: "",
  message: "",
};

const SnackProvider = ({ children }: Props) => {
  const [snackMessage, setSnackMessage] = useState<SnackMessage>(inistialResponseState);
  const [snackVisible, setSnackVisible] = useState(false);
  const { colors } = useTheme();

  const clearResponseMessage = () => {
    setSnackMessage(inistialResponseState);
  };

  useEffect(() => {
    if (snackMessage != inistialResponseState) setSnackVisible(true);
  }, [snackMessage]);

  return (
    <SnackContext.Provider value={{ snackMessage, setSnackMessage, clearResponseMessage }}>
      {children}
      {snackMessage && (
        <Snackbar
          wrapperStyle={{ bottom: "15%" }}
          duration={3000}
          style={
            snackMessage.status === "Error"
              ? { backgroundColor: colors.errorContainer }
              : snackMessage.status === "Success" && { backgroundColor: "#0ba339" }
          }
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
        >
          <Text>{snackMessage.message}</Text>
        </Snackbar>
      )}
    </SnackContext.Provider>
  );
};

export const useSnackBar = () => useContext(SnackContext);

export default SnackProvider;
