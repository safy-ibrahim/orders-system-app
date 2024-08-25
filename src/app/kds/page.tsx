

"use client";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

// define the structure for items in an order
interface Item {
  name: string;
  quantity: number;
  price: number;
}

// define the structure for order
interface Order {
  id: string;
  customerName: string;
  items: Item[];
  orderId: number;
  status: string;
  totalPrice: number;
}

const KDS = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // fetch orders from firebase in realtime
  useEffect(() => {
    const q = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((doc) =>
        ordersData.push({ id: doc.id, ...doc.data() } as Order)
      );
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  // function to update order status to "completed"
  const markAsCompleted = async (orderId: string) => {
    const orderRef = doc(db, "orders", orderId);
    try {
      await updateDoc(orderRef, {
        status: "completed",// update the order status in firebase
      });
      console.log(`Order ${orderId} marked as completed`);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Kitchen Display System (KDS)</h1>
      {orders.length > 0 ? (
        <ul className="list-group">
          {orders.map((order) => (
            <li key={order.id} className="list-group-item p-4">
              <h4>Customer: {order.customerName}</h4>
              <p>Order ID: {order.orderId}</p>
              <p>Status: {order.status}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                  </li>
                ))}
              </ul>
              <h5>Total Price: ${order.totalPrice}</h5>
              {order.status !== "completed" && (
                <button
                  className="btn btn-success mt-2"
                  onClick={() => markAsCompleted(order.id)}
                >
                  Mark as Completed
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default KDS;
