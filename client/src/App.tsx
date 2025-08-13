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
                <main className="bg-background grid grid-rows-[120px_1fr] md:grid-rows-[70px_1fr] gap-4 mx-auto max-w-full lg:max-w-[1300px] h-screen">
                  <Header />
                  <div className="grid md:grid-cols-[200px_1fr_300px] gap-4">
                    <aside className=" hidden md:block bg-accent">
                      Left Sidebar Placeholder
                    </aside>
                    <PageRoutes />
                    <aside className=" hidden md:block bg-accent">
                      Right Sidebar Placeholder
                    </aside>
                  </div>
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
