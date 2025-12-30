'use client';

import * as React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Separator } from '../ui/separator';
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
}

export function SignupForm({
  title = '회원가입',
  subtitle = '새 계정을 만드세요',
  showGoogleOAuth = true,
  showNameField = true,
  loginText = '이미 계정이 있으신가요?',
  loginLinkText = '로그인',
  submitText = '회원가입',
  loadingText = '가입 중...',
  isLoading = false,
  error,
  onSubmit,
  onGoogleClick,
  onLoginClick,
  className,
  logo,
}: SignupFormProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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

  return (
    <Card className={cn('w-full max-w-md', className)}>
      <CardHeader className="text-center">
        {logo && <div className="mx-auto mb-4">{logo}</div>}
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {showGoogleOAuth && (
          <>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onGoogleClick}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google로 계속하기
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">또는</span>
              </div>
            </div>
          </>
        )}

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {showNameField && (
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="6자 이상 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? loadingText : submitText}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {loginText}{' '}
          <button
            type="button"
            onClick={onLoginClick}
            className="font-semibold text-primary hover:underline"
          >
            {loginLinkText}
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}
