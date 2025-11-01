import { Suspense } from "react";
import { BrowserRouter, useRoutes, Link } from "react-router-dom";
import { useAuth } from "./modules/auth";
import { keycloak } from "./modules/auth/services/keycloak";
import RemoteErrorBoundary from "./lib/components/remote-error";
import routes from "./routes";

function ShellApp() {
  const element = useRoutes(routes);

  return element;
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
      <div style={{ display: "flex", height: "100vh" }}>
        <nav style={{ 
          width: "250px", 
          backgroundColor: "#f5f5f5", 
          padding: "20px",
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column"
        }}>
          <h3>Navigation</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <Link to="/ciso" style={{ textDecoration: "none", color: "#333" }}>
                CISO Module
              </Link>
            </li>
          </ul>
            {/* Logout button */}
            <div style={{ marginTop: "auto", paddingTop: "20px" }}>
              <button onClick={() => keycloak.logout()} style={{ width: "100%" }}>
                Logout
              </button>
            </div>
        </nav>
        
        <main style={{ flex: 1, padding: "20px" }}>
          <RemoteErrorBoundary>
            <Suspense fallback={<div>Loading remote...</div>}>
              <ShellApp />
            </Suspense>
          </RemoteErrorBoundary>
        </main>
      </div>
    </BrowserRouter>
  );
}
