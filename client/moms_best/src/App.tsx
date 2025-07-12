import { BrowserRouter } from "react-router";
import Header from "./components/Header";
import PageRoutes from "./pages/PageRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-rows-[52px_1fr] mx-auto">
        <Header />
        <main>
          <PageRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
