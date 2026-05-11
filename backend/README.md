🚀 MediPredict Backend

<p align="center"> <img src="https://img.shields.io/badge/SpringBoot-3.x-brightgreen?style=for-the-badge\&logo=springboot"/> <img src="https://img.shields.io/badge/H2-Database-lightgrey?style=for-the-badge"/> <img src="https://img.shields.io/badge/ML-Microservice-orange?style=for-the-badge\&logo=tensorflow"/> <img src="https://img.shields.io/badge/Auth-Session--Based-purple?style=for-the-badge"/> <img src="https://img.shields.io/badge/Build-Maven-red?style=for-the-badge\&logo=apachemaven"/> <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/> </p>

🧠 Overview

MediPredict Backend is a scalable Spring Boot application that powers a healthcare prediction system by integrating with an external Machine Learning microservice.



It handles:



🔐 Authentication \& session management



🤖 ML-based prediction processing



📊 Dashboard analytics



🗄️ Data persistence using H2 (in-memory DB)



🏗️ System Architecture

React Frontend

&#x20;     ↓

Spring Boot Backend

&#x20;     ↓

ML Microservice (REST API)

&#x20;     ↓

H2 Database (In-Memory)

✨ Key Features

🔐 Session-based authentication (Token + Expiry)



🤖 ML-first prediction pipeline



⚠️ Controlled fallback mechanism



📊 Dashboard analytics (trends, averages)



📦 Clean layered architecture



🧾 JSON-based request/response storage



🔍 ML health monitoring



📂 Project Structure

backend/

├── src/main/java/com/medipredict/backend

│

│   ├── config/            ⚙️ Configuration classes

│   ├── controller/        🌐 REST APIs

│   ├── domain/            🗄️ Entity models

│   ├── dto/               📦 Request/Response objects

│   ├── exception/         ❗ Global error handling

│   ├── repository/        🧩 JPA repositories

│   ├── service/           🧠 Business logic + ML integration

│   └── MediPredictApplication.java 🚀 Entry point

│

├── src/main/resources/

│   └── application.yml    ⚙️ Configuration file

│

└── pom.xml               📦 Maven dependencies

🔹 Layered Architecture

🌐 Controller Layer

Handles incoming HTTP requests and exposes REST APIs:



/api/predictions → Prediction APIs



/api/dashboard → Dashboard analytics



/api/ml → ML health \& metadata



/api/auth → Authentication



/api/user → User profile



🧠 Service Layer

📌 PredictionService

Processes prediction requests



Prepares ML features



Stores results in DB



Generates analytics



📌 MlServiceClient

Connects to ML microservice



Handles API failures



Triggers fallback logic



📌 UserService

Manages authentication



Handles session tokens



Validates users



🔄 Prediction Flow

1\. User submits input

2\. Backend validates request

3\. Features are constructed

4\. ML API is called

5\. If ML fails → fallback model used

6\. Result stored in H2 DB

7\. Response returned to frontend

⚠️ ML Fallback Strategy

The system primarily relies on an external machine learning microservice for generating predictions.

In scenarios where the ML service is unavailable or unreachable, a lightweight heuristic-based fallback mechanism is used to ensure system continuity.



These fallback predictions are explicitly marked using:



predictionSource = "fallback\_rule"



fallbackUsed = true



and are not considered part of the core ML-driven prediction pipeline.



🔐 Authentication

Session-based authentication (no JWT)



Token generated on login



Stored in database with expiry



Passed via:



Authorization: Bearer <token>

🗄️ Database (H2)

In-memory database (development mode)



No external setup required



Data resets on restart



🔎 Access H2 Console

http://localhost:8080/h2-console

📡 API Example

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

⚙️ Configuration (application.yml)

ml:

&#x20; service:

&#x20;   base-url: http://localhost:8000



spring:

&#x20; datasource:

&#x20;   url: jdbc:h2:mem:medipredict

&#x20;   driver-class-name: org.h2.Driver

&#x20;   username: sa

&#x20;   password:

🚀 Setup \& Run

\# Run Backend

mvn spring-boot:run



\# Run ML Service

python app.py



\# Run Frontend

npm install

npm run dev

🧪 Debug Logs

➡️ Calling ML API...

✅ ML prediction successful

or



❌ ML API failed → using fallback

🚨 FALLBACK MODEL EXECUTED

🚀 Future Improvements

🔄 Replace H2 with PostgreSQL (production-ready)



🔐 Add JWT authentication



⚡ Use WebClient for async ML calls



📘 Integrate Swagger API docs





