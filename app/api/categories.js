const API_URL = "http://127.0.0.1:8000/api/categories"; // Đổi từ '/api/categorys' thành '/api/categories'

export const fetchCategories = async () => { 
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; 
  }
};
