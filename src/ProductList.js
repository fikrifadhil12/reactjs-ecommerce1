import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const API_URL =
    process.env.REACT_APP_API_URL || "https://private-extreme-town.glitch.me";

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const updatedProducts = data.map((product) => ({
          ...product,
          image: product.image.trim(), // 👈 hapus karakter "\r\n"
        }));
        console.log("Data setelah trim:", updatedProducts); // Optional debug
        setProducts(updatedProducts);
      })
      .catch((err) => console.error("Gagal mengambil produk", err));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          badge={{ text: product.badge_text, color: product.badge_color }}
        />
      ))}
    </div>
  );
};

export default ProductList;
