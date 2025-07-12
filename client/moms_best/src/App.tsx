import { BrowserRouter } from "react-router";
import Header from "./components/Header";
import PageRoutes from "./pages/PageRoutes";

function App() {
  return (
    <div className="grid grid-rows-[52px_1fr] mx-auto">
      <Header />
      <main>
        <BrowserRouter>
          <PageRoutes />
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
