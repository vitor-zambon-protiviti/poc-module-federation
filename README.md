# 🧩 Module Federation POC

This repository demonstrates a **Proof of Concept (POC)** using **Module Federation** with **Vite** to share components between multiple frontend applications.

---

## 🚀 Getting Started

Follow the steps below to run the POC locally.

### 1️⃣ Run the **remote app** (`ciso`)

```bash
cd ciso
npm install
npm run build:preview
```

The `ciso` app will be available at:  
👉 [http://localhost:5001](http://localhost:5001)

---

### 2️⃣ Run the **host app** (`shell`)

In a new terminal:

```bash
cd shell
npm install
npm run build:preview
```

This will start the **shell** application (the host) in development mode.

---

## 🌐 Access the Application

Once both are running, open your browser and go to:  
👉 [http://localhost:5000](http://localhost:5000)

You should see the remote module (`ciso`) loaded into the host (`shell`).

---

## 🧠 Notes

- `ciso` acts as the **remote** exposing its components.
- `shell` acts as the **host** consuming the remote components dynamically.
- Ensure both apps are running for the federation to work properly.
- This setup uses **Vite Plugin Federation** under the hood.
- `shell` uses **'check-sso'**, which means it will **check for an existing Keycloak session** without forcing a login. To test login manually, you can access the Keycloak account console: [http://localhost:8081/realms/protiviti/account](http://localhost:8081/realms/protiviti/account)
- `ciso` uses **'login-required'**, which means it will **automatically redirect to Keycloak login** if the user is not authenticated.

---

## 🧹 Common Commands

| Command                 | Description                 |
| ----------------------- | --------------------------- |
| `npm run build:preview` | Builds and starts a preview |
