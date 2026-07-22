function calculateFinalPrice(basePrice, discountPercent) {
  return basePrice - (basePrice * discountPercent) / 100;
}

export default calculateFinalPrice;