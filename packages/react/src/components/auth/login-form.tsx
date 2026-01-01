'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export type OAuthProvider = 'google' | 'github' | 'sso';

export interface OAuthButtonConfig {
  provider: OAuthProvider;
  label?: string;
  lastUsed?: boolean;
  onClick?: () => void;
}

export interface LoginFormTheme {
  pageBackground?: string;
  cardBackground?: string;
  foreground?: string;
  muted?: string;
  inputBackground?: string;
  inputBorder?: string;
  oauthButtonBackground?: string;
  oauthButtonBorder?: string;
  primary?: string;
  primaryForeground?: string;
  error?: string;
  errorBackground?: string;
  ring?: string;
  link?: string;
  badgeBackground?: string;
  badgeForeground?: string;
}

export const loginFormThemes = {
  ngrok: {
    pageBackground: '#13171f',
    cardBackground: '#1a1f2e',
    foreground: '#ffffff',
    muted: '#8b95a5',
    inputBackground: '#13171f',
    inputBorder: '#2d3548',
    oauthButtonBackground: '#1a1f2e',
    oauthButtonBorder: '#2d3548',
    primary: '#4d9aff',
    primaryForeground: '#ffffff',
    error: '#f85149',
    errorBackground: 'rgba(248, 81, 73, 0.1)',
    ring: '#4d9aff',
    link: '#4d9aff',
    badgeBackground: '#4d9aff',
    badgeForeground: '#ffffff',
  } satisfies LoginFormTheme,
} as const;

export interface LoginFormProps {
  oauthButtons?: OAuthButtonConfig[];
  showForgotPassword?: boolean;
  signupText?: string;
  signupLinkText?: string;
  submitText?: string;
  loadingText?: string;
  isLoading?: boolean;
  error?: string;
  onSubmit?: (email: string, password: string) => void | Promise<void>;
  onGoogleClick?: () => void;
  onGithubClick?: () => void;
  onSsoClick?: () => void;
  onSignupClick?: () => void;
  onForgotPasswordClick?: () => void;
  onLogoClick?: () => void;
  className?: string;
  logo?: React.ReactNode;
  fullPage?: boolean;
  theme?: LoginFormTheme;
  footer?: React.ReactNode;
  useCard?: boolean;
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function SsoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

export function LoginForm({
  oauthButtons,
  showForgotPassword = true,
  signupText = "Don't have an account?",
  signupLinkText = 'Sign up for free!',
  submitText = 'Log in',
  loadingText = 'Logging in...',
  isLoading = false,
  error,
  onSubmit,
  onGoogleClick,
  onGithubClick,
  onSsoClick,
  onSignupClick,
  onForgotPasswordClick,
  onLogoClick,
  className,
  logo,
  fullPage = true,
  theme = loginFormThemes.ngrok,
  footer,
  useCard = true,
}: LoginFormProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(email, password);
    }
  };

  const t = { ...loginFormThemes.ngrok, ...theme };

  const getOAuthHandler = (provider: OAuthProvider, config?: OAuthButtonConfig) => {
    if (config?.onClick) return config.onClick;
    switch (provider) {
      case 'github': return onGithubClick;
      case 'google': return onGoogleClick;
      case 'sso': return onSsoClick;
      default: return undefined;
    }
  };

  const getOAuthIcon = (provider: OAuthProvider) => {
    switch (provider) {
      case 'github': return <GitHubIcon className="w-5 h-5" />;
      case 'google': return <GoogleIcon className="w-5 h-5" />;
      case 'sso': return <SsoIcon className="w-5 h-5" />;
    }
  };

  const getOAuthLabel = (provider: OAuthProvider, customLabel?: string) => {
    if (customLabel) return customLabel;
    switch (provider) {
      case 'github': return 'Log in with GitHub';
      case 'google': return 'Log in with Google';
      case 'sso': return 'Log in with SSO';
    }
  };

  const buttons = oauthButtons || [];
  const hasOAuth = buttons.length > 0;

  return (
    <div
      className={cn(
        fullPage && 'min-h-screen flex flex-col items-center justify-center',
        className
      )}
      style={{ backgroundColor: t.pageBackground, padding: '16px' }}
    >
      {/* Logo */}
      {logo && (
        <div
          style={{ marginBottom: '40px', cursor: onLogoClick ? 'pointer' : 'default' }}
          onClick={onLogoClick}
        >
          {logo}
        </div>
      )}

      {/* Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: useCard ? t.cardBackground : 'transparent',
          border: useCard ? `1px solid ${t.inputBorder}` : 'none',
          borderRadius: '8px',
          padding: useCard ? '32px' : '0',
        }}
      >
        {/* OAuth Buttons */}
        {hasOAuth && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {buttons.map((config) => (
              <button
                key={config.provider}
                type="button"
                onClick={getOAuthHandler(config.provider, config)}
                disabled={isLoading}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '48px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  backgroundColor: t.oauthButtonBackground,
                  border: `1px solid ${t.oauthButtonBorder}`,
                  color: t.foreground,
                  cursor: 'pointer',
                  transition: 'border-color 0.15s',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = t.muted || '';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = t.oauthButtonBorder || '';
                }}
              >
                {getOAuthIcon(config.provider)}
                <span>{getOAuthLabel(config.provider, config.label)}</span>
                {config.lastUsed && (
                  <span
                    style={{
                      position: 'absolute',
                      right: '12px',
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 500,
                      backgroundColor: t.badgeBackground,
                      color: t.badgeForeground,
                    }}
                  >
                    Last used
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Divider */}
        {hasOAuth && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: t.inputBorder }} />
            <span style={{ fontSize: '14px', color: t.muted }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: t.inputBorder }} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            style={{
              marginBottom: '16px',
              borderRadius: '6px',
              padding: '12px 16px',
              fontSize: '14px',
              backgroundColor: t.errorBackground,
              color: t.error,
              border: `1px solid ${t.error}30`,
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '8px',
                color: t.foreground,
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              style={{
                width: '100%',
                height: '48px',
                padding: '0 12px',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: t.inputBackground,
                border: `1px solid ${t.inputBorder}`,
                color: t.foreground,
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = t.ring || '';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = t.inputBorder || '';
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label
                htmlFor="password"
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: t.foreground,
                }}
              >
                Password
              </label>
              {showForgotPassword && (
                <button
                  type="button"
                  onClick={onForgotPasswordClick}
                  style={{
                    fontSize: '14px',
                    color: t.muted,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 48px 0 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: t.inputBackground,
                  border: `1px solid ${t.inputBorder}`,
                  color: t.foreground,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = t.ring || '';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = t.inputBorder || '';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: t.muted,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              height: '48px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              backgroundColor: t.primary,
              color: t.primaryForeground,
              border: 'none',
              cursor: 'pointer',
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {isLoading ? loadingText : submitText}
          </button>
        </form>

        {/* Sign up link */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: t.foreground }}>
            {signupText}{' '}
            <button
              type="button"
              onClick={onSignupClick}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: t.link,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {signupLinkText}
            </button>
          </span>
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div style={{ marginTop: '40px', fontSize: '14px', color: t.muted }}>
          {footer}
        </div>
      )}
    </div>
  );
}
