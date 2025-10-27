# 🧩 Module Federation POC

This repository demonstrates a **Proof of Concept (POC)** using **Module Federation** with **Vite** to share components between multiple frontend applications.

---

## 🚀 Getting Started

Follow the steps below to run the POC locally.

### 1️⃣ Run the **remote app** (`ciso`)

```bash
cd ciso
npm install
npm run build
npm run preview -- --port=5001
```

The `ciso` app will be available at:  
👉 [http://localhost:5001](http://localhost:5001)

---

### 2️⃣ Run the **host app** (`shell`)

In a new terminal:

```bash
cd shell
npm install
npm run dev
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

---

## 🧹 Common Commands

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Starts the app in development mode  |
| `npm run build`   | Builds the app for production       |
| `npm run preview` | Serves the production build locally |
