
// this component will be server-rendered

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Ensure the path to your Firebase config is correct

// define the types for the data i expect
interface Order {
  orderId: number;
  customerName: string;
  status: string;
  totalPrice: number;
  items: { name: string; quantity: number }[];
}

const Summary = async () => {
  // fetch the orders from firebase firestore
  const querySnapshot = await getDocs(collection(db, "orders"));
  // retrieve all documents from the query, convert them to Order objects, and store them in the orders array
  const orders: Order[] = querySnapshot.docs.map(doc => doc.data() as Order);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Order Summary</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.status}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>{item.name} (x{item.quantity})</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
