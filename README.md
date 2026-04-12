# REST vs GraphQL Comparison (Experiment)

## 📌 Overview
This project compares REST API and GraphQL by implementing the same data structure and features.

The goal is to evaluate:
- API call efficiency
- Response size
- Developer experience
- Real-world trade-offs
---

## 🧪 Scenario
Fetch tweets with author information.
---

## 🏗 Architecture
- REST: Express-based API
- GraphQL: Apollo Server
- Shared data source (same dataset)

---

## 🔍 Experiment Setup
### REST

1. GET /tweets
2. GET /users/:id (multiple calls)

or

- GET /tweets-with-authors

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
