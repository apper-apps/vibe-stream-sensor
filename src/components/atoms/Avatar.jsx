import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Avatar = forwardRef(({ 
  src, 
  alt, 
  size = "md", 
  className,
  fallback,
  ...props 
}, ref) => {
  const sizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
    "2xl": "text-xl",
  };

  if (src) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover border-2 border-white shadow-sm",
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold border-2 border-white shadow-sm",
        sizes[size],
        textSizes[size],
        className
      )}
      {...props}
    >
      {fallback || "?"}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;