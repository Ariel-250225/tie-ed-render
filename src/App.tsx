import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./component/layouts/Frame/Header";
import { GlobalStyled } from "./component/layouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDarkMode } from "usehooks-ts";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./styles/theme";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./page/Main";
import { WindowContextProvider } from "./context/WindowContext";
import { HeroUIProvider } from "@heroui/react";

const QUERY_CLIENT = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : darkTheme}>
        <QueryClientProvider client={QUERY_CLIENT}>
          <WindowContextProvider>
            <HeroUIProvider>
              <Header />
              <Toaster />
              <GlobalStyled />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Main />} />
                </Routes>
              </BrowserRouter>
              <footer style={{ height: "30px" }} />
            </HeroUIProvider>
          </WindowContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
