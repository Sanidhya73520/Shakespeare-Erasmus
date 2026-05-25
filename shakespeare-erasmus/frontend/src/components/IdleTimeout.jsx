import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const IdleTimeout = ({ children, timeoutMs = 120000 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If we are already on the home page, no need to timeout and redirect to home
    if (location.pathname === '/') return;

    let timeoutId;

    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        // Automatically redirect to home page and optionally reload to reset all state
        console.log("Kiosk idle timeout reached. Resetting stage...");
        window.location.href = '/'; 
      }, timeoutMs);
    };

    // Listeners for user activity
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    
    events.forEach(event => {
      window.addEventListener(event, resetTimeout, { passive: true });
    });

    // Initial setup
    resetTimeout();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, resetTimeout);
      });
    };
  }, [location.pathname, timeoutMs]);

  return <>{children}</>;
};

export default IdleTimeout;
