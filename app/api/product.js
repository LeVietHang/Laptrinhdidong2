const API_URL = "http://127.0.0.1:8000/api/products";

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

// Lấy chi tiết một sản phẩm và sản phẩm liên quan
export const fetchProductById = async (id) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/product-detail/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product details and related products");
  }
  return await response.json();
};

export const fetchSearchProducts = async (query) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/products-search?query=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
