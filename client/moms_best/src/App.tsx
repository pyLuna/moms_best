import { BrowserRouter } from "react-router";
import Header from "./components/Header";
import PageRoutes from "./pages/PageRoutes";

function App() {
  return (
    <BrowserRouter>
      <main className="bg-background grid grid-rows-[52px_1fr] mx-auto overflow-hidden">
        <Header />
        <PageRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;
