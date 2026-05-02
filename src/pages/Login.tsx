import { useState } from 'react';
import { Link2, ArrowRight, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="app-container login-page">
      <div className="bg-glow"></div>
      
      <header className="animate-fade-in">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
          <Link2 size={28} style={{ color: 'var(--accent-primary)' }} />
          <span>Minify</span>
        </Link>
      </header>

      <main className="login-main">
        <div className="login-box glass-panel animate-fade-in delay-100">
          <div className="login-header">
            <h2>Welcome back</h2>
            <p>Log in to manage your short links and analytics</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper login-input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  id="email"
                  className="input-field" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              <div className="input-wrapper login-input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  id="password"
                  className="input-field" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary login-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <a href="#">Sign up</a></p>
          </div>
        </div>
      </main>
    </div>
  );
}
