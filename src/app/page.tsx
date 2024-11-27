// import Image from "next/image";
import { Navbar } from "./components/nav";
import { Header } from "./components/header";
import { Product } from "./components/product";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
        <Navbar />
        <Header />
        <div id="product">
          <Product id="product" />
        </div>
        <footer className="bg-primary text-white py-3 text-center text-sm">
          &copy; {new Date().getFullYear()} Our Company. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
