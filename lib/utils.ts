export { cn } from "cn"

export function convertToPlainObject<T>(value: T): T {
    return JSON.parse(JSON.stringify(value))
}