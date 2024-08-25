"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Link from "next/link"; // Link for navigation between pages

// define the structure for item
interface Item {
  name: string;
  quantity: number;
  price: number;
}

const POS = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [customerName, setCustomerName] = useState("");

  // calculate the total price of all items
  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // add a new item to the order
  const handleAddItem = () => {
    setItems([...items, { name, quantity, price }]);
    setName("");
    setQuantity(0);
    setPrice(0);
  };

  // submit the order to firebase
  const handleSubmit = async () => {
    try {
      const totalPrice = calculateTotalPrice();
      const docRef = await addDoc(collection(db, "orders"), {
        customerName,
        items,
        orderId: Date.now(),
        status: "pending", // initial status
        totalPrice,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">POS System</h1>
      {/* button to navigate to the KDS page */}
      <div className="text-end">
        <Link href="/kds" className="btn btn-primary">
          Go to KDS
        </Link>
      </div>
      {/* button to navigate to the summery page */}
      <div className="mt-4 d-flex justify-content-end">
        <Link href="/summary">
          <button className="btn btn-primary">Go to Daily Summary</button>
        </Link>
      </div>

      <div className="bg-dark text-white p-4 mt-3">
        <div className="mb-4">
          <h2>Customer Details</h2>
          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <h2>Add Item</h2>
          <div className="mb-3">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="text"
              inputMode="numeric"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddItem}>
            Add Item
          </button>
        </div>
        <div className="mb-4">
          <h2>Order Summary</h2>
          <ul className="list-group">
            {items.map((item, index) => (
              <li key={index} className="list-group-item">
                <strong>{item.name}</strong> - Quantity: {item.quantity} -
                Price: ${item.price}
              </li>
            ))}
          </ul>
        </div>
        <h3>Total Price: ${calculateTotalPrice()}</h3>
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default POS;
