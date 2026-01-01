/**
 * @studio-ui/react
 * React UI components for Studio UI Design System
 */

// Utilities
export { cn } from './lib/utils';

// Providers
export { ThemeProvider, useTheme } from './providers/theme-provider';

// UI Components (Common - 모든 프로젝트에서 사용)
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  // Custom Components
  InlineSelect,
  FileUploader,
  SectionHeader,
} from './components/ui';

export type { BadgeProps, InlineSelectProps, FileUploaderProps, SectionHeaderProps } from './components/ui';

// Auth Components (Common - 모든 프로젝트에서 사용)
export { LoginForm, SignupForm } from './components/auth';
export type { LoginFormProps, SignupFormProps } from './components/auth';
