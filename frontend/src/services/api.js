// ================= API CORE =================

const BASE_URL = "https://tadingview.onrender.com";

// ================= REQUEST HANDLER =================

async function request(path, options = {}) {
  try {
    const response = await fetch(BASE_URL + path, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    });

    // Try parsing JSON safely
    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    // Handle HTTP errors
    if (!response.ok) {
      return {
        success: false,
        error: data?.error || `HTTP ${response.status}`
      };
    }

    // Normalize response
    if (data && typeof data === "object") {
      return {
        success: data.success !== false,
        data: data.data !== undefined ? data.data : data
      };
    }

    // Fallback
    return {
      success: true,
      data: data
    };

  } catch (err) {
    console.error("API ERROR:", err);

    return {
      success: false,
      error: err.message || "Network error"
    };
  }
}

// ================= METHODS =================

export function get(path) {
  return request(path);
}

export function post(path, body = {}) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export function del(path) {
  return request(path, {
    method: "DELETE"
  });
}
