import * as React from 'react';
import { cn } from '../../lib/utils';

function Label(
  { className, ...props }: React.ComponentProps<'label'>,
  ref: React.ForwardedRef<HTMLLabelElement>
) {
  return (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
}

Label.displayName = 'Label';

const ForwardedLabel = React.forwardRef(Label);

export { ForwardedLabel as Label };
