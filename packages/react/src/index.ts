/**
 * @studio-ui/react
 * React UI components for Studio UI Design System
 */

// Utilities
export { cn } from './lib/utils';

// Providers
export { ThemeProvider, useTheme } from './providers/theme-provider';

// UI Components
export {
  Button,
  buttonVariants,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  Input,
  Badge,
  badgeVariants,
  Label,
  Separator,
} from './components/ui';

export type { BadgeProps } from './components/ui';

// Auth Components
export { LoginForm, SignupForm } from './components/auth';
export type { LoginFormProps, SignupFormProps } from './components/auth';
