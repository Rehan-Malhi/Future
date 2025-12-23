"use client";

import AuthGate from "./components/AuthGate";
import ProductsList from "./components/ProductsList";
import AddProduct from "./components/AddProduct";

export default function AdminPage() {
  return (
    <AuthGate>
      <AddProduct />
      <div className="mt-10">
        <ProductsList />
      </div>
    </AuthGate>
  );
}
