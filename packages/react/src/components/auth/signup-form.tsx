'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SignupFormProps {
  /** 폼 제목 */
  title?: string;
  /** 폼 부제목 */
  subtitle?: string;
  /** Google OAuth 버튼 표시 여부 */
  showGoogleOAuth?: boolean;
  /** 이름 필드 표시 여부 */
  showNameField?: boolean;
  /** 로그인 안내 텍스트 */
  loginText?: string;
  /** 로그인 링크 텍스트 */
  loginLinkText?: string;
  /** 회원가입 버튼 텍스트 */
  submitText?: string;
  /** 로딩 중 버튼 텍스트 */
  loadingText?: string;
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string;
  /** 폼 제출 핸들러 */
  onSubmit?: (data: { email: string; password: string; name?: string }) => void | Promise<void>;
  /** Google OAuth 클릭 핸들러 */
  onGoogleClick?: () => void;
  /** 로그인 클릭 핸들러 */
  onLoginClick?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 로고 컴포넌트 */
  logo?: React.ReactNode;
  /** 다크 모드 여부 */
  dark?: boolean;
  /** 브랜드 색상 */
  brandColor?: string;
  /** 전체 페이지 모드 (min-h-screen 적용) */
  fullPage?: boolean;
}

export function SignupForm({
  title = 'Create an account',
  subtitle = 'Enter your details to get started',
  showGoogleOAuth = true,
  showNameField = true,
  loginText = 'Already have an account?',
  loginLinkText = 'Sign in',
  submitText = 'Sign up',
  loadingText = 'Creating account...',
  isLoading = false,
  error,
  onSubmit,
  onGoogleClick,
  onLoginClick,
  className,
  logo,
  dark = true,
  brandColor = '#3ecf8e',
  fullPage = true,
}: SignupFormProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit({
        email,
        password,
        ...(showNameField && { name }),
      });
    }
  };

  const bgColor = dark ? '#1c1c1c' : '#ffffff';
  const textColor = dark ? '#ffffff' : '#1c1c1c';
  const subtitleColor = dark ? '#8f8f8f' : '#666666';
  const inputBg = dark ? '#2a2a2a' : '#f5f5f5';
  const inputBorder = dark ? '#3a3a3a' : '#e5e5e5';
  const buttonBg = dark ? '#2a2a2a' : '#f5f5f5';
  const buttonBorder = dark ? '#3a3a3a' : '#e5e5e5';

  return (
    <div
      className={cn(fullPage && 'min-h-screen', 'w-full', className)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="mx-auto max-w-md px-8 py-12">
        {/* Logo */}
        {logo && <div className="mb-16">{logo}</div>}

        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-3xl font-semibold mb-2"
            style={{ color: textColor }}
          >
            {title}
          </h1>
          <p style={{ color: subtitleColor }}>{subtitle}</p>
        </div>

        {/* OAuth Buttons */}
        {showGoogleOAuth && (
          <div className="space-y-3 mb-8">
            <button
              type="button"
              onClick={onGoogleClick}
              disabled={isLoading}
              className="w-full h-12 rounded-md flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
              style={{
                backgroundColor: buttonBg,
                border: `1px solid ${buttonBorder}`,
                color: textColor,
              }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
          </div>
        )}

        {/* Divider */}
        {showGoogleOAuth && (
          <div className="flex items-center justify-center mb-8">
            <span style={{ color: subtitleColor }} className="text-sm">or</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="mb-6 rounded-md p-3 text-sm"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {showNameField && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
                style={{ color: textColor }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full h-11 px-4 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 disabled:opacity-50"
                style={{
                  backgroundColor: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: textColor,
                  '--tw-ring-color': brandColor,
                } as React.CSSProperties}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: textColor }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full h-11 px-4 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 disabled:opacity-50"
              style={{
                backgroundColor: inputBg,
                border: `1px solid ${inputBorder}`,
                color: textColor,
                '--tw-ring-color': brandColor,
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: textColor }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={isLoading}
                className="w-full h-11 px-4 pr-12 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 disabled:opacity-50"
                style={{
                  backgroundColor: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: textColor,
                  '--tw-ring-color': brandColor,
                } as React.CSSProperties}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: subtitleColor }}
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 rounded-md text-sm font-medium transition-all disabled:opacity-50"
            style={{
              backgroundColor: brandColor,
              color: dark ? '#000000' : '#ffffff',
            }}
          >
            {isLoading ? loadingText : submitText}
          </button>
        </form>

        {/* Login link */}
        <div className="mt-8 text-center">
          <p style={{ color: subtitleColor }} className="text-sm">
            {loginText}{' '}
            <button
              type="button"
              onClick={onLoginClick}
              className="font-medium underline transition-colors"
              style={{ color: textColor }}
            >
              {loginLinkText}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
