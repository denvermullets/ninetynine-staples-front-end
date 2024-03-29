import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { CurrentPlayerProvider } from "./components/providers/CurrentPlayerProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <CurrentPlayerProvider>
        <ChakraProvider theme={customTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </CurrentPlayerProvider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
