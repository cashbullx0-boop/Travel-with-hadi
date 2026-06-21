# Tech Spec — TRAVELWITHHADI

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.0 | UI framework |
| react-dom | ^18.3.0 | DOM renderer |
| gsap | ^3.12.0 | Core animation engine, ScrollTrigger, SplitText |
| lenis | ^1.1.0 | Smooth scroll with inertia |
| three | ^0.170.0 | 3D wavy tunnel (raw Three.js, not R3F) |
| @fontsource/bebas-neue | ^5.0.0 | Display font |
| @fontsource/inter | ^5.0.0 | Body font (variable weight) |
| @fontsource/cormorant-garamond | ^5.0.0 | Editorial serif |
| @fontsource/instrument-serif | ^5.0.0 | Accent serif |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.0.0 | React Vite plugin |
| tailwindcss | ^4.0.0 | Utility CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite integration |
| typescript | ^5.6.0 | Type checking |
| @types/react | ^18.3.0 | React types |
| @types/react-dom | ^18.3.0 | ReactDOM types |
| @types/three | ^0.170.0 | Three.js types |

**Not using**: framer-motion (GSAP covers all animation needs), @react-three/fiber (tunnel uses raw Three.js for direct shader/material control), next (Vite per skill), next/image (standard img with lazy loading).

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| Navigation | Custom | Single |
| Footer | Custom | Single |
| CustomCursor | Custom | Single |
| SmoothScrollProvider | Custom (Lenis wrapper) | Single |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | 3-layer parallax composition |
| AboutSection | Custom | Two-column with timeline |
| TunnelSection | Custom | Full-viewport Three.js canvas, pinned |
| DestinationsSection | Custom | 2-column card grid |
| IncludedSection | Custom | 4-column glass cards |
| TestimonialsSection | Custom | Horizontal drag slider |
| ContactSection | Custom | Full-bleed bg + glass form |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| SectionHeading | Custom | About, Destinations, Included, Testimonials — font-weight reveal animation |
| SplitText | Custom | SectionHeading — character-span wrapper |
| FontReveal | Custom hook + component | SectionHeading — IntersectionObserver trigger |
| GlassCard | Custom | Included cards, Testimonial cards, Contact panel |
| DestinationCard | Custom | DestinationsSection |
| TimelineItem | Custom | AboutSection right column |
| PolaroidCard | Custom | HeroSection strip — video card with hover |
| PrimaryButton | Custom | Hero CTA, Contact submit |
| SocialColumn | Custom | Hero right edge |
| WavyTunnel | Custom (Three.js) | TunnelSection — shader-based tube |

### Hooks

| Hook | Purpose |
|------|---------|
| useLenis | Initialize Lenis, sync with GSAP ScrollTrigger |
| useParallax | GSAP ScrollTrigger scrub-based parallax on ref |
| useFontReveal | IntersectionObserver → adds trigger class for weight animation |
| useMousePosition | Tracked normalized mouse coords for tunnel curvature |
| useScrollProgress | Returns 0–1 scroll progress for a section ref |

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| 3-Layer Hero Parallax | GSAP ScrollTrigger | Scrub timeline: bg 0.3x, text 0.5x, fg 0.1x translateY | Medium |
| Font Weight Reveal | CSS transition + IntersectionObserver | Split into char spans, staggered transition-delay, toggle class triggers opacity 0→1, weight 800→400, blur 4px→0 | Medium |
| Hero CTA Fill-Up | CSS pseudo-element | ::before with scaleY(0)→scaleY(1), transform-origin: bottom | Low |
| Polaroid Parallax Drift | GSAP ScrollTrigger | Scrub translateY at 0.4x per card | Low |
| Polaroid Hover Lift | CSS transition | translateY(-6px), box-shadow increase, video.playbackRate = 1.5 | Low |
| Timeline Stagger Reveal | GSAP ScrollTrigger | Batch: opacity 0→1, translateY 30→0, stagger 0.2s on viewport enter | Low |
| Timeline Photo Hover | CSS transition | translateX/translateY separation with z-index shift | Low |
| Destination Card Hover | CSS transition | img scale 1.05, glass overlay opacity 0→1, title translateY | Low |
| Included Card Hover | CSS transition | translateY(-8px), border-color → Forest Green | Low |
| Testimonial Auto-Scroll | setInterval + pause on hover | translateX scroll position, snap to card | Medium |
| Nav Background Transition | GSAP ScrollTrigger | Toggle class at 100vh scroll: bg transparent → rgba(7,7,7,0.9) + backdrop-blur | Low |
| Custom Cursor | requestAnimationFrame | Follow mouse via transform, scale dot↔circle on interactive hover | Medium |
| **Wavy 3D Tunnel** | **Three.js raw shaders** | **🔒 See below** | **High** |
| Section Entrance (global) | GSAP ScrollTrigger | Fade up: translateY 40→0, opacity 0→1, stagger children 0.15s | Low |

### 🔒 Wavy 3D Tunnel — Dedicated Plan

This is the most complex effect in the project. It is a scroll-driven WebGL tube tunnel with custom vertex/fragment shaders, post-processing, and mouse interaction.

**Architecture decision**: Raw Three.js (not React Three Fiber). The tunnel requires direct shader material control, custom post-processing pipeline, and tight scroll/mouse coupling that is cleaner in imperative Three.js code wrapped in a React useEffect.

**Component**: `WavyTunnel` — a React component that creates a full-viewport `<canvas>` element and initializes the Three.js scene in a useEffect. The component accepts `scrollProgress` and `mouseX` as props (or reads from a shared ref) and updates uniforms each frame via requestAnimationFrame.

**Scene graph**:
- Renderer: WebGLRenderer, antialias: true, alpha: true, clearColor: #070707
- Camera: PerspectiveCamera, position.z = 6, no OrbitControls
- Lights: AmbientLight (white, intensity 1), DirectionalLight (0,1,0, intensity 1)
- Mesh: CylinderGeometry(5, 5, height=30, radialSegments=64, tubularSegments=512, openEnded=true) — rotated Y=PI/2 then Z=PI/2 to face camera
- Material: ShaderMaterial with custom vert/frag shaders (see design.md)
- Post-processing: Orthographic scene with fullscreen quad applying post-process frag shader

**Scroll integration**: The tunnel section uses GSAP ScrollTrigger with `pin: true` and `scrub: true` for approximately 200vh of scroll distance. `scrollProgress` (0→1) drives `uTime` uniform and mesh rotation.y. `mouseX` (normalized -1 to 1) drives tunnel curvature via additional rotation.

**Performance**: Use a single canvas element. Destroy/recreate the Three.js scene on mount/unmount only. Dispose geometries, materials, textures on cleanup. Use `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`.

**MSDF Text**: Deferred. If time permits, add 3D text meshes ("HUNZA", "SKARDU", "FAIRY MEADOWS") inside the tunnel using three-msdf-text-utils. These would appear at specific scrollProgress thresholds. If not implemented, the tunnel stands alone as a visual transition.

## State & Logic Plan

### Lenis ↔ GSAP ScrollTrigger Sync

Lenis must feed into GSAP ScrollTrigger for all scroll-triggered animations to work. Pattern:

1. Initialize Lenis in a provider component at app root
2. On every Lenis `scroll` event, call `ScrollTrigger.update()`
3. Use GSAP `ScrollTrigger.scrollerProxy()` if needed for pinned sections
4. Cleanup on unmount

### Mouse Position Sharing

Mouse position is needed by two consumers:
- Custom cursor (React state, rAF-driven)
- Wavy tunnel (direct uniform update, not React state)

Use a shared ref (`mouseRef = { x: 0, y: 0 }`) that is updated by a single mousemove listener at the window level. The custom cursor reads from this ref in its rAF loop. The tunnel component reads from the same ref in its render loop. No React re-renders on mouse move.

### Scroll Progress for Tunnel

The tunnel section needs fine-grained scroll progress (0→1) over its pinned duration. Use a GSAP ScrollTrigger with `pin: true`, `scrub: true`, and `onUpdate(self) => { tunnelRef.current.progress = self.progress }`. The tunnel's rAF loop reads from `tunnelRef.current.progress` to update uniforms.

### Video Playback Management

The 5 polaroid video elements need performance-conscious playback:
- Use `IntersectionObserver` to pause videos when off-screen
- On hover, increase `video.playbackRate = 1.5`
- On mouseleave, restore `video.playbackRate = 1.0`
- All videos: `muted`, `playsInline`, `loop`, `preload="metadata"`

## Other Key Decisions

### Raw Three.js over R3F

The wavy tunnel uses custom ShaderMaterial with specific vertex/fragment shaders, custom post-processing (fullscreen quad with second shader), and direct uniform manipulation from scroll/mouse. R3F's declarative model adds abstraction overhead without benefit here. The tunnel is a self-contained canvas component — raw Three.js in a useEffect is the right call.

### Variable Font for Weight Animation

Bebas Neue (display font) does not support variable weight. The font-weight reveal animation requires a variable-weight font. Decision: use Inter (which has full variable weight support, 100–900) for section headings that use the font-reveal animation. Keep Bebas Neue for the hero "PAKISTAN" text and other static display uses. This is a pragmatic trade — the weight animation is the signature effect and needs variable weight support.

Alternatively: implement the font-reveal using scale (1.1→1.0) + blur + opacity instead of weight change for Bebas Neue headings. This preserves the brand font for headings while still achieving the reveal effect. This is the preferred approach — keep Bebas Neue for all display, use scale+blur for the reveal.

### Image Loading Strategy

Hero background: eager load, high priority. All other images: lazy loaded with IntersectionObserver. Destination cards: load when section enters viewport. Timeline photos: load when About section enters viewport. Polaroid videos: preload="metadata", begin playback when visible.

### Mobile Adaptations

- Custom cursor: disabled on touch devices (detect via `'ontouchstart' in window`)
- Polaroid strip: horizontal scroll snap on mobile instead of parallax drift
- Testimonials: native horizontal scroll with snap points
- Tunnel: reduce tubularSegments to 256, disable post-processing on low-end devices (detect via gl.getParameter gl.MAX_TEXTURE_SIZE)
- Hero typography: clamp to smaller min size (4rem)
- Navigation: hamburger menu below 768px

### Fonts Loading

Use `@fontsource` packages for self-hosted fonts (no Google Fonts CDN). Import in main.tsx:
- `@fontsource/bebas-neue/400.css`
- `@fontsource/inter/400.css`
- `@fontsource/inter/500.css`
- `@fontsource/inter/700.css`
- `@fontsource/cormorant-garamond/400.css`
- `@fontsource/cormorant-garamond/400-italic.css`
- `@fontsource/instrument-serif/400.css`
- `@fontsource/instrument-serif/400-italic.css`

Declare font-family in Tailwind config and index.css.
