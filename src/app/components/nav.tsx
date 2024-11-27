"use client";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const scrollToProduct = () => {
    if (mounted) {
      const productSection = document.getElementById("product");
      if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Lorem Ipsum</h1>
          <button
            onClick={scrollToProduct}
            className="bg-none font-medium text-white px-4 py-2 rounded-md hover:bg-white hover:text-primary"
          >
            Product
          </button>
        </div>
      </div>
    </nav>
  );
};
