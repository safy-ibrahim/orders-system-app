


import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; 

const handleSubmit = async () => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      customerName: "John Doe", 
      items: [
        { itemName: "Item 1", quantity: 2 },
        { itemName: "Item 2", quantity: 1 }
      ],
      orderId: "12345", 
      status: "pending", 
      price: 50.00 
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
