"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string | null;
}
interface ProductDetail {
  id: string;
  name: string | null;
  image?: string | null;
}
interface ImageData {
  id: string[];
  image: string | null;
}

export const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(
    null,
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // After the component is mounted on the client, update the state
  }, []);

  useEffect(() => {
    const fetchProductsAndImages = async () => {
      try {
        const [productResponse, imageResponse] = await Promise.all([
          fetch("https://www.giovankov.com/api/product.json"),
          fetch("https://www.giovankov.com/api/image.json"),
        ]);

        const productsData = await productResponse.json();
        const imagesData = await imageResponse.json();

        const imageMap: Record<string, string> = {};
        imagesData.data.forEach((item: ImageData) => {
          item.id.forEach((id) => {
            imageMap[id] = item.image || ("/placeholder.jpg" as string);
          });
        });

        setProducts(productsData.data);
        setImages(imageMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndImages();
  }, []);

  const openModal = (product: Product) => {
    const imageUrl = images[product.id] || ("/placeholder.jpg" as string);
    setSelectedProduct({ ...product, image: imageUrl });
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="pb-4 w-full flex flex-col">
        <h2 className="text-4xl font-bold text-center leading-none mb-1">
          Products
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4 w-1/2 mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
          consequuntur distinctio excepturi molestias aut nesciunt nam corporis,
          velit iste.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="cursor-pointer" onClick={() => openModal(product)}>
              <Image
                src={images[product.id] || "/placeholder.jpg"}
                alt={product.name || "Product Image"}
                layout="responsive"
                width={16}
                height={9}
                className="rounded-md"
              />
            </div>

            <h2 className="text-md font-semibold mt-2">
              {product.name || "Unnamed Product"}
            </h2>
            <p className="text-sm text-gray-600">ID: {product.id}</p>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg w-[600px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-4 p-4 min-h-[400px]">
              <Image
                src={selectedProduct.image || "/placeholder.jpg"}
                alt={selectedProduct.name || "Preview"}
                width={800}
                height={600}
                className="object-contain rounded-lg"
              />

              <div>
                <h2 className="text-xl font-bold">
                  {selectedProduct.name || "Unnamed Product"}
                </h2>
                <p className="text-md text-gray-600">
                  ID: {selectedProduct.id}
                </p>
                <h4 className="text-md font-semibold mt-3">Description:</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
                  repellat culpa hic architecto? Vitae adipisci eius maiores qui
                  repudiandae explicabo aspernatur eaque ea nobis laboriosam?
                  Maiores facere voluptas praesentium aliquam.
                </p>
              </div>
            </div>
            <button
              className="block w-full py-2 bg-red-500 text-white text-center"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
