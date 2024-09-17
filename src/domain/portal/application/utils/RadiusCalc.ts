function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

function toDegrees(radians: number): number {
  return radians * (180 / Math.PI)
}

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371e3 // Raio da Terra em metros
  const φ1 = toRadians(lat1)
  const φ2 = toRadians(lat2)
  const Δφ = toRadians(lat2 - lat1)
  const Δλ = toRadians(lng2 - lng1)

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const d = R * c
  return d // Retorna a distância em metros
}

export function calculateBoundingBox(lat: number, lng: number, radius: number) {
  const R = 6371e3 // Raio da Terra em metros

  // Cálculo da latitude mínima e máxima
  const latMin = lat - toDegrees(radius / R)
  const latMax = lat + toDegrees(radius / R)

  // Cálculo da longitude mínima e máxima
  const lngMin = lng - toDegrees(radius / (R * Math.cos(toRadians(lat))))
  const lngMax = lng + toDegrees(radius / (R * Math.cos(toRadians(lat))))

  return {
    latMin,
    latMax,
    lngMin,
    lngMax,
  }
}

export function areCirclesOverlapping(
  lat1: number,
  lng1: number,
  radius1: number,
  lat2: number,
  lng2: number,
  radius2: number,
): boolean {
  const distance = haversineDistance(lat1, lng1, lat2, lng2)
  console.log(distance)
  return distance <= radius1 + radius2
}

export function isCircleInsideAnother(
  lat1: number,
  lng1: number,
  radius1: number,
  lat2: number,
  lng2: number,
  radius2: number,
): boolean {
  const distance = haversineDistance(lat1, lng1, lat2, lng2)
  return distance <= Math.abs(radius1 - radius2)
}
