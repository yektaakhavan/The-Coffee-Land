function calculateFinalPrice(basePrice, discountPercent) {
  const safeBasePrice = Math.max(0, Number(basePrice) || 0);
  const safeDiscount = Math.min(100, Math.max(0, Number(discountPercent) || 0));

  return safeBasePrice - (safeBasePrice * safeDiscount) / 100;
}

export default calculateFinalPrice;