import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<div>Products</div>} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="*" element={<div>Not Found 404</div>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
