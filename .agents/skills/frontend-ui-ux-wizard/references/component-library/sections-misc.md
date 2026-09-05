# Sections Misc — Component Library Reference

**Source:** components adapted from [React Bits](https://reactbits.dev) and [Svelte Bits](https://sveltebits.xyz) (both by DavidHDev). React Bits is licensed **MIT + Commons Clause** — free to use, modify, and distribute in your own projects (personal or commercial), but the library itself cannot be resold as a standalone product. Svelte Bits is built incrementally from React Bits by the same author and is presumed to carry similar terms; verify at the source if that matters for your use case. This reference bundle is included here for free, under Qofeno's own MIT-licensed repo, as build material for websites, not as a resold library.

---

name: popover notifications
code: You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
popover.tsx
"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    showArrow?: boolean;
  }
>(({ className, align = "center", sideOffset = 4, showArrow = false, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-popover-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg shadow-black/5 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {props.children}
      {showArrow && (
        <PopoverPrimitive.Arrow className="-my-px fill-popover drop-shadow-[0_1px_0_hsl(var(--border))]" />
      )}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };


demo.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { useState } from "react";

const initialNotifications = [
  {
    id: 1,
    user: "Chris Tompson",
    action: "requested review on",
    target: "PR #42: Feature implementation",
    timestamp: "15 minutes ago",
    unread: true,
  },
  {
    id: 2,
    user: "Emma Davis",
    action: "shared",
    target: "New component library",
    timestamp: "45 minutes ago",
    unread: true,
  },
  {
    id: 3,
    user: "James Wilson",
    action: "assigned you to",
    target: "API integration task",
    timestamp: "4 hours ago",
    unread: false,
  },
  {
    id: 4,
    user: "Alex Morgan",
    action: "replied to your comment in",
    target: "Authentication flow",
    timestamp: "12 hours ago",
    unread: false,
  },
  {
    id: 5,
    user: "Sarah Chen",
    action: "commented on",
    target: "Dashboard redesign",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    user: "Miky Derya",
    action: "mentioned you in",
    target: "Origin UI open graph image",
    timestamp: "2 weeks ago",
    unread: false,
  },
];

function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

function Component() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification,
      ),
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline" className="relative" aria-label="Open notifications">
          <Bell size={16} strokeWidth={2} aria-hidden="true" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {unreadCount > 0 && (
            <button className="text-xs font-medium hover:underline" onClick={handleMarkAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="-mx-1 my-1 h-px bg-border"
        ></div>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
          >
            <div className="relative flex items-start pe-3">
              <div className="flex-1 space-y-1">
                <button
                  className="text-left text-foreground/80 after:absolute after:inset-0"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <span className="font-medium text-foreground hover:underline">
                    {notification.user}
                  </span>{" "}
                  {notification.action}{" "}
                  <span className="font-medium text-foreground hover:underline">
                    {notification.target}
                  </span>
                  .
                </button>
                <div className="text-xs text-muted-foreground">{notification.timestamp}</div>
              </div>
              {notification.unread && (
                <div className="absolute end-0 self-center">
                  <span className="sr-only">Unread</span>
                  <Dot />
                </div>
              )}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export { Component };

```

Copy-paste these files for dependencies:
```tsx
shadcn/badge
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```
```tsx
originui/button
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

```

Install NPM dependencies:
```bash
@radix-ui/react-popover, class-variance-authority, @radix-ui/react-slot
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

---

name: team invitation
code: You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
team-invitation.tsx
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";

export function TeamInvitation() {
    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-[0_1px_6px_0_rgba(0,0,0,0.02)] rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 flex-shrink-0">
                        <Image
                            src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
                            alt="Sarah Chen"
                            sizes="40px"
                            fill
                            className="rounded-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-zinc-950" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Team Invitation
                                </p>
                                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Kokonut invited you to join{" "}
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                        Design Team
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="rounded-lg flex items-center justify-center h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-950/50 text-zinc-400 hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            className={cn(
                                "rounded-lg flex items-center justify-center h-8 w-8 p-0",
                                "hover:bg-emerald-50 dark:hover:bg-emerald-950/50",
                                "text-zinc-400 hover:text-emerald-600",
                                "dark:text-zinc-500 dark:hover:text-emerald-400",
                                "transition-colors"
                            )}
                        >
                            <Check className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="mt-2 ml-14">
                    <p className="text-[12px] text-zinc-400 dark:text-zinc-500">
                        Invited 5 minutes ago
                    </p>
                </div>
            </div>
        </div>
    );
}

export { TeamInvitation }


demo.tsx
import { TeamInvitation } from "@/components/ui/team-invitation";
import { LucideIcon } from "lucide-react";


export function DemoTeamInvitation() {
    return <TeamInvitation />
}

export { DemoTeamInvitation }
```

Install NPM dependencies:
```bash
lucide-react
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

---

name: sign flow
code: You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
sign-in-flow-1.tsx
"use client";

import React, { useState,useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import * as THREE from "three";

type Uniforms = {
  [key: string]: {
    value: number[] | number[][] | number;
    type: string;
  };
};

interface ShaderProps {
  source: string;
  uniforms: {
    [key: string]: {
      value: number[] | number[][] | number;
      type: string;
    };
  };
  maxFps?: number;
}

interface SignInPageProps {
  className?: string;
}
      
export const CanvasRevealEffect = ({
  animationSpeed = 10,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
  reverse = false, // This controls the direction
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
  reverse?: boolean; // This prop determines the direction
}) => {
  return (
    <div className={cn("h-full relative w-full", containerClassName)}> {/* Removed bg-white */}
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={
            opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
          }
          // Pass reverse state and speed via string flags in the empty shader prop
          shader={`
            ${reverse ? 'u_reverse_active' : 'false'}_;
            animation_speed_factor_${animationSpeed.toFixed(1)}_;
          `}
          center={["x", "y"]}
        />
      </div>
      {showGradient && (
        // Adjust gradient colors if needed based on background (was bg-white, now likely uses containerClassName bg)
        // Example assuming a dark background like the SignInPage uses:
         <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      )}
    </div>
  );
};

    
interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader?: string;
  center?: ("x" | "y")[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 20,
  dotSize = 2,
  shader = "", // This shader string will now contain the animation logic
  center = ["x", "y"],
}) => {
  // ... uniforms calculation remains the same for colors, opacities, etc.
  const uniforms = React.useMemo(() => {
    let colorsArray = [
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
    ];
    if (colors.length === 2) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[1],
      ];
    } else if (colors.length === 3) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[2],
        colors[2],
      ];
    }
    return {
      u_colors: {
        value: colorsArray.map((color) => [
          color[0] / 255,
          color[1] / 255,
          color[2] / 255,
        ]),
        type: "uniform3fv",
      },
      u_opacities: {
        value: opacities,
        type: "uniform1fv",
      },
      u_total_size: {
        value: totalSize,
        type: "uniform1f",
      },
      u_dot_size: {
        value: dotSize,
        type: "uniform1f",
      },
      u_reverse: {
        value: shader.includes("u_reverse_active") ? 1 : 0, // Convert boolean to number (1 or 0)
        type: "uniform1i", // Use 1i for bool in WebGL1/GLSL100, or just bool for GLSL300+ if supported
      },
    };
  }, [colors, opacities, totalSize, dotSize, shader]); // Add shader to dependencies

  return (
    <Shader
      // The main animation logic is now built *outside* the shader prop
      source={`
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        uniform int u_reverse; // Changed from bool to int

        out vec4 fragColor;

        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
            vec2 st = fragCoord.xy;
            ${
              center.includes("x")
                ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
            ${
              center.includes("y")
                ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }

            float opacity = step(0.0, st.x);
            opacity *= step(0.0, st.y);

            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

            float frequency = 5.0;
            float show_offset = random(st2); // Used for initial opacity random pick and color
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

            vec3 color = u_colors[int(show_offset * 6.0)];

            // --- Animation Timing Logic ---
            float animation_speed_factor = 0.5; // Extract speed from shader string
            vec2 center_grid = u_resolution / 2.0 / u_total_size;
            float dist_from_center = distance(center_grid, st2);

            // Calculate timing offset for Intro (from center)
            float timing_offset_intro = dist_from_center * 0.01 + (random(st2) * 0.15);

            // Calculate timing offset for Outro (from edges)
            // Max distance from center to a corner of the grid
            float max_grid_dist = distance(center_grid, vec2(0.0, 0.0));
            float timing_offset_outro = (max_grid_dist - dist_from_center) * 0.02 + (random(st2 + 42.0) * 0.2);


            float current_timing_offset;
            if (u_reverse == 1) {
                current_timing_offset = timing_offset_outro;
                 // Outro logic: opacity starts high, goes to 0 when time passes offset
                 opacity *= 1.0 - step(current_timing_offset, u_time * animation_speed_factor);
                 // Clamp for fade-out transition
                 opacity *= clamp((step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            } else {
                current_timing_offset = timing_offset_intro;
                 // Intro logic: opacity starts 0, goes to base opacity when time passes offset
                 opacity *= step(current_timing_offset, u_time * animation_speed_factor);
                 // Clamp for fade-in transition
                 opacity *= clamp((1.0 - step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            }


            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a; // Premultiply alpha
        }`}
      uniforms={uniforms}
      maxFps={60}
    />
  );
};


const ShaderMaterial = ({
  source,
  uniforms,
  maxFps = 60,
}: {
  source: string;
  hovered?: boolean;
  maxFps?: number;
  uniforms: Uniforms;
}) => {
  const { size } = useThree();
  const ref = useRef<THREE.Mesh>(null);
  let lastFrameTime = 0;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const timestamp = clock.getElapsedTime();

    lastFrameTime = timestamp;

    const material: any = ref.current.material;
    const timeLocation = material.uniforms.u_time;
    timeLocation.value = timestamp;
  });

  const getUniforms = () => {
    const preparedUniforms: any = {};

    for (const uniformName in uniforms) {
      const uniform: any = uniforms[uniformName];

      switch (uniform.type) {
        case "uniform1f":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1f" };
          break;
        case "uniform1i":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1i" };
          break;
        case "uniform3f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector3().fromArray(uniform.value),
            type: "3f",
          };
          break;
        case "uniform1fv":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1fv" };
          break;
        case "uniform3fv":
          preparedUniforms[uniformName] = {
            value: uniform.value.map((v: number[]) =>
              new THREE.Vector3().fromArray(v)
            ),
            type: "3fv",
          };
          break;
        case "uniform2f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector2().fromArray(uniform.value),
            type: "2f",
          };
          break;
        default:
          console.error(`Invalid uniform type for '${uniformName}'.`);
          break;
      }
    }

    preparedUniforms["u_time"] = { value: 0, type: "1f" };
    preparedUniforms["u_resolution"] = {
      value: new THREE.Vector2(size.width * 2, size.height * 2),
    }; // Initialize u_resolution
    return preparedUniforms;
  };

  // Shader material
  const material = useMemo(() => {
    const materialObject = new THREE.ShaderMaterial({
      vertexShader: `
      precision mediump float;
      in vec2 coordinates;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main(){
        float x = position.x;
        float y = position.y;
        gl_Position = vec4(x, y, 0.0, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }
      `,
      fragmentShader: source,
      uniforms: getUniforms(),
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
    });

    return materialObject;
  }, [size.width, size.height, source]);

  return (
    <mesh ref={ref as any}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Shader: React.FC<ShaderProps> = ({ source, uniforms, maxFps = 60 }) => {
  return (
    <Canvas className="absolute inset-0  h-full w-full">
      <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
    </Canvas>
  );
};

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const defaultTextColor = 'text-gray-300';
  const hoverTextColor = 'text-white';
  const textSizeClass = 'text-sm';

  return (
    <a href={href} className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </a>
  );
};

function MiniNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <div className="relative w-5 h-5 flex items-center justify-center">
    <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 top-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
    <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 left-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
    <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 right-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
    <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 bottom-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
 </div>
  );

  const navLinksData = [
    { label: 'Manifesto', href: '#1' },
    { label: 'Careers', href: '#2' },
    { label: 'Discover', href: '#3' },
  ];

  const loginButtonElement = (
    <button className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 w-full sm:w-auto">
      LogIn
    </button>
  );

  const signupButtonElement = (
    <div className="relative group w-full sm:w-auto">
       <div className="absolute inset-0 -m-2 rounded-full
                     hidden sm:block
                     bg-gray-100
                     opacity-40 filter blur-lg pointer-events-none
                     transition-all duration-300 ease-out
                     group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"></div>
       <button className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200 w-full sm:w-auto">
         Signup
       </button>
    </div>
  );

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20
                       flex flex-col items-center
                       pl-6 pr-6 py-3 backdrop-blur-sm
                       ${headerShapeClass}
                       border border-[#333] bg-[#1f1f1f57]
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-[border-radius] duration-0 ease-in-out`}>

      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">
           {logoElement}
        </div>

        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          {loginButtonElement}
          {signupButtonElement}
        </div>

        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
          {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? 'max-h-[1000px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors w-full text-center">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          {loginButtonElement}
          {signupButtonElement}
        </div>
      </div>
    </header>
  );
}

export const SignInPage = ({ className }: SignInPageProps) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "success">("email");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [initialCanvasVisible, setInitialCanvasVisible] = useState(true);
  const [reverseCanvasVisible, setReverseCanvasVisible] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep("code");
    }
  };

  // Focus first input when code screen appears
  useEffect(() => {
    if (step === "code") {
      setTimeout(() => {
        codeInputRefs.current[0]?.focus();
      }, 500);
    }
  }, [step]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Focus next input if value is entered
      if (value && index < 5) {
        codeInputRefs.current[index + 1]?.focus();
      }
      
      // Check if code is complete
      if (index === 5 && value) {
        const isComplete = newCode.every(digit => digit.length === 1);
        if (isComplete) {
          // First show the new reverse canvas
          setReverseCanvasVisible(true);
          
          // Then hide the original canvas after a small delay
          setTimeout(() => {
            setInitialCanvasVisible(false);
          }, 50);
          
          // Transition to success screen after animation
          setTimeout(() => {
            setStep("success");
          }, 2000);
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleBackClick = () => {
    setStep("email");
    setCode(["", "", "", "", "", ""]);
    // Reset animations if going back
    setReverseCanvasVisible(false);
    setInitialCanvasVisible(true);
  };

  return (
    <div className={cn("flex w-[100%] flex-col min-h-screen bg-black relative", className)}>
      <div className="absolute inset-0 z-0">
        {/* Initial canvas (forward animation) */}
        {initialCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[
                [255, 255, 255],
                [255, 255, 255],
              ]}
              dotSize={6}
              reverse={false}
            />
          </div>
        )}
        
        {/* Reverse canvas (appears when code is complete) */}
        {reverseCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={4}
              containerClassName="bg-black"
              colors={[
                [255, 255, 255],
                [255, 255, 255],
              ]}
              dotSize={6}
              reverse={true}
            />
          </div>
        )}
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,1)_0%,_transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Top navigation */}
        <MiniNavbar />

        {/* Main content container */}
        <div className="flex flex-1 flex-col lg:flex-row ">
          {/* Left side (form) */}
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full mt-[150px] max-w-sm">
              <AnimatePresence mode="wait">
                {step === "email" ? (
                  <motion.div 
                    key="email-step"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-1">
                      <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">Welcome Developer</h1>
                      <p className="text-[1.8rem] text-white/70 font-light">Your sign in component</p>
                    </div>
                    
                    
                    <div className="space-y-4">
                      <button className="backdrop-blur-[2px] w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full py-3 px-4 transition-colors">
                        <span className="text-lg">G</span>
                        <span>Sign in with Google</span>
                      </button>
                      
                      <div className="flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-1" />
                        <span className="text-white/40 text-sm">or</span>
                        <div className="h-px bg-white/10 flex-1" />
                      </div>
                      
                      <form onSubmit={handleEmailSubmit}>
                        <div className="relative">
                          <input 
                            type="email" 
                            placeholder="info@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full backdrop-blur-[1px] text-white border-1 border-white/10 rounded-full py-3 px-4 focus:outline-none focus:border focus:border-white/30 text-center"
                            required
                          />
                          <button 
                            type="submit"
                            className="absolute right-1.5 top-1.5 text-white w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group overflow-hidden"
                          >
                            <span className="relative w-full h-full block overflow-hidden">
                              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">
                                →
                              </span>
                              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0">
                                →
                              </span>
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>
                    
                    <p className="text-xs text-white/40 pt-10">
                      By signing up, you agree to the <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">MSA</Link>, <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Product Terms</Link>, <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Policies</Link>, <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Privacy Notice</Link>, and <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Cookie Notice</Link>.
                    </p>
                  </motion.div>
                ) : step === "code" ? (
                  <motion.div 
                    key="code-step"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-1">
                      <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">We sent you a code</h1>
                      <p className="text-[1.25rem] text-white/50 font-light">Please enter it</p>
                    </div>
                    
                    <div className="w-full">
                      <div className="relative rounded-full py-4 px-5 border border-white/10 bg-transparent">
                        <div className="flex items-center justify-center">
                          {code.map((digit, i) => (
                            <div key={i} className="flex items-center">
                              <div className="relative">
                                <input
                                  ref={(el) => {
                                    codeInputRefs.current[i] = el;
                                  }}
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  maxLength={1}
                                  value={digit}
                                  onChange={e => handleCodeChange(i, e.target.value)}
                                  onKeyDown={e => handleKeyDown(i, e)}
                                  className="w-8 text-center text-xl bg-transparent text-white border-none focus:outline-none focus:ring-0 appearance-none"
                                  style={{ caretColor: 'transparent' }}
                                />
                                {!digit && (
                                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                                    <span className="text-xl text-white">0</span>
                                  </div>
                                )}
                              </div>
                              {i < 5 && <span className="text-white/20 text-xl">|</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <motion.p 
                        className="text-white/50 hover:text-white/70 transition-colors cursor-pointer text-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        Resend code
                      </motion.p>
                    </div>
                    
                    <div className="flex w-full gap-3">
                      <motion.button 
                        onClick={handleBackClick}
                        className="rounded-full bg-white text-black font-medium px-8 py-3 hover:bg-white/90 transition-colors w-[30%]"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        Back
                      </motion.button>
                      <motion.button 
                        className={`flex-1 rounded-full font-medium py-3 border transition-all duration-300 ${
                          code.every(d => d !== "") 
                          ? "bg-white text-black border-transparent hover:bg-white/90 cursor-pointer" 
                          : "bg-[#111] text-white/50 border-white/10 cursor-not-allowed"
                        }`}
                        disabled={!code.every(d => d !== "")}
                      >
                        Continue
                      </motion.button>
                    </div>
                    
                    <div className="pt-16">
                      <p className="text-xs text-white/40">
                        By signing up, you agree to the <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">MSA</Link>, <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Product Terms</Link>, <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Policies</Link>, <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Privacy Notice</Link>, and <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Cookie Notice</Link>.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success-step"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-1">
                      <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">You're in!</h1>
                      <p className="text-[1.25rem] text-white/50 font-light">Welcome</p>
                    </div>
                    
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="py-10"
                    >
                      <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-white to-white/70 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                    
                    <motion.button 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="w-full rounded-full bg-white text-black font-medium py-3 hover:bg-white/90 transition-colors"
                    >
                      Continue to Dashboard
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};



demo.tsx
import { SignInPage } from "@/components/ui/sign-in-flow-1";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <SignInPage />
    </div>
  );
};

export { DemoOne };

```

Install NPM dependencies:
```bash
next, three, framer-motion, @react-three/fiber
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

---

name: loader
code: You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
loader.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loaderVariants = cva("inline-block", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
    variant: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export interface LoaderProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof loaderVariants> {}

const Loader = React.forwardRef<SVGSVGElement, LoaderProps>(
  ({ className, size, variant, ...props }, ref) => {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
      setIsMounted(true);
    }, []);

    return (
      <svg
        ref={ref}
        className={cn(
          loaderVariants({ size, variant }),
          isMounted && "animate-spin",
          className,
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-label="Loading"
        suppressHydrationWarning
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />{" "}
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  },
);

Loader.displayName = "Loader";

export { Loader, loaderVariants };

demo.tsx
import { Loader } from "@/components/ui/loader";

export default function DemoOne() {
  return (
    <>
      <div className="flex items-center gap-6 flex-wrap">
        <Loader size="xs" />
        <Loader size="sm" />
        <Loader size="md" />
        <Loader size="lg" />
        <Loader size="xl" />
      </div>
    </>
  );
}

```

Install NPM dependencies:
```bash
class-variance-authority
```

Extend existing Tailwind 4 index.css with this code (or if project uses Tailwind 3, extend tailwind.config.js or globals.css):
```css
@import "tailwindcss";
@import "tw-animate-css";

:root {
  --hu-font-geist: var(--font-geist);
  --hu-font-jetbrains: var(--font-jetbrains-mono);
  --radius: 0.8rem;
  --card-radius: 1rem;
  --hu-background: 0, 0%, 100%;
  --hu-foreground: 0, 0%, 14%;
  --hu-card: 0, 0%, 99%;
  --hu-card-foreground: 0, 0%, 14%;
  --hu-primary: 235, 100%, 60%;
  --hu-primary-foreground: 0, 0%, 98%;
  --hu-secondary: 0, 0%, 97%;
  --hu-secondary-foreground: 0, 0%, 20%;
  --hu-muted: 0, 0%, 97%;
  --hu-muted-foreground: 0, 0%, 56%;
  --hu-accent: 0, 0%, 96%;
  --hu-accent-foreground: 0, 0%, 20%;
  --hu-destructive: 9, 96%, 47%;
  --hu-destructive-foreground: 0, 0%, 98%;
  --hu-border: 0, 0%, 92%;
  --hu-input: 0, 0%, 100%;
  --hu-ring: 0, 0%, 71%;
  --color-fd-background: hsl(var(--hu-background));
  --color-fd-card: hsl(var(--hu-background));
}

.dark {
  --hu-background: 0, 0%, 7%;
  --hu-foreground: 0, 0%, 100%;
  --hu-card: 0, 0%, 9%;
  --hu-card-foreground: 0, 0%, 100%;
  --hu-primary: 235, 100%, 60%;
  --hu-primary-foreground: 0, 0%, 98%;
  --hu-secondary: 0, 0%, 15%;
  --hu-secondary-foreground: 0, 0%, 100%;
  --hu-muted: 0, 0%, 15%;
  --hu-muted-foreground: 0, 0%, 71%;
  --hu-accent: 0, 0%, 15%;
  --hu-accent-foreground: 0, 0%, 100%;
  --hu-destructive: 0, 84%, 50%;
  --hu-destructive-foreground: 0, 0%, 98%;
  --hu-border: 0, 0%, 100%, 10%;
  --hu-input: 0, 0%, 100%, 5%;
  --hu-ring: 0, 0%, 56%;
  --color-fd-background: hsl(var(--hu-background));
  --color-fd-card: hsl(var(--hu-background));
}

```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

---

name: footer section
code: You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
footer-section.tsx
'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, FrameIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Features', href: '#features' },
			{ title: 'Pricing', href: '#pricing' },
			{ title: 'Testimonials', href: '#testimonials' },
			{ title: 'Integration', href: '/' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'FAQs', href: '/faqs' },
			{ title: 'About Us', href: '/about' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Services', href: '/terms' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '/blog' },
			{ title: 'Changelog', href: '/changelog' },
			{ title: 'Brand', href: '/brand' },
			{ title: 'Help', href: '/help' },
		],
	},
	{
		label: 'Social Links',
		links: [
			{ title: 'Facebook', href: '#', icon: FacebookIcon },
			{ title: 'Instagram', href: '#', icon: InstagramIcon },
			{ title: 'Youtube', href: '#', icon: YoutubeIcon },
			{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
		],
	},
];

export function Footer() {
	return (
		<footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<FrameIcon className="size-8" />
					<p className="text-muted-foreground mt-8 text-sm md:mt-0">
						© {new Date().getFullYear()} Asme. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs">{section.label}</h3>
								<ul className="text-muted-foreground mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="hover:text-foreground inline-flex items-center transition-all duration-300"
											>
												{link.icon && <link.icon className="me-1 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};

demo.tsx
import { Footer } from '@/components/ui/footer-section';

export default function DemoOne() {
	return (
		<div className="relative flex min-h-svh flex-col">
			<div className="min-h-screen flex items-center justify-center">
				<h1 className='font-mono text-2xl font-bold'>Scrool Down!</h1>
			</div>
			<Footer />
		</div>
	);
}

```

Install NPM dependencies:
```bash
motion, lucide-react
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

---

name: pricing section
code: You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
pricing.tsx
"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you
All plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line">
          {description}
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <label className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch
              ref={switchRef as any}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
        </label>
        <span className="ml-2 font-semibold">
          Annual billing <span className="text-primary">(Save 20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative`,
              plan.isPopular ? "border-primary border-2" : "border-border",
              "flex flex-col",
              !plan.isPopular && "mt-5",
              index === 0 || index === 2
                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                : "z-10",
              index === 0 && "origin-right",
              index === 2 && "origin-left"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <Star className="text-primary-foreground h-4 w-4 fill-current" />
                <span className="text-primary-foreground ml-1 font-sans font-semibold">
                  Popular
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold text-muted-foreground">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    formatter={(value) => `$${value}`}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>
                {plan.period !== "Next 3 months" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                {isMonthly ? "billed monthly" : "billed annually"}
              </p>

              <ul className="mt-5 gap-2 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4" />

              <Link
                href={plan.href}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                  plan.isPopular
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground"
                )}
              >
                {plan.buttonText}
              </Link>
              <p className="mt-6 text-xs leading-5 text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


demo.tsx
"use client";

import { Pricing } from "@/components/blocks/pricing";

const demoPlans = [
  {
    name: "STARTER",
    price: "50",
    yearlyPrice: "40",
    period: "per month",
    features: [
      "Up to 10 projects",
      "Basic analytics",
      "48-hour support response time",
      "Limited API access",
      "Community support",
    ],
    description: "Perfect for individuals and small projects",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Everything in Professional",
      "Custom solutions",
      "Dedicated account manager",
      "1-hour support response time",
      "SSO Authentication",
      "Advanced security",
      "Custom contracts",
      "SLA agreement",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

function PricingBasic() {
  return (
    <div className="h-[800px] overflow-y-auto rounded-lg">
      <Pricing 
        plans={demoPlans}
        title="Simple, Transparent Pricing"
        description="Choose the plan that works for you
All plans include access to our platform, lead generation tools, and dedicated support."
      />
    </div>
  );
}

export { PricingBasic };

```

Copy-paste these files for dependencies:
```tsx
shadcn/button
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

```
```tsx
shadcn/label
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```
```tsx
shadcn/switch
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

```

Install NPM dependencies:
```bash
lucide-react, framer-motion, canvas-confetti, @number-flow/react, @radix-ui/react-slot, class-variance-authority, @radix-ui/react-label, @radix-ui/react-switch
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

---

name: shiny border button
code: You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
shiny-borders-button.tsx
import React from 'react';

const RealismButton = ({text}) => {
  return (
    <button className="group relative p-[2px] rounded-[16px] text-[1.4rem] border-none cursor-pointer bg-[radial-gradient(circle_80px_at_80%_-10%,_#ffffff,_#181b1b)] transition-all">
      {/* Glow behind button */}
      <div className="absolute top-0 right-0 w-[65%] h-[60%] rounded-[120px] shadow-[0_0_20px_#ffffff38] group-hover:shadow-[0_0_40px_#ffffff60] transition-all duration-300 ease-out -z-10" />

      {/* Bottom-left green blob */}
      <div className="absolute bottom-0 left-0 w-[50px] h-[50%] rounded-[17px] transition-all duration-300 ease-out 
        bg-[radial-gradient(circle_60px_at_0%_100%,_#3fff75,_#00ff8050,_transparent)] 
        shadow-[-2px_9px_40px_#00ff2d40] 
        group-hover:w-[90px] group-hover:shadow-[-4px_1px_45px_#00ff2d60]" />

      {/* Inner content */}
      <div className="relative px-[25px] py-[14px] group-hover:scale-110 rounded-[14px] text-white bg-[radial-gradient(circle_80px_at_80%_-50%,_#777777,_#0f1111)] z-10 transition-all duration-300">
        {text}

        {/* Inner glow layer */}
        <div className="absolute inset-0 rounded-[14px] bg-[radial-gradient(circle_60px_at_0%_100%,_#00e1ff1a,_#0000ff11,_transparent)] z-[-1]" />
      </div>
    </button>
  );
};

export default RealismButton;



demo.tsx
import RealismButton from "@/components/ui/shiny-borders-button";

export default function DemoOne() {
  return <div className="flex items-center justify-center min-h-screen dark:bg-black bg-white w-full">
      <RealismButton text={"See Projects"} />
    </div>
}

```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

---

name: sliding testimonial
code : You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
sliding-testimonial.tsx
import Image from 'next/image'
const testimonials = [
    {
        name: "Alena Zhukova",
        profession: "Software Engineer",
        description: "Simple is the perfect tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "Aiko",
        profession: "Design Engineer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "kinpe Zhukova",
        profession: "Software Engineer",
        description:
            "Simple is the perfect tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results..",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },

    {
        name: "Lisa Kemp",
        profession: "Frontend Developer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results..",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "Saud",
        profession: "Game Developer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
    {
        name: "Paula Smith",
        profession: "UX Designer",
        description:
            "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
        avatar: "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
        image: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
    },
];
const duplicatedTestimonials = [...testimonials, ...testimonials];

const FUITestimonialWithSlide = () => {
    return (
        <div className='max-w-8xl mx-auto border-2 border-black w-screen'>
            <div className="w-full mx-auto px-10">
                <div className='mb-10'>

                    <p className="mt-8 max-w-2xl mx-auto  font-geist text-center text-5xl font-normal tracking-tight text-gray-800 dark:text-gray-200">
                        What clients says
                    </p>
                    <p className="mt-4 max-w-xl mx-auto  text-lg text-center tracking-tight text-zinc-600">
                        Design assets, icon teardowns, and a community of fellow icon
                        designers where you can ask questions.
                    </p>

                </div>
                <div style={{
                    maskImage:
                        'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                }}  className="flex relative overflow-hidden  shrink-0   max-w-full  overflow-hidden ">
                  <div className="flex animate-x-slider gap-5 w-max">
                    {duplicatedTestimonials.map((testimonial, indx) => {
                        return (

                            <div key={indx} className="border-[1.2px]  flex flex-col bg-page-gradient border-black/20  dark:border-white/10  rounded-lg shrink-0 grow-0 w-[600px] h-full">
                                <p className="px-5 py-5 text-pretty text-xl font-extralight  text-text-primary dark:text-dark-text-primary sm:text-2xl md:text-3xl tracking-tighter">
                                    &quot;{testimonial.description}.&quot;


                                </p>
                                <div className="border-t-[1.2px]  w-full flex gap-1 overflow-hidden">
                                    <div className="w-3/4 flex gap-3 items-center px-4 py-3">
                                        <img src={testimonial.avatar} alt='avatar' />
                                        <div className='flex flex-col flex-1 gap-0 justify-start items-start'>
                                            <h5 className='text-base font-medium md:text-lg'>{testimonial.name}</h5>
                                            <p className='text-black/30 dark:text-white/50 mt-[-4px] text-sm text-text-tertiary dark:text-dark-text-tertiary md:text-base'>{testimonial.profession}</p>

                                        </div>

                                    </div>
                                    <div className='w-[1px] bg-black/20 dark:bg-white/20' />

                                    <div className='max-w-full self-center pl-2'>
                                        <img src={testimonial.image} className='h-10 w-28 px-2 flex-none brightness-0  dark:invert' alt='company_logo' />

                                    </div>

                                </div>

                            </div>
                        )
                    })}
                 </div>
                </div>
            </div>
        </div>
    )
}
export default FUITestimonialWithSlide

demo.tsx
import FUITestimonialWithSlide from "@/components/ui/sliding-testimonial";

export default function DemoOne() {
  return <FUITestimonialWithSlide />;
}

```

Install NPM dependencies:
```bash
next
```

Extend existing Tailwind 4 index.css with this code (or if project uses Tailwind 3, extend tailwind.config.js or globals.css):
```css
@import "tailwindcss";
@import "tw-animate-css";


@keyframes x-slider {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(calc(-50% - 1.25rem));
  }
}
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

---

name: animated content
code: ## Integrate the <AnimatedContent /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: AnimatedContent
### Variant: JavaScript + CSS
### Dependencies: gsap

---

### Usage Example
```jsx
import AnimatedContent from './AnimatedContent'

<AnimatedContent
  distance={150}
  direction="horizontal"
  reverse={false}
  duration={1.2}
  ease="bounce.out"
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
  delay={0.3}
>
  <div>Content to Animate</div>
</AnimatedContent>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | — | The content to be animated. |
| container | string | HTMLElement | null | The scroll container to use for ScrollTrigger. Can be a selector string or an HTMLElement. Defaults to main container. Uses auto-detection (for snap-main-container id) if not provided. |
| distance | number | 100 | Distance (in pixels) the component moves during animation. |
| direction | string | "vertical" | Animation direction. Can be "vertical" or "horizontal". |
| reverse | boolean | false | Whether the animation moves in the reverse direction. |
| duration | number | 0.8 | Duration of the animation in seconds. |
| ease | string | "power3.out" | GSAP easing function for the animation. |
| initialOpacity | number | 0 | Initial opacity before animation begins. |
| animateOpacity | boolean | true | Whether to animate opacity during transition. |
| scale | number | 1 | Initial scale of the component. |
| threshold | number | 0.1 | Intersection threshold to trigger animation (0-1). |
| delay | number | 0 | Delay before animation starts (in seconds). |
| onComplete | function | undefined | Callback function called when animation completes. |
| dissappearAfter | number | 0 | Time in seconds after which the content will disappear. Disabled if set to 0. |
| disappearDuration | number | 0.5 | Duration of the disappearance animation in seconds. |
| disappearEase | string | "power3.in" | GSAP easing function for the disappearance animation. |
| onDisappearanceComplete | function | undefined | Callback function called when disappearance animation completes. |
| className | string | '' | Additional CSS classes to apply to the animated component. |

### Full Component Source
```jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget = container || document.getElementById('snap-main-container') || null;

    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible'
    });

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden' }} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import and render the component using the usage example above as a starting point.
4. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: fade content
code: ## Integrate the <FadeContent /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: FadeContent
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import FadeContent from './FadeContent'
  
<FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
  {/* Anything placed inside this container will be fade into view */}
</FadeContent>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | — | The content to be animated. |
| blur | boolean | false | Enables a blur effect during the animation. |
| duration | number | 1000 | Specifies the duration of the fade animation in seconds. |
| delay | number | 0 | Adds a delay in seconds before triggering the animation. |
| ease | string | power2.out | GSAP easing function for the fade animation. |
| threshold | number | 0.1 | IntersectionObserver threshold for triggering the fade animation. |
| initialOpacity | number | — | The starting opacity of the component before it enters the viewport. |
| className | string | — | Custom class(es) to be added to the container. |
| disappearAfter | number | — | Time in seconds after which the content will start to disappear. Disables if set to 0. |
| disappearDuration | number | 0.5 | Duration of the disappearance animation in seconds. |
| disappearEase | string | power2.in | GSAP easing function for the disappearance animation. |

### Full Component Source
```jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FadeContent = ({
  children,
  container,
  blur = false,
  duration = 1000,
  ease = 'power2.out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  style,
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget = container || document.getElementById('snap-main-container') || null;
    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const startPct = (1 - threshold) * 100;

    const getSeconds = val => (typeof val === 'number' && val > 10 ? val / 1000 : val);

    gsap.set(el, {
      autoAlpha: initialOpacity,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
      willChange: 'opacity, filter, transform'
    });

    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            autoAlpha: initialOpacity,
            filter: blur ? 'blur(10px)' : 'blur(0px)',
            delay: getSeconds(disappearAfter),
            duration: getSeconds(disappearDuration),
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration: getSeconds(duration),
      ease: ease
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className} style={style} {...props}>
      {children}
    </div>
  );
};

export default FadeContent;

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import and render the component using the usage example above as a starting point.
4. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: animated list
code: ## Integrate the <AnimatedList /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: AnimatedList
### Variant: JavaScript + CSS
### Dependencies: motion

---

### Usage Example
```jsx
import AnimatedList from './AnimatedList'

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']; 
  
<AnimatedList
  items={items}
  onItemSelect={(item, index) => console.log(item, index)}
  showGradients={true}
  enableArrowNavigation={true}
  displayScrollbar={true}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | string[] | ['Item 1', 'Item 2', ...] | An array of items to display in the scrollable list. |
| onItemSelect | function | undefined | Callback function triggered when an item is selected. Receives the selected item and its index. |
| showGradients | boolean | true | Toggle to display the top and bottom gradient overlays. |
| enableArrowNavigation | boolean | true | Toggle to enable keyboard navigation via arrow and tab keys. |
| className | string | '' | Additional CSS class names for the main container. |
| itemClassName | string | '' | Additional CSS class names for each list item. |
| displayScrollbar | boolean | true | Toggle to display or hide the custom scrollbar. |
| initialSelectedIndex | number | -1 | Initial index of the selected item. Set to -1 for no selection. |

### Full Component Source
```jsx
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import './AnimatedList.css';

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ marginBottom: '1rem', cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedList = ({
  items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15'
  ],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1
}) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleItemMouseEnter = useCallback(index => {
    setSelectedIndex(index);
  }, []);

  const handleItemClick = useCallback(
    (item, index) => {
      setSelectedIndex(index);
      if (onItemSelect) {
        onItemSelect(item, index);
      }
    },
    [onItemSelect]
  );

  const handleScroll = useCallback(e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  }, []);

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = e => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`scroll-list-container ${className}`}>
      <div ref={listRef} className={`scroll-list ${!displayScrollbar ? 'no-scrollbar' : ''}`} onScroll={handleScroll}>
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.1}
            index={index}
            onMouseEnter={() => handleItemMouseEnter(index)}
            onClick={() => handleItemClick(item, index)}
          >
            <div className={`item ${selectedIndex === index ? 'selected' : ''} ${itemClassName}`}>
              <p className="item-text">{item}</p>
            </div>
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div className="top-gradient" style={{ opacity: topGradientOpacity }}></div>
          <div className="bottom-gradient" style={{ opacity: bottomGradientOpacity }}></div>
        </>
      )}
    </div>
  );
};

export default AnimatedList;

```

### Component CSS
```css
.scroll-list-container {
  position: relative;
  width: 500px;
}

.scroll-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 16px;
}

.scroll-list::-webkit-scrollbar {
  width: 8px;
}

.scroll-list::-webkit-scrollbar-track {
  background: #120F17;
}

.scroll-list::-webkit-scrollbar-thumb {
  background: #2F293A;
  border-radius: 4px;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.item {
  padding: 16px;
  background-color: #2F293A;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.item.selected {
  background-color: #2F293A;
}

.item-text {
  color: white;
  margin: 0;
}

.top-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(to bottom, #120F17, transparent);
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.bottom-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to top, #120F17, transparent);
  pointer-events: none;
  transition: opacity 0.3s ease;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

