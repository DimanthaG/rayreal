import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Ray Realty UI error', error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="grid min-h-screen place-items-center bg-ice p-6 text-center">
        <div className="max-w-md">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ray Realty" className="mx-auto h-9" />
          <h1 className="mt-8 text-2xl font-light tracking-tight">Something went wrong on this page.</h1>
          <p className="mt-2 text-sm text-muted">Please reload. If it keeps happening, call us on +94 77 772 7527.</p>
          <button type="button" onClick={() => window.location.reload()} className="btn-plain mt-6 bg-navy text-white">Reload page</button>
        </div>
      </div>
    );
  }
}
