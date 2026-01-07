---
name: component-dev
description: React 컴포넌트 개발 스킬. 컴포넌트 템플릿, 패턴, 작성 규칙을 제공한다.
---

# Component Development Skill

React 컴포넌트 개발을 위한 템플릿과 패턴을 제공합니다.

## 컴포넌트 유형별 템플릿

### 1. 기본 컴포넌트 (Simple)

단순한 wrapper 컴포넌트에 사용:

```tsx
import * as React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

function Card(
  { className, ...props }: CardProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-card text-card-foreground", className)}
      {...props}
    />
  );
}

Card.displayName = "Card";
export const ForwardedCard = React.forwardRef(Card);
export { ForwardedCard as Card };
```

### 2. Variant 컴포넌트 (CVA)

여러 스타일 변형이 필요한 컴포넌트:

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

function Button(
  { className, variant, size, loading, disabled, children, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="animate-spin mr-2">...</span> : null}
      {children}
    </button>
  );
}

Button.displayName = "Button";
export const ForwardedButton = React.forwardRef(Button);
export { ForwardedButton as Button, buttonVariants };
```

### 3. Radix 기반 컴포넌트

Radix UI primitives를 wrapping:

```tsx
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

function DialogOverlay(
  { className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
  ref: React.ForwardedRef<React.ElementRef<typeof DialogPrimitive.Overlay>>
) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out",
        className
      )}
      {...props}
    />
  );
}

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const ForwardedDialogOverlay = React.forwardRef(DialogOverlay);

function DialogContent(
  { className, children, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  ref: React.ForwardedRef<React.ElementRef<typeof DialogPrimitive.Content>>
) {
  return (
    <DialogPortal>
      <ForwardedDialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
          "w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

DialogContent.displayName = DialogPrimitive.Content.displayName;
const ForwardedDialogContent = React.forwardRef(DialogContent);

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  ForwardedDialogOverlay as DialogOverlay,
  ForwardedDialogContent as DialogContent,
};
```

### 4. Compound 컴포넌트

여러 하위 컴포넌트로 구성:

```tsx
import * as React from "react";
import { cn } from "../../lib/utils";

// Context
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("useTabs must be used within Tabs");
  return context;
}

// Root
interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

// List
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1", className)}
      {...props}
    />
  );
}

// Trigger
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function TabsTrigger({ value, className, ...props }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabs();
  const isSelected = selectedValue === value;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium transition-all",
        isSelected && "bg-background text-foreground shadow-sm",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    />
  );
}

// Content
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: selectedValue } = useTabs();
  if (selectedValue !== value) return null;

  return <div className={cn("mt-2", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

## Import 패턴

### 필수 import

```tsx
import * as React from "react";
import { cn } from "../../lib/utils";
```

### CVA 사용 시

```tsx
import { cva, type VariantProps } from "class-variance-authority";
```

### Radix 사용 시

```tsx
import * as ComponentPrimitive from "@radix-ui/react-component";
```

## 체크리스트

```
[ ] Props 인터페이스 export (ComponentNameProps)
[ ] forwardRef 사용 (DOM 요소 반환 시)
[ ] displayName 설정
[ ] cn() 유틸리티로 className 병합
[ ] 기존 HTML attributes 확장 (extends React.HTMLAttributes<>)
[ ] Breaking change 없음
```
