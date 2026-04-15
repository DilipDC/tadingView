import { get, post, del } from "./api";

// GET ALL STOCKS
export function fetchStocks() {
  return get("/api/stocks");
}

// ADD STOCK
export function addStock(data) {
  return post("/api/add", data);
}

// UPDATE STOCK
export function updateStock(id, data) {
  return post(`/api/update/${id}`, data);
}

// DELETE STOCK
export function deleteStock(id) {
  return del(`/api/delete/${id}`);
}

// RESET PRICE
export function resetStock(id, price) {
  return post(`/api/reset/${id}`, { price });
}

// GET HISTORY
export function getHistory(id) {
  return get(`/api/history/${id}`);
}