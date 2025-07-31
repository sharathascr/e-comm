import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("error caught", error, errorInfo);
  }
  render() {
    if (this.state.error) {
      return (
        <div>
          <p>Something went wrong</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
