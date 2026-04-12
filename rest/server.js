import express from "express"
import { users, tweets } from "../data/mock.js"

const app = express()
app.use(express.json())

// endpoints
app.get("/tweets", (_req, res) => {
  res.json(tweets)
})

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id))
  res.json(user)
})

// 👇 핵심 비교용 (N+1 상황)
app.get("/tweets-with-authors", (_req, res) => {
  const result = tweets.map(tweet => {
    const author = users.find(u => u.id === tweet.userId)
    return {
      ...tweet,
      author,
    }
  })
  res.json(result)
})

app.listen(4000, () => {
  console.log("🚀 REST API running on http://localhost:4000")
})