export default function safeParse(val: string) {
  try {
    return JSON.parse(val)
  } catch (err) {
    return val
  }
}
