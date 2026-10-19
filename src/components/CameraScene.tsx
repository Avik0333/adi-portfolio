import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";

import {
  Center,
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

import gsap from "gsap";

import * as THREE from "three";

import type { Group, Object3D } from "three";

type OriginalTransform = {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
};

function CameraModel({
  playIntro,
}: {
  playIntro: boolean;
}) {
  const rootRef = useRef<Group>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const { scene } = useGLTF("/models/camera.glb");

  const model = useMemo(() => {
    const cloned = scene.clone(true);

    // Normalize the model's size using its bounding box.
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());

    const maxDimension = Math.max(size.x, size.y, size.z);

    if (maxDimension > 0) {
        cloned.scale.setScalar(2.6 / maxDimension);
    }

    return cloned;
    }, [scene]);

  const originals = useMemo(() => {
    const transforms = new Map<Object3D, OriginalTransform>();

    model.traverse((object) => {
      transforms.set(object, {
        position: object.position.clone(),
        rotation: object.rotation.clone(),
        scale: object.scale.clone(),
      });
    });

    return transforms;
  }, [model]);

useEffect(() => {
  if (!playIntro || !rootRef.current) return;

  const root = rootRef.current;

  timelineRef.current?.kill();

  // Restore the original transforms before each playback.
  originals.forEach((transform, object) => {
    object.position.copy(transform.position);
    object.rotation.copy(transform.rotation);
    object.scale.copy(transform.scale);
  });

  root.position.set(0, 0, 0);
  root.rotation.set(0, 0, 0);
  root.scale.setScalar(1);

  const get = (name: string) => model.getObjectByName(name);

  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.inOut",
    },
  });

  // Animate a component relative to its original position.
  const movePart = (
    name: string,
    offset: [number, number, number],
    start: number,
    duration = 1.1,
  ) => {
    const object = get(name);

    if (!object) {
      console.warn(`[ADI] Missing component: ${name}`);
      return;
    }

    const original = originals.get(object);

    if (!original) return;

    timeline.to(
      object.position,
      {
        x: original.position.x + offset[0],
        y: original.position.y + offset[1],
        z: original.position.z + offset[2],
        duration,
      },
      start,
    );
  };

  // ----------------------------------------
  // 01 — CAMERA ENTRANCE
  // ----------------------------------------

  timeline.fromTo(
    root.rotation,
    { y: -0.42, x: 0.04 },
    {
      y: -0.12,
      x: 0,
      duration: 1.3,
      ease: "power2.out",
    },
    0,
  );

  timeline.fromTo(
    root.scale,
    { x: 0.88, y: 0.88, z: 0.88 },
    {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.3,
      ease: "power2.out",
    },
    0,
  );

  // ----------------------------------------
  // 02 — OPTICAL ELEMENTS
  // ----------------------------------------

  movePart("Optical_lens", [0, 0, 0.9], 1.3, 1.2);

  movePart("Lens_barrel_trim", [0, 0, 0.4], 1.4);
  movePart("Lens_barrel_trim001", [0, 0, 0.55], 1.5);
  movePart("Lens_barrel_trim002", [0, 0, 0.7], 1.6);
  movePart("Lens_barrel_trim003", [0, 0, 0.85], 1.7);

  movePart("Stepped_lens_barrel", [0, 0, 0.35], 1.4);
  movePart("Stepped_lens_barrel001", [0, 0, 0.5], 1.5);
  movePart("Stepped_lens_barrel002", [0, 0, 0.65], 1.6);
  movePart("Stepped_lens_barrel003", [0, 0, 0.8], 1.7);

  // ----------------------------------------
  // 03 — TOP ASSEMBLY
  // ----------------------------------------

  movePart("Viewfinder_housing", [0, 0.75, 0], 1.8);

  movePart("Top_control_index", [0, 0.45, 0], 1.9);
  movePart("Top_control_index001", [0, 0.55, 0], 2.0);

  movePart("Top_rotary_control", [0, 0.65, 0], 2.1);
  movePart("Top_rotary_control001", [0, 0.75, 0], 2.2);

  // ----------------------------------------
  // 04 — BODY DETAILS
  // ----------------------------------------

  movePart("Camera_strap_lug", [-0.45, 0.15, 0], 2.0);
  movePart("Camera_strap_lug001", [0.45, 0.15, 0], 2.1);

  movePart("Textured_hand_grip", [0.5, 0, 0], 2.2);

  // ----------------------------------------
  // 05 — ZERO GRAVITY
  // ----------------------------------------

  timeline.to(
    root.rotation,
    {
      y: 0.16,
      duration: 1.5,
      ease: "sine.inOut",
    },
    3.0,
  );

  // ----------------------------------------
  // 06 — REASSEMBLY
  // ----------------------------------------

  originals.forEach((transform, object) => {
    if (object === root) return;

    timeline.to(
      object.position,
      {
        x: transform.position.x,
        y: transform.position.y,
        z: transform.position.z,
        duration: 1.1,
        ease: "power3.inOut",
      },
      4.8,
    );
  });

  timeline.to(
    root.rotation,
    {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.1,
      ease: "power3.inOut",
    },
    4.8,
  );

  // Keep the assembled camera at its existing normalized scale.
  timeline.set(
    root.scale,
    { x: 1, y: 1, z: 1 },
    5.9,
  );

  timelineRef.current = timeline;

  return () => {
    timeline.kill();
    timelineRef.current = null;

    originals.forEach((transform, object) => {
      object.position.copy(transform.position);
      object.rotation.copy(transform.rotation);
      object.scale.copy(transform.scale);
    });

    root.position.set(0, 0, 0);
    root.rotation.set(0, 0, 0);
    root.scale.setScalar(1);
  };
}, [model, originals, playIntro]);

  useFrame(({ clock }) => {
    const root = rootRef.current;

    if (!root) return;

    // Keep the camera's idle movement subtle.
    if (!timelineRef.current?.isActive()) {
      root.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.025;
    }
  });

  return (
    <group ref={rootRef}>
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  );
}

function SceneContents({
  playIntro,
}: {
  playIntro: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />

      <directionalLight
        position={[4, 5, 5]}
        intensity={2.5}
      />

      <spotLight
        position={[-4, 3, -2]}
        intensity={30}
        angle={0.7}
        penumbra={1}
        color="#b6c9ff"
      />

      <Suspense fallback={null}>
        <Environment preset="studio" />

        <CameraModel
            playIntro={playIntro}
        />

        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.3}
          scale={5}
          blur={2.5}
          far={3}
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
        rotateSpeed={0.45}
      />
    </>
  );
}

export default function CameraScene({
  playIntro,
}: {
  playIntro: boolean;
}) {
  return (
    <div className="camera-scene">
      <Canvas
        camera={{
            position: [0, 0, 5.5],
            fov: 35,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <SceneContents
            playIntro={playIntro}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/camera.glb");