import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";
import MobileNavProvider from "./contexts/MobileNavProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import UserContextProvider from "./contexts/UserContext";
import PageRoutes from "./pages/PageRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MobileNavProvider>
        <ThemeProvider
          defaultTheme="dark"
          storageKey="vite-ui-theme"
        >
          <UserContextProvider>
            <BrowserRouter>
              <main className="bg-background grid grid-rows-[72px_1fr] mx-auto h-screen overflow-hidden">
                <Header />
                <PageRoutes />
              </main>
              <Toaster />
            </BrowserRouter>
          </UserContextProvider>
        </ThemeProvider>
      </MobileNavProvider>
    </QueryClientProvider>
  );
}

export default App;
