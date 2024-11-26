// import Image from "next/image";
import { Navbar } from "./components/nav.tsx";
import { Product } from "./components/product.tsx";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
        <Navbar />
        <Product />
      </main>
    </div>
  );
}
