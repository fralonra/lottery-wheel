export function degreeToRadians (degree) {
  return (degree * Math.PI) / 180
}

export function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = degreeToRadians(angleInDegrees - 90)
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}
