import { Component, type ReactNode } from "react";

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
        <div className="p-8 text-center bg-brand-gemini rounded-full-circle">    
          <h2>Service Unavailable</h2>
          <p>The remote module is currently unavailable. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RemoteErrorBoundary;