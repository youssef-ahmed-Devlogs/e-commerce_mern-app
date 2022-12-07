import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const data = axios
      .post(
        "http://localhost:8000/api/v1/slider",
        {},
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODhmMTJjZTI3YzZmNjY4ZmYzOTE3MyIsImlhdCI6MTY3MDI2NTI1MCwiZXhwIjoxNjcwNDM4MDUwfQ.Zd2WoPaHgbY_kk23Up0cSgbuRcNX1QIGJ-gh61RX4mU",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err.response.data);
        console.log("====================================");
      });
  }, []);

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
