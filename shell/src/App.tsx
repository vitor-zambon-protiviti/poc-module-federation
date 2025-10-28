import { lazy, Suspense, Component } from "react";
import type { ReactNode } from "react";
import { BrowserRouter, useRoutes, Link } from "react-router-dom";
import { useAuth } from "./modules/auth";
import { keycloak } from "./modules/auth/services/keycloak";

// Error Boundary Component
class RemoteErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Remote module failed to load:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Service Unavailable</h2>
          <p>The remote module is currently unavailable. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const Ciso = lazy(() => 
  import("ciso/Main").catch(() => ({
    default: () => (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Service Unavailable</h2>
        <p>The CISO module is currently unavailable. Please try again later.</p>
      </div>
    )
  }))
);

const routes = [
  { path: "/ciso/*", element: <Ciso /> },
];

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
