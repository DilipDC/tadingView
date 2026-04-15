export function getStockImage(name) {
  const map = {
    APPLE: "/icons/apple.png",
    GOOGLE: "/icons/google.png",
    TESLA: "/icons/tesla.png",
    AMAZON: "/icons/amazon.png",
    META: "/icons/meta.png",
    MICROSOFT: "/icons/microsoft.png"
  };

  return map[name?.toUpperCase()] || "/icons/default.png";
}