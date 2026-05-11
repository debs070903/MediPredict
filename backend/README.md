<p align="center">
  <h1 align="center">🏥 MediPredict</h1>
  <p align="center">
    <b>AI-Powered Medical Insurance Estimation Platform</b>
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SpringBoot-3.x-brightgreen?style=flat-square&logo=springboot"/>
  <img src="https://img.shields.io/badge/H2-DATABASE-lightgrey?style=flat-square"/>
  <img src="https://img.shields.io/badge/ML-Microservice-orange?style=flat-square"/>
  <img src="https://img.shields.io/badge/Auth-Session--Based-purple?style=flat-square"/>
  <img src="https://img.shields.io/badge/Build-Maven-red?style=flat-square&logo=apachemaven"/>
  
</p>

<p align="center">
  <a href="#">Live Demo</a> •
  <a href="#">Report Bug</a> •
  <a href="#">Request Feature</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square"/>
  <img src="https://img.shields.io/badge/Maintained-Yes-green?style=flat-square"/>
</p>

---


## 🧠 Overview

MediPredict Backend is a scalable Spring Boot application that powers a healthcare prediction system by integrating with an external Machine Learning microservice.

It handles:
<ul>
<li>🔐 Authentication \& session management</li>
<li>🤖 ML-based prediction processing</li>
<li>📊 Dashboard analytics</li>
<li>🗄️ Data persistence using H2 (in-memory DB)</li>
</ul>

---
## 🏗️ System Architecture

<p align="center">

🖥️ React Frontend  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;⬇️  
⚙️ Spring Boot Backend  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;⬇️  
🤖 ML Microservice (REST API)  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;⬇️  
🗄️ H2 Database (In-Memory)
</p>

---

## ✨ Key Features
<ul>
<li>🔐 Session-based authentication (Token + Expiry)</li>
<li>🤖 ML-first prediction pipeline</li>
<li>⚠️ Controlled fallback mechanism</li>
<li>📊 Dashboard analytics (trends, averages)</li>
<li>📦 Clean layered architecture</li>
<li>🧾 JSON-based request/response storage</li>
<li>🔍 ML health monitoring</li>
</ul>

---

## 📂 Project Structure
```
backend/

├── src/main/java/com/medipredict/backend
│   ├── config/            ⚙️ Configuration classes
│   ├── controller/        🌐 REST APIs
│   ├── domain/            🗄️ Entity models
│   ├── dto/               📦 Request/Response objects
│   ├── exception/         ❗ Global error handling
│   ├── repository/        🧩 JPA repositories
│   ├── service/           🧠 Business logic + ML integration
│   └── MediPredictApplication.java 🚀 Entry point
├── src/main/resources/
│   └── application.yml    ⚙️ Configuration file
└── pom.xml               📦 Maven dependencies
```
---
# 🔹Layered Architecture

 ## 🌐 Controller Layer
 
Handles incoming HTTP requests and exposes REST APIs:
- **/api/predictions** → Prediction APIs  
- **/api/dashboard** → Dashboard analytics  
- **/api/ml** → ML health & metadata  
- **/api/auth** → Authentication  
- **/api/user** → User profile  
---

## 🧠 Service Layer

📌 PredictionService
- **Processes prediction requests**  
- **Prepares ML features**  
- **Stores results in database**  
- **Generates analytics**  

📌 MlServiceClient
- **Connects to ML microservice**  
- **Handles API failures**  
- **Triggers fallback logic**

📌 UserService
- **Manages authentication**  
- **Handles session tokens**  
- **Validates users**  

---

## 🔄 Prediction Flow
```
1\. User submits input

2\. Backend validates request

3\. Features are constructed

4\. ML API is called

5\. If ML fails → fallback model used

6\. Result stored in H2 DB

7\. Response returned to frontend
```

## ⚠️ ML Fallback Strategy
```
The system primarily relies on an external machine learning microservice for generating predictions.
In scenarios where the ML service is unavailable or unreachable, a lightweight heuristic-based fallback mechanism is used to ensure system continuity.

These fallback predictions are explicitly marked using:
predictionSource = "fallback\_rule"
fallbackUsed = true
and are not considered part of the core ML-driven prediction pipeline.
```
---
## 🔐 Authentication

- **Session-based authentication (no JWT)**  
- **Token generated on login**  
- **Stored in database with expiry**  
- **Passed via:**
  - `Authorization: Bearer <token>`  

---
## 🗄️ Database (H2)

- **In-memory database (development mode)**  
- **No external setup required**  
- **Data resets on restart**  
---

## 📡 API Example
```
POST /api/predictions
{
&#x20; "age": 30,
&#x20; "gender": "male",
&#x20; "heightCm": 175,
&#x20; "weightKg": 70
}
Response
{
&#x20; "monthlyPremium": 3200,
&#x20; "predictionSource": "ml\_service",
&#x20; "fallbackUsed": false
}
```
---
## ⚙️ Configuration (application.yml)
```
ml:
&#x20; service:
&#x20;   base-url: http://localhost:8000

spring:
&#x20; datasource:
&#x20;   url: jdbc:h2:mem:medipredict
&#x20;   driver-class-name: org.h2.Driver
&#x20;   username: sa
&#x20;   password:
```
---
## 🚀 Setup \& Run

\# Run Backend
```
mvn spring-boot:run
```

\# Run ML Service
```
python app.py
```

\# Run Frontend
```
npm install
npm run dev
```
---

## 🧪 Debug Logs
```
➡️ Calling ML API...
✅ ML prediction successful

or

❌ ML API failed → using fallback
🚨 FALLBACK MODEL EXECUTED

```
---

## 🚀 Future Improvements

- **🔄 Replace H2 with PostgreSQL (production-ready)**  
- **🔐 Add JWT authentication**  
- **⚡ Use WebClient for async ML calls**  
- **📘 Integrate Swagger API documentation**  





