import { useEffect, useRef, useState, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function Character({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const antennaTipRef = useRef<THREE.Mesh>(null)
  const bodyMatRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const { pointer } = useThree()

  const animProgress = useRef(0)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    animProgress.current = t

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.12
      groupRef.current.rotation.x = pointer.y * 0.1
      groupRef.current.rotation.y = pointer.x * 0.15
    }

    if (headRef.current) {
      headRef.current.rotation.x = pointer.y * 0.15
      headRef.current.rotation.y = pointer.x * 0.2
    }

    if (leftEyeRef.current) {
      leftEyeRef.current.position.x = -0.2 + pointer.x * 0.08
      leftEyeRef.current.position.y = 0.65 + pointer.y * 0.08
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.position.x = 0.2 + pointer.x * 0.08
      rightEyeRef.current.position.y = 0.65 + pointer.y * 0.08
    }

    if (leftArmRef.current) {
      const wave =
        scrollProgress > 0
          ? Math.sin(t * 3 + scrollProgress * 10) * 0.3 + 0.4
          : Math.sin(t * 0.5) * 0.08 + 0.2
      leftArmRef.current.rotation.z = wave
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z =
        Math.sin(t * 0.5 + Math.PI) * 0.08 - 0.2
    }

    if (antennaTipRef.current) {
      const glow = 0.5 + Math.sin(t * 1.2) * 0.5
      ;(antennaTipRef.current.material as THREE.MeshBasicMaterial).opacity =
        glow
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Body */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[1.0, 1.0, 0.5]} />
        <meshPhysicalMaterial
          ref={bodyMatRef}
          color="#C49B3C"
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[0.9, 0.9, 0.5]} />
        <meshPhysicalMaterial
          color="#0d0d1a"
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.2]} />
        <meshPhysicalMaterial
          color="#C49B3C"
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Head group */}
      <group ref={headRef} position={[0, 0.5, 0]}>
        {/* Head base */}
        <mesh>
          <boxGeometry args={[0.9, 0.7, 0.6]} />
          <meshPhysicalMaterial
            color="#0d0d1a"
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>

        {/* Face visor */}
        <mesh position={[0, 0, 0.31]}>
          <planeGeometry args={[0.7, 0.45]} />
          <meshBasicMaterial color="#08080f" />
        </mesh>

        {/* Visor border glow */}
        <mesh position={[0, 0, 0.3]}>
          <planeGeometry args={[0.74, 0.49]} />
          <meshBasicMaterial
            color="#C49B3C"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Left eye glow */}
        <mesh ref={leftEyeRef} position={[-0.2, 0.15, 0.32]}>
          <circleGeometry args={[0.07, 20]} />
          <meshBasicMaterial color="#C49B3C" />
        </mesh>
        {/* Left eye glow ring */}
        <mesh position={[-0.2, 0.15, 0.31]}>
          <ringGeometry args={[0.07, 0.1, 20]} />
          <meshBasicMaterial
            color="#C49B3C"
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* Right eye glow */}
        <mesh ref={rightEyeRef} position={[0.2, 0.15, 0.32]}>
          <circleGeometry args={[0.07, 20]} />
          <meshBasicMaterial color="#C49B3C" />
        </mesh>
        {/* Right eye glow ring */}
        <mesh position={[0.2, 0.15, 0.31]}>
          <ringGeometry args={[0.07, 0.1, 20]} />
          <meshBasicMaterial
            color="#C49B3C"
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* Mouth line */}
        <mesh position={[0, -0.05, 0.32]}>
          <planeGeometry args={[0.15, 0.015]} />
          <meshBasicMaterial
            color="#C49B3C"
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.015, 0.025, 0.25]} />
          <meshPhysicalMaterial
            color="#C49B3C"
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
        <mesh ref={antennaTipRef} position={[0, 0.64, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial
            color="#C49B3C"
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.62, 0, 0]}>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.6]} />
          <meshPhysicalMaterial
            color="#C49B3C"
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshPhysicalMaterial
            color="#C49B3C"
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.62, 0, 0]}>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.6]} />
          <meshPhysicalMaterial
            color="#C49B3C"
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshPhysicalMaterial
            color="#C49B3C"
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Base platform */}
      <mesh position={[0, -1.2, 0]}>
        <ringGeometry args={[0.4, 0.7, 32]} />
        <meshBasicMaterial
          color="#C49B3C"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export function GameCharacter() {
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const progress = Math.max(
      0,
      Math.min(1, (window.innerHeight - rect.top) / window.innerHeight)
    )
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    setMounted(true)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  if (!mounted) {
    return (
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-background"
      />
    )
  }

  return (
    <section
      ref={sectionRef}
      id="character"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={0.6} />
        <pointLight position={[-4, -2, -4]} intensity={0.3} />
        <pointLight position={[0, -4, 3]} intensity={0.2} />
        <Character scrollProgress={scrollProgress} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-20">
        <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--primary)]/30 uppercase">
          Move your cursor &mdash; I see you
        </p>
      </div>
    </section>
  )
}
