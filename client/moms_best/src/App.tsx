import { BrowserRouter } from "react-router";
import Header from "./components/Header";
import MobileNavProvider from "./contexts/MobileNavProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import PageRoutes from "./pages/PageRoutes";

function App() {
  return (
    <MobileNavProvider>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <BrowserRouter>
          <main className="bg-background grid grid-rows-[72px_1fr] mx-auto h-screen overflow-hidden">
            <Header />
            <PageRoutes />
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </MobileNavProvider>
  );
}

export default App;
