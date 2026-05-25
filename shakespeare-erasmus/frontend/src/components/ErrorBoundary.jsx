import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like Sentry here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-body relative overflow-hidden">
          {/* Decorative background matching the app theme */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(236, 87, 210, 0.15), transparent 50%)'
          }}></div>
          
          <div className="relative z-10 glass-card p-10 max-w-lg mx-auto" style={{ border: '1px solid rgba(236,87,210,0.3)', borderRadius: '24px', background: 'rgba(10,5,15,0.8)', backdropFilter: 'blur(20px)' }}>
            <span className="text-6xl mb-6 block">🎭</span>
            <p className="text-[#ec57d2] uppercase tracking-widest text-xs font-bold mb-4">The Curtain Hath Fallen</p>
            <h1 className="text-3xl font-display font-black mb-4">A Technical Intermission</h1>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Alas, it seems our stagehands have encountered an unexpected snag. Fear not, for the show must go on! Let us reset the stage and begin anew.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-gradient-to-r from-[#ec57d2] to-[#7d37ff] rounded-full text-white font-bold hover:scale-105 transition-transform cursor-pointer"
            >
              Return to the Portal
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
