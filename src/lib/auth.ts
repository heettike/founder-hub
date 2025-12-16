// Simple password authentication for the resource hub
const PASSWORD = '12345'

export function validatePassword(password: string): boolean {
  return password === PASSWORD
}
