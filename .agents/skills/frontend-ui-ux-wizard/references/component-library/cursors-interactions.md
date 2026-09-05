# Cursors Interactions — Component Library Reference

**Source:** components adapted from [React Bits](https://reactbits.dev) and [Svelte Bits](https://sveltebits.xyz) (both by DavidHDev). React Bits is licensed **MIT + Commons Clause** — free to use, modify, and distribute in your own projects (personal or commercial), but the library itself cannot be resold as a standalone product. Svelte Bits is built incrementally from React Bits by the same author and is presumed to carry similar terms; verify at the source if that matters for your use case. This reference bundle is included here for free, under Qofeno's own MIT-licensed repo, as build material for websites, not as a resold library.

---

name: border beam
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
border-beam.tsx
import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  anchor?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",

        // mask styles
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",

        // pseudo styles
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className,
      )}
    />
  )
}


demo.tsx
import { BorderBeam } from "@/components/ui/border-beam";

export function BorderBeamDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Border Beam
      </span>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}

```

Extend existing tailwind.config.js with this code:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
    },
  },
};

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

name: 	electric border
code: ## Integrate the <ElectricBorder /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: ElectricBorder
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
// CREDIT
// Component inspired by @BalintFerenczy on X
// https://codepen.io/BalintFerenczy/pen/KwdoyEN
  
import ElectricBorder from './ElectricBorder'

<ElectricBorder
  color="#7df9ff"
  speed={1}
  chaos={0.12}
  thickness={2}
  style={{ borderRadius: 16 }}
>
  <div>
    <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
      A glowing, animated border wrapper.
    </p>
  </div>
</ElectricBorder>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#5227FF" | Stroke/glow color. Any CSS color (hex, rgb, hsl). |
| speed | number | 1 | Animation speed multiplier (higher = faster). |
| chaos | number | 0.12 | Distortion intensity (0 = no distortion, higher = more chaotic). |
| borderRadius | number | 24 | Border radius in pixels for the electric border path. |
| className | string | — | Optional className applied to the root wrapper. |
| style | React.CSSProperties | — | Inline styles for the wrapper. |
| children | ReactNode | — | Content rendered inside the bordered container. |

### Full Component Source
```jsx
import { useEffect, useRef, useCallback } from 'react';
import './ElectricBorder.css';

const ElectricBorder = ({
  children,
  color = '#5227FF',
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className,
  style
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  // Noise functions
  const random = useCallback(x => {
    return (Math.sin(x * 12.9898) * 43758.5453) % 1;
  }, []);

  const noise2D = useCallback(
    (x, y) => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;

      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);

      const ux = fx * fx * (3.0 - 2.0 * fx);
      const uy = fy * fy * (3.0 - 2.0 * fy);

      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    },
    [random]
  );

  const octavedNoise = useCallback(
    (x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time, seed, baseFlatness) => {
      let y = 0;
      let amplitude = baseAmplitude;
      let frequency = baseFrequency;

      for (let i = 0; i < octaves; i++) {
        let octaveAmplitude = amplitude;
        if (i === 0) {
          octaveAmplitude *= baseFlatness;
        }
        y += octaveAmplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
        frequency *= lacunarity;
        amplitude *= gain;
      }

      return y;
    },
    [noise2D]
  );

  const getCornerPoint = useCallback((centerX, centerY, radius, startAngle, arcLength, progress) => {
    const angle = startAngle + progress * arcLength;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  }, []);

  const getRoundedRectPoint = useCallback(
    (t, left, top, width, height, radius) => {
      const straightWidth = width - 2 * radius;
      const straightHeight = height - 2 * radius;
      const cornerArc = (Math.PI * radius) / 2;
      const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
      const distance = t * totalPerimeter;

      let accumulated = 0;

      // Top edge
      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return { x: left + radius + progress * straightWidth, y: top };
      }
      accumulated += straightWidth;

      // Top-right corner
      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      // Right edge
      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return { x: left + width, y: top + radius + progress * straightHeight };
      }
      accumulated += straightHeight;

      // Bottom-right corner
      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      // Bottom edge
      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return { x: left + width - radius - progress * straightWidth, y: top + height };
      }
      accumulated += straightWidth;

      // Bottom-left corner
      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      // Left edge
      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return { x: left, y: top + height - radius - progress * straightHeight };
      }
      accumulated += straightHeight;

      // Top-left corner
      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
    },
    [getCornerPoint]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const octaves = 10;
    const lacunarity = 1.6;
    const gain = 0.7;
    const amplitude = chaos;
    const frequency = 10;
    const baseFlatness = 0;
    const displacement = 60;
    const borderOffset = 60;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width + borderOffset * 2;
      const height = rect.height + borderOffset * 2;

      // Use device pixel ratio for sharp rendering
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      return { width, height };
    };

    let { width, height } = updateSize();
    let lastDpr = Math.min(window.devicePixelRatio || 1, 2);

    const drawElectricBorder = currentTime => {
      if (!canvas || !ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (dpr !== lastDpr) {
        lastDpr = dpr;
        const newSize = updateSize();
        width = newSize.width;
        height = newSize.height;
      }

      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      timeRef.current += deltaTime * speed;
      lastFrameTimeRef.current = currentTime;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const scale = displacement;
      const left = borderOffset;
      const top = borderOffset;
      const borderWidth = width - 2 * borderOffset;
      const borderHeight = height - 2 * borderOffset;
      const maxRadius = Math.min(borderWidth, borderHeight) / 2;
      const radius = Math.min(borderRadius, maxRadius);

      const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
      const sampleCount = Math.floor(approximatePerimeter / 2);

      ctx.beginPath();

      for (let i = 0; i <= sampleCount; i++) {
        const progress = i / sampleCount;

        const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);

        const xNoise = octavedNoise(
          progress * 8,
          octaves,
          lacunarity,
          gain,
          amplitude,
          frequency,
          timeRef.current,
          0,
          baseFlatness
        );

        const yNoise = octavedNoise(
          progress * 8,
          octaves,
          lacunarity,
          gain,
          amplitude,
          frequency,
          timeRef.current,
          1,
          baseFlatness
        );

        const displacedX = point.x + xNoise * scale;
        const displacedY = point.y + yNoise * scale;

        if (i === 0) {
          ctx.moveTo(displacedX, displacedY);
        } else {
          ctx.lineTo(displacedX, displacedY);
        }
      }

      ctx.closePath();
      ctx.stroke();

      animationRef.current = requestAnimationFrame(drawElectricBorder);
    };

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      const newSize = updateSize();
      width = newSize.width;
      height = newSize.height;
    });
    resizeObserver.observe(container);

    // Start animation
    animationRef.current = requestAnimationFrame(drawElectricBorder);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [color, speed, chaos, borderRadius, octavedNoise, getRoundedRectPoint]);

  const vars = {
    '--electric-border-color': color,
    borderRadius: borderRadius
  };

  return (
    <div ref={containerRef} className={`electric-border ${className ?? ''}`} style={{ ...vars, ...style }}>
      <div className="eb-canvas-container">
        <canvas ref={canvasRef} className="eb-canvas" />
      </div>
      <div className="eb-layers">
        <div className="eb-glow-1" />
        <div className="eb-glow-2" />
        <div className="eb-background-glow" />
      </div>
      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;

```

### Component CSS
```css
.electric-border {
  --electric-light-color: oklch(from var(--electric-border-color) l c h);
  position: relative;
  border-radius: inherit;
  overflow: visible;
  isolation: isolate;
}

.eb-canvas-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
}

.eb-canvas {
  display: block;
}

.eb-content {
  position: relative;
  border-radius: inherit;
  z-index: 1;
}

.eb-layers {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 0;
}

.eb-glow-1,
.eb-glow-2,
.eb-background-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  box-sizing: border-box;
}

.eb-glow-1 {
  border: 2px solid oklch(from var(--electric-border-color) l c h / 0.6);
  filter: blur(1px);
}

.eb-glow-2 {
  border: 2px solid var(--electric-light-color);
  filter: blur(4px);
}

.eb-background-glow {
  z-index: -1;
  transform: scale(1.1);
  filter: blur(32px);
  opacity: 0.3;
  background: linear-gradient(-30deg, var(--electric-light-color), transparent, var(--electric-border-color));
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: pixel translation
code: ## Integrate the <PixelTransition /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: PixelTransition
### Variant: JavaScript + CSS
### Dependencies: gsap

---

### Usage Example
```jsx
import PixelTransition from './PixelTransition';

<PixelTransition
  firstContent={
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
      alt="default pixel transition content, a cat!"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  }
  secondContent={
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#111"
      }}
    >
      <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
    </div>
  }
  gridSize={12}
  pixelColor='#ffffff'
  once={false}
  animationStepDuration={0.4}
  className="custom-pixel-card"
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| firstContent | ReactNode | string | — | Content to show by default (e.g., an <img> or text). |
| secondContent | ReactNode | string | — | Content revealed upon hover or click. |
| gridSize | number | 7 | Number of rows/columns in the pixel grid. |
| pixelColor | string | currentColor | Background color used for each pixel block. |
| animationStepDuration | number | 0.3 | Length of the pixel reveal/hide in seconds. |
| aspectRatio | string | "100%" | Sets the 'padding-top' (or aspect-ratio) for the container. |
| once | boolean | false | If true, the transition will not revert on mouse leave or subsequent clicks. |
| className | string | — | Optional additional class names for styling. |
| style | object | {} | Optional inline styles for the container. |

### Full Component Source
```jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './PixelTransition.css';

function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = 'currentColor',
  animationStepDuration = 0.3,
  once = false,
  aspectRatio = '100%',
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = activate => {
    setIsActive(activate);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    gsap.set(pixels, { display: 'none' });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? 'block' : 'none';
      activeEl.style.pointerEvents = activate ? 'none' : '';
    });

    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });
  };

  const handleEnter = () => {
    if (!isActive) animatePixels(true);
  };
  const handleLeave = () => {
    if (isActive && !once) animatePixels(false);
  };
  const handleClick = () => {
    if (!isActive) animatePixels(true);
    else if (isActive && !once) animatePixels(false);
  };

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className}`}
      style={style}
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
      onFocus={!isTouchDevice ? handleEnter : undefined}
      onBlur={!isTouchDevice ? handleLeave : undefined}
      tabIndex={0}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixelated-image-card__default" aria-hidden={isActive}>
        {firstContent}
      </div>
      <div className="pixelated-image-card__active" ref={activeRef} aria-hidden={!isActive}>
        {secondContent}
      </div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
}

export default PixelTransition;

```

### Component CSS
```css
.pixelated-image-card {
  background-color: #222;
  color: var(--color-primary, #fff);
  border-radius: 15px;
  border: 2px solid #fff;
  width: 300px;
  max-width: 100%;
  position: relative;
  overflow: hidden;
}

.pixelated-image-card__default,
.pixelated-image-card__active,
.pixelated-image-card__pixels {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.pixelated-image-card__active {
  z-index: 2;
}

.pixelated-image-card__active {
  display: none;
}

.pixelated-image-card__pixels {
  pointer-events: none;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.pixelated-image-card__pixel {
  display: none;
  position: absolute;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: glare hover
code: ## Integrate the <GlareHover /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: GlareHover
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import GlareHover from './GlareHover'

<div style={{ height: '600px', position: 'relative' }}>
  <GlareHover
    glareColor="#ffffff"
    glareOpacity={0.3}
    glareAngle={-30}
    glareSize={300}
    transitionDuration={800}
    playOnce={false}
  >
    <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#333', margin: 0 }}>
      Hover Me
    </h2>
  </GlareHover>
</div>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | string | 500px | The width of the hover element. |
| height | string | 500px | The height of the hover element. |
| background | string | #000 | The background color of the element. |
| borderRadius | string | 10px | The border radius of the element. |
| borderColor | string | #333 | The border color of the element. |
| children | React.ReactNode | undefined | The content to display inside the glare hover element. |
| glareColor | string | #ffffff | The color of the glare effect (hex format). |
| glareOpacity | number | 0.5 | The opacity of the glare effect (0-1). |
| glareAngle | number | -45 | The angle of the glare effect in degrees. |
| glareSize | number | 250 | The size of the glare effect as a percentage (e.g. 250 = 250%). |
| transitionDuration | number | 650 | The duration of the transition in milliseconds. |
| playOnce | boolean | false | If true, the glare only animates on hover and doesn't return on mouse leave. |
| className | string | "" | Additional CSS class names. |
| style | React.CSSProperties | {} | Additional inline styles. |

### Full Component Source
```jsx
import './GlareHover.css';

const GlareHover = ({
  width = '500px',
  height = '500px',
  background = '#000',
  borderRadius = '10px',
  borderColor = '#333',
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = '',
  style = {}
}) => {
  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const vars = {
    '--gh-width': width,
    '--gh-height': height,
    '--gh-bg': background,
    '--gh-br': borderRadius,
    '--gh-angle': `${glareAngle}deg`,
    '--gh-duration': `${transitionDuration}ms`,
    '--gh-size': `${glareSize}%`,
    '--gh-rgba': rgba,
    '--gh-border': borderColor
  };

  return (
    <div
      className={`glare-hover ${playOnce ? 'glare-hover--play-once' : ''} ${className}`}
      style={{ ...vars, ...style }}
    >
      {children}
    </div>
  );
};

export default GlareHover;

```

### Component CSS
```css
.glare-hover {
  width: var(--gh-width);
  height: var(--gh-height);
  background: var(--gh-bg);
  border-radius: var(--gh-br);
  border: 1px solid var(--gh-border);
  overflow: hidden;
  position: relative;
  display: grid;
  place-items: center;
}

.glare-hover::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    var(--gh-angle),
    hsla(0, 0%, 0%, 0) 60%,
    var(--gh-rgba) 70%,
    hsla(0, 0%, 0%, 0),
    hsla(0, 0%, 0%, 0) 100%
  );
  transition: var(--gh-duration) ease;
  background-size:
    var(--gh-size) var(--gh-size),
    100% 100%;
  background-repeat: no-repeat;
  background-position:
    -100% -100%,
    0 0;
}

.glare-hover:hover {
  cursor: pointer;
}

.glare-hover:hover::before {
  background-position:
    100% 100%,
    0 0;
}

.glare-hover--play-once::before {
  transition: none;
}

.glare-hover--play-once:hover::before {
  transition: var(--gh-duration) ease;
  background-position:
    100% 100%,
    0 0;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: antigravity
code: ## Integrate the <Antigravity /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: Antigravity
### Variant: JavaScript + CSS
### Dependencies: three @react-three/fiber

---

### Usage Example
```jsx
import Antigravity from './Antigravity';

<div style={{ width: '100%', height: '400px', position: 'relative' }}>
  <Antigravity
    count={300}
    magnetRadius={6}
    ringRadius={7}
    waveSpeed={0.4}
    waveAmplitude={1}
    particleSize={1.5}
    lerpSpeed={0.05}
    color={'#FF9FFC'}
    autoAnimate={true}
    particleVariance={1}
  />
</div>
  
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| count | number | 300 | Number of particles |
| magnetRadius | number | 10 | Radius of the magnetic field |
| ringRadius | number | 10 | Radius of the formed ring |
| waveSpeed | number | 0.4 | Speed of the wave animation |
| waveAmplitude | number | 1 | Intensity of the wave (0 for perfect circle) |
| particleSize | number | 2 | Scale multiplier for particles |
| lerpSpeed | number | 0.1 | How fast particles move to the ring |
| color | string | #FF9FFC | Color of the particles |
| autoAnimate | boolean | false | Automatically animate when idle |
| particleVariance | number | 1 | Variance in particle size (0-1) |
| rotationSpeed | number | 0 | Rotation speed of the ring |
| depthFactor | number | 1 | Z-axis depth multiplier |
| pulseSpeed | number | 3 | Speed of particle size pulsation |
| particleShape | string | capsule | Shape of the particles |
| fieldStrength | number | 10 | Tightness of the ring formation |

### Full Component Source
```jsx
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const AntigravityInner = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = '#FF9FFC',
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10
}) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const temp = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;

      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * 20;

      const randomRadiusOffset = (Math.random() - 0.5) * 2;

      temp.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        vx: 0,
        vy: 0,
        vz: 0,
        randomRadiusOffset
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame(state => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: v, pointer: m } = state;

    const mouseDist = Math.sqrt(Math.pow(m.x - lastMousePos.current.x, 2) + Math.pow(m.y - lastMousePos.current.y, 2));

    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current = { x: m.x, y: m.y };
    }

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const time = state.clock.getElapsedTime();
      destX = Math.sin(time * 0.5) * (v.width / 4);
      destY = Math.cos(time * 0.5 * 2) * (v.height / 4);
    }

    const smoothFactor = 0.05;
    virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;

    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

    particles.forEach((particle, i) => {
      let { t, speed, mx, my, mz, cz, randomRadiusOffset } = particle;

      t = particle.t += speed / 2;

      const projectionFactor = 1 - cz / 50;
      const projectedTargetX = targetX * projectionFactor;
      const projectedTargetY = targetY * projectionFactor;

      const dx = mx - projectedTargetX;
      const dy = my - projectedTargetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetPos = { x: mx, y: my, z: mz * depthFactor };

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;

        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));

        const currentRingRadius = ringRadius + wave + deviation;

        targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
        targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
        targetPos.z = mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor);
      }

      particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
      particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
      particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);

      dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const currentDistToMouse = Math.sqrt(
        Math.pow(particle.cx - projectedTargetX, 2) + Math.pow(particle.cy - projectedTargetY, 2)
      );

      const distFromRing = Math.abs(currentDistToMouse - ringRadius);
      let scaleFactor = 1 - distFromRing / 10;

      scaleFactor = Math.max(0, Math.min(1, scaleFactor));

      const finalScale = scaleFactor * (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) * particleSize;
      dummy.scale.set(finalScale, finalScale, finalScale);

      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === 'capsule' && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}
      {particleShape === 'sphere' && <sphereGeometry args={[0.2, 16, 16]} />}
      {particleShape === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.3]} />}
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
};

const Antigravity = props => {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 35 }}>
      <AntigravityInner {...props} />
    </Canvas>
  );
};

export default Antigravity;

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import and render the component using the usage example above as a starting point.
4. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: target cursor
code: ## Integrate the <TargetCursor /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: TargetCursor
### Variant: JavaScript + CSS
### Dependencies: gsap

---

### Usage Example
```jsx
import TargetCursor from './TargetCursor';

export default function App() {
  return (
    <div>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      
      <h1>Hover over the elements below</h1>
      <button className="cursor-target">Click me!</button>
      <div className="cursor-target">Hover target</div>
    </div>
  );
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| targetSelector | string | ".cursor-target" | CSS selector for elements that should trigger the cursor targeting effect |
| spinDuration | number | 2 | Duration in seconds for the cursor's spinning animation when not targeting |
| hideDefaultCursor | boolean | true | Whether to hide the default browser cursor when the component is active |
| hoverDuration | number | 0.2 | Duration in seconds for the transition when the cursor locks onto a target |
| parallaxOn | boolean | true | Enables a subtle parallax effect on the corners when moving over a target |

### Full Component Source
```jsx
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

// A position: fixed element is positioned relative to the viewport UNLESS an
// ancestor establishes a containing block (transform, perspective, filter,
// will-change of those, or contain). When that happens, the cursor's translate
// no longer maps to viewport coordinates, so we measure and compensate for it.
const getContainingBlock = element => {
  let node = element?.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (
      style.transform !== 'none' ||
      style.perspective !== 'none' ||
      style.filter !== 'none' ||
      style.willChange.includes('transform') ||
      style.willChange.includes('perspective') ||
      style.willChange.includes('filter') ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const getContainingBlockOffset = block => {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

const TargetCursor = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);
  const containingBlockRef = useRef(null);

  const isActiveRef = useRef(false);
  const targetCornerPositionsRef = useRef(null);
  const tickerFnRef = useRef(null);
  const activeStrengthRef = useRef(0);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12
    }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    const { x: offsetX, y: offsetY } = getContainingBlockOffset(containingBlockRef.current);
    gsap.to(cursorRef.current, {
      x: x - offsetX,
      y: y - offsetY,
      duration: 0.1,
      ease: 'power3.out'
    });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

    containingBlockRef.current = getContainingBlock(cursor);
    const getOffset = () => getContainingBlockOffset(containingBlockRef.current);

    let activeTarget = null;
    let currentLeaveHandler = null;
    let resumeTimeout = null;

    const cleanupTarget = target => {
      if (currentLeaveHandler) {
        target.removeEventListener('mouseleave', currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    const initialOffset = getOffset();
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2 - initialOffset.x,
      y: window.innerHeight / 2 - initialOffset.y
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    };

    createSpinTimeline();

    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
        return;
      }

      const strength = activeStrengthRef.current;
      if (strength === 0) return;

      const cursorX = gsap.getProperty(cursorRef.current, 'x');
      const cursorY = gsap.getProperty(cursorRef.current, 'y');

      const corners = Array.from(cornersRef.current);
      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, 'x');
        const currentY = gsap.getProperty(corner, 'y');

        const targetX = targetCornerPositionsRef.current[i].x - cursorX;
        const targetY = targetCornerPositionsRef.current[i].y - cursorY;

        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;

        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? 'none' : 'power1.out',
          overwrite: 'auto'
        });
      });
    };

    tickerFnRef.current = tickerFn;

    const moveHandler = e => moveCursor(e.clientX, e.clientY);
    window.addEventListener('mousemove', moveHandler);

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return;
      const { x: offsetX, y: offsetY } = getOffset();
      const mouseX = gsap.getProperty(cursorRef.current, 'x') + offsetX;
      const mouseY = gsap.getProperty(cursorRef.current, 'y') + offsetY;
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);
      if (!isStillOverTarget) {
        if (currentLeaveHandler) {
          currentLeaveHandler();
        }
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    const enterHandler = e => {
      const directTarget = e.target;
      const allTargets = [];
      let current = directTarget;
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) {
          allTargets.push(current);
        }
        current = current.parentElement;
      }
      const target = allTargets[0] || null;
      if (!target || !cursorRef.current || !cornersRef.current) return;
      if (activeTarget === target) return;
      if (activeTarget) {
        cleanupTarget(activeTarget);
      }
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;
      const corners = Array.from(cornersRef.current);
      corners.forEach(corner => gsap.killTweensOf(corner));

      gsap.killTweensOf(cursorRef.current, 'rotation');
      spinTl.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      const rect = target.getBoundingClientRect();
      const { borderWidth, cornerSize } = constants;
      const { x: offsetX, y: offsetY } = getOffset();
      const cursorX = gsap.getProperty(cursorRef.current, 'x');
      const cursorY = gsap.getProperty(cursorRef.current, 'y');

      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth - offsetX, y: rect.top - borderWidth - offsetY },
        { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.top - borderWidth - offsetY },
        { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
        { x: rect.left - borderWidth - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY }
      ];

      isActiveRef.current = true;
      gsap.ticker.add(tickerFnRef.current);

      gsap.to(activeStrengthRef, {
        current: 1,
        duration: hoverDuration,
        ease: 'power2.out'
      });

      corners.forEach((corner, i) => {
        gsap.to(corner, {
          x: targetCornerPositionsRef.current[i].x - cursorX,
          y: targetCornerPositionsRef.current[i].y - cursorY,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      const leaveHandler = () => {
        gsap.ticker.remove(tickerFnRef.current);

        isActiveRef.current = false;
        targetCornerPositionsRef.current = null;
        gsap.set(activeStrengthRef, { current: 0, overwrite: true });
        activeTarget = null;

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);
          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
          ];
          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: 'power3.out'
              },
              0
            );
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(cursorRef.current, 'rotation');
            const normalizedRotation = currentRotation % 360;
            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: 'none',
              onComplete: () => {
                spinTl.current?.restart();
              }
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
      };

      currentLeaveHandler = leaveHandler;
      target.addEventListener('mouseleave', leaveHandler);
    };

    window.addEventListener('mouseover', enterHandler, { passive: true });

    const resizeHandler = () => {
      containingBlockRef.current = getContainingBlock(cursor);
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
      }

      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;

      isActiveRef.current = false;
      targetCornerPositionsRef.current = null;
      activeStrengthRef.current = 0;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, isMobile, hoverDuration, parallaxOn]);

  useEffect(() => {
    if (isMobile || !cursorRef.current || !spinTl.current) return;
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    }
  }, [spinDuration, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
};

export default TargetCursor;

```

### Component CSS
```css
.target-cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
}

.target-cursor-dot {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  will-change: transform;
}

.target-cursor-corner {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12px;
  height: 12px;
  border: 3px solid #fff;
  will-change: transform;
}

.corner-tl {
  transform: translate(-150%, -150%);
  border-right: none;
  border-bottom: none;
}

.corner-tr {
  transform: translate(50%, -150%);
  border-left: none;
  border-bottom: none;
}

.corner-br {
  transform: translate(50%, 50%);
  border-left: none;
  border-top: none;
}

.corner-bl {
  transform: translate(-150%, 50%);
  border-right: none;
  border-top: none;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: magic rings
code: ## Integrate the <MagicRings /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: MagicRings
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import MagicRings from './MagicRings';

<div style={{ width: '600px', height: '400px', position: 'relative' }}>
  <MagicRings
    color="#fc42ff"
    colorTwo="#42fcff"
    ringCount={6}
    speed={1}
    attenuation={10}
    lineThickness={2}
    baseRadius={0.35}
    radiusStep={0.1}
    scaleRate={0.1}
    opacity={1}
    blur={0}
    noiseAmount={0.1}
    rotation={0}
    ringGap={1.5}
    fadeIn={0.7}
    fadeOut={0.5}
    followMouse={false}
    mouseInfluence={0.2}
    hoverScale={1.2}
    parallax={0.05}
    clickBurst={false}
  />
</div>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#A855F7" | Hex color for the rings. |
| colorTwo | string | "#6366F1" | Second color — rings interpolate from color to colorTwo. |
| ringCount | number | 6 | Number of concentric rings to draw (1–10). |
| speed | number | 1 | Animation speed multiplier. |
| attenuation | number | 10 | Glow falloff — higher values produce tighter glow. |
| lineThickness | number | 2 | Thickness of each ring line. |
| baseRadius | number | 0.35 | Radius of the innermost ring (normalized). |
| radiusStep | number | 0.1 | Spacing between successive rings. |
| scaleRate | number | 0.1 | How much rings expand over time. |
| opacity | number | 1 | Overall opacity of the effect (0–1). |
| blur | number | 0 | CSS blur in px — creates a bloom/glow effect. |
| noiseAmount | number | 0.1 | Film-grain noise intensity. |
| rotation | number | 0 | Static rotation of the pattern in degrees. |
| ringGap | number | 1.5 | Exponential base for angular cutaway per ring. |
| fadeIn | number | 0.7 | Duration of ring fade-in within cycle. |
| fadeOut | number | 0.5 | Start time of ring fade-out within cycle. |
| followMouse | boolean | false | Rings shift toward the mouse cursor. |
| mouseInfluence | number | 0.2 | Strength of mouse follow (when followMouse is true). |
| hoverScale | number | 1.2 | Scale multiplier on hover. |
| parallax | number | 0.05 | Per-ring depth offset based on mouse position. |
| clickBurst | boolean | false | Click triggers a brightness flash and scale pulse. |

### Full Component Source
```jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import './MagicRings.css';

const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime, uAttenuation, uLineThickness;
uniform float uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;
uniform float uFadeIn, uFadeOut;
uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;
uniform vec2 uResolution, uMouse;
uniform vec3 uColor, uColorTwo;
uniform int uRingCount;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation), sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;
  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
  p /= sc;
  vec3 c = vec3(0.0);
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    c = mix(c, rc, vec3(ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px)));
  }
  c *= 1.0 + uBurst * 2.0;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;
  gl_FragColor = vec4(c, max(c.r, max(c.g, c.b)) * uOpacity);
}
`;

export default function MagicRings({
  color = '#fc42ff',
  colorTwo = '#42fcff',
  speed = 1,
  ringCount = 6,
  attenuation = 10,
  lineThickness = 2,
  baseRadius = 0.35,
  radiusStep = 0.1,
  scaleRate = 0.1,
  opacity = 1,
  blur = 0,
  noiseAmount = 0.1,
  rotation = 0,
  ringGap = 1.5,
  fadeIn = 0.7,
  fadeOut = 0.5,
  followMouse = false,
  mouseInfluence = 0.2,
  hoverScale = 1.2,
  parallax = 0.05,
  clickBurst = false,
}) {
  const mountRef = useRef(null);
  const propsRef = useRef(null);
  const mouseRef = useRef([0, 0]);
  const smoothMouseRef = useRef([0, 0]);
  const hoverAmountRef = useRef(0);
  const isHoveredRef = useRef(false);
  const burstRef = useRef(0);

  propsRef.current = {
    color, colorTwo, speed, ringCount, attenuation, lineThickness,
    baseRadius, radiusStep, scaleRate, opacity, noiseAmount,
    rotation, ringGap, fadeIn, fadeOut, followMouse, mouseInfluence,
    hoverScale, parallax, clickBurst,
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true });
    } catch {
      return;
    }

    if (!renderer.capabilities.isWebGL2) {
      renderer.dispose();
      return;
    }

    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      uTime: { value: 0 },
      uAttenuation: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Color() },
      uColorTwo: { value: new THREE.Color() },
      uLineThickness: { value: 0 },
      uBaseRadius: { value: 0 },
      uRadiusStep: { value: 0 },
      uScaleRate: { value: 0 },
      uRingCount: { value: 0 },
      uOpacity: { value: 1 },
      uNoiseAmount: { value: 0 },
      uRotation: { value: 0 },
      uRingGap: { value: 1.6 },
      uFadeIn: { value: 0.5 },
      uFadeOut: { value: 0.75 },
      uMouse: { value: new THREE.Vector2() },
      uMouseInfluence: { value: 0 },
      uHoverAmount: { value: 0 },
      uHoverScale: { value: 1 },
      uParallax: { value: 0 },
      uBurst: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(quad);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h);
      renderer.setPixelRatio(dpr);
      uniforms.uResolution.value.set(w * dpr, h * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current[0] = (e.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current[1] = -((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onMouseEnter = () => { isHoveredRef.current = true; };
    const onMouseLeave = () => {
      isHoveredRef.current = false;
      mouseRef.current[0] = 0;
      mouseRef.current[1] = 0;
    };
    const onClick = () => { burstRef.current = 1; };

    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mouseenter', onMouseEnter);
    mount.addEventListener('mouseleave', onMouseLeave);
    mount.addEventListener('click', onClick);

    let frameId;
    const animate = (t) => {
      frameId = requestAnimationFrame(animate);
      const p = propsRef.current;

      smoothMouseRef.current[0] += (mouseRef.current[0] - smoothMouseRef.current[0]) * 0.08;
      smoothMouseRef.current[1] += (mouseRef.current[1] - smoothMouseRef.current[1]) * 0.08;
      hoverAmountRef.current += ((isHoveredRef.current ? 1 : 0) - hoverAmountRef.current) * 0.08;
      burstRef.current *= 0.95;
      if (burstRef.current < 0.001) burstRef.current = 0;

      uniforms.uTime.value = t * 0.001 * p.speed;
      uniforms.uAttenuation.value = p.attenuation;
      uniforms.uColor.value.set(p.color);
      uniforms.uColorTwo.value.set(p.colorTwo);
      uniforms.uLineThickness.value = p.lineThickness;
      uniforms.uBaseRadius.value = p.baseRadius;
      uniforms.uRadiusStep.value = p.radiusStep;
      uniforms.uScaleRate.value = p.scaleRate;
      uniforms.uRingCount.value = p.ringCount;
      uniforms.uOpacity.value = p.opacity;
      uniforms.uNoiseAmount.value = p.noiseAmount;
      uniforms.uRotation.value = (p.rotation * Math.PI) / 180;
      uniforms.uRingGap.value = p.ringGap;
      uniforms.uFadeIn.value = p.fadeIn;
      uniforms.uFadeOut.value = p.fadeOut;
      uniforms.uMouse.value.set(smoothMouseRef.current[0], smoothMouseRef.current[1]);
      uniforms.uMouseInfluence.value = p.followMouse ? p.mouseInfluence : 0;
      uniforms.uHoverAmount.value = hoverAmountRef.current;
      uniforms.uHoverScale.value = p.hoverScale;
      uniforms.uParallax.value = p.parallax;
      uniforms.uBurst.value = p.clickBurst ? burstRef.current : 0;

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('mouseenter', onMouseEnter);
      mount.removeEventListener('mouseleave', onMouseLeave);
      mount.removeEventListener('click', onClick);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="magic-rings-container" style={blur > 0 ? { filter: `blur(${blur}px)` } : undefined} />;
}

```

### Component CSS
```css
.magic-rings-container {
  width: 100%;
  height: 100%;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: magnet lines
code: ## Integrate the <MagnetLines /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: MagnetLines
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import MagnetLines from './MagnetLines';

<MagnetLines
  rows={9}
  columns={9}
  containerSize="60vmin"
  lineColor="tomato"
  lineWidth="0.8vmin"
  lineHeight="5vmin"
  baseAngle={0}
  style={{ margin: "2rem auto" }}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| rows | number | 9 | Number of grid rows. |
| columns | number | 9 | Number of grid columns. |
| containerSize | string | 80vmin | Specifies the width and height of the entire grid container. |
| lineColor | string | #efefef | Color for each line (the <span> elements). |
| lineWidth | string | 1vmin | Specifies each line’s thickness. |
| lineHeight | string | 6vmin | Specifies each line’s length. |
| baseAngle | number | -10 | Initial rotation angle (in degrees) before pointer movement. |
| className | string | — | Additional class name(s) applied to the container. |
| style | object | {} | Inline styles for the container. |

### Full Component Source
```jsx
import { useRef, useEffect } from 'react';
import './MagnetLines.css';

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('span');

    const onPointerMove = pointer => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty('--rotate', `${r}deg`);
      });
    };

    window.addEventListener('pointermove', onPointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [rows, columns]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        '--rotate': `${baseAngle}deg`,
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`magnetLines-container ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  );
}

```

### Component CSS
```css
.magnetLines-container {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);

  justify-items: center;
  align-items: center;

  width: 80vmin;
  height: 80vmin;
}

.magnetLines-container span {
  display: block;
  transform-origin: center;
  will-change: transform;
  transform: rotate(var(--rotate));
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: ghost cursor
code: ## Integrate the <GhostCursor /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: GhostCursor
### Variant: JavaScript + CSS
### Dependencies: three

---

### Usage Example
```jsx
import GhostCursor from './GhostCursor'

<div style={{ height: 600, position: 'relative' }}>
  <GhostCursor
    // Visuals
    color="#B497CF"
    brightness={1}
    edgeIntensity={0}

    // Trail and motion
    trailLength={50}
    inertia={0.5}

    // Post-processing
    grainIntensity={0.05}
    bloomStrength={0.1}
    bloomRadius={1.0}
    bloomThreshold={0.025}

    // Fade-out behavior
    fadeDelayMs={1000}
    fadeDurationMs={1500}
  />
</div>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | '' | Additional CSS class names for the container. |
| style | React.CSSProperties | {} | Inline styles for the container element. |
| trailLength | number | 50 | Number of points stored for the cursor trail (longer = longer smear). |
| inertia | number | 0.5 | Velocity retention when the pointer stops. Higher values make the cursor glide longer. |
| grainIntensity | number | 0.05 | Strength of the film grain post-processing pass. |
| bloomStrength | number | 0.1 | UnrealBloom effect strength. |
| bloomRadius | number | 1.0 | UnrealBloom radius controlling spread of glow. |
| bloomThreshold | number | 0.025 | UnrealBloom threshold; lower includes more pixels in bloom. |
| brightness | number | 1 | Final brightness multiplier applied to the effect color. |
| color | string | '#B497CF' | Base color of the ghost cursor effect. |
| mixBlendMode | CSS mix-blend-mode | 'screen' | Blend mode used when compositing with page content. |
| edgeIntensity | number | 0 | Darkening near edges of the canvas. 0 = none, 1 = strongest. |
| maxDevicePixelRatio | number | 0.5 | Upper cap for devicePixelRatio to control render cost on high-DPR displays. |
| targetPixels | number | auto (~1.3e6 desktop, ~0.9e6 touch) | Pixel budget. Resolution is dynamically scaled to keep total pixel count under this budget. |
| fadeDelayMs | number | auto (1000 desktop, 500 touch) | Idle delay before the trail starts to fade after pointer leaves/stops. |
| fadeDurationMs | number | auto (1500 desktop, 1000 touch) | Duration of the trail fade-out once the delay has elapsed. |
| zIndex | number | 10 | z-index applied to the canvas for layering above/below content. |

### Full Component Source
```jsx
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import './GhostCursor.css';

const GhostCursor = ({
  className,
  style,
  trailLength = 50,
  inertia = 0.5,
  grainIntensity = 0.05,
  bloomStrength = 0.1,
  bloomRadius = 1.0,
  bloomThreshold = 0.025,

  brightness = 1,
  color = '#B497CF',
  mixBlendMode = 'screen',
  edgeIntensity = 0,

  maxDevicePixelRatio = 0.5,
  targetPixels,

  fadeDelayMs,
  fadeDurationMs,
  zIndex = 10
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const materialRef = useRef(null);
  const bloomPassRef = useRef(null);
  const filmPassRef = useRef(null);

  const trailBufRef = useRef([]);
  const headRef = useRef(0);

  const rafRef = useRef(null);
  const resizeObsRef = useRef(null);
  const currentMouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const velocityRef = useRef(new THREE.Vector2(0, 0));
  const fadeOpacityRef = useRef(1.0);
  const lastMoveTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now());
  const pointerActiveRef = useRef(false);
  const runningRef = useRef(false);
  const hasValidSizeRef = useRef(false);

  const isTouch = useMemo(
    () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    []
  );

  const pixelBudget = targetPixels ?? (isTouch ? 0.9e6 : 1.3e6);
  const fadeDelay = fadeDelayMs ?? (isTouch ? 500 : 1000);
  const fadeDuration = fadeDurationMs ?? (isTouch ? 1000 : 1500);

  const baseVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float iTime;
    uniform vec3  iResolution;
    uniform vec2  iMouse;
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];
    uniform float iOpacity;
    uniform float iScale;
    uniform vec3  iBaseColor;
    uniform float iBrightness;
    uniform float iEdgeIntensity;
    varying vec2  vUv;

    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f *= f * (3. - 2. * f);
      return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),
                 mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);
    }
    float fbm(vec2 p){
      float v = 0.0;
      float a = 0.5;
      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for(int i=0;i<5;i++){
        v += a * noise(p);
        p = m * p * 2.0;
        a *= 0.5;
      }
      return v;
    }
    vec3 tint1(vec3 base){ return mix(base, vec3(1.0), 0.15); }
    vec3 tint2(vec3 base){ return mix(base, vec3(0.8, 0.9, 1.0), 0.25); }

    vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {
      vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));
      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));

      float smoke = fbm(p * iScale + r * 0.8);
      float radius = 0.5 + 0.3 * (1.0 / iScale);
      float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));
      float alpha = pow(smoke, 2.5) * distFactor;

      vec3 c1 = tint1(iBaseColor);
      vec3 c2 = tint2(iBaseColor);
      vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);

      return vec4(color * alpha * intensity, alpha * intensity);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
      vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);

      vec3 colorAcc = vec3(0.0);
      float alphaAcc = 0.0;

      vec4 b = blob(uv, mouse, 1.0, iOpacity);
      colorAcc += b.rgb;
      alphaAcc += b.a;

      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {
        vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);
        t = pow(t, 2.0);
        if (t > 0.01) {
          vec4 bt = blob(uv, pm, t * 0.8, iOpacity);
          colorAcc += bt.rgb;
          alphaAcc += bt.a;
        }
      }

      colorAcc *= iBrightness;

      vec2 uv01 = gl_FragCoord.xy / iResolution.xy;
      float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));
      float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);
      float k = clamp(iEdgeIntensity, 0.0, 1.0);
      float edgeMask = mix(1.0 - k, 1.0, distFromEdge);

      float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);
      gl_FragColor = vec4(colorAcc, outAlpha);
    }
  `;

  const FilmGrainShader = useMemo(() => {
    return {
      uniforms: {
        tDiffuse: { value: null },
        iTime: { value: 0 },
        intensity: { value: grainIntensity }
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float iTime;
        uniform float intensity;
        varying vec2 vUv;

        float hash1(float n){ return fract(sin(n)*43758.5453); }

        void main(){
          vec4 color = texture2D(tDiffuse, vUv);
          float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;
          color.rgb += n * intensity * color.rgb;
          gl_FragColor = color;
        }
      `
    };
  }, [grainIntensity]);

  const UnpremultiplyPass = useMemo(
    () =>
      new ShaderPass({
        uniforms: { tDiffuse: { value: null } },
        vertexShader: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          varying vec2 vUv;
          void main(){
            vec4 c = texture2D(tDiffuse, vUv);
            float a = max(c.a, 1e-5);
            vec3 straight = c.rgb / a;
            gl_FragColor = vec4(clamp(straight, 0.0, 1.0), c.a);
          }
        `
      }),
    []
  );

  function calculateScale(el) {
    const r = el.getBoundingClientRect();
    const base = 600;
    const current = Math.min(Math.max(1, r.width), Math.max(1, r.height));
    return Math.max(0.5, Math.min(2.0, current / base));
  }

  useEffect(() => {
    const host = containerRef.current;
    const parent = host?.parentElement;
    if (!host || !parent) return;

    let active = true;

    const prevParentPos = parent.style.position;
    if (!prevParentPos || prevParentPos === 'static') {
      parent.style.position = 'relative';
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: !isTouch,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: isTouch ? 'low-power' : 'high-performance',
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    });
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    renderer.domElement.style.pointerEvents = 'none';
    if (mixBlendMode) {
      renderer.domElement.style.mixBlendMode = String(mixBlendMode);
    } else {
      renderer.domElement.style.removeProperty('mix-blend-mode');
    }

    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geom = new THREE.PlaneGeometry(2, 2);

    const maxTrail = Math.max(1, Math.floor(trailLength));
    trailBufRef.current = Array.from({ length: maxTrail }, () => new THREE.Vector2(0.5, 0.5));
    headRef.current = 0;

    const baseColor = new THREE.Color(color);

    const material = new THREE.ShaderMaterial({
      defines: { MAX_TRAIL_LENGTH: maxTrail },
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(1, 1, 1) },
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },
        iPrevMouse: { value: trailBufRef.current.map(v => v.clone()) },
        iOpacity: { value: 1.0 },
        iScale: { value: 1.0 },
        iBaseColor: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },
        iBrightness: { value: brightness },
        iEdgeIntensity: { value: edgeIntensity }
      },
      vertexShader: baseVertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);

    const composer = new EffectComposer(renderer);
    composerRef.current = composer;

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), bloomStrength, bloomRadius, bloomThreshold);
    bloomPassRef.current = bloomPass;
    composer.addPass(bloomPass);

    const filmPass = new ShaderPass(FilmGrainShader);
    filmPassRef.current = filmPass;
    composer.addPass(filmPass);

    composer.addPass(UnpremultiplyPass);

    const resize = () => {
      if (!active) return;

      const rect = host.getBoundingClientRect();
      const cssW = Math.floor(rect.width);
      const cssH = Math.floor(rect.height);

      if (cssW <= 0 || cssH <= 0) {
        hasValidSizeRef.current = false;
        return;
      }

      const currentDPR = Math.min(
        typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
        maxDevicePixelRatio
      );
      const need = cssW * cssH * currentDPR * currentDPR;
      const scale = need <= pixelBudget ? 1 : Math.max(0.5, Math.min(1, Math.sqrt(pixelBudget / Math.max(1, need))));
      const pixelRatio = currentDPR * scale;

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(cssW, cssH, false);

      composer.setPixelRatio?.(pixelRatio);
      composer.setSize(cssW, cssH);

      const wpx = Math.max(1, Math.floor(cssW * pixelRatio));
      const hpx = Math.max(1, Math.floor(cssH * pixelRatio));
      material.uniforms.iResolution.value.set(wpx, hpx, 1);
      material.uniforms.iScale.value = calculateScale(host);
      bloomPass.setSize(wpx, hpx);

      hasValidSizeRef.current = true;
    };

    resize();
    const ro = new ResizeObserver(() => {
      if (!active) return;
      resize();
    });
    resizeObsRef.current = ro;
    ro.observe(parent);
    ro.observe(host);

    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const animate = () => {
      if (!active) return;

      if (!hasValidSizeRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const now = performance.now();
      const t = (now - start) / 1000;

      const mat = materialRef.current;
      const comp = composerRef.current;

      if (pointerActiveRef.current) {
        velocityRef.current.set(
          currentMouseRef.current.x - mat.uniforms.iMouse.value.x,
          currentMouseRef.current.y - mat.uniforms.iMouse.value.y
        );
        mat.uniforms.iMouse.value.copy(currentMouseRef.current);
        fadeOpacityRef.current = 1.0;
      } else {
        velocityRef.current.multiplyScalar(inertia);
        if (velocityRef.current.lengthSq() > 1e-6) {
          mat.uniforms.iMouse.value.add(velocityRef.current);
        }
        const dt = now - lastMoveTimeRef.current;
        if (dt > fadeDelay) {
          const k = Math.min(1, (dt - fadeDelay) / fadeDuration);
          fadeOpacityRef.current = Math.max(0, 1 - k);
        }
      }

      const N = trailBufRef.current.length;
      headRef.current = (headRef.current + 1) % N;
      trailBufRef.current[headRef.current].copy(mat.uniforms.iMouse.value);
      const arr = mat.uniforms.iPrevMouse.value;
      for (let i = 0; i < N; i++) {
        const srcIdx = (headRef.current - i + N) % N;
        arr[i].copy(trailBufRef.current[srcIdx]);
      }

      mat.uniforms.iOpacity.value = fadeOpacityRef.current;
      mat.uniforms.iTime.value = t;

      if (filmPassRef.current?.uniforms?.iTime) {
        filmPassRef.current.uniforms.iTime.value = t;
      }

      comp.render();

      if (!pointerActiveRef.current && fadeOpacityRef.current <= 0.001) {
        runningRef.current = false;
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const ensureLoop = () => {
      if (!runningRef.current) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const onPointerMove = e => {
      const rect = parent.getBoundingClientRect();
      const x = THREE.MathUtils.clamp((e.clientX - rect.left) / Math.max(1, rect.width), 0, 1);
      const y = THREE.MathUtils.clamp(1 - (e.clientY - rect.top) / Math.max(1, rect.height), 0, 1);
      currentMouseRef.current.set(x, y);
      pointerActiveRef.current = true;
      lastMoveTimeRef.current = performance.now();
      ensureLoop();
    };
    const onPointerEnter = () => {
      pointerActiveRef.current = true;
      ensureLoop();
    };
    const onPointerLeave = () => {
      pointerActiveRef.current = false;
      lastMoveTimeRef.current = performance.now();
      ensureLoop();
    };

    parent.addEventListener('pointermove', onPointerMove, { passive: true });
    parent.addEventListener('pointerenter', onPointerEnter, { passive: true });
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true });

    ensureLoop();

    return () => {
      active = false;
      hasValidSizeRef.current = false;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      rafRef.current = null;

      parent.removeEventListener('pointermove', onPointerMove);
      parent.removeEventListener('pointerenter', onPointerEnter);
      parent.removeEventListener('pointerleave', onPointerLeave);
      resizeObsRef.current?.disconnect();

      scene.clear();
      geom.dispose();
      material.dispose();
      materialRef.current = null;
      composer.dispose();
      composerRef.current = null;
      renderer.dispose();
      renderer.forceContextLoss();
      rendererRef.current = null;

      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      if (!prevParentPos || prevParentPos === 'static') {
        parent.style.position = prevParentPos;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    trailLength,
    inertia,
    grainIntensity,
    bloomStrength,
    bloomRadius,
    bloomThreshold,
    pixelBudget,
    fadeDelay,
    fadeDuration,
    isTouch,
    color,
    brightness,
    mixBlendMode,
    edgeIntensity
  ]);

  useEffect(() => {
    if (materialRef.current) {
      const c = new THREE.Color(color);
      materialRef.current.uniforms.iBaseColor.value.set(c.r, c.g, c.b);
    }
  }, [color]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.iBrightness.value = brightness;
    }
  }, [brightness]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.iEdgeIntensity.value = edgeIntensity;
    }
  }, [edgeIntensity]);

  useEffect(() => {
    if (filmPassRef.current?.uniforms?.intensity) {
      filmPassRef.current.uniforms.intensity.value = grainIntensity;
    }
  }, [grainIntensity]);

  useEffect(() => {
    const el = rendererRef.current?.domElement;
    if (!el) return;
    if (mixBlendMode) {
      el.style.mixBlendMode = String(mixBlendMode);
    } else {
      el.style.removeProperty('mix-blend-mode');
    }
  }, [mixBlendMode]);

  const mergedStyle = useMemo(() => ({ zIndex, ...style }), [zIndex, style]);

  return <div ref={containerRef} className={`ghost-cursor ${className ?? ''}`} style={mergedStyle} />;
};

export default GhostCursor;

```

### Component CSS
```css
.ghost-cursor {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ghost-cursor > canvas {
  display: block;
  width: 100%;
  height: 100%;
  background: transparent;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: gradual blur
code: ## Integrate the <GradualBlur /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: GradualBlur
### Variant: JavaScript + CSS
### Dependencies: mathjs

---

### Usage Example
```jsx
// Component added by Ansh - github.com/ansh-dhanani

import GradualBlur from './GradualBlur';

<section style={{position: 'relative',height: 500,overflow: 'hidden'}}>
  <div style={{ height: '100%',overflowY: 'auto',padding: '6rem 2rem' }}>
    <!-- Content Here - such as an image or text -->
  </div>

  <GradualBlur
    target="parent"
    position="bottom"
    height="6rem"
    strength={2}
    divCount={5}
    curve="bezier"
    exponential={true}
    opacity={1}
  />
</section>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | "top" | "bottom" | "left" | "right" | "bottom" | Edge to attach the blur overlay. |
| strength | number | 2 | Base blur strength multiplier (affects each layer). |
| height | string | "6rem" | Overlay height (for top / bottom positions). |
| width | string | — | Custom width (optional). Defaults to 100% for vertical positions or matches height for horizontal positions. |
| divCount | number | 5 | Number of stacked blur layers (higher = smoother gradient). |
| exponential | boolean | false | Use exponential progression for stronger end blur. |
| curve | "linear" | "bezier" | "ease-in" | "linear" | Distribution curve applied to layer progression. |
| opacity | number | 1 | Opacity applied to each blur layer. |
| animated | "boolean" | "scroll" | false | Fade in (true) or reveal on scroll ("scroll"). |
| duration | string | "0.3s" | Animation duration (when animated). |
| easing | string | "ease-out" | Animation easing (opacity / backdrop-filter). |
| hoverIntensity | number | — | Multiplier applied to strength while hovered. |
| target | "parent" | "page" | "parent" | Position relative to parent container or the entire page (fixed). |
| preset | "top" | "bottom" | "left" | "right" | — | Apply a predefined configuration bundle. |
| responsive | boolean | false | Enable internal responsive recalculation (experimental). |
| zIndex | number | 1000 | Base z-index (page target adds +100). |
| onAnimationComplete | () => void | — | Callback fired after animated reveal completes. |
| className | string | — | Additional class names appended to root element. |
| style | React.CSSProperties | — | Inline style overrides merged into container style. |

### Full Component Source
```jsx
import React, { useEffect, useRef, useState, useMemo } from 'react';

import './GradualBlur.css';

const DEFAULT_CONFIG = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  className: '',
  style: {}
};

const PRESETS = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },
  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
};

const CURVE_FUNCTIONS = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const mergeConfigs = (...configs) => configs.reduce((acc, c) => ({ ...acc, ...c }), {});
const getGradientDirection = position =>
  ({
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  })[position] || 'to bottom';

const debounce = (fn, wait) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
};

const useResponsiveDimension = (responsive, config, key) => {
  const [value, setValue] = useState(config[key]);
  useEffect(() => {
    if (!responsive) return;
    const calc = () => {
      const w = window.innerWidth;
      let v = config[key];
      if (w <= 480 && config[`mobile${key[0].toUpperCase() + key.slice(1)}`])
        v = config[`mobile${key[0].toUpperCase() + key.slice(1)}`];
      else if (w <= 768 && config[`tablet${key[0].toUpperCase() + key.slice(1)}`])
        v = config[`tablet${key[0].toUpperCase() + key.slice(1)}`];
      else if (w <= 1024 && config[`desktop${key[0].toUpperCase() + key.slice(1)}`])
        v = config[`desktop${key[0].toUpperCase() + key.slice(1)}`];
      setValue(v);
    };
    const debounced = debounce(calc, 100);
    calc();
    window.addEventListener('resize', debounced);
    return () => window.removeEventListener('resize', debounced);
  }, [responsive, config, key]);
  return responsive ? value : config[key];
};

const useIntersectionObserver = (ref, shouldObserve = false) => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
};

function GradualBlur(props) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props);
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');

  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');

  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;

    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      let blurValue;
      if (config.exponential) {
        blurValue = Math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const direction = getGradientDirection(config.position);

      const divStyle = {
        position: 'absolute',
        inset: '0',
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity,
        transition:
          config.animated && config.animated !== 'scroll'
            ? `backdrop-filter ${config.duration} ${config.easing}`
            : undefined
      };

      divs.push(<div key={i} style={divStyle} />);
    }

    return divs;
  }, [config, isHovered]);

  const containerStyle = useMemo(() => {
    const isVertical = ['top', 'bottom'].includes(config.position);
    const isHorizontal = ['left', 'right'].includes(config.position);
    const isPageTarget = config.target === 'page';

    const baseStyle = {
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      opacity: isVisible ? 1 : 0,
      transition: config.animated ? `opacity ${config.duration} ${config.easing}` : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || '100%';
      baseStyle[config.position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = '100%';
      baseStyle[config.position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  const { hoverIntensity, animated, onAnimationComplete, duration } = config;

  useEffect(() => {
    if (isVisible && animated === 'scroll' && onAnimationComplete) {
      const ms = parseFloat(duration) * 1000;
      const t = setTimeout(() => onAnimationComplete(), ms);
      return () => clearTimeout(t);
    }
  }, [isVisible, animated, onAnimationComplete, duration]);

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} ${config.className}`}
      style={containerStyle}
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div
        className="gradual-blur-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        {blurDivs}
      </div>
    </div>
  );
}

const GradualBlurMemo = React.memo(GradualBlur);
GradualBlurMemo.displayName = 'GradualBlur';
GradualBlurMemo.PRESETS = PRESETS;
GradualBlurMemo.CURVE_FUNCTIONS = CURVE_FUNCTIONS;
export default GradualBlurMemo;

const injectStyles = () => {
  if (typeof document === 'undefined') return;

  const styleId = 'gradual-blur-styles';
  if (document.getElementById(styleId)) return;

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = `
  .gradual-blur { pointer-events: none; transition: opacity 0.3s ease-out; }
  .gradual-blur-parent { overflow: hidden; }
  .gradual-blur-inner { pointer-events: none; }`;

  document.head.appendChild(styleElement);
};

if (typeof document !== 'undefined') {
  injectStyles();
}

```

### Component CSS
```css
.gradual-blur-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.gradual-blur-inner > div {
  -webkit-backdrop-filter: inherit;
  backdrop-filter: inherit;
}

.gradual-blur {
  isolation: isolate;
}

@supports not (backdrop-filter: blur(1px)) {
  .gradual-blur-inner > div {
    background: rgba(0, 0, 0, 0.3);
    opacity: 0.5;
  }
}

.gradual-blur-fixed {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1000;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: click spark
code : ## Integrate the <ClickSpark /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: ClickSpark
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import ClickSpark from './ClickSpark';

<ClickSpark
  sparkColor='#fff'
  sparkSize={10}
  sparkRadius={15}
  sparkCount={8}
  duration={400}
>
  {/* Your content here */}
</ClickSpark>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sparkColor | string | '#f00' | Color of each spark line. |
| sparkSize | number | 30 | Initial length of each spark line. |
| sparkRadius | number | 30 | How far sparks travel from the click center. |
| sparkCount | number | 8 | Number of spark lines that appear on each click. |
| duration | number | 660 | Animation duration in milliseconds. |
| easing | string | 'ease-out' | Easing function used for the spark animation. |
| extraScale | number | 1 | Additional multiplier for spark distance. |
| children | React.ReactNode | — | React children to render. |

### Full Component Source
```jsx
import { useRef, useEffect, useCallback } from 'react';

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    t => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;

    const draw = timestamp => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now
    }));

    sparksRef.current.push(...newSparks);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none'
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import and render the component using the usage example above as a starting point.
4. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: magnet
code: ## Integrate the <Magnet /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: Magnet
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import Magnet from './Magnet'

<Magnet padding={50} disabled={false} magnetStrength={50}>
  <p>Star React Bits on GitHub!</p>
</Magnet>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| padding | number | 100 | Specifies the distance (in pixels) around the element that activates the magnet pull. |
| disabled | boolean | — | Disables the magnet effect when set to true. |
| magnetStrength | number | 2 | Controls the strength of the pull; higher values reduce movement, lower values increase it. |
| activeTransition | string | "transform 0.3s ease-out" | CSS transition applied to the element when the magnet is active. |
| inactiveTransition | string | "transform 0.5s ease-in-out" | CSS transition applied when the magnet is inactive (mouse out of range). |
| wrapperClassName | string | "" | Optional CSS class name for the outermost wrapper element. |
| innerClassName | string | "" | Optional CSS class name for the moving (inner) element. |
| children | ReactNode | — | The content (JSX) to be displayed inside the magnetized element. |

### Full Component Source
```jsx
import { useState, useEffect, useRef } from 'react';

const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = e => {
      if (!magnetRef.current) return;

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);

        const offsetX = (e.clientX - centerX) / magnetStrength;
        const offsetY = (e.clientY - centerY) / magnetStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, disabled, magnetStrength]);

  const transitionStyle = isActive ? activeTransition : inactiveTransition;

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: transitionStyle,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import and render the component using the usage example above as a starting point.
4. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: sticker peel
code: ## Integrate the <StickerPeel /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: StickerPeel
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import StickerPeel from './StickerPeel'
import logo from './assets/sticker.png'
  
<StickerPeel
  imageSrc={logo}
  width={200}
  rotate={30}
  peelBackHoverPct={20}
  peelBackActivePct={40}
  shadowIntensity={0.6}
  lightingIntensity={0.1}
  initialPosition={{ x: -100, y: 100 }}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| imageSrc | string | required | The source URL for the sticker image |
| rotate | number | 30 | The rotation angle in degrees when dragging |
| peelBackHoverPct | number | 30 | Percentage of peel effect on hover (0-100) |
| peelBackActivePct | number | 40 | Percentage of peel effect when active/clicked (0-100) |
| peelDirection | number | 0 | Direction of the peel effect in degrees (0-360) |
| peelEasing | string | power3.out | GSAP easing function for peel animations |
| peelHoverEasing | string | power2.out | GSAP easing function for hover transitions |
| width | number | 200 | Width of the sticker in pixels |
| shadowIntensity | number | 0.6 | Intensity of the shadow effect (0-1) |
| lightingIntensity | number | 0.1 | Intensity of the lighting effect (0-1) |
| initialPosition | string | center | Initial position of the sticker ('center', 'top-left', 'top-right', 'bottom-left', 'bottom-right') |
| className | string | — | Custom class name for additional styling |

### Full Component Source
```jsx
import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './StickerPeel.css';

gsap.registerPlugin(Draggable);

const StickerPeel = ({
  imageSrc,
  rotate = 30,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  peelEasing = 'power3.out',
  peelHoverEasing = 'power2.out',
  width = 200,
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  initialPosition = 'center',
  peelDirection = 0,
  className = ''
}) => {
  const containerRef = useRef(null);
  const dragTargetRef = useRef(null);
  const pointLightRef = useRef(null);
  const pointLightFlippedRef = useRef(null);
  const draggableInstanceRef = useRef(null);

  const defaultPadding = 10;

  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return;

    let startX = 0,
      startY = 0;

    if (initialPosition === 'center') {
      return;
    }

    if (typeof initialPosition === 'object' && initialPosition.x !== undefined && initialPosition.y !== undefined) {
      startX = initialPosition.x;
      startY = initialPosition.y;
    }

    gsap.set(target, { x: startX, y: startY });
  }, [initialPosition]);

  useEffect(() => {
    const target = dragTargetRef.current;
    const boundsEl = target.parentNode;

    draggableInstanceRef.current = Draggable.create(target, {
      type: 'x,y',
      bounds: boundsEl,
      inertia: true,
      onDrag() {
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);
        gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' });
      },
      onDragEnd() {
        const rotationEase = 'power2.out';
        const duration = 0.8;
        gsap.to(target, { rotation: 0, duration, ease: rotationEase });
      }
    })[0];

    const handleResize = () => {
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.update();

        const currentX = gsap.getProperty(target, 'x');
        const currentY = gsap.getProperty(target, 'y');

        const boundsRect = boundsEl.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const maxX = boundsRect.width - targetRect.width;
        const maxY = boundsRect.height - targetRect.height;

        const newX = Math.max(0, Math.min(currentX, maxX));
        const newY = Math.max(0, Math.min(currentY, maxY));

        if (newX !== currentX || newY !== currentY) {
          gsap.to(target, {
            x: newX,
            y: newY,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    const updateLight = e => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.set(pointLightRef.current, { attr: { x, y } });

      const normalizedAngle = Math.abs(peelDirection % 360);
      if (normalizedAngle !== 180) {
        gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } });
      } else {
        gsap.set(pointLightFlippedRef.current, { attr: { x: -1000, y: -1000 } });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', updateLight);
      return () => container.removeEventListener('mousemove', updateLight);
    }
  }, [peelDirection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = () => {
      container.classList.add('touch-active');
    };

    const handleTouchEnd = () => {
      container.classList.remove('touch-active');
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  const cssVars = useMemo(
    () => ({
      '--sticker-rotate': `${rotate}deg`,
      '--sticker-p': `${defaultPadding}px`,
      '--sticker-peelback-hover': `${peelBackHoverPct}%`,
      '--sticker-peelback-active': `${peelBackActivePct}%`,
      '--sticker-peel-easing': peelEasing,
      '--sticker-peel-hover-easing': peelHoverEasing,
      '--sticker-width': `${width}px`,
      '--sticker-shadow-opacity': shadowIntensity,
      '--sticker-lighting-constant': lightingIntensity,
      '--peel-direction': `${peelDirection}deg`
    }),
    [
      rotate,
      peelBackHoverPct,
      peelBackActivePct,
      peelEasing,
      peelHoverEasing,
      width,
      shadowIntensity,
      lightingIntensity,
      peelDirection
    ]
  );

  return (
    <div className={`draggable ${className}`} ref={dragTargetRef} style={cssVars}>
      <svg width="0" height="0">
        <defs>
          <filter id="pointLight">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity}
              lightingColor="white"
            >
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id="pointLightFlipped">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity * 7}
              lightingColor="white"
            >
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id="dropShadow">
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation={3 * shadowIntensity}
              floodColor="black"
              floodOpacity={shadowIntensity}
            />
          </filter>

          <filter id="expandAndFill">
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(179,179,179)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      <div className="sticker-container" ref={containerRef}>
        <div className="sticker-main">
          <div className="sticker-lighting">
            <img
              src={imageSrc}
              alt=""
              className="sticker-image"
              draggable="false"
              onContextMenu={e => e.preventDefault()}
            />
          </div>
        </div>

        <div className="flap">
          <div className="flap-lighting">
            <img
              src={imageSrc}
              alt=""
              className="flap-image"
              draggable="false"
              onContextMenu={e => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerPeel;

```

### Component CSS
```css
:root {
  --sticker-rotate: 30deg;
  --sticker-p: 10px;
  --sticker-peelback-hover: 30%;
  --sticker-peelback-active: 40%;
  --sticker-peel-easing: power3.out;
  --sticker-peel-hover-easing: power2.out;
  --sticker-start: calc(-1 * var(--sticker-p));
  --sticker-end: calc(100% + var(--sticker-p));
  --sticker-shadow-opacity: 0.6;
  --sticker-lighting-constant: 0.1;
  --peel-direction: 0deg;
}

.sticker-container {
  position: relative;
  transform: rotate(var(--peel-direction));
  transform-origin: center;
}

.sticker-container * {
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

.sticker-main {
  clip-path: polygon(
    var(--sticker-start) var(--sticker-start),
    var(--sticker-end) var(--sticker-start),
    var(--sticker-end) var(--sticker-end),
    var(--sticker-start) var(--sticker-end)
  );
  transition: clip-path 0.6s ease-out;
  filter: url(#dropShadow);
}

.sticker-main > * {
  transform: rotate(calc(-1 * var(--peel-direction)));
}

.sticker-lighting {
  filter: url(#pointLight);
}

.sticker-container:hover .sticker-main,
.sticker-container.touch-active .sticker-main {
  clip-path: polygon(
    var(--sticker-start) var(--sticker-peelback-hover),
    var(--sticker-end) var(--sticker-peelback-hover),
    var(--sticker-end) var(--sticker-end),
    var(--sticker-start) var(--sticker-end)
  );
}

.sticker-container:active .sticker-main {
  clip-path: polygon(
    var(--sticker-start) var(--sticker-peelback-active),
    var(--sticker-end) var(--sticker-peelback-active),
    var(--sticker-end) var(--sticker-end),
    var(--sticker-start) var(--sticker-end)
  );
}

.sticker-image {
  transform: rotate(var(--sticker-rotate));
}

.flap {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: calc(-100% - var(--sticker-p) - var(--sticker-p));
  clip-path: polygon(
    var(--sticker-start) var(--sticker-start),
    var(--sticker-end) var(--sticker-start),
    var(--sticker-end) var(--sticker-start),
    var(--sticker-start) var(--sticker-start)
  );
  transform: scaleY(-1);
  transition: all 0.6s ease-out;
}

.flap > * {
  transform: rotate(calc(-1 * var(--peel-direction)));
}

.sticker-container:hover .flap,
.sticker-container.touch-active .flap {
  clip-path: polygon(
    var(--sticker-start) var(--sticker-start),
    var(--sticker-end) var(--sticker-start),
    var(--sticker-end) var(--sticker-peelback-hover),
    var(--sticker-start) var(--sticker-peelback-hover)
  );
  top: calc(-100% + 2 * var(--sticker-peelback-hover) - 1px);
}

.sticker-container:active .flap {
  clip-path: polygon(
    var(--sticker-start) var(--sticker-start),
    var(--sticker-end) var(--sticker-start),
    var(--sticker-end) var(--sticker-peelback-active),
    var(--sticker-start) var(--sticker-peelback-active)
  );
  top: calc(-100% + 2 * var(--sticker-peelback-active) - 1px);
}

.flap-lighting {
  filter: url(#pointLightFlipped);
}

.flap-image {
  transform: rotate(var(--sticker-rotate));
  filter: url(#expandAndFill);
}

.draggable {
  position: absolute;
  cursor: grab;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.draggable:active {
  cursor: grabbing;
}

/* Mobile-specific optimizations */
@media (hover: none) and (pointer: coarse) {
  .draggable {
    cursor: default;
  }

  .sticker-container {
    touch-action: none;
  }
}

.sticker-image,
.flap-image {
  width: var(--sticker-width, 200px);
}

.sticker-main,
.flap {
  will-change: clip-path, transform;
}

.sticker-ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  z-index: 10;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: pixel trail 
code: ## Integrate the <PixelTrail /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: PixelTrail
### Variant: JavaScript + CSS
### Dependencies: three @react-three/fiber @react-three/drei

---

### Usage Example
```jsx
import PixelTrail from './PixelTrail';

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <PixelTrail
    gridSize={50}
    trailSize={0.1}
    maxAge={250}
    interpolate={5}
    color="#fff"
    gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
  />
</div>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| gridSize | number | 40 | Number of pixels in grid. |
| trailSize | number | 0.1 | Size of each trail dot. |
| maxAge | number | 500 | Duration of the trail effect. |
| interpolate | number | 5 | Interpolation factor for pointer movement. |
| color | string | #ffffff | Pixel color. |
| gooeyFilter | object | { id: 'custom-goo-filter', strength: 5 } | Configuration for gooey filter. |

### Full Component Source
```jsx
/* eslint-disable react/no-unknown-property */
import { useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import * as THREE from 'three';

import './PixelTrail.css';

const GooeyFilter = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg className="goo-filter-container">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff')
  },
  `
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  `
);

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);

  const dotMaterial = useMemo(() => new DotMaterial(), []);
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || (x => x)
  });

  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = x => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true
  },
  gooeyFilter,
  color = '#ffffff',
  className = ''
}) {
  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={`pixel-canvas ${className}`}
        style={gooeyFilter && { filter: `url(#${gooeyFilter.id})` }}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}

```

### Component CSS
```css
.goo-filter-container {
  position: absolute;
  overflow: hidden;
  z-index: 1;
}

.pixel-canvas {
  position: absolute;
  z-index: 1;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: metallic paint
code: ## Integrate the <MetallicPaint /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: MetallicPaint
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
// Effect inspired by Paper's Liquid Metal effect
  
import MetallicPaint from "./MetallicPaint";

// Replace with your own SVG path
// NOTE: Your SVG should have padding around the shape to prevent cutoff
// It should have a black fill color to allow the metallic effect to show through
import logo from './logo.svg';

export default function Component() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <MetallicPaint
        imageSrc={logo}
        // Pattern
        seed={42}
        scale={4}
        patternSharpness={1}
        noiseScale={0.5}
        // Animation
        speed={0.3}
        liquid={0.75}
        mouseAnimation={false}
        // Visual
        brightness={2}
        contrast={0.5}
        refraction={0.01}
        blur={0.015}
        chromaticSpread={2}
        fresnel={1}
        angle={0}
        waveAmplitude={1}
        distortion={1}
        contour={0.2}
        // Colors
        lightColor="#ffffff"
        darkColor="#000000"
        tintColor="#feb3ff"
      />
    </div>
  );
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| imageSrc | string | none (required) | URL or path to the image used for the metallic paint effect. The image is processed internally. |
| seed | number | 42 | Random seed for pattern generation. Different values create different pattern variations. |
| scale | number | 2 | Scale of the metallic pattern. Higher values create more repetitions. |
| refraction | number | 0.015 | Amount of chromatic aberration (color separation). Creates the rainbow edge effect. |
| blur | number | 0.005 | Blur amount for the pattern transitions. Higher values create softer gradients. |
| liquid | number | 0.07 | Amount of liquid/wavy animation applied to the pattern. |
| speed | number | 0.3 | Animation speed multiplier. Set to 0 to disable animation. |
| brightness | number | 1 | Overall brightness of the metallic effect. Values above 1 increase brightness. |
| contrast | number | 1 | Color contrast of the effect. Higher values create more distinct light/dark areas. |
| angle | number | 0 | Rotation angle of the pattern in degrees. |
| fresnel | number | 1 | Fresnel effect intensity. Controls edge highlighting based on viewing angle. |
| lightColor | string | #ffffff | Hex color for the bright/highlight areas of the metallic effect. |
| darkColor | string | #111111 | Hex color for the dark/shadow areas of the metallic effect. |
| patternSharpness | number | 1 | Controls the sharpness of metallic band transitions. Higher = sharper edges. |
| waveAmplitude | number | 1 | Intensity of the wave distortion effect. |
| noiseScale | number | 1 | Scale of the noise pattern. Higher = more detailed noise. |
| chromaticSpread | number | 1 | Multiplier for chromatic aberration spread between RGB channels. |
| mouseAnimation | boolean | false | When true, mouse position controls wave animation instead of auto-loop. |
| distortion | number | 0 | Amount of noise-based distortion applied to the pattern flow (0-1). |
| contour | number | 0 | Intensity of edge contour effect that warps the pattern along shape boundaries (0-1). |
| tintColor | string | #ffffff | Hex color for color burn tint effect. White = no tint. |

### Full Component Source
```jsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import './MetallicPaint.css';

const vertexShader = `#version 300 es
precision highp float;
in vec2 a_position;
out vec2 vP;
void main(){vP=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}`;

const fragmentShader = `#version 300 es
precision highp float;
in vec2 vP;
out vec4 oC;
uniform sampler2D u_tex;
uniform float u_time,u_ratio,u_imgRatio,u_seed,u_scale,u_refract,u_blur,u_liquid;
uniform float u_bright,u_contrast,u_angle,u_fresnel,u_sharp,u_wave,u_noise,u_chroma;
uniform float u_distort,u_contour;
uniform vec3 u_lightColor,u_darkColor,u_tint;

vec3 sC,sM;

vec3 pW(vec3 v){
  vec3 i=floor(v),f=fract(v),s=sign(fract(v*.5)-.5),h=fract(sM*i+i.yzx),c=f*(f-1.);
  return s*c*((h*16.-4.)*c-1.);
}

vec3 aF(vec3 b,vec3 c){return pW(b+c.zxy-pW(b.zxy+c.yzx)+pW(b.yzx+c.xyz));}
vec3 lM(vec3 s,vec3 p){return(p+aF(s,p))*.5;}

vec2 fA(){
  vec2 c=vP-.5;
  c.x*=u_ratio>u_imgRatio?u_ratio/u_imgRatio:1.;
  c.y*=u_ratio>u_imgRatio?1.:u_imgRatio/u_ratio;
  return vec2(c.x+.5,.5-c.y);
}

vec2 rot(vec2 p,float r){float c=cos(r),s=sin(r);return vec2(p.x*c+p.y*s,p.y*c-p.x*s);}

float bM(vec2 c,float t){
  vec2 l=smoothstep(vec2(0.),vec2(t),c),u=smoothstep(vec2(0.),vec2(t),1.-c);
  return l.x*l.y*u.x*u.y;
}

float mG(float hi,float lo,float t,float sh,float cv){
  sh*=(2.-u_sharp);
  float ci=smoothstep(.15,.85,cv),r=lo;
  float e1=.08/u_scale;
  r=mix(r,hi,smoothstep(0.,sh*1.5,t));
  r=mix(r,lo,smoothstep(e1-sh,e1+sh,t));
  float e2=e1+.05/u_scale*(1.-ci*.35);
  r=mix(r,hi,smoothstep(e2-sh,e2+sh,t));
  float e3=e2+.025/u_scale*(1.-ci*.45);
  r=mix(r,lo,smoothstep(e3-sh,e3+sh,t));
  float e4=e1+.1/u_scale;
  r=mix(r,hi,smoothstep(e4-sh,e4+sh,t));
  float rm=1.-e4,gT=clamp((t-e4)/rm,0.,1.);
  r=mix(r,mix(hi,lo,smoothstep(0.,1.,gT)),smoothstep(e4-sh*.5,e4+sh*.5,t));
  return r;
}

void main(){
  sC=fract(vec3(.7548,.5698,.4154)*(u_seed+17.31))+.5;
  sM=fract(sC.zxy-sC.yzx*1.618);
  vec2 sc=vec2(vP.x*u_ratio,1.-vP.y);
  float angleRad=u_angle*3.14159/180.;
  sc=rot(sc-.5,angleRad)+.5;
  sc=clamp(sc,0.,1.);
  float sl=sc.x-sc.y,an=u_time*.001;
  vec2 iC=fA();
  vec4 texSample=texture(u_tex,iC);
  float dp=texSample.r;
  float shapeMask=texSample.a;
  vec3 hi=u_lightColor*u_bright;
  vec3 lo=u_darkColor*(2.-u_bright);
  lo.b+=smoothstep(.6,1.4,sc.x+sc.y)*.08;
  vec2 fC=sc-.5;
  float rd=length(fC+vec2(0.,sl*.15));
  vec2 ag=rot(fC,(.22-sl*.18)*3.14159);
  float cv=1.-pow(rd*1.65,1.15);
  cv*=pow(sc.y,.35);
  float vs=shapeMask;
  vs*=bM(iC,.01);
  float fr=pow(1.-cv,u_fresnel)*.3;
  vs=min(vs+fr*vs,1.);
  float mT=an*.0625;
  vec3 wO=vec3(-1.05,1.35,1.55);
  vec3 wA=aF(vec3(31.,73.,56.),mT+wO)*.22*u_wave;
  vec3 wB=aF(vec3(24.,64.,42.),mT-wO.yzx)*.22*u_wave;
  vec2 nC=sc*45.*u_noise;
  nC+=aF(sC.zxy,an*.17*sC.yzx-sc.yxy*.35).xy*18.*u_wave;
  vec3 tC=vec3(.00041,.00053,.00076)*mT+wB*nC.x+wA*nC.y;
  tC=lM(sC,tC);
  tC=lM(sC+1.618,tC);
  float tb=sin(tC.x*3.14159)*.5+.5;
  tb=tb*2.-1.;
  float noiseVal=pW(vec3(sc*8.+an,an*.5)).x;
  float edgeFactor=smoothstep(0.,.5,dp)*smoothstep(1.,.5,dp);
  float lD=dp+(1.-dp)*u_liquid*tb;
  lD+=noiseVal*u_distort*.15*edgeFactor;
  float rB=clamp(1.-cv,0.,1.);
  float fl=ag.x+sl;
  fl+=noiseVal*sl*u_distort*edgeFactor;
  fl*=mix(1.,1.-dp*.5,u_contour);
  fl-=dp*u_contour*.8;
  float eI=smoothstep(0.,1.,lD)*smoothstep(1.,0.,lD);
  fl-=tb*sl*1.8*eI;
  float cA=cv*clamp(pow(sc.y,.12),.25,1.);
  fl*=.12+(1.05-lD)*cA;
  fl*=smoothstep(1.,.65,lD);
  float vA1=smoothstep(.08,.18,sc.y)*smoothstep(.38,.18,sc.y);
  float vA2=smoothstep(.08,.18,1.-sc.y)*smoothstep(.38,.18,1.-sc.y);
  fl+=vA1*.16+vA2*.025;
  fl*=.45+pow(sc.y,2.)*.55;
  fl*=u_scale;
  fl-=an;
  float rO=rB+cv*tb*.025;
  float vM1=smoothstep(-.12,.18,sc.y)*smoothstep(.48,.08,sc.y);
  float cM1=smoothstep(.35,.55,cv)*smoothstep(.95,.35,cv);
  rO+=vM1*cM1*4.5;
  rO-=sl;
  float bO=rB*1.25;
  float vM2=smoothstep(-.02,.35,sc.y)*smoothstep(.75,.08,sc.y);
  float cM2=smoothstep(.35,.55,cv)*smoothstep(.75,.35,cv);
  bO+=vM2*cM2*.9;
  bO-=lD*.18;
  rO*=u_refract*u_chroma;
  bO*=u_refract*u_chroma;
  float sf=u_blur;
  float rP=fract(fl+rO);
  float rC=mG(hi.r,lo.r,rP,sf+.018+u_refract*cv*.025,cv);
  float gP=fract(fl);
  float gC=mG(hi.g,lo.g,gP,sf+.008/max(.01,1.-sl),cv);
  float bP=fract(fl-bO);
  float bC=mG(hi.b,lo.b,bP,sf+.008,cv);
  vec3 col=vec3(rC,gC,bC);
  col=(col-.5)*u_contrast+.5;
  col=clamp(col,0.,1.);
  col=mix(col,1.-min(vec3(1.),(1.-col)/max(u_tint,vec3(.001))),length(u_tint-1.)*.5);
  col=clamp(col,0.,1.);
  oC=vec4(col*vs,vs);
}`;

function processImage(img) {
  const MAX_SIZE = 1000;
  const MIN_SIZE = 500;
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;

  if (width > MAX_SIZE || height > MAX_SIZE || width < MIN_SIZE || height < MIN_SIZE) {
    const scale =
      width > height
        ? width > MAX_SIZE
          ? MAX_SIZE / width
          : width < MIN_SIZE
            ? MIN_SIZE / width
            : 1
        : height > MAX_SIZE
          ? MAX_SIZE / height
          : height < MIN_SIZE
            ? MIN_SIZE / height
            : 1;
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const size = width * height;
  const alphaValues = new Float32Array(size);
  const shapeMask = new Uint8Array(size);
  const boundaryMask = new Uint8Array(size);

  for (let i = 0; i < size; i++) {
    const idx = i * 4;
    const r = data[idx],
      g = data[idx + 1],
      b = data[idx + 2],
      a = data[idx + 3];
    const isBackground = (r > 250 && g > 250 && b > 250 && a === 255) || a < 5;
    alphaValues[i] = isBackground ? 0 : a / 255;
    shapeMask[i] = alphaValues[i] > 0.1 ? 1 : 0;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (!shapeMask[idx]) continue;
      if (
        x === 0 ||
        x === width - 1 ||
        y === 0 ||
        y === height - 1 ||
        !shapeMask[idx - 1] ||
        !shapeMask[idx + 1] ||
        !shapeMask[idx - width] ||
        !shapeMask[idx + width]
      ) {
        boundaryMask[idx] = 1;
      }
    }
  }

  const u = new Float32Array(size);
  const ITERATIONS = 200;
  const C = 0.01;
  const omega = 1.85;

  for (let iter = 0; iter < ITERATIONS; iter++) {
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;
        if (!shapeMask[idx] || boundaryMask[idx]) continue;
        const sum =
          (shapeMask[idx + 1] ? u[idx + 1] : 0) +
          (shapeMask[idx - 1] ? u[idx - 1] : 0) +
          (shapeMask[idx + width] ? u[idx + width] : 0) +
          (shapeMask[idx - width] ? u[idx - width] : 0);
        const newVal = (C + sum) / 4;
        u[idx] = omega * newVal + (1 - omega) * u[idx];
      }
    }
  }

  let maxVal = 0;
  for (let i = 0; i < size; i++) if (u[i] > maxVal) maxVal = u[i];
  if (maxVal === 0) maxVal = 1;

  const outData = ctx.createImageData(width, height);
  for (let i = 0; i < size; i++) {
    const px = i * 4;
    const depth = u[i] / maxVal;
    const gray = Math.round(255 * (1 - depth * depth));
    outData.data[px] = outData.data[px + 1] = outData.data[px + 2] = gray;
    outData.data[px + 3] = Math.round(alphaValues[i] * 255);
  }

  return outData;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : [1, 1, 1];
}

export default function MetallicPaint({
  imageSrc,
  seed = 42,
  scale = 4,
  refraction = 0.01,
  blur = 0.015,
  liquid = 0.75,
  speed = 0.3,
  brightness = 2,
  contrast = 0.5,
  angle = 0,
  fresnel = 1,
  lightColor = '#ffffff',
  darkColor = '#000000',
  patternSharpness = 1,
  waveAmplitude = 1,
  noiseScale = 0.5,
  chromaticSpread = 2,
  mouseAnimation = false,
  distortion = 1,
  contour = 0.2,
  tintColor = '#feb3ff'
}) {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const uniformsRef = useRef({});
  const textureRef = useRef(null);
  const animTimeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef(null);
  const imgDataRef = useRef(null);
  const speedRef = useRef(speed);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const mouseAnimRef = useRef(mouseAnimation);

  const [ready, setReady] = useState(false);
  const [textureReady, setTextureReady] = useState(false);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  useEffect(() => {
    mouseAnimRef.current = mouseAnimation;
  }, [mouseAnimation]);

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const gl = canvas.getContext('webgl2', { antialias: true, alpha: true });
    if (!gl) return false;

    const compile = (src, type) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vs = compile(vertexShader, gl.VERTEX_SHADER);
    const fs = compile(fragmentShader, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return false;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return false;
    }

    const uniforms = {};
    const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(prog, i);
      if (info) uniforms[info.name] = gl.getUniformLocation(prog, info.name);
    }

    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    gl.useProgram(prog);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    glRef.current = gl;
    programRef.current = prog;
    uniformsRef.current = uniforms;

    return true;
  }, []);

  const uploadTexture = useCallback(imgData => {
    const gl = glRef.current;
    const uniforms = uniformsRef.current;
    if (!gl || !imgData) return;

    if (textureRef.current) gl.deleteTexture(textureRef.current);

    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, imgData.width, imgData.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, imgData.data);
    gl.uniform1i(uniforms.u_tex, 0);

    const ratio = imgData.width / imgData.height;
    gl.uniform1f(uniforms.u_imgRatio, ratio);
    gl.uniform1f(uniforms.u_ratio, 1);

    textureRef.current = tex;
    imgDataRef.current = imgData;
  }, []);

  useEffect(() => {
    if (!initGL()) return;

    const canvas = canvasRef.current;
    const gl = glRef.current;
    const side = 1000 * devicePixelRatio;
    canvas.width = side;
    canvas.height = side;
    gl.viewport(0, 0, side, side);

    setReady(true);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (textureRef.current && glRef.current) {
        glRef.current.deleteTexture(textureRef.current);
      }
    };
  }, [initGL]);

  useEffect(() => {
    if (!ready || !imageSrc) return;

    setTextureReady(false);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const imgData = processImage(img);
      uploadTexture(imgData);
      setTextureReady(true);
    };
    img.src = imageSrc;
  }, [ready, imageSrc, uploadTexture]);

  useEffect(() => {
    const gl = glRef.current;
    const u = uniformsRef.current;
    if (!gl || !ready) return;

    gl.uniform1f(u.u_seed, seed);
    gl.uniform1f(u.u_scale, scale);
    gl.uniform1f(u.u_refract, refraction);
    gl.uniform1f(u.u_blur, blur);
    gl.uniform1f(u.u_liquid, liquid);
    gl.uniform1f(u.u_bright, brightness);
    gl.uniform1f(u.u_contrast, contrast);
    gl.uniform1f(u.u_angle, angle);
    gl.uniform1f(u.u_fresnel, fresnel);

    const light = hexToRgb(lightColor);
    const dark = hexToRgb(darkColor);
    const tint = hexToRgb(tintColor);
    gl.uniform3f(u.u_lightColor, light[0], light[1], light[2]);
    gl.uniform3f(u.u_darkColor, dark[0], dark[1], dark[2]);
    gl.uniform1f(u.u_sharp, patternSharpness);
    gl.uniform1f(u.u_wave, waveAmplitude);
    gl.uniform1f(u.u_noise, noiseScale);
    gl.uniform1f(u.u_chroma, chromaticSpread);
    gl.uniform1f(u.u_distort, distortion);
    gl.uniform1f(u.u_contour, contour);
    gl.uniform3f(u.u_tint, tint[0], tint[1], tint[2]);
  }, [
    ready,
    seed,
    scale,
    refraction,
    blur,
    liquid,
    brightness,
    contrast,
    angle,
    fresnel,
    lightColor,
    darkColor,
    patternSharpness,
    waveAmplitude,
    noiseScale,
    chromaticSpread,
    distortion,
    contour,
    tintColor
  ]);

  useEffect(() => {
    if (!ready || !textureReady) return;

    const gl = glRef.current;
    const u = uniformsRef.current;
    const canvas = canvasRef.current;
    const mouse = mouseRef.current;

    const handleMouseMove = e => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) / rect.width;
      mouse.targetY = (e.clientY - rect.top) / rect.height;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = time => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (mouseAnimRef.current) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
        animTimeRef.current = mouse.x * 3000 + mouse.y * 1500;
      } else {
        animTimeRef.current += delta * speedRef.current;
      }

      gl.uniform1f(u.u_time, animTimeRef.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ready, textureReady]);

  return <canvas ref={canvasRef} className="paint-container" />;
}

```

### Component CSS
```css
.paint-container {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: contain;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: shape blur
code: ## Integrate the <ShapeBlur /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: ShapeBlur
### Variant: JavaScript + CSS
### Dependencies: three

---

### Usage Example
```jsx
import ShapeBlur from './ShapeBlur';

<div style={{position: 'relative', height: '500px', overflow: 'hidden'}}>
  <ShapeBlur
    variation={0}
    pixelRatioProp={window.devicePixelRatio || 1}
    shapeSize={0.5}
    roundness={0.5}
    borderSize={0.05}
    circleSize={0.5}
    circleEdge={1}
  />
</div>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variation | number | 0 | Selects the shape variation (0-3) used by the shader. |
| pixelRatioProp | number | 2 | Overrides the pixel ratio, typically set to the device pixel ratio. |
| shapeSize | number | 1.2 | Controls the size of the shape. |
| roundness | number | 0.4 | Determines the roundness of the shape's corners. |
| borderSize | number | 0.05 | Sets the thickness of the border. |
| circleSize | number | 0.3 | Determines the size of the hover circle effect. |
| circleEdge | number | 0.5 | Controls the edge softness of the hover circle. |

### Full Component Source
```jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
varying vec2 v_texcoord;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_texcoord = uv;
}
`;

const fragmentShader = /* glsl */ `
varying vec2 v_texcoord;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform float u_shapeSize;
uniform float u_roundness;
uniform float u_borderSize;
uniform float u_circleSize;
uniform float u_circleEdge;

#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif
#ifndef TWO_PI
#define TWO_PI 6.2831853071795864769252867665590
#endif

#ifndef VAR
#define VAR 0
#endif

#ifndef FNC_COORD
#define FNC_COORD
vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}
#endif

#define st0 coord(gl_FragCoord.xy)
#define mx coord(u_mouse * u_pixelRatio)

float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}
float sdCircle(in vec2 st, in vec2 center) {
    return length(st - center) * 2.0;
}
float sdPoly(in vec2 p, in float w, in int sides) {
    float a = atan(p.x, p.y) + PI;
    float r = TWO_PI / float(sides);
    float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));
    return d * 2.0 - w;
}

float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}
float fill(in float x) { return 1.0 - aastep(0.0, x); }
float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}
float stroke(in float d, in float t) { return (1.0 - aastep(t, abs(d))); }
float stroke(float x, float size, float w, float edge) {
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

float strokeAA(float x, float size, float w, float edge) {
    float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;
    float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)
            - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 st = st0 + 0.5;
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;

    float size = u_shapeSize;
    float roundness = u_roundness;
    float borderSize = u_borderSize;
    float circleSize = u_circleSize;
    float circleEdge = u_circleEdge;

    float sdfCircle = fill(
        sdCircle(st, posMouse),
        circleSize,
        circleEdge
    );

    float sdf;
    if (VAR == 0) {
        sdf = sdRoundRect(st, vec2(size), roundness);
        sdf = strokeAA(sdf, 0.0, borderSize, sdfCircle) * 4.0;
    } else if (VAR == 1) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = fill(sdf, 0.6, sdfCircle) * 1.2;
    } else if (VAR == 2) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = strokeAA(sdf, 0.58, 0.02, sdfCircle) * 4.0;
    } else if (VAR == 3) {
        sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);
        sdf = fill(sdf, 0.05, sdfCircle) * 1.4;
    }

    vec3 color = vec3(1.0);
    float alpha = sdf;
    gl_FragColor = vec4(color.rgb, alpha);
}
`;

const ShapeBlur = ({
  className = '',
  variation = 0,
  pixelRatioProp = 2,
  shapeSize = 1.2,
  roundness = 0.4,
  borderSize = 0.05,
  circleSize = 0.3,
  circleEdge = 0.5
}) => {
  const mountRef = useRef();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let active = true;
    let animationFrameId;
    let time = 0,
      lastTime = 0;

    const vMouse = new THREE.Vector2();
    const vMouseDamp = new THREE.Vector2();
    const vResolution = new THREE.Vector2();

    let w = 1,
      h = 1;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const geo = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_mouse: { value: vMouseDamp },
        u_resolution: { value: vResolution },
        u_pixelRatio: { value: pixelRatioProp },
        u_shapeSize: { value: shapeSize },
        u_roundness: { value: roundness },
        u_borderSize: { value: borderSize },
        u_circleSize: { value: circleSize },
        u_circleEdge: { value: circleEdge }
      },
      defines: { VAR: variation },
      transparent: true
    });

    const quad = new THREE.Mesh(geo, material);
    scene.add(quad);

    const onPointerMove = e => {
      const rect = mount.getBoundingClientRect();
      vMouse.set(e.clientX - rect.left, e.clientY - rect.top);
    };

    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('pointermove', onPointerMove);

    const resize = () => {
      if (!active) return;
      w = mount.clientWidth;
      h = mount.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);

      renderer.setSize(w, h);
      renderer.setPixelRatio(dpr);

      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();

      quad.scale.set(w, h, 1);
      vResolution.set(w, h).multiplyScalar(dpr);
      material.uniforms.u_pixelRatio.value = dpr;
    };

    resize();
    window.addEventListener('resize', resize);

    const ro = new ResizeObserver(() => {
      if (!active) return;
      resize();
    });
    ro.observe(mount);

    const update = () => {
      if (!active) return;
      time = performance.now() * 0.001;
      const dt = time - lastTime;
      lastTime = time;

      ['x', 'y'].forEach(k => {
        vMouseDamp[k] = THREE.MathUtils.damp(vMouseDamp[k], vMouse[k], 8, dt);
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(update);
    };
    update();

    return () => {
      active = false;

      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('pointermove', onPointerMove);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [variation, pixelRatioProp, shapeSize, roundness, borderSize, circleSize, circleEdge]);

  return <div className={className} ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default ShapeBlur;

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import and render the component using the usage example above as a starting point.
4. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: crosshair
code: ## Integrate the <Crosshair /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: Crosshair
### Variant: JavaScript + CSS
### Dependencies: gsap

---

### Usage Example
```jsx
import { useRef } from 'react';
import Crosshair from './Crosshair';

const Component = () => {
const containerRef = useRef(null);

return (
  <div ref={containerRef} style={{ height: '300px', overflow: 'hidden' }}>
    <Crosshair containerRef={containerRef} color='#ffffff'/> // containerRef defaults to "window" if not provided
  </div>
)
};
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | 'white' | Color of the crosshair lines. |
| containerRef | RefObject<HTMLElement> | null | Optional container ref to limit crosshair to specific element. If null, crosshair will be active on entire viewport. |

### Full Component Source
```jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const lerp = (a, b, n) => (1 - n) * a + n * b;

const getMousePos = (e, container) => {
  if (container) {
    const bounds = container.getBoundingClientRect();
    return {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top
    };
  }
  return { x: e.clientX, y: e.clientY };
};

const Crosshair = ({ color = 'white', containerRef = null }) => {
  const cursorRef = useRef(null);
  const lineHorizontalRef = useRef(null);
  const lineVerticalRef = useRef(null);
  const filterXRef = useRef(null);
  const filterYRef = useRef(null);

  let mouse = { x: 0, y: 0 };

  useEffect(() => {
    const handleMouseMove = ev => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mouse = getMousePos(ev, containerRef?.current);

      if (containerRef?.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        if (
          ev.clientX < bounds.left ||
          ev.clientX > bounds.right ||
          ev.clientY < bounds.top ||
          ev.clientY > bounds.bottom
        ) {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 0 });
        } else {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 1 });
        }
      }
    };

    const target = containerRef?.current || window;
    target.addEventListener('mousemove', handleMouseMove);

    const renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 }
    };

    gsap.set([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 0 });

    const onMouseMove = () => {
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;

      gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
        duration: 0.9,
        ease: 'Power3.easeOut',
        opacity: 1
      });

      requestAnimationFrame(render);

      target.removeEventListener('mousemove', onMouseMove);
    };

    target.addEventListener('mousemove', onMouseMove);

    const primitiveValues = { turbulence: 0 };

    const tl = gsap
      .timeline({
        paused: true,
        onStart: () => {
          lineHorizontalRef.current.style.filter = `url(#filter-noise-x)`;
          lineVerticalRef.current.style.filter = `url(#filter-noise-y)`;
        },
        onUpdate: () => {
          if (filterXRef.current && filterYRef.current) {
            filterXRef.current.setAttribute('baseFrequency', primitiveValues.turbulence);
            filterYRef.current.setAttribute('baseFrequency', primitiveValues.turbulence);
          }
        },
        onComplete: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = lineVerticalRef.current.style.filter = 'none';
          }
        }
      })
      .to(primitiveValues, {
        duration: 0.5,
        ease: 'power1',
        startAt: { turbulence: 1 },
        turbulence: 0
      });

    const enter = () => tl.restart();
    const leave = () => tl.progress(1).kill();

    const render = () => {
      renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.current = mouse.y;

      for (const key in renderedStyles) {
        renderedStyles[key].previous = lerp(
          renderedStyles[key].previous,
          renderedStyles[key].current,
          renderedStyles[key].amt
        );
      }

      if (lineHorizontalRef.current && lineHorizontalRef.current) {
        gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });
        gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });
      }

      requestAnimationFrame(render);
    };

    const links = containerRef?.current ? containerRef.current.querySelectorAll('a') : document.querySelectorAll('a');

    links.forEach(link => {
      link.addEventListener('mouseenter', enter);
      link.addEventListener('mouseleave', leave);
    });

    return () => {
      target.removeEventListener('mousemove', handleMouseMove);
      target.removeEventListener('mousemove', onMouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseenter', enter);
        link.removeEventListener('mouseleave', leave);
      });
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      className="cursor"
      style={{
        position: containerRef ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10000
      }}
    >
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterXRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterYRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>
      <div
        ref={lineHorizontalRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '1px',
          background: color,
          pointerEvents: 'none',
          transform: 'translateY(50%)',
          opacity: 0
        }}
      ></div>
      <div
        ref={lineVerticalRef}
        style={{
          position: 'absolute',
          height: '100%',
          width: '1px',
          background: color,
          pointerEvents: 'none',
          transform: 'translateX(50%)',
          opacity: 0
        }}
      ></div>
    </div>
  );
};

export default Crosshair;

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import and render the component using the usage example above as a starting point.
4. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: image trail
code: ## Integrate the <ImageTrail /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: ImageTrail
### Variant: JavaScript + CSS
### Dependencies: gsap

---

### Usage Example
```jsx
import ImageTrail from './ImageTrail;'

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <ImageTrail
    key={key}
    items={[
      'https://picsum.photos/id/287/300/300',
      'https://picsum.photos/id/1001/300/300',
      'https://picsum.photos/id/1025/300/300',
      'https://picsum.photos/id/1026/300/300',
      'https://picsum.photos/id/1027/300/300',
      'https://picsum.photos/id/1028/300/300',
      'https://picsum.photos/id/1029/300/300',
      'https://picsum.photos/id/1030/300/300',
      // ...
    ]}
    variant={1}
  />
</div>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | string[] | [] | An array of image URLs which will be animated in the trail. |
| variant | number | 1 | A number from 1 to 8 - all different animation styles. |

### Full Component Source
```jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import './ImageTrail.css';

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e, rect) {
  let clientX = 0,
    clientY = 0;
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}
function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

class ImageItem {
  DOM = { el: null, inner: null };
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect = null;

  constructor(DOM_el) {
    this.DOM.el = DOM_el;
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');
    this.getRect();
    this.initEvents();
  }
  initEvents() {
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    window.addEventListener('resize', this.resize);
  }
  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }
}

class ImageTrailVariant1 {
  constructor(container) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...this.DOM.el.querySelectorAll('.content__img')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    const handlePointerMove = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };

      requestAnimationFrame(() => this.render());

      container.removeEventListener('mousemove', initRender);
      container.removeEventListener('touchmove', initRender);
    };
    container.addEventListener('mousemove', initRender);
    container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3',
          opacity: 0,
          scale: 0.2
        },
        0.4
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }
}

class ImageTrailVariant2 {
  constructor(container) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    const handlePointerMove = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };

      requestAnimationFrame(() => this.render());

      container.removeEventListener('mousemove', initRender);
      container.removeEventListener('touchmove', initRender);
    };
    container.addEventListener('mousemove', initRender);
    container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2.8,
          filter: 'brightness(250%)'
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          filter: 'brightness(100%)'
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power2',
          opacity: 0,
          scale: 0.2
        },
        0.45
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }
}

class ImageTrailVariant3 {
  constructor(container) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    const handlePointerMove = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };

      requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', initRender);
      container.removeEventListener('touchmove', initRender);
    };
    container.addEventListener('mousemove', initRender);
    container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          xPercent: 0,
          yPercent: 0,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 1.2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.6,
          ease: 'power2',
          opacity: 0,
          scale: 0.2,
          xPercent: () => gsap.utils.random(-30, 30),
          yPercent: -200
        },
        0.6
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }
}

class ImageTrailVariant4 {
  constructor(container) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    const handlePointerMove = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', initRender);
      container.removeEventListener('touchmove', initRender);
    };
    container.addEventListener('mousemove', initRender);
    container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance !== 0) {
      dx /= distance;
      dy /= distance;
    }
    dx *= distance / 100;
    dy *= distance / 100;

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2,
          filter: `brightness(${Math.max((400 * distance) / 100, 100)}%) contrast(${Math.max((400 * distance) / 100, 100)}%)`
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          filter: 'brightness(100%) contrast(100%)'
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3',
          opacity: 0
        },
        0.4
      )
      .to(
        img.DOM.el,
        {
          duration: 1.5,
          ease: 'power4',
          x: `+=${dx * 110}`,
          y: `+=${dy * 110}`
        },
        0.05
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }
}

class ImageTrailVariant5 {
  constructor(container) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.lastAngle = 0;

    const handlePointerMove = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', initRender);
      container.removeEventListener('touchmove', initRender);
    };
    container.addEventListener('mousemove', initRender);
    container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    if (angle > 90 && angle <= 270) angle += 180;
    const isMovingClockwise = angle >= this.lastAngle;
    this.lastAngle = angle;
    let startAngle = isMovingClockwise ? angle - 10 : angle + 10;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance !== 0) {
      dx /= distance;
      dy /= distance;
    }
    dx *= distance / 150;
    dy *= distance / 150;

    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          filter: 'brightness(80%)',
          scale: 0.1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
          rotation: startAngle
        },
        {
          duration: 1,
          ease: 'power2',
          scale: 1,
          filter: 'brightness(100%)',
          x: this.mousePos.x - img.rect.width / 2 + dx * 70,
          y: this.mousePos.y - img.rect.height / 2 + dy * 70,
          rotation: this.lastAngle
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'expo',
          opacity: 0
        },
        0.5
      )
      .to(
        img.DOM.el,
        {
          duration: 1.5,
          ease: 'power4',
          x: `+=${dx * 120}`,
          y: `+=${dy * 120}`
        },
        0.05
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }
}

class ImageTrailVariant6 {
  constructor(container) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    const handlePointerMove = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', initRender);
      container.removeEventListener('touchmove', initRender);
    };
    container.addEventListener('mousemove', initRender);
    container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    requestAnimationFrame(() => this.render());
  }

  mapSpeedToSize(speed, minSize, maxSize) {
    const maxSpeed = 200;
    return minSize + (maxSize - minSize) * Math.min(speed / maxSpeed, 1);
  }
  mapSpeedToBrightness(speed, minB, maxB) {
    const maxSpeed = 70;
    return minB + (maxB - minB) * Math.min(speed / maxSpeed, 1);
  }
  mapSpeedToBlur(speed, minBlur, maxBlur) {
    const maxSpeed = 90;
    return minBlur + (maxBlur - minBlur) * Math.min(speed / maxSpeed, 1);
  }
  mapSpeedToGrayscale(speed, minG, maxG) {
    const maxSpeed = 90;
    return minG + (maxG - minG) * Math.min(speed / maxSpeed, 1);
  }

  showNextImage() {
    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let speed = Math.sqrt(dx * dx + dy * dy);

    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    let scaleFactor = this.mapSpeedToSize(speed, 0.3, 2);
    let brightnessValue = this.mapSpeedToBrightness(speed, 0, 1.3);
    let blurValue = this.mapSpeedToBlur(speed, 20, 0);
    let grayscaleValue = this.mapSpeedToGrayscale(speed, 600, 0);

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.8,
          ease: 'power3',
          scale: scaleFactor,
          filter: `grayscale(${grayscaleValue * 100}%) brightness(${brightnessValue * 100}%) blur(${blurValue}px)`,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2
        },
        {
          duration: 0.8,
          ease: 'power3',
          scale: 1
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3.in',
          opacity: 0,
          scale: 0.2
        },
        0.45
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }
}

function getNewPosition(position, offset, arr) {
  const realOffset = Math.abs(offset) % arr.length;
  if (position - realOffset >= 0) {
    return position - realOffset;
  } else {
    return arr.length - (realOffset - position);
  }
}
class ImageTrailVariant7 {
  constructor(container) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.visibleImagesCount = 0;
    this.visibleImagesTotal = 9;
    this.visibleImagesTotal = Math.min(this.visibleImagesTotal, this.imagesTotal - 1);

    const handlePointerMove = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', initRender);
      container.removeEventListener('touchmove', initRender);
    };
    container.addEventListener('mousemove', initRender);
    container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;

    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    ++this.visibleImagesCount;

    gsap.killTweensOf(img.DOM.el);
    const scaleValue = gsap.utils.random(0.5, 1.6);

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          scale: scaleValue - Math.max(gsap.utils.random(0.2, 0.6), 0),
          rotationZ: 0,
          opacity: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power3',
          scale: scaleValue,
          rotationZ: gsap.utils.random(-3, 3),
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      );

    if (this.visibleImagesCount >= this.visibleImagesTotal) {
      const lastInQueue = getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images);
      const oldImg = this.images[lastInQueue];
      gsap.to(oldImg.DOM.el, {
        duration: 0.4,
        ease: 'power4',
        opacity: 0,
        scale: 1.3,
        onComplete: () => {
          if (this.activeImagesCount === 0) {
            this.isIdle = true;
          }
        }
      });
    }
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
  }
}

class ImageTrailVariant8 {
  constructor(container) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.rotation = { x: 0, y: 0 };
    this.cachedRotation = { x: 0, y: 0 };
    this.zValue = 0;
    this.cachedZValue = 0;

    const handlePointerMove = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', initRender);
      container.removeEventListener('touchmove', initRender);
    };
    container.addEventListener('mousemove', initRender);
    container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    const rect = this.container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const relX = this.mousePos.x - centerX;
    const relY = this.mousePos.y - centerY;

    this.rotation.x = -(relY / centerY) * 30;
    this.rotation.y = (relX / centerX) * 30;
    this.cachedRotation = { ...this.rotation };

    const distanceFromCenter = Math.sqrt(relX * relX + relY * relY);
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
    const proportion = distanceFromCenter / maxDistance;
    this.zValue = proportion * 1200 - 600;
    this.cachedZValue = this.zValue;
    const normalizedZ = (this.zValue + 600) / 1200;
    const brightness = 0.2 + normalizedZ * 2.3;

    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .set(this.DOM.el, { perspective: 1000 }, 0)
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          z: 0,
          scale: 1 + this.cachedZValue / 1000,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
          rotationX: this.cachedRotation.x,
          rotationY: this.cachedRotation.y,
          filter: `brightness(${brightness})`
        },
        {
          duration: 1,
          ease: 'expo',
          scale: 1 + this.zValue / 1000,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
          rotationX: this.rotation.x,
          rotationY: this.rotation.y
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power2',
          opacity: 0,
          z: -800
        },
        0.3
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }
}

const variantMap = {
  1: ImageTrailVariant1,
  2: ImageTrailVariant2,
  3: ImageTrailVariant3,
  4: ImageTrailVariant4,
  5: ImageTrailVariant5,
  6: ImageTrailVariant6,
  7: ImageTrailVariant7,
  8: ImageTrailVariant8
};

export default function ImageTrail({ items = [], variant = 1 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const Cls = variantMap[variant] || variantMap[1];
    new Cls(containerRef.current);
  }, [variant, items]);

  return (
    <div className="content" ref={containerRef}>
      {items.map((url, i) => (
        <div className="content__img" key={i}>
          <div className="content__img-inner" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  );
}

```

### Component CSS
```css
.content {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 100;
  border-radius: 8px;
  background: transparent;
  overflow: visible;
}

.content__img {
  width: 190px;
  aspect-ratio: 1.1;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  overflow: hidden;
  will-change: transform, filter;
}

.content__img-inner {
  background-position: 50% 50%;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background-size: cover;
  position: absolute;
  top: calc(-1 * 20px / 2);
  left: calc(-1 * 20px / 2);
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: splash cursor
code: ## Integrate the <SplashCursor /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: SplashCursor
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import SplashCursor from './SplashCursor'

<SplashCursor />
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| SIM_RESOLUTION | number | 128 | Fluid simulation resolution for velocity fields. |
| DYE_RESOLUTION | number | 1440 | Resolution of the color/dye texture. |
| CAPTURE_RESOLUTION | number | 512 | Resolution used for certain capture operations (rarely changed). |
| DENSITY_DISSIPATION | number | 3.5 | Rate at which color/density dissipates over time. |
| VELOCITY_DISSIPATION | number | 2 | Rate at which velocity dissipates over time. |
| PRESSURE | number | 0.1 | Base pressure for the fluid simulation. |
| PRESSURE_ITERATIONS | number | 20 | Number of Jacobi iterations used for the pressure solver. |
| CURL | number | 3 | Amount of vorticity/curl to apply for swirling effects. |
| SPLAT_RADIUS | number | 0.2 | Radius of the 'splat' effect when user interacts. |
| SPLAT_FORCE | number | 6000 | Force of the fluid 'splat' on each interaction. |
| SHADING | boolean | true | Toggles simple lighting/shading on the fluid. |
| COLOR_UPDATE_SPEED | number | 10 | Frequency at which pointer colors are re-randomized. |
| RAINBOW_MODE | boolean | true | When true, uses randomly cycling rainbow colors. When false, uses the COLOR prop. |
| COLOR | string | '#ff0000' | Hex color for the cursor effect when RAINBOW_MODE is false. |
| BACK_COLOR | object | { r: 0.5, g: 0, b: 0 } | Base background color for the fluid. Not always used if TRANSPARENT is true. |

### Full Component Source
```jsx
'use client';
import { useEffect, useRef } from 'react';

function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
  RAINBOW_MODE = true,
  COLOR = '#ff0000'
}) {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Track if the effect is still active for cleanup
    let isActive = true;

    function pointerPrototype() {
      this.id = -1;
      this.texcoordX = 0;
      this.texcoordY = 0;
      this.prevTexcoordX = 0;
      this.prevTexcoordY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.down = false;
      this.moved = false;
      this.color = [0, 0, 0];
    }

    let config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
      RAINBOW_MODE,
      COLOR
    };

    let pointers = [new pointerPrototype()];

    const { gl, ext } = getWebGLContext(canvas);
    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function getWebGLContext(canvas) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false
      };
      let gl = canvas.getContext('webgl2', params);
      const isWebGL2 = !!gl;
      if (!isWebGL2) gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);

      let halfFloat;
      let supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat && halfFloat.HALF_FLOAT_OES;
      let formatRGBA;
      let formatRG;
      let formatR;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering
        }
      };
    }

    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    class Material {
      constructor(vertexShader, fragmentShaderSource) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = [];
      }
      setKeywords(keywords) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
        let program = this.programs[hash];
        if (program == null) {
          let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs[hash] = program;
        }
        if (program === this.activeProgram) return;
        this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }
      bind() {
        gl.useProgram(this.activeProgram);
      }
    }

    class Program {
      constructor(vertexShader, fragmentShader) {
        this.uniforms = {};
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }
      bind() {
        gl.useProgram(this.program);
      }
    }

    function createProgram(vertexShader, fragmentShader) {
      let program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.trace(gl.getProgramInfoLog(program));
      return program;
    }

    function getUniforms(program) {
      let uniforms = [];
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function compileShader(type, source, keywords) {
      source = addKeywords(source, keywords);
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.trace(gl.getShaderInfoLog(shader));
      return shader;
    }

    function addKeywords(source, keywords) {
      if (!keywords) return source;
      let keywordsString = '';
      keywords.forEach(keyword => {
        keywordsString += '#define ' + keyword + '\n';
      });
      return keywordsString + source;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `
    );

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `
    );

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `;

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,
      ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    );

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      return (target, clear = false) => {
        if (target == null) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    let dye, velocity, divergence, curl, pressure;

    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);
    const displayMaterial = new Material(baseVertexShader, displayShaderSource);

    function initFramebuffers() {
      let simRes = getResolution(config.SIM_RESOLUTION);
      let dyeRes = getResolution(config.DYE_RESOLUTION);
      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      gl.disable(gl.BLEND);

      if (!dye)
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      else
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

      if (!velocity)
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      else
        velocity = resizeDoubleFBO(
          velocity,
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering
        );

      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    function createFBO(w, h, internalFormat, format, type, param) {
      gl.activeTexture(gl.TEXTURE0);
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      let texelSizeX = 1.0 / w;
      let texelSizeY = 1.0 / h;
      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        }
      };
    }

    function createDoubleFBO(w, h, internalFormat, format, type, param) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(value) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value) {
          fbo2 = value;
        },
        swap() {
          let temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        }
      };
    }

    function resizeFBO(target, w, h, internalFormat, format, type, param) {
      let newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind();
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO);
      return newFBO;
    }

    function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w;
      target.height = h;
      target.texelSizeX = 1.0 / w;
      target.texelSizeY = 1.0 / h;
      return target;
    }

    function updateKeywords() {
      let displayKeywords = [];
      if (config.SHADING) displayKeywords.push('SHADING');
      displayMaterial.setKeywords(displayKeywords);
    }

    updateKeywords();
    initFramebuffers();
    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;

    function updateFrame() {
      if (!isActive) return;
      const dt = calcDeltaTime();
      if (resizeCanvas()) initFramebuffers();
      updateColors(dt);
      applyInputs();
      step(dt);
      render(null);
      animationFrameId.current = requestAnimationFrame(updateFrame);
    }

    function calcDeltaTime() {
      let now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas() {
      let width = scaleByPixelRatio(canvas.clientWidth);
      let height = scaleByPixelRatio(canvas.clientHeight);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    function updateColors(dt) {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach(p => {
          p.color = generateColor();
        });
      }
    }

    function applyInputs() {
      pointers.forEach(p => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });
    }

    function step(dt) {
      gl.disable(gl.BLEND);
      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      gradienSubtractProgram.bind();
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      let velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    }

    function render(target) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      drawDisplay(target);
    }

    function drawDisplay(target) {
      let width = target == null ? gl.drawingBufferWidth : target.width;
      let height = target == null ? gl.drawingBufferHeight : target.height;
      displayMaterial.bind();
      if (config.SHADING) gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      blit(target);
    }

    function splatPointer(pointer) {
      let dx = pointer.deltaX * config.SPLAT_FORCE;
      let dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function clickSplat(pointer) {
      const color = generateColor();
      color.r *= 10.0;
      color.g *= 10.0;
      color.b *= 10.0;
      let dx = 10 * (Math.random() - 0.5);
      let dy = 30 * (Math.random() - 0.5);
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    function splat(x, y, dx, dy, color) {
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatProgram.uniforms.point, x, y);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(dye.write);
      dye.swap();
    }

    function correctRadius(radius) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    function updatePointerDownData(pointer, id, posX, posY) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMoveData(pointer, posX, posY, color) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      pointer.color = color;
    }

    function updatePointerUpData(pointer) {
      pointer.down = false;
    }

    function correctDeltaX(delta) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    function hexToRGB(hex) {
      let val = hex.replace('#', '');
      if (val.length === 3) val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
      const r = parseInt(val.slice(0, 2), 16) / 255;
      const g = parseInt(val.slice(2, 4), 16) / 255;
      const b = parseInt(val.slice(4, 6), 16) / 255;
      return { r: r * 0.15, g: g * 0.15, b: b * 0.15 };
    }

    function generateColor() {
      if (!config.RAINBOW_MODE) {
        return hexToRGB(config.COLOR);
      }
      let c = HSVtoRGB(Math.random(), 1.0, 1.0);
      c.r *= 0.15;
      c.g *= 0.15;
      c.b *= 0.15;
      return c;
    }

    function HSVtoRGB(h, s, v) {
      let r, g, b, i, f, p, q, t;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
        default:
          break;
      }
      return { r, g, b };
    }

    function wrap(value, min, max) {
      const range = max - min;
      if (range === 0) return min;
      return ((value - min) % range) + min;
    }

    function getResolution(resolution) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);
      if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
      else return { width: min, height: max };
    }

    function scaleByPixelRatio(input) {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function hashCode(s) {
      if (s.length === 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    }

    // Named event handlers for proper cleanup
    function handleMouseDown(e) {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY);
      clickSplat(pointer);
    }

    let firstMouseMoveHandled = false;
    function handleMouseMove(e) {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      if (!firstMouseMoveHandled) {
        let color = generateColor();
        updatePointerMoveData(pointer, posX, posY, color);
        firstMouseMoveHandled = true;
      } else {
        updatePointerMoveData(pointer, posX, posY, pointer.color);
      }
    }

    function handleTouchStart(e) {
      const touches = e.targetTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
    }

    function handleTouchMove(e) {
      const touches = e.targetTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerMoveData(pointer, posX, posY, pointer.color);
      }
    }

    function handleTouchEnd(e) {
      const touches = e.changedTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        updatePointerUpData(pointer);
      }
    }

    // Add event listeners
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, false);
    window.addEventListener('touchend', handleTouchEnd);

    updateFrame();

    // Cleanup function
    return () => {
      isActive = false;

      // Cancel animation frame
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }

      // Remove event listeners
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        pointerEvents: 'none',
        width: '100%',
        height: '100%'
      }}
    >
      <canvas
        ref={canvasRef}
        id="fluid"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block'
        }}
      />
    </div>
  );
}

export default SplashCursor;

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import and render the component using the usage example above as a starting point.
4. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: blob cursor
code: ## Integrate the <BlobCursor /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: BlobCursor
### Variant: JavaScript + CSS
### Dependencies: gsap

---

### Usage Example
```jsx
import BlobCursor from './BlobCursor';

<BlobCursor
  blobType="circle"
  fillColor="#5227FF"
  trailCount={3}
  sizes={[60, 125, 75]}
  innerSizes={[20, 35, 25]}
  innerColor="rgba(255,255,255,0.8)"
  opacities={[0.6, 0.6, 0.6]}
  shadowColor="rgba(0,0,0,0.75)"
  shadowBlur={5}
  shadowOffsetX={10}
  shadowOffsetY={10}
  filterStdDeviation={30}
  useFilter={true}
  fastDuration={0.1}
  slowDuration={0.5}
  zIndex={100}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| blobType | 'circle' | 'square' | 'circle' | Shape of the blobs. |
| fillColor | string | '#5227FF' | Background color of each blob. |
| trailCount | number | 3 | How many trailing blobs. |
| sizes | number[] | [60, 125, 75] | Sizes (px) of each blob. Length must be ≥ trailCount. |
| innerSizes | number[] | [20, 35, 25] | Sizes (px) of inner dots. Length must be ≥ trailCount. |
| innerColor | string | 'rgba(255,255,255,0.8)' | Background color of the inner dot. |
| opacities | number[] | [0.6, 0.6, 0.6] | Opacity of each blob. Length ≥ trailCount. |
| shadowColor | string | 'rgba(0,0,0,0.75)' | Box-shadow color. |
| shadowBlur | number | 5 | Box-shadow blur radius (px). |
| shadowOffsetX | number | 10 | Box-shadow X offset (px). |
| shadowOffsetY | number | 10 | Box-shadow Y offset (px). |
| filterId | string | 'blob' | Optional custom filter ID (for multiple instances). |
| filterStdDeviation | number | 30 | feGaussianBlur stdDeviation for SVG filter. |
| filterColorMatrixValues | string | '1 0 0 ...' | feColorMatrix values for SVG filter. |
| useFilter | boolean | true | Enable the SVG filter. |
| fastDuration | number | 0.1 | GSAP duration for the lead blob. |
| slowDuration | number | 0.5 | GSAP duration for the following blobs. |
| fastEase | string | 'power3.out' | GSAP ease for the lead blob. |
| slowEase | string | 'power1.out' | GSAP ease for the following blobs. |
| zIndex | number | 100 | CSS z-index of the whole component. |

### Full Component Source
```jsx
'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import './BlobCursor.css';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 100
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    e => {
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateOffset]);

  return (
    <div
      ref={containerRef}
      className="blob-container"
      style={{ zIndex }}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div className="blob-main" style={{ filter: useFilter ? `url(#${filterId})` : undefined }}>
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => (blobsRef.current[i] = el)}
            className="blob"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
            }}
          >
            <div
              className="inner-dot"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

```

### Component CSS
```css
.blob-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.blob-main {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
  user-select: none;
  cursor: default;
}

.blob {
  position: absolute;
  will-change: transform;
  transform: translate(-50%, -50%);
}

.inner-dot {
  position: absolute;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: star border
code: ## Integrate the <StarBorder /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: StarBorder
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import StarBorder from './StarBorder'
  
<StarBorder
  as="button"
  className="custom-class"
  color="cyan"
  speed="5s"
>
  // content
</StarBorder>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| as | string | button | Allows specifying the type of the parent component to be rendered. |
| className | string | - | Allows adding custom classes to the component. |
| color | string | white | Changes the main color of the border (fades to transparent) |
| speed | string | 6s | Changes the speed of the animation. |
| thickness | number | 3 | Controls the thickness of the star border effect. |

### Full Component Source
```jsx
import './StarBorder.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;

```

### Component CSS
```css
.star-border-container {
  display: inline-block;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}

.border-gradient-bottom {
  position: absolute;
  width: 300%;
  height: 50%;
  opacity: 0.7;
  bottom: -12px;
  right: -250%;
  border-radius: 50%;
  animation: star-movement-bottom linear infinite alternate;
  z-index: 0;
}

.border-gradient-top {
  position: absolute;
  opacity: 0.7;
  width: 300%;
  height: 50%;
  top: -12px;
  left: -250%;
  border-radius: 50%;
  animation: star-movement-top linear infinite alternate;
  z-index: 0;
}

.inner-content {
  position: relative;
  border: 1px solid #222;
  background: #000;
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 16px 26px;
  border-radius: 20px;
  z-index: 1;
}

@keyframes star-movement-bottom {
  0% {
    transform: translate(0%, 0%);
    opacity: 1;
  }
  100% {
    transform: translate(-100%, 0%);
    opacity: 0;
  }
}

@keyframes star-movement-top {
  0% {
    transform: translate(0%, 0%);
    opacity: 1;
  }
  100% {
    transform: translate(100%, 0%);
    opacity: 0;
  }
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: glass surface
code: ## Integrate the <GlassSurface /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: GlassSurface
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import GlassSurface from './GlassSurface'

// Basic usage
<GlassSurface 
  width={300} 
  height={200}
  borderRadius={24}
  className="my-custom-class"
>
  <h2>Glass Surface Content</h2>
</GlassSurface>

// Custom displacement effects
<GlassSurface
  displace={15}
  distortionScale={-150}
  redOffset={5}
  greenOffset={15}
  blueOffset={25}
  brightness={60}
  opacity={0.8}
  mixBlendMode="screen"
>
  <span>Advanced Glass Distortion</span>
</GlassSurface>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | undefined | Content to display inside the glass surface |
| width | number | string | 200 | Width of the glass surface (pixels or CSS value like '100%') |
| height | number | string | 80 | Height of the glass surface (pixels or CSS value like '100vh') |
| borderRadius | number | 20 | Border radius in pixels |
| borderWidth | number | 0.07 | Border width factor for displacement map |
| brightness | number | 50 | Brightness percentage for displacement map |
| opacity | number | 0.93 | Opacity of displacement map elements |
| blur | number | 11 | Input blur amount in pixels |
| displace | number | 0 | Output blur (stdDeviation) |
| backgroundOpacity | number | 0 | Background frost opacity (0-1) |
| saturation | number | 1 | Backdrop filter saturation factor |
| distortionScale | number | -180 | Main displacement scale |
| redOffset | number | 0 | Red channel extra displacement offset |
| greenOffset | number | 10 | Green channel extra displacement offset |
| blueOffset | number | 20 | Blue channel extra displacement offset |
| xChannel | 'R' | 'G' | 'B' | 'R' | X displacement channel selector |
| yChannel | 'R' | 'G' | 'B' | 'G' | Y displacement channel selector |
| mixBlendMode | BlendMode | 'difference' | Mix blend mode for displacement map |
| className | string | '' | Additional CSS class names |
| style | React.CSSProperties | {} | Inline styles object |

### Full Component Source
```jsx
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useId } from 'react';
import './GlassSurface.css';

const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {}
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState(false);

  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const redChannelRef = useRef(null);
  const greenChannelRef = useRef(null);
  const blueChannelRef = useRef(null);
  const gaussianBlurRef = useRef(null);

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute('href', generateDisplacementMap());
  };

  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset }
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute('scale', (distortionScale + offset).toString());
        ref.current.setAttribute('xChannelSelector', xChannel);
        ref.current.setAttribute('yChannelSelector', yChannel);
      }
    });

    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
  }, [width, height]);

  useEffect(() => {
    setSvgSupported(supportsSVGFilters());
  }, []);

  const supportsSVGFilters = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }

    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);

    if (isWebkit || isFirefox) {
      return false;
    }

    const div = document.createElement('div');
    div.style.backdropFilter = `url(#${filterId})`;

    return div.style.backdropFilter !== '';
  };

  const containerStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    '--glass-frost': backgroundOpacity,
    '--glass-saturation': saturation,
    '--filter-id': `url(#${filterId})`
  };

  return (
    <div
      ref={containerRef}
      className={`glass-surface ${svgSupported ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`}
      style={containerStyle}
    >
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />

            <feDisplacementMap
              ref={greenChannelRef}
              in="SourceGraphic"
              in2="map"
              id="greenchannel"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />

            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      <div className="glass-surface__content">{children}</div>
    </div>
  );
};

export default GlassSurface;

```

### Component CSS
```css
.glass-surface {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 0.26s ease-out;
}

.glass-surface__filter {
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0;
  z-index: -1;
}

.glass-surface__content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: inherit;
  position: relative;
  z-index: 1;
}

.glass-surface--svg {
  background: light-dark(hsl(0 0% 100% / var(--glass-frost, 0)), hsl(0 0% 0% / var(--glass-frost, 0)));
  backdrop-filter: var(--filter-id, url(#glass-filter)) saturate(var(--glass-saturation, 1));
  box-shadow:
    0 0 2px 1px light-dark(color-mix(in oklch, black, transparent 85%), color-mix(in oklch, white, transparent 65%))
      inset,
    0 0 10px 4px light-dark(color-mix(in oklch, black, transparent 90%), color-mix(in oklch, white, transparent 85%))
      inset,
    0px 4px 16px rgba(17, 17, 26, 0.05),
    0px 8px 24px rgba(17, 17, 26, 0.05),
    0px 16px 56px rgba(17, 17, 26, 0.05),
    0px 4px 16px rgba(17, 17, 26, 0.05) inset,
    0px 8px 24px rgba(17, 17, 26, 0.05) inset,
    0px 16px 56px rgba(17, 17, 26, 0.05) inset;
}

.glass-surface--fallback {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);
  -webkit-backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.2),
    0 2px 16px 0 rgba(31, 38, 135, 0.1),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.2);
}

@media (prefers-color-scheme: dark) {
  .glass-surface--fallback {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px) saturate(1.8) brightness(1.2);
    -webkit-backdrop-filter: blur(12px) saturate(1.8) brightness(1.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.1);
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .glass-surface--fallback {
    background: rgba(255, 255, 255, 0.4);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.3);
  }

  .glass-surface--fallback::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.15);
    border-radius: inherit;
    z-index: -1;
  }
}

@supports not (backdrop-filter: blur(10px)) {
  @media (prefers-color-scheme: dark) {
    .glass-surface--fallback {
      background: rgba(0, 0, 0, 0.4);
    }

    .glass-surface--fallback::before {
      background: rgba(255, 255, 255, 0.05);
    }
  }
}

.glass-surface:focus-visible {
  outline: 2px solid light-dark(#007aff, #0a84ff);
  outline-offset: 2px;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: border glow
code: ## Integrate the <BorderGlow /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: BorderGlow
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import BorderGlow from './BorderGlow';

<BorderGlow
  edgeSensitivity={30}
  glowColor="40 80 80"
  backgroundColor="#120F17"
  borderRadius={28}
  glowRadius={40}
  glowIntensity={1.0}
  coneSpread={25}
  animated={false}
  colors={['#c084fc', '#f472b6', '#38bdf8']}
>
  <div style={{ padding: '2em' }}>
    <h2>Your Content Here</h2>
    <p>Hover near the edges to see the glow.</p>
  </div>
</BorderGlow>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Content rendered inside the card. |
| className | string | "" | Additional CSS classes for the outer wrapper. |
| edgeSensitivity | number | 30 | How close the pointer must be to the edge for the glow to appear (0-100). |
| glowColor | string | "40 80 80" | HSL values for the glow color, as "H S L" (e.g. "40 80 80"). |
| backgroundColor | string | "#120F17" | Background color of the card. |
| borderRadius | number | 28 | Corner radius of the card in pixels. |
| glowRadius | number | 40 | How far the outer glow extends beyond the card in pixels. |
| glowIntensity | number | 1.0 | Multiplier for glow opacity (0.1-3.0). |
| coneSpread | number | 25 | Width of the directional cone mask as a percentage (5-45). |
| animated | boolean | false | Play an intro sweep animation on mount. |
| colors | string[] | [...] | Array of 3 hex colors for the mesh gradient border, distributed across positions. |

### Full Component Source
```jsx
import { useRef, useCallback, useEffect } from 'react';
import './BorderGlow.css';

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x) { return x * x * x; }

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

const BorderGlow = ({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
}) => {
  const cardRef = useRef(null);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const edge = getEdgeProximity(card, x, y);
    const angle = getCursorAngle(card, x, y);

    card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  }, [getEdgeProximity, getCursorAngle]);

  useEffect(() => {
    if (!animated || !cardRef.current) return;
    const card = cardRef.current;
    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add('sweep-active');
    card.style.setProperty('--cursor-angle', `${angleStart}deg`);

    animateValue({ duration: 500, onUpdate: v => card.style.setProperty('--edge-proximity', v) });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }});
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }});
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => card.style.setProperty('--edge-proximity', v),
      onEnd: () => card.classList.remove('sweep-active'),
    });
  }, [animated]);

  const glowVars = buildGlowVars(glowColor, glowIntensity);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...glowVars,
        ...buildGradientVars(colors),
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;

```

### Component CSS
```css
.border-glow-card {
  --edge-proximity: 0;
  --cursor-angle: 45deg;
  --edge-sensitivity: 30;
  --color-sensitivity: calc(var(--edge-sensitivity) + 20);
  --border-radius: 28px;
  --glow-padding: 40px;
  --cone-spread: 25;

  position: relative;
  border-radius: var(--border-radius);
  isolation: isolate;
  transform: translate3d(0, 0, 0.01px);
  display: grid;
  border: 1px solid rgb(255 255 255 / 15%);
  background: var(--card-bg, #120F17);
  overflow: visible;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 2px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px,
    rgba(0, 0, 0, 0.1) 0px 4px 8px,
    rgba(0, 0, 0, 0.1) 0px 8px 16px,
    rgba(0, 0, 0, 0.1) 0px 16px 32px,
    rgba(0, 0, 0, 0.1) 0px 32px 64px;
}

.border-glow-card::before,
.border-glow-card::after,
.border-glow-card > .edge-light {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  transition: opacity 0.25s ease-out;
  z-index: -1;
}

.border-glow-card:not(:hover):not(.sweep-active)::before,
.border-glow-card:not(:hover):not(.sweep-active)::after,
.border-glow-card:not(:hover):not(.sweep-active) > .edge-light {
  opacity: 0;
  transition: opacity 0.75s ease-in-out;
}

/* colored mesh-gradient border */
.border-glow-card::before {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--card-bg, #120F17) 0 100%) padding-box,
    linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box,
    var(--gradient-one, radial-gradient(at 80% 55%, hsla(268, 100%, 76%, 1) 0px, transparent 50%)) border-box,
    var(--gradient-two, radial-gradient(at 69% 34%, hsla(349, 100%, 74%, 1) 0px, transparent 50%)) border-box,
    var(--gradient-three, radial-gradient(at 8% 6%, hsla(136, 100%, 78%, 1) 0px, transparent 50%)) border-box,
    var(--gradient-four, radial-gradient(at 41% 38%, hsla(192, 100%, 64%, 1) 0px, transparent 50%)) border-box,
    var(--gradient-five, radial-gradient(at 86% 85%, hsla(186, 100%, 74%, 1) 0px, transparent 50%)) border-box,
    var(--gradient-six, radial-gradient(at 82% 18%, hsla(52, 100%, 65%, 1) 0px, transparent 50%)) border-box,
    var(--gradient-seven, radial-gradient(at 51% 4%, hsla(12, 100%, 72%, 1) 0px, transparent 50%)) border-box,
    var(--gradient-base, linear-gradient(#c299ff 0 100%)) border-box;

  opacity: calc((var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)));

  mask-image:
    conic-gradient(
      from var(--cursor-angle) at center,
      black calc(var(--cone-spread) * 1%),
      transparent calc((var(--cone-spread) + 15) * 1%),
      transparent calc((100 - var(--cone-spread) - 15) * 1%),
      black calc((100 - var(--cone-spread)) * 1%)
    );
}

/* colored mesh-gradient background fill near edges */
.border-glow-card::after {
  border: 1px solid transparent;
  background:
    var(--gradient-one, radial-gradient(at 80% 55%, hsla(268, 100%, 76%, 1) 0px, transparent 50%)) padding-box,
    var(--gradient-two, radial-gradient(at 69% 34%, hsla(349, 100%, 74%, 1) 0px, transparent 50%)) padding-box,
    var(--gradient-three, radial-gradient(at 8% 6%, hsla(136, 100%, 78%, 1) 0px, transparent 50%)) padding-box,
    var(--gradient-four, radial-gradient(at 41% 38%, hsla(192, 100%, 64%, 1) 0px, transparent 50%)) padding-box,
    var(--gradient-five, radial-gradient(at 86% 85%, hsla(186, 100%, 74%, 1) 0px, transparent 50%)) padding-box,
    var(--gradient-six, radial-gradient(at 82% 18%, hsla(52, 100%, 65%, 1) 0px, transparent 50%)) padding-box,
    var(--gradient-seven, radial-gradient(at 51% 4%, hsla(12, 100%, 72%, 1) 0px, transparent 50%)) padding-box,
    var(--gradient-base, linear-gradient(#c299ff 0 100%)) padding-box;

  mask-image:
    linear-gradient(to bottom, black, black),
    radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
    radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
    conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%);

  mask-composite: subtract, add, add, add, add, add;
  opacity: calc(var(--fill-opacity, 0.5) * (var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)));
  mix-blend-mode: soft-light;
}

/* outer glow layer */
.border-glow-card > .edge-light {
  inset: calc(var(--glow-padding) * -1);
  pointer-events: none;
  z-index: 1;

  mask-image:
    conic-gradient(
      from var(--cursor-angle) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%
    );

  opacity: calc((var(--edge-proximity) - var(--edge-sensitivity)) / (100 - var(--edge-sensitivity)));
  mix-blend-mode: plus-lighter;
}

.border-glow-card > .edge-light::before {
  content: "";
  position: absolute;
  inset: var(--glow-padding);
  border-radius: inherit;
  box-shadow:
    inset 0 0 0 1px var(--glow-color, hsl(40deg 80% 80% / 100%)),
    inset 0 0 1px 0 var(--glow-color-60, hsl(40deg 80% 80% / 60%)),
    inset 0 0 3px 0 var(--glow-color-50, hsl(40deg 80% 80% / 50%)),
    inset 0 0 6px 0 var(--glow-color-40, hsl(40deg 80% 80% / 40%)),
    inset 0 0 15px 0 var(--glow-color-30, hsl(40deg 80% 80% / 30%)),
    inset 0 0 25px 2px var(--glow-color-20, hsl(40deg 80% 80% / 20%)),
    inset 0 0 50px 2px var(--glow-color-10, hsl(40deg 80% 80% / 10%)),
    0 0 1px 0 var(--glow-color-60, hsl(40deg 80% 80% / 60%)),
    0 0 3px 0 var(--glow-color-50, hsl(40deg 80% 80% / 50%)),
    0 0 6px 0 var(--glow-color-40, hsl(40deg 80% 80% / 40%)),
    0 0 15px 0 var(--glow-color-30, hsl(40deg 80% 80% / 30%)),
    0 0 25px 2px var(--glow-color-20, hsl(40deg 80% 80% / 20%)),
    0 0 50px 2px var(--glow-color-10, hsl(40deg 80% 80% / 10%));
}

.border-glow-inner {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  z-index: 1;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: flying poster
code: ## Integrate the <FlyingPosters /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: FlyingPosters
### Variant: JavaScript + CSS
### Dependencies: ogl

---

### Usage Example
```jsx
import FlyingPosters from './FlyingPosters'

const items = [
  'https://picsum.photos/500/500?grayscale', 
  'https://picsum.photos/600/600?grayscale', 
  'https://picsum.photos/400/400?grayscale'
];

<div style={{ height: '600px', position: 'relative' }}>
  <FlyingPosters items={items}/>
</div>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | string[] | [] | An array of image URLs to be displayed as flying posters. |
| planeWidth | number | 320 | The width of each poster plane in pixels. |
| planeHeight | number | 320 | The height of each poster plane in pixels. |
| distortion | number | 3 | The amount of distortion applied to the posters' movement. |
| scrollEase | number | 0.01 | The easing factor for smooth scrolling interactions. |
| cameraFov | number | 45 | The field of view for the camera in degrees. |
| cameraZ | number | 20 | The Z position of the camera, affecting zoom and perspective. |

### Full Component Source
```jsx
import { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } from 'ogl';

import './FlyingPosters.css';

const vertexShader = `
precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float uPosition;
uniform float uTime;
uniform float uSpeed;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;

varying vec2 vUv;
varying vec3 vNormal;

float PI = 3.141592653589793238;
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                              0.0,                                0.0,                                1.0
    );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float qinticInOut(float t) {
  return t < 0.5
    ? 16.0 * pow(t, 5.0)
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}

void main() {
  vUv = uv;
  
  float norm = 0.5;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;
  float localprogress = clamp(
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),
    0.,
    2.
  );
  localprogress = qinticInOut(localprogress) * PI;
  newpos = rotate(newpos, rotationAxis, localprogress);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;

varying vec2 vUv;

void main() {
  vec2 imageSize = uImageSize;
  vec2 planeSize = uPlaneSize;

  float imageAspect = imageSize.x / imageSize.y;
  float planeAspect = planeSize.x / planeSize.y;
  vec2 scale = vec2(1.0, 1.0);

  if (planeAspect > imageAspect) {
      scale.x = imageAspect / planeAspect;
  } else {
      scale.y = planeAspect / imageAspect;
  }

  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;

  gl_FragColor = texture2D(tMap, uv);
}
`;

function AutoBind(self, { include, exclude } = {}) {
  const getAllProperties = object => {
    const properties = new Set();
    do {
      for (const key of Reflect.ownKeys(object)) {
        properties.add([object, key]);
      }
    } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);
    return properties;
  };

  const filter = key => {
    const match = pattern => (typeof pattern === 'string' ? key === pattern : pattern.test(key));

    if (include) return include.some(match);
    if (exclude) return !exclude.some(match);
    return true;
  };

  for (const [object, key] of getAllProperties(self.constructor.prototype)) {
    if (key === 'constructor' || !filter(key)) continue;
    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
    if (descriptor && typeof descriptor.value === 'function') {
      self[key] = self[key].bind(self);
    }
  }
  return self;
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function map(num, min1, max1, min2, max2, round = false) {
  const num1 = (num - min1) / (max1 - min1);
  const num2 = num1 * (max2 - min2) + min2;
  return round ? Math.round(num2) : num2;
}

class Media {
  constructor({ gl, geometry, scene, screen, viewport, image, length, index, planeWidth, planeHeight, distortion }) {
    this.extra = 0;
    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.image = image;
    this.length = length;
    this.index = index;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;

    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: false
    });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      fragment: fragmentShader,
      vertex: vertexShader,
      uniforms: {
        tMap: { value: texture },
        uPosition: { value: 0 },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uSpeed: { value: 0 },
        rotationAxis: { value: [0, 1, 0] },
        distortionAxis: { value: [1, 1, 0] },
        uDistortion: { value: this.distortion },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
        uTime: { value: 0 }
      },
      cullFace: false
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  setScale() {
    this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;
    this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;

    this.plane.position.x = 0;
    this.plane.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      this.plane.program.uniforms.uViewportSize.value = [this.viewport.width, this.viewport.height];
    }
    this.setScale();

    this.padding = 5;
    this.height = this.plane.scale.y + this.padding;
    this.heightTotal = this.height * this.length;

    this.y = -this.heightTotal / 2 + (this.index + 0.5) * this.height;
  }

  update(scroll) {
    this.plane.position.y = this.y - scroll.current - this.extra;

    const position = map(this.plane.position.y, -this.viewport.height, this.viewport.height, 5, 15);

    this.program.uniforms.uPosition.value = position;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current;

    const planeHeight = this.plane.scale.y;
    const viewportHeight = this.viewport.height;

    const topEdge = this.plane.position.y + planeHeight / 2;
    const bottomEdge = this.plane.position.y - planeHeight / 2;

    if (topEdge < -viewportHeight / 2) {
      this.extra -= this.heightTotal;
    } else if (bottomEdge > viewportHeight / 2) {
      this.extra += this.heightTotal;
    }
  }
}

class Canvas {
  constructor({ container, canvas, items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ }) {
    this.container = container;
    this.canvas = canvas;
    this.items = items;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;
    this.scroll = {
      ease: scrollEase,
      current: 0,
      target: 0,
      last: 0
    };
    this.cameraFov = cameraFov;
    this.cameraZ = cameraZ;

    AutoBind(this);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();

    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
    this.createPreloader();
  }

  createRenderer() {
    this.renderer = new Renderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2)
    });
    this.gl = this.renderer.gl;
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = this.cameraFov;
    this.camera.position.z = this.cameraZ;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 1,
      widthSegments: 100
    });
  }

  createMedias() {
    this.medias = this.items.map((image, index) => {
      return new Media({
        gl: this.gl,
        geometry: this.planeGeometry,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        image,
        length: this.items.length,
        index,
        planeWidth: this.planeWidth,
        planeHeight: this.planeHeight,
        distortion: this.distortion
      });
    });
  }

  createPreloader() {
    this.loaded = 0;
    if (!this.items.length) return;

    this.items.forEach(src => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = src;
      image.onload = () => {
        this.loaded += 1;
        if (this.loaded === this.items.length) {
          document.documentElement.classList.remove('loading');
          document.documentElement.classList.add('loaded');
        }
      };
    });
  }

  onResize() {
    const rect = this.container.getBoundingClientRect();
    this.screen = {
      width: rect.width,
      height: rect.height
    };

    this.renderer.setSize(this.screen.width, this.screen.height);

    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = { height, width };

    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientY : e.clientY;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const distance = (this.start - y) * 0.1;
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
  }

  onWheel(e) {
    const speed = e.deltaY;
    this.scroll.target += speed * 0.005;
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);

    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    requestAnimationFrame(this.update);
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('wheel', this.onWheel);
    window.addEventListener('mousewheel', this.onWheel);

    window.addEventListener('mousedown', this.onTouchDown);
    window.addEventListener('mousemove', this.onTouchMove);
    window.addEventListener('mouseup', this.onTouchUp);

    window.addEventListener('touchstart', this.onTouchDown);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchUp);
  }

  destroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('mousewheel', this.onWheel);

    window.removeEventListener('mousedown', this.onTouchDown);
    window.removeEventListener('mousemove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onTouchUp);

    window.removeEventListener('touchstart', this.onTouchDown);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchUp);
  }
}

export default function FlyingPosters({
  items = [],
  planeWidth = 320,
  planeHeight = 320,
  distortion = 3,
  scrollEase = 0.01,
  cameraFov = 45,
  cameraZ = 20,
  className,
  ...props
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    instanceRef.current = new Canvas({
      container: containerRef.current,
      canvas: canvasRef.current,
      items,
      planeWidth,
      planeHeight,
      distortion,
      scrollEase,
      cameraFov,
      cameraZ
    });

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasEl = canvasRef.current;

    const handleWheel = e => {
      e.preventDefault();
      if (instanceRef.current) {
        instanceRef.current.onWheel(e);
      }
    };

    const handleTouchMove = e => {
      e.preventDefault();
    };

    canvasEl.addEventListener('wheel', handleWheel, { passive: false });
    canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      canvasEl.removeEventListener('wheel', handleWheel);
      canvasEl.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={`posters-container ${className}`} {...props}>
      <canvas ref={canvasRef} className="posters-canvas" />
    </div>
  );
}

```

### Component CSS
```css
.posters-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.posters-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: glass icons
code: ## Integrate the <GlassIcons /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: GlassIcons
### Variant: JavaScript + CSS


---

### Usage Example
```jsx
import GlassIcons from './GlassIcons'

// update with your own icons and colors
const items = [
  { icon: <FiFileText />, color: 'blue', label: 'Files' },
  { icon: <FiBook />, color: 'purple', label: 'Books' },
  { icon: <FiHeart />, color: 'red', label: 'Health' },
  { icon: <FiCloud />, color: 'indigo', label: 'Weather' },
  { icon: <FiEdit />, color: 'orange', label: 'Notes' },
  { icon: <FiBarChart2 />, color: 'green', label: 'Stats' },
];

<div style={{ height: '600px', position: 'relative' }}>
  <GlassIcons items={items} className="custom-class"/>
</div>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | GlassIconsItem[] | [] | Array of items to render. Each item should include: an icon (React.ReactElement), a color (string), a label (string), and an optional customClass (string). |
| className | string | '' | Optional additional CSS class(es) to be added to the container. |

### Full Component Source
```jsx
import './GlassIcons.css';

const gradientMapping = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))'
};

const GlassIcons = ({ items, className }) => {
  const getBackgroundStyle = color => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => (
        <button key={index} className={`icon-btn ${item.customClass || ''}`} aria-label={item.label} type="button">
          <span className="icon-btn__back" style={getBackgroundStyle(item.color)}></span>
          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">
              {item.icon}
            </span>
          </span>
          <span className="icon-btn__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;

```

### Component CSS
```css
.icon-btns {
  display: grid;
  grid-gap: 5em;
  grid-template-columns: repeat(2, 1fr);
  margin: auto;
  padding: 3em 0;
  overflow: visible;
}

.icon-btn {
  background-color: transparent;
  outline: none;
  position: relative;
  width: 4.5em;
  height: 4.5em;
  perspective: 24em;
  transform-style: preserve-3d;
  -webkit-tap-highlight-color: transparent;
  border: none;
  cursor: pointer;
}

.icon-btn__back,
.icon-btn__front,
.icon-btn__label {
  transition:
    opacity 0.3s cubic-bezier(0.83, 0, 0.17, 1),
    transform 0.3s cubic-bezier(0.83, 0, 0.17, 1);
}

.icon-btn__back,
.icon-btn__front {
  border-radius: 1.25em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.icon-btn__back {
  box-shadow: 0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15);
  display: block;
  transform: rotate(15deg);
  transform-origin: 100% 100%;
  will-change: transform;
}

.icon-btn__front {
  background-color: hsla(0, 0%, 100%, 0.15);
  box-shadow: 0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset;
  backdrop-filter: blur(0.75em);
  -webkit-backdrop-filter: blur(0.75em);
  -moz-backdrop-filter: blur(0.75em);
  display: flex;
  transform-origin: 80% 50%;
  will-change: transform;
}

.icon-btn__icon {
  margin: auto;
  width: 1.5em;
  height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn__label {
  font-size: 1em;
  white-space: nowrap;
  text-align: center;
  line-height: 2;
  opacity: 0;
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  transform: translateY(0);
}

.icon-btn:focus-visible .icon-btn__back,
.icon-btn:hover .icon-btn__back {
  transform: rotate(25deg) translate3d(-0.5em, -0.5em, 0.5em);
}

.icon-btn:focus-visible .icon-btn__front,
.icon-btn:hover .icon-btn__front {
  transform: translate3d(0, 0, 2em);
}

.icon-btn:focus-visible .icon-btn__label,
.icon-btn:hover .icon-btn__label {
  opacity: 1;
  transform: translateY(20%);
}

@media (min-width: 768px) {
  .icon-btns {
    grid-template-columns: repeat(3, 1fr);
  }
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: elastic slider
code: ## Integrate the <ElasticSlider /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: ElasticSlider
### Variant: JavaScript + CSS
### Dependencies: motion

---

### Usage Example
```jsx
import ElasticSlider from './ElasticSlider'
  
<ElasticSlider
  leftIcon={<>...your icon...</>}
  rightIcon={<>...your icon...</>}
  startingValue={500}
  defaultValue={750}
  maxValue={1000}
  isStepped
  stepSize={10}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultValue | number | 50 | The initial value of the slider. It can be less than startingValue or greater than maxValue. |
| startingValue | number | 0 | The starting point for the slider's range, e.g., startingValue=100 allows the slider to start at 100. |
| maxValue | number | 100 | The maximum value the slider can reach. |
| className | string | — | Allows passing custom class names to style the component. |
| isStepped | boolean | false | Enables or disables stepped increments on the slider. |
| stepSize | number | 1 | The size of the increments for the slider when isStepped is enabled. |
| leftIcon | JSX.Element | <>-</> | Custom JSX or HTML code to display on the left side of the slider. |
| rightIcon | JSX.Element | <>+</> | Custom JSX or HTML code to display on the right side of the slider. |

### Full Component Source
```jsx
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@chakra-ui/react';
import { RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri';

import './ElasticSlider.css';

const MAX_OVERFLOW = 50;

export default function ElasticSlider({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  className = '',
  isStepped = false,
  stepSize = 1,
  leftIcon = <Icon as={RiVolumeDownFill} />,
  rightIcon = <Icon as={RiVolumeUpFill} />
}) {
  return (
    <div className={`slider-container ${className}`}>
      <Slider
        defaultValue={defaultValue}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    </div>
  );
}

function Slider({ defaultValue, startingValue, maxValue, isStepped, stepSize, leftIcon, rightIcon }) {
  const [value, setValue] = useState(defaultValue);
  const sliderRef = useRef(null);
  const [region, setRegion] = useState('middle');
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useMotionValueEvent(clientX, 'change', latest => {
    if (sliderRef.current) {
      const { left, right } = sliderRef.current.getBoundingClientRect();
      let newValue;

      if (latest < left) {
        setRegion('left');
        newValue = left - latest;
      } else if (latest > right) {
        setRegion('right');
        newValue = latest - right;
      } else {
        setRegion('middle');
        newValue = 0;
      }

      overflow.jump(decay(newValue, MAX_OVERFLOW));
    }
  });

  const handlePointerMove = e => {
    if (e.buttons > 0 && sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);

      if (isStepped) {
        newValue = Math.round(newValue / stepSize) * stepSize;
      }

      newValue = Math.min(Math.max(newValue, startingValue), maxValue);
      setValue(newValue);
      clientX.jump(e.clientX);
    }
  };

  const handlePointerDown = e => {
    handlePointerMove(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = () => {
    animate(overflow, 0, { type: 'spring', bounce: 0.5 });
  };

  const getRangePercentage = () => {
    const totalRange = maxValue - startingValue;
    if (totalRange === 0) return 0;

    return ((value - startingValue) / totalRange) * 100;
  };

  return (
    <>
      <motion.div
        onHoverStart={() => animate(scale, 1.2)}
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, 1.2)}
        onTouchEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity: useTransform(scale, [1, 1.2], [0.7, 1])
        }}
        className="slider-wrapper"
      >
        <motion.div
          animate={{
            scale: region === 'left' ? [1, 1.4, 1] : 1,
            transition: { duration: 0.25 }
          }}
          style={{
            x: useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0))
          }}
        >
          {leftIcon}
        </motion.div>

        <div
          ref={sliderRef}
          className="slider-root"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onLostPointerCapture={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX: useTransform(() => {
                if (sliderRef.current) {
                  const { width } = sliderRef.current.getBoundingClientRect();
                  return 1 + overflow.get() / width;
                }
              }),
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),
              transformOrigin: useTransform(() => {
                if (sliderRef.current) {
                  const { left, width } = sliderRef.current.getBoundingClientRect();
                  return clientX.get() < left + width / 2 ? 'right' : 'left';
                }
              }),
              height: useTransform(scale, [1, 1.2], [6, 12]),
              marginTop: useTransform(scale, [1, 1.2], [0, -3]),
              marginBottom: useTransform(scale, [1, 1.2], [0, -3])
            }}
            className="slider-track-wrapper"
          >
            <div className="slider-track">
              <div className="slider-range" style={{ width: `${getRangePercentage()}%` }} />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            scale: region === 'right' ? [1, 1.4, 1] : 1,
            transition: { duration: 0.25 }
          }}
          style={{
            x: useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0))
          }}
        >
          {rightIcon}
        </motion.div>
      </motion.div>
      <p className="value-indicator">{Math.round(value)}</p>
    </>
  );
}

function decay(value, max) {
  if (max === 0) {
    return 0;
  }

  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);

  return sigmoid * max;
}

```

### Component CSS
```css
.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 12rem;
}

.slider-wrapper {
  display: flex;
  width: 100%;
  touch-action: none;
  user-select: none;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.slider-root {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 200px;
  flex-grow: 1;
  cursor: grab;
  touch-action: none;
  user-select: none;
  align-items: center;
  padding: 1rem 0;
}

.slider-root:active {
  cursor: grabbing;
}

.slider-track-wrapper {
  display: flex;
  flex-grow: 1;
}

.slider-track {
  position: relative;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
  border-radius: 9999px;
  background-color: rgba(128, 128, 128, 0.4);
}

.slider-range {
  position: absolute;
  height: 100%;
  background-color: #888;
  border-radius: 9999px;
}

.value-indicator {
  color: #808080;
  position: absolute;
  transform: translateY(-1rem);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.icon {
  width: 24px;
  height: 24px;
  color: #888;
}

.icon.dark {
  color: #ddd;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: counter
code: ## Integrate the <Counter /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: Counter
### Variant: JavaScript + CSS
### Dependencies: motion

---

### Usage Example
```jsx
import Counter from './Counter';

<Counter
  value={1}
  places={[100, 10, 1]}
  fontSize={80}
  padding={5}
  gap={10}
  textColor="white"
  fontWeight={900}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | N/A (required) | The numeric value to display in the counter. |
| fontSize | number | 100 | The base font size used for the counter digits. |
| padding | number | 0 | Additional padding added to the digit height. |
| places | number[] | [100, 10, 1 , "." , 0.1] | Defines which digit positions to display. Include whole number and decimal place values (use "." for the decimal point). If omitted, place values will be detected automatically. |
| gap | number | 8 | The gap (in pixels) between each digit. |
| borderRadius | number | 4 | The border radius (in pixels) for the counter container. |
| horizontalPadding | number | 8 | The horizontal padding (in pixels) for the counter container. |
| textColor | string | 'white' | The text color for the counter digits. |
| fontWeight | string | number | 'bold' | The font weight of the counter digits. |
| containerStyle | React.CSSProperties | {} | Custom inline styles for the outer container. |
| counterStyle | React.CSSProperties | {} | Custom inline styles for the counter element. |
| digitStyle | React.CSSProperties | {} | Custom inline styles for each digit container. |
| gradientHeight | number | 16 | The height (in pixels) of the gradient overlays. |
| gradientFrom | string | 'black' | The starting color for the gradient overlays. |
| gradientTo | string | 'transparent' | The ending color for the gradient overlays. |
| topGradientStyle | React.CSSProperties | undefined | Custom inline styles for the top gradient overlay. |
| bottomGradientStyle | React.CSSProperties | undefined | Custom inline styles for the bottom gradient overlay. |

### Full Component Source
```jsx
import { motion, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

import './Counter.css';

function Number({ mv, number, height }) {
  let y = useTransform(mv, latest => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });
  return (
    <motion.span className="counter-number" style={{ y }}>
      {number}
    </motion.span>
  );
}

function normalizeNearInteger(num) {
  const nearest = Math.round(num);
  const tolerance = 1e-9 * Math.max(1, Math.abs(num));
  return Math.abs(num - nearest) < tolerance ? nearest : num;
}

function getValueRoundedToPlace(value, place) {
  const scaled = value / place;
  return Math.floor(normalizeNearInteger(scaled));
}

function Digit({ place, value, height, digitStyle }) {
  const isDecimal = place === '.';
  const valueRoundedToPlace = isDecimal ? 0 : getValueRoundedToPlace(value, place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    if (!isDecimal) {
      animatedValue.set(valueRoundedToPlace);
    }
  }, [animatedValue, valueRoundedToPlace, isDecimal]);

  if (isDecimal) {
    return (
      <span className="counter-digit" style={{ height, ...digitStyle, width: 'fit-content' }}>
        .
      </span>
    );
  }

  return (
    <span className="counter-digit" style={{ height, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </span>
  );
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places = [...value.toString()].map((ch, i, a) => {
    ch == '.';
    if (ch === '.') {
      return '.';
    } else {
      return (
        10 **
        (a.indexOf('.') === -1 ? a.length - i - 1 : i < a.indexOf('.') ? a.indexOf('.') - i - 1 : -(i - a.indexOf('.')))
      );
    }
  }),
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = 'inherit',
  fontWeight = 'inherit',
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = 'black',
  gradientTo = 'transparent',
  topGradientStyle,
  bottomGradientStyle
}) {
  const height = fontSize + padding;
  const defaultCounterStyle = {
    fontSize,
    gap: gap,
    borderRadius: borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight: fontWeight,
    direction: "ltr"
  };
  const defaultTopGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`
  };
  const defaultBottomGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`
  };
  return (
    <span className="counter-container" style={containerStyle}>
      <span className="counter-counter" style={{ ...defaultCounterStyle, ...counterStyle }}>
        {places.map(place => (
          <Digit key={place} place={place} value={value} height={height} digitStyle={digitStyle} />
        ))}
      </span>
      <span className="gradient-container">
        <span className="top-gradient" style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}></span>
        <span
          className="bottom-gradient"
          style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle}
        ></span>
      </span>
    </span>
  );
}

```

### Component CSS
```css
.counter-container {
  position: relative;
  display: inline-block;
}

.counter-counter {
  display: flex;
  overflow: hidden;
  line-height: 1;
}

.counter-digit {
  position: relative;
  width: 1ch;
  font-variant-numeric: tabular-nums;
}

.counter-number {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gradient-container {
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.bottom-gradient {
  position: absolute;
  bottom: 0;
  width: 100%;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

name: stepper
code: ## Integrate the <Stepper /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: Stepper
### Variant: JavaScript + CSS
### Dependencies: motion

---

### Usage Example
```jsx
import Stepper, { Step } from './Stepper';
  
<Stepper
  initialStep={1}
  onStepChange={(step) => {
    console.log(step);
  }}
  onFinalStepCompleted={() => console.log("All steps completed!")}
  backButtonText="Previous"
  nextButtonText="Next"
>
  <Step>
    <h2>Welcome to the React Bits stepper!</h2>
    <p>Check out the next step!</p>
  </Step>
  <Step>
    <h2>Step 2</h2>
    <img style={{ height: '100px', width: '100%', objectFit: 'cover', objectPosition: 'center -70px', borderRadius: '15px', marginTop: '1em' }} src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894" />
    <p>Custom step content!</p>
  </Step>
  <Step>
    <h2>How about an input?</h2>
    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
  </Step>
  <Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step>
</Stepper>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | — | The Step components (or any custom content) rendered inside the stepper. |
| initialStep | number | 1 | The first step to display when the stepper is initialized. |
| onStepChange | (step: number) => void | () => {} | Callback fired whenever the step changes. |
| onFinalStepCompleted | () => void | () => {} | Callback fired when the stepper completes its final step. |
| stepCircleContainerClassName | string | — | Custom class name for the container holding the step indicators. |
| stepContainerClassName | string | — | Custom class name for the row holding the step circles/connectors. |
| contentClassName | string | — | Custom class name for the step’s main content container. |
| footerClassName | string | — | Custom class name for the footer area containing navigation buttons. |
| backButtonProps | object | {} | Extra props passed to the Back button. |
| nextButtonProps | object | {} | Extra props passed to the Next/Complete button. |
| backButtonText | string | "Back" | Text for the Back button. |
| nextButtonText | string | "Continue" | Text for the Next button when not on the last step. |
| disableStepIndicators | boolean | false | Disables click interaction on step indicators. |
| renderStepIndicator | {} | undefined | Renders a custom step indicator. |

### Full Component Source
```jsx
import React, { useState, Children, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import './Stepper.css';

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = newStep => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className="outer-container" {...rest}>
      <div className={`step-circle-container ${stepCircleContainerClassName}`} style={{ border: '1px solid #222' }}>
        <div className={`step-indicator-row ${stepContainerClassName}`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`step-content-default ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`footer-container ${footerClassName}`}>
            <div className={`footer-nav ${currentStep !== 1 ? 'spread' : 'end'}`}>
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={`back-button ${currentStep === 1 ? 'inactive' : ''}`}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button onClick={isLastStep ? handleComplete : handleNext} className="next-button" {...nextButtonProps}>
                {isLastStep ? 'Complete' : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: dir => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0
  }),
  center: {
    x: '0%',
    opacity: 1
  },
  exit: dir => ({
    x: dir >= 0 ? '50%' : '-50%',
    opacity: 0
  })
};

export function Step({ children }) {
  return <div className="step-default">{children}</div>;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div onClick={handleClick} className="step-indicator" style={disableStepIndicators ? { pointerEvents: 'none', opacity: 0.5 } : {}} animate={status} initial={false}>
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#222', color: '#a3a3a3' },
          active: { scale: 1, backgroundColor: '#5227FF', color: '#5227FF' },
          complete: { scale: 1, backgroundColor: '#5227FF', color: '#3b82f6' }
        }}
        transition={{ duration: 0.3 }}
        className="step-indicator-inner"
      >
        {status === 'complete' ? (
          <CheckIcon className="check-icon" />
        ) : status === 'active' ? (
          <div className="active-dot" />
        ) : (
          <span className="step-number">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  const lineVariants = {
    incomplete: { width: 0, backgroundColor: 'transparent' },
    complete: { width: '100%', backgroundColor: '#5227FF' }
  };

  return (
    <div className="step-connector">
      <motion.div
        className="step-connector-inner"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

```

### Component CSS
```css
.outer-container {
  display: flex;
  min-height: 100%;
  flex: 1 1 0%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

@media (min-width: 640px) {
  .outer-container {
    aspect-ratio: 4 / 3;
  }
}

@media (min-width: 768px) {
  .outer-container {
    aspect-ratio: 2 / 1;
  }
}

.step-circle-container {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 28rem;
  border-radius: 2rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.step-indicator-row {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 2rem;
}

.step-content-default {
  position: relative;
  overflow: hidden;
}

.step-default {
  padding-left: 2rem;
  padding-right: 2rem;
}

.footer-container {
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
}

.footer-nav {
  margin-top: 2.5rem;
  display: flex;
}

.footer-nav.spread {
  justify-content: space-between;
}

.footer-nav.end {
  justify-content: flex-end;
}

.back-button {
  transition: all 350ms;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: #a3a3a3;
  cursor: pointer;
}

.back-button:hover {
  color: #52525b;
}

.back-button.inactive {
  pointer-events: none;
  opacity: 0.5;
  color: #a3a3a3;
}

.next-button {
  transition: all 350ms;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #5227ff;
  color: #fff;
  font-weight: 500;
  letter-spacing: -0.025em;
  padding: 0.375rem 0.875rem;
  cursor: pointer;
}

.next-button:hover {
  background-color: #5227ff;
}

.next-button:active {
  background-color: #5227ff;
}

.step-indicator {
  position: relative;
  cursor: pointer;
  outline: none;
}

.step-indicator-inner {
  display: flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: 600;
}

.active-dot {
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 9999px;
  background-color: #fff;
}

.step-number {
  font-size: 0.875rem;
}

.step-connector {
  position: relative;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  height: 0.125rem;
  flex: 1;
  overflow: hidden;
  border-radius: 0.25rem;
  background-color: #52525b;
}

.step-connector-inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}

.check-icon {
  height: 1rem;
  width: 1rem;
  color: #fff;
}

```

### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
3. Import the CSS file alongside the component.
4. Import and render the component using the usage example above as a starting point.
5. Adjust props as needed for the specific use case — refer to the props table for all available options.

---

