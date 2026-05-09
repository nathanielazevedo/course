import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { MDXProvider } from "@mdx-js/react";
import { theme } from "./theme";
import { mdxComponents } from "./mdx-components";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MDXProvider components={mdxComponents}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MDXProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
