import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Snackbar, Text, useTheme } from "react-native-paper";

import { ResponseMessage } from "../types/types";

interface Props {
  children: ReactNode;
}

interface SnackContext {
  setResponseMessage: React.Dispatch<React.SetStateAction<ResponseMessage>>;
  responseMessage: ResponseMessage;
  clearResponseMessage: () => void;
}

const SnackContext = createContext<SnackContext>({
  setResponseMessage: () => console.warn("no provider found"),
  responseMessage: {} as ResponseMessage,
  clearResponseMessage: () => console.warn("No provider found."),
});

const inistialResponseState: ResponseMessage = {
  status: "",
  message: "",
};

const SnackProvider = ({ children }: Props) => {
  const [responseMessage, setResponseMessage] = useState<ResponseMessage>(inistialResponseState);
  const [snackVisible, setSnackVisible] = useState(false);
  const { colors } = useTheme();

  const clearResponseMessage = () => {
    setResponseMessage(inistialResponseState);
  };

  useEffect(() => {
    if (responseMessage != inistialResponseState) setSnackVisible(true);
  }, [responseMessage]);

  return (
    <SnackContext.Provider value={{ responseMessage, setResponseMessage, clearResponseMessage }}>
      {children}
      {responseMessage && (
        <Snackbar
          style={responseMessage.status === "Error" && { backgroundColor: colors.errorContainer }}
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
        >
          <Text>{responseMessage.message}</Text>
        </Snackbar>
      )}
    </SnackContext.Provider>
  );
};

export const useSnackBar = () => useContext(SnackContext);

export default SnackProvider;
