<div align="center">

# ADI® — BEYOND THE FRAME

### An Immersive Photography Experience

**PEOPLE. PLACES. PERSPECTIVES.**

A cinematic photography portfolio exploring the intersection of
visual storytelling, editorial design, and interactive 3D experiences.

<br />

[Overview](#-overview) ·
[Features](#-key-features) ·
[Experience](#-the-experience) ·
[Technology](#-technology-stack) ·
[Installation](#-getting-started) ·
[Roadmap](#-roadmap)

<br />

</div>

---

## ✦ Overview

**ADI® — Beyond the Frame** is an experimental photography portfolio
built around a simple idea:

> A photograph is more than a captured image. It is a moment,
> a perspective, and a story that deserves to be experienced.

Traditional photography portfolios often present images through
conventional grids, static galleries, and predictable navigation.

This project explores an alternative approach.

By combining cinematic transitions, expressive typography,
interactive three-dimensional environments, and carefully considered
visual composition, the experience transforms the act of browsing
photographs into a more immersive journey.

The interface is designed to evolve as the visitor scrolls.
Images emerge from darkness, move through a spatial environment,
and become individual focal points within an interactive archive.

Every animation, transition, and interface element is intended
to support the photographs rather than compete with them.

The result is a portfolio that treats photography as both
a visual medium and an interactive experience.

### Project Details

| Attribute | Description |
|---|---|
| Project | ADI® — Beyond the Frame |
| Category | Creative Development / Photography Portfolio |
| Primary Focus | Interactive visual storytelling |
| Interface | Editorial, cinematic, minimal |
| 3D Experience | Interactive spatial photography gallery |
| Frontend | React and TypeScript |
| 3D Rendering | Three.js and React Three Fiber |
| Animation | GSAP and ScrollTrigger |
| Build Tool | Vite |
| Status | In active development |

---

## 🎞️ The Creative Vision

### Beyond simply viewing photographs

The central design principle behind this project is:

**The photograph is the subject. The interface is the frame.**

The website is not intended to be an animation showcase where
photographs become secondary to visual effects.

Instead, the experience uses motion, depth, and composition to
encourage visitors to slow down and engage with individual images.

The creative direction brings together three ideas.

### 01 — Emotion Before Decoration

Every interaction should have a purpose.

A photograph should emerge gradually when anticipation adds meaning.
A transition should feel natural rather than arbitrary.
A three-dimensional effect should help establish perspective.

Motion is used to create atmosphere, guide attention, and establish
a relationship between the visitor and the photographs.

### 02 — Space Creates Perspective

Photographs are traditionally displayed as flat images on a page.

This project experiments with presenting them as physical-looking
frames occupying a shared three-dimensional environment.

The frames can move through space, change orientation, and become
the focal point of the viewing experience.

The spatial arrangement creates a connection between photography,
depth, movement, and interaction.

### 03 — Restraint Creates Impact

The visual language is deliberately minimal.

Dark backgrounds, monochromatic imagery, oversized typography,
subtle borders, and restrained red accents establish a consistent
visual identity.

The interface avoids unnecessary decoration so that the photographs
remain the most important visual elements.

---

## ✨ Key Features

### 🎬 1. Cinematic Introduction

The experience begins with an editorial-style landing section
that introduces the portfolio's visual identity.

Key elements include:

- Oversized typography and carefully controlled spacing.
- A dark cinematic visual environment.
- An animated 3D camera model.
- Subtle transitions and lighting.
- Minimal interface elements.
- A visual hierarchy designed around the photography.

The introduction establishes the project's atmosphere before
guiding visitors into the photographic experience.

The 3D camera provides visual context without requiring the
entire website to revolve around a technical demonstration.

### 🖼️ 2. Scroll-Driven Photograph Reveal

Photography becomes the focus through a cinematic reveal sequence.

As visitors scroll, the featured photograph emerges through
a combination of clipping, scaling, brightness adjustments,
and scroll-linked animation.

The transition is designed to create anticipation before
the image becomes fully visible.

The animation system uses GSAP and ScrollTrigger to coordinate
the timing and progression of visual elements.

The goal is to make the photograph feel deliberately introduced
rather than simply loaded onto the page.

### 🌐 3. Interactive Spatial Photography Archive

The spatial archive is the project's central interactive feature.

Instead of presenting photographs exclusively through a static
grid, the gallery uses a Three.js scene to position framed
photographs in three-dimensional space.

The experience explores:

- Three-dimensional positioning of photographic frames.
- Different orientations and depths.
- Scroll-driven transitions between gallery stages.
- Interactive photograph selection.
- Rotation through the collection.
- A dedicated featured-image presentation.
- An expanded photograph viewer.

The spatial arrangement introduces depth while retaining
the clean, editorial visual identity of the portfolio.

### 🔄 4. Three-Dimensional Frame Movement

Each photograph is represented by a frame containing an image
and a subtle backing layer.

The scene calculates spatial positions for individual frames
and interpolates their positions and orientations as the
gallery progresses.

This creates a sense of movement through a shared space.

The implementation uses Three.js vectors and quaternions
to manage position and orientation.

Frame movement is interpolated over time to avoid abrupt
changes in position.

The intended visual result is controlled, fluid movement
that gives the collection a sense of physical presence.

### 🎯 5. Featured Photograph Interaction

The gallery includes a dedicated featured-image area.

Selecting a photograph updates the featured image and its
associated metadata.

Visitors can open the selected photograph in a larger viewer
for a more focused experience.

This creates two complementary ways to explore the archive:

- Browse the collection spatially.
- Focus on an individual photograph.

The larger viewer also supports navigation between photographs
and keyboard-based interactions.

### 🖥️ 6. Editorial Visual Language

The interface combines modern editorial design with a
cinematic visual atmosphere.

Its design system emphasizes:

- Large typographic compositions.
- Minimal monochromatic surfaces.
- Carefully controlled contrast.
- Restrained accent colors.
- Thin borders and subtle framing.
- Consistent spacing and alignment.
- Smooth transitions between interface states.

The intention is to create an experience that feels closer
to an interactive visual publication than a conventional
photography website.

### 🧭 7. Custom Interface Details

Small interface elements help reinforce the project's identity.

These include:

- A custom wordmark presentation.
- Section labels and collection indices.
- Photograph categories and numbering.
- Directional navigation controls.
- A scroll-progress indicator.
- A custom cursor component.
- Minimal interface icons.

These details establish continuity between the landing page,
featured-image section, and spatial archive.

### 📱 8. Responsive Design Considerations

The project includes responsive styling for smaller screens.

The layout and typography adapt to available screen space,
while the gallery adjusts its presentation for mobile devices.

The project also includes reduced-motion styling for selected
CSS transitions and animations.

Further testing and optimization remain important, particularly
for touch interaction, smaller displays, and mobile GPU performance.

---

## 🧭 The Experience

The portfolio is designed as a sequence of visual experiences.

### Chapter 01 — The Introduction

The visitor enters through a dark, editorial landing page.

Typography establishes the visual identity while an animated
camera model introduces the photographic theme.

The opening sequence sets the tone without overwhelming
the content that follows.

**Purpose:** Establish atmosphere and introduce the photographer.

### Chapter 02 — The Photograph

The visitor encounters a featured photograph presented through
a scroll-driven reveal.

The image gradually emerges as the surrounding interface
transitions into its featured state.

The combination of clipping, scaling, and brightness changes
creates a cinematic introduction to the photograph.

**Purpose:** Make the photograph the visual focal point.

### Chapter 03 — The Spatial Archive

The visitor enters an interactive three-dimensional gallery.

Photographic frames occupy a shared spatial environment,
with their positions and orientations changing as the
gallery progresses through its animation stages.

The visitor can explore the collection and select individual frames.

**Purpose:** Introduce depth and interaction to photographic browsing.

### Chapter 04 — The Selected Frame

A selected photograph becomes the focus of the interface.

The featured-image area updates to reflect the selection,
and the visitor can open the photograph in an expanded viewer.

Keyboard navigation and on-screen controls support browsing
between photographs.

**Purpose:** Give individual images room to be appreciated.

---

## 🛠️ Technology Stack

The project combines a modern frontend stack with dedicated
3D rendering and animation tools.

### Frontend

| Technology | Role |
|---|---|
| React | Component-based user interface |
| TypeScript | Static typing and maintainability |
| Vite | Development server and production build |
| Tailwind CSS | Utility-first styling infrastructure |
| Custom CSS | Layout, typography, visual effects, and transitions |
| Lucide React | Interface icons |

### 3D Rendering

| Technology | Role |
|---|---|
| Three.js | 3D rendering and spatial calculations |
| React Three Fiber | React renderer for Three.js |
| React Three Drei | Utilities and helpers for 3D scenes |

### Animation

| Technology | Role |
|---|---|
| GSAP | Timeline-based and programmatic animation |
| GSAP ScrollTrigger | Scroll-driven animation and scene progression |

### Development Tools

| Tool | Role |
|---|---|
| Git | Version control |
| GitHub | Source-code hosting |
| npm | Dependency management |
| VS Code | Development environment |

---

## 🧩 Technical Implementation

### Component-Based Architecture

The application separates major visual responsibilities
into dedicated React components.

This keeps the landing page, camera scene, cursor,
and spatial gallery easier to develop and maintain independently.

The current component structure includes:

- `App.tsx` — Main application composition.
- `CameraScene.tsx` — Three-dimensional camera scene.
- `CustomCursor.tsx` — Custom cursor presentation.
- `PhotographyGallery.tsx` — Photography gallery component.
- `SpatialGallery.tsx` — Interactive spatial archive.
- `index.css` — Global styling and animation rules.
- `main.tsx` — Application entry point.

The exact rendering path depends on how the components are
currently connected inside the application.

### Spatial Positioning

Photographs are distributed across a spherical arrangement
using a mathematical positioning function.

A golden-angle distribution helps spread points across the
surface without relying on a simple rectangular grid.

For each photograph, the implementation calculates a
three-dimensional position based on its index.

The resulting positions are then transformed as the gallery
rotates.

This creates a more spatial presentation than conventional
two-dimensional positioning.

### Orientation and Interpolation

Three-dimensional orientation is handled using quaternions.

Rather than directly interpolating individual rotation angles,
the scene can interpolate between orientations using quaternion
spherical interpolation.

Position and scale are also interpolated over time.

This helps the frames move between their entrance positions
and their spatial arrangement more smoothly.

### Scroll-Driven Animation

GSAP ScrollTrigger tracks the visitor's progress through
the gallery section.

That progress is mapped to animation stages.

The scene uses the progress value to determine how the
photographic frames should move between their initial
and spatial positions.

The implementation separates scroll progress from the
per-frame rendering loop.

This allows the React Three Fiber scene to animate frame
transforms without requiring a React state update for every
animation frame.

### Photograph Textures

Photographs are loaded as textures and applied to planes
inside the 3D scene.

The implementation configures texture color space and
anisotropic filtering to improve image appearance.

The photograph is displayed on a plane, with a separate
backing mesh creating the appearance of a framed image.

### Expanded Viewing Interface

The expanded photograph viewer is rendered above the
main gallery using a fixed-position overlay.

It includes:

- A close control.
- Previous and next navigation.
- Photograph metadata.
- Keyboard navigation.
- Escape-key dismissal.
- Scroll locking while the viewer is open.

The viewer provides a focused image presentation without
requiring the visitor to leave the gallery.

---

## 📂 Project Structure

The project is organized around the main application,
reusable components, static assets, and configuration files.

```text
adi-portfolio/
│
├── public/
│   ├── images/
│   │   ├── featured.jpg
│   │   ├── portraits-1.jpg
│   │   ├── portraits-2.jpg
│   │   ├── moments-1.jpg
│   │   ├── moments-2.jpg
│   │   ├── experiments-1.jpg
│   │   └── experiments-2.jpg
│   │
│   └── models/
│       └── camera.glb
│
├── src/
│   ├── components/
│   │   ├── CameraScene.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── PhotographyGallery.tsx
│   │   └── SpatialGallery.tsx
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
