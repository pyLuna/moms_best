import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import Header from "./components/header/Header";
import HeadLoader from "./components/header/HeadLoader";
import { Toaster } from "./components/ui/sonner";
import CategoryProvider from "./contexts/CategoryProvider";
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
            <CategoryProvider>
              <BrowserRouter>
                <HeadLoader />
                <main className="bg-background grid grid-rows-[120px_1fr] md:grid-rows-[70px_1fr] mx-auto h-screen">
                  <Header />
                  <PageRoutes />
                </main>
                <Toaster />
              </BrowserRouter>
            </CategoryProvider>
          </UserContextProvider>
        </ThemeProvider>
      </MobileNavProvider>
    </QueryClientProvider>
  );
}

export default App;
