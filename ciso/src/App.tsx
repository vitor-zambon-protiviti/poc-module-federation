import { BrowserRouter, useRoutes, Link } from "react-router-dom";
import { routes } from "./routes";
import { useAuth } from "shell/auth";

function RemoteApp() {
  const element = useRoutes(routes);
  return element;
}

function Sidebar() {
  return (
    <nav className="w-64 h-screen bg-gray-100 p-4">
      <ul className="space-y-2">
        <li>
          <Link to="/ciso/">Home</Link>
        </li>
        <li>
          <Link to="/ciso/about">About</Link>
        </li>
        <li>
        </li>
      </ul>
    </nav>
  );
}

function AppContent() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <RemoteApp />
      </main>
    </div>
  );
}

export default function App() {
  const { authenticated, loading } = useAuth();

  if (loading) return <div>Carregando login...</div>;

  if(!authenticated) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Access Denied</h2>
        <p>You must be logged in to access this application.</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
