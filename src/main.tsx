import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "@common/store";
import { AuthProvider } from "./context/AuthProvider";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#FD788C",
      900: "#FF4D67",
    },
    secondary: "#F0A4BC",
    secondaryText: "#B43B56",
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AuthProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
