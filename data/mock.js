export const users = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `User${i + 1}`,
}))

export const tweets = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  text: `Tweet ${i + 1}`,
  userId: i
}))