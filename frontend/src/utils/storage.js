// Save
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Load
export function load(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Remove
export function remove(key) {
  localStorage.removeItem(key);
}