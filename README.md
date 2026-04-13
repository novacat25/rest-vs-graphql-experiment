# REST vs GraphQL Comparison (Experiment)

## 📌 Overview

This project compares REST API and GraphQL by implementing the same dataset and features under identical conditions.

The goal is not to benchmark raw performance, but to understand:

* API design differences
* Data fetching strategies
* Trade-offs in real-world scenarios

---

## 🎯 Motivation

GraphQL is often described as a more efficient alternative to REST.

However, questions remain:

* Does GraphQL always perform better?
* What problems does it actually solve?
* What new challenges does it introduce?

This experiment aims to validate these questions through implementation.

---

## 🏗 Architecture

* REST API: Express-based server
* GraphQL: Apollo Server
* Shared dataset (same users & tweets)

```
project/
├── rest/
├── graphql/
├── data/
```

---

## 📊 Dataset

* Users: 10
* Tweets: 100

Multiple tweets are intentionally associated with the same user.

→ This simulates real-world scenarios and highlights redundant data fetching.

---

## 🧪 Scenario

Fetch tweets with their author information.

---

## 🔍 Experiment Setup

### REST

#### Option 1 (Multiple Requests)

1. GET `/tweets`
2. GET `/users/:id` (repeated per tweet)

→ Total requests: **1 + N**

---

#### Option 2 (Server-side aggregation)

GET `/tweets-with-authors`

→ Single request, but server combines data manually

---

### GraphQL

```graphql
query {
  tweets {
    text
    author {
      name
    }
  }
}
```

→ Single request, flexible response structure

---

## 📈 Results

| Metric        | REST  | GraphQL |
| ------------- | ----- | ------- |
| API Calls | 1 (aggregated) / 1+N (multiple) | 1 |
| Response Size | ~4.11 KB | ~4.73 KB   |
| Response Time | ~5 ms | ~20 ms   |
| Flexibility   | Low   | High    |
| Complexity    | Low   | Medium  |

### Case 1: Multiple Requests (REST) vs GraphQL

| Metric         | REST (multiple) | GraphQL |
|----------------|----------------|----------|
| API Calls | 1 (aggregated) / 1+N (multiple) | 1 |
| Response Time  | ~6 ms          | ~20 ms    |

---

### Case 2: Aggregated REST vs GraphQL

| Metric         | REST (aggregated) | GraphQL |
|----------------|------------------|----------|
| API Calls      | 1                | 1        |
| Response Size  | ~4.44 KB            | ~4.73 KB    |
| Flexibility    | Low              | High     |

---

## ⚠️ N+1 Problem Demonstration

GraphQL consolidates API calls into one request,
but the N+1 problem can still occur internally — hidden inside resolver execution.

This makes it harder to detect compared to REST,
where multiple requests are explicitly visible in network logs.

### Example Logs

```
Fetching author for tweet 1
Fetching author for tweet 2
...
Fetching author for tweet 100

→ Total resolver calls: 100
```

---

### Insight

* GraphQL performs **1 network request**
* But executes **resolver logic multiple times**

→ This is known as the **N+1 problem**

---

## 💡 Key Insights

### ✔ Advantages of GraphQL

* Reduces number of API requests
* Allows flexible data fetching
* Can reduce over-fetching and under-fetching
  (effectiveness depends on query design and schema structure)

---

### ⚠️ Trade-offs

* Increased server-side complexity
* Requires schema & resolver design
* Can introduce N+1 performance issues
* Harder to debug compared to REST

---

## ⚠️ Limitations of This Experiment

- **In-memory data only**: N+1 has no real cost here.
  In a database-backed environment, each resolver call would trigger a real query,
  making the performance gap dramatically larger.

- **No DataLoader**: The standard solution to GraphQL's N+1 problem (DataLoader)
  was intentionally omitted to demonstrate the problem in isolation.

- **Unequal comparison**: REST's `/tweets-with-authors` is a purpose-built endpoint
  for this exact query. GraphQL's single endpoint serves all queries generically —
  a fundamentally different design goal.

---

## 🧠 Conclusion

GraphQL is not a replacement for REST.

It is a powerful tool for specific use cases:

* Complex UI data requirements
* Multiple related resources
* Client-driven data fetching

However:

> GraphQL does not eliminate problems — it shifts them.

* From network inefficiency → to server-side complexity
* The right choice depends on your data access patterns, team size, and client diversity.

---

## 🚀 How to Run

```bash
npm install
npm run dev:rest
npm run dev:graphql
```

---

## 🧪 Tools Used

* Node.js
* Express
* Apollo Server
* GraphQL

---

## 📌 Final Thoughts

This experiment demonstrates that:

* REST is simple and predictable
* GraphQL is flexible but requires careful design
