import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
