import { lazy, Suspense, Component } from "react";
import type { ReactNode } from "react";
import { BrowserRouter, useRoutes, Link } from "react-router-dom";

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
  return (
    <BrowserRouter>
      <div style={{ display: "flex", height: "100vh" }}>
        <nav style={{ 
          width: "250px", 
          backgroundColor: "#f5f5f5", 
          padding: "20px",
          borderRight: "1px solid #ddd"
        }}>
          <h3>Navigation</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <Link to="/ciso" style={{ textDecoration: "none", color: "#333" }}>
                CISO Module
              </Link>
            </li>
          </ul>
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
