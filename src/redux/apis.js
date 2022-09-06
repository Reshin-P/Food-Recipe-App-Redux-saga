import axios from "axios";

const YOUR_APP_ID = "";
const YOUR_APP_KEY = "";

export const getRecipes = async (query) => {
  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
  const data = await axios.get(url);
  return data;
};
