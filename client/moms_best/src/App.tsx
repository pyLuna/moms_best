import { BrowserRouter } from "react-router"
import PageRoutes from "./pages/PageRoutes"
import "./App.css"

function App() {

  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  )
}

export default App
