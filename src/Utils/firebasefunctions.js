import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  setDoc,
  query,
} from "firebase/firestore";
import { firestore } from "../Firebase.config";

export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

export const getFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
