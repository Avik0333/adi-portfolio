import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
} from "lucide-react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Photograph = {
  src: string;
  title: string;
  category: string;
  orientation: "portrait" | "landscape";
};

type GalleryMotion = {
  progress: number;
  rotation: number;
};

const photographs: Photograph[] = [
  {
    src: "/images/portraits-1.jpg",
    title: "Quiet Presence",
    category: "PORTRAIT",
    orientation: "portrait",
  },
  {
    src: "/images/moments-1.jpg",
    title: "In Between",
    category: "EVENT",
    orientation: "landscape",
  },
  {
    src: "/images/portraits-2.jpg",
    title: "The Other Side",
    category: "EDITORIAL",
    orientation: "portrait",
  },
  {
    src: "/images/moments-2.jpg",
    title: "A Thousand Words",
    category: "CANDID",
    orientation: "landscape",
  },
  {
    src: "/images/experiments-1.jpg",
    title: "Through Another Lens",
    category: "CREATIVE",
    orientation: "portrait",
  },
  {
    src: "/images/experiments-2.jpg",
    title: "Unfamiliar Light",
    category: "PERSONAL",
    orientation: "landscape",
  },
];

const FRAME_RADIUS = 3.0;

function getFrameSize(
  orientation: Photograph["orientation"],
  isMobile: boolean,
): [number, number] {
  if (isMobile) {
    return orientation === "portrait"
      ? [0.78, 1.12]
      : [1.12, 0.78];
  }

  return orientation === "portrait"
    ? [1.05, 1.4]
    : [1.55, 1.05];
}

function PhotoFrame({
  photo,
  index,
  selectedIndex,
  motion,
  onSelect,
}: {
  photo: Photograph;
  index: number;
  selectedIndex: number;
  motion: GalleryMotion;
  onSelect: (index: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(photo.src);
  const { viewport } = useThree();

  const isMobile = viewport.width < 7;
  const [frameWidth, frameHeight] = getFrameSize(
    photo.orientation,
    isMobile,
  );

  const targetPosition = useMemo(() => {
    const angle = (index / photographs.length) * Math.PI * 2;

    return new THREE.Vector3(
      Math.sin(angle) * FRAME_RADIUS,
      Math.sin(angle * 2) * 0.35,
      Math.cos(angle) * FRAME_RADIUS,
    );
  }, [index]);

  const entrancePosition = useMemo(
    () =>
      new THREE.Vector3(
        Math.cos(index * 2.2) * 6,
        Math.sin(index * 1.7) * 3.5,
        -3 - index * 0.15,
      ),
    [index],
  );

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const progress = THREE.MathUtils.clamp(
      motion.progress,
      0,
      1,
    );

    // Photos converge into the carousel during the first part
    // of the scroll, then remain arranged in a rotating arc.
    const convergence = THREE.MathUtils.smoothstep(
      progress,
      0.04,
      0.42,
    );

    const rotation = motion.rotation;

    const position = targetPosition
      .clone()
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation);

    const nextPosition = entrancePosition
      .clone()
      .lerp(position, convergence);

    group.position.lerp(
      nextPosition,
      1 - Math.exp(-delta * 5),
    );

    // Every frame faces the viewer, with a little 3D yaw
    // as it travels around the carousel.
    const yaw = Math.atan2(position.x, position.z) * 0.42;

    const targetRotation = new THREE.Euler(
      -position.y * 0.08,
      yaw,
      -position.x * 0.035,
    );

    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      targetRotation.x,
      5,
      delta,
    );

    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotation.y,
      5,
      delta,
    );

    group.rotation.z = THREE.MathUtils.damp(
      group.rotation.z,
      targetRotation.z,
      5,
      delta,
    );

    const relativeAngle = Math.atan2(position.x, position.z);
    const isSelected = index === selectedIndex;

    const targetScale = isSelected
      ? 1.12
      : THREE.MathUtils.lerp(0.68, 0.86, (position.z + FRAME_RADIUS) / (FRAME_RADIUS * 2));

    const entranceScale = 0.82;
    const scale = THREE.MathUtils.lerp(
      entranceScale,
      targetScale,
      convergence,
    );

    group.scale.lerp(
      new THREE.Vector3(scale, scale, scale),
      1 - Math.exp(-delta * 6),
    );

    group.visible = true;

    // Keep the center frame brighter and the side frames subdued.
    const opacity = isSelected
      ? 1
      : THREE.MathUtils.lerp(0.62, 0.9, (position.z + FRAME_RADIUS) / (FRAME_RADIUS * 2));

    group.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      const material = object.material;

      if (Array.isArray(material)) return;

      if (material instanceof THREE.MeshBasicMaterial) {
        material.opacity = opacity;
        material.transparent = opacity < 1;
      }

      if (material instanceof THREE.MeshStandardMaterial) {
        material.opacity = opacity;
        material.transparent = opacity < 1;
      }
    });

    void relativeAngle;
  });

  return (
    <group
      ref={groupRef}
      position={entrancePosition}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(index);
      }}
    >
      {/* Dark, slim gallery frame */}
      <mesh position={[0, 0, -0.035]}>
        <boxGeometry
          args={[
            frameWidth + 0.09,
            frameHeight + 0.09,
            0.07,
          ]}
        />
        <meshStandardMaterial
          color={index === selectedIndex ? "#d6d2ca" : "#343434"}
          metalness={0.18}
          roughness={0.48}
        />
      </mesh>

      {/* Photograph */}
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function SpatialScene({
  motion,
  selectedIndex,
  onSelect,
}: {
  motion: GalleryMotion;
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <>
      <ambientLight intensity={1.4} />

      <directionalLight
        position={[3, 5, 8]}
        intensity={1.8}
      />

      <Suspense fallback={null}>
        {photographs.map((photo, index) => (
          <PhotoFrame
            key={photo.src}
            photo={photo}
            index={index}
            selectedIndex={selectedIndex}
            motion={motion}
            onSelect={onSelect}
          />
        ))}
      </Suspense>
    </>
  );
}

export default function SpatialGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const motion = useRef<GalleryMotion>({
    progress: 0,
    rotation: 0,
  });

  const [galleryStage, setGalleryStage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [heroOpen, setHeroOpen] = useState(false);
  const [manualRotation, setManualRotation] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const selectedPhoto = photographs[selectedIndex];

  const selectPhoto = useCallback((index: number) => {
    setSelectedIndex(
      (index + photographs.length) % photographs.length,
    );
  }, []);

  const rotateGallery = useCallback((direction: number) => {
    setManualRotation((rotation) => rotation + direction);
    setSelectedIndex((index) =>
      (index + direction + photographs.length) % photographs.length,
    );
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=850",
        pin: true,
        scrub: 0.7,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          motion.current.progress = progress;

          setScrollProgress(progress);

          const nextStage =
            progress < 0.42
              ? 0
              : progress < 0.78
                ? 1
                : 2;

          setGalleryStage((previous) =>
            previous === nextStage ? previous : nextStage,
          );
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    motion.current.rotation = manualRotation * (Math.PI / 3);
  }, [manualRotation]);

  useEffect(() => {
    if (!heroOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setHeroOpen(false);
      if (event.key === "ArrowLeft") rotateGallery(-1);
      if (event.key === "ArrowRight") rotateGallery(1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [heroOpen, rotateGallery]);

  return (
    <>
      <section
        ref={sectionRef}
        className="spatial-gallery"
        id="work"
      >
        <header className="spatial-navigation">
          <a href="#home" className="spatial-wordmark">
            ADI<sup>®</sup>
          </a>

          <span className="spatial-nav-center">
            THE SPATIAL ARCHIVE
          </span>

          <span className="spatial-nav-right">
            <i />
            VISUAL STORIES
          </span>
        </header>

        <div className="spatial-heading">
          <span>PEOPLE. PLACES. PERSPECTIVES.</span>

          <h2>
            THE ART OF
            <br />
            <span>REMEMBERING.</span>
          </h2>
        </div>

        <div className="spatial-canvas">
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 10], fov: 36 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
          >
            <SpatialScene
              motion={motion.current}
              selectedIndex={selectedIndex}
              onSelect={selectPhoto}
            />
          </Canvas>
        </div>

        <div className="spatial-selected-info">
          <span>{selectedPhoto.category}</span>
          <h3>{selectedPhoto.title}</h3>
          <span>
            {String(selectedIndex + 1).padStart(2, "0")} / 06
          </span>
        </div>

        <div className="spatial-controls">
          <button
            type="button"
            aria-label="Previous photograph"
            onClick={() => rotateGallery(-1)}
          >
            <ArrowLeft size={18} />
          </button>

          <span>
            {String(selectedIndex + 1).padStart(2, "0")}
            <i />
            06
          </span>

          <button
            type="button"
            aria-label="Next photograph"
            onClick={() => rotateGallery(1)}
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <button
          className="spatial-open-button"
          type="button"
          onClick={() => setHeroOpen(true)}
        >
          VIEW SELECTED FRAME <ArrowUpRight size={15} />
        </button>

        <div className="spatial-stage-label">
          <span>01—06</span>
          <span>
            {galleryStage === 0
              ? "FRAMES IN MOTION"
              : galleryStage === 1
                ? "ROTATE THE ARCHIVE"
                : "SELECT A FRAME"}
          </span>
        </div>

        <footer className="spatial-footer">
          <span>ADI® — BEYOND THE FRAME</span>
          <span>PEOPLE / PLACES / PERSPECTIVES</span>
        </footer>

        <div className="spatial-progress">
          <span
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </section>

      {heroOpen && (
        <div
          className="spatial-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
          onClick={() => setHeroOpen(false)}
        >
          <button
            type="button"
            className="spatial-lightbox-close"
            onClick={() => setHeroOpen(false)}
            aria-label="Close photograph"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            className="spatial-lightbox-previous"
            aria-label="Previous photograph"
            onClick={(event) => {
              event.stopPropagation();
              rotateGallery(-1);
            }}
          >
            <ArrowLeft size={22} />
          </button>

          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.title}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            className="spatial-lightbox-next"
            aria-label="Next photograph"
            onClick={(event) => {
              event.stopPropagation();
              rotateGallery(1);
            }}
          >
            <ArrowRight size={22} />
          </button>

          <div className="spatial-lightbox-caption">
            <span>{selectedPhoto.category}</span>
            <h3>{selectedPhoto.title}</h3>
          </div>
        </div>
      )}
    </>
  );
}