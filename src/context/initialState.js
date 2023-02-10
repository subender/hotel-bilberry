import { fetchData } from "../Utils/FetchUserData";

const userInfo = fetchData();

export const initialState = {
  user: userInfo,
};
