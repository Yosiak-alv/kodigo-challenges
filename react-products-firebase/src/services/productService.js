import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../db/dbConfig.js";

export const ProductService = {
  async list() {
    const productsCollection = collection(db, "products");
    const productSnapshot = await getDocs(productsCollection);
    return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async get(id) {
    const productDoc = doc(db, "products", id);
    const product = await getDoc(productDoc);
    return product.exists() ? { id: product.id, ...product.data() } : null;
  },

  async create(data) {
    const productsCollection = collection(db, "products");
    return addDoc(productsCollection, data);
  },

  async update(id, data) {
    const productDoc = doc(db, "products", id);
    return updateDoc(productDoc, data);
  },

  async delete(id) {
    const productDoc = doc(db, "products", id);
    return deleteDoc(productDoc);
  }
};