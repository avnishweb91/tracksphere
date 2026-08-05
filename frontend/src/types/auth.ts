export type User = { id: string; email: string; firstName: string; lastName: string; roles: string[] }
export type AuthResponse = { accessToken: string; refreshToken: string; tokenType: string; user: User }
export type LoginRequest = { email: string; password: string }
export type RegisterRequest = LoginRequest & { firstName: string; lastName: string }
export type Location = { id: string; vehicleId: string; latitude: number; longitude: number; accuracyMeters?: number; recordedAt: string }
export type LocationRequest = Omit<Location, 'id'>
