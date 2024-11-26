// import Image from "next/image";
import { Navbar } from "./components/nav";
import { Product } from "./components/product";

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
