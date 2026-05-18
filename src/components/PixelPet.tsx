import { useEffect, useRef, useState, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const GOLD = "#C49B3C"
const LGOLD = "#e8c46a"
const DGOLD = "#a67c2e"

function Pet({ scrollProg }: { scrollProg: number }) {
  const bodyRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const tailRef = useRef<THREE.Group>(null)
  const earL = useRef<THREE.Mesh>(null)
  const earR = useRef<THREE.Mesh>(null)
  const pupilL = useRef<THREE.Mesh>(null)
  const pupilR = useRef<THREE.Mesh>(null)
  const { pointer } = useThree()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 0.7) * 0.05
      bodyRef.current.rotation.x = pointer.y * 0.06
      bodyRef.current.rotation.z = pointer.x * 0.08
    }

    if (headRef.current) {
      headRef.current.rotation.y = pointer.x * 0.18
      headRef.current.rotation.x = -Math.abs(pointer.y) * 0.1
    }

    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 2.5 + scrollProg * 10) * 0.4 + 0.3
    }

    if (pupilL.current) {
      pupilL.current.position.x = 0.18 + pointer.x * 0.05
      pupilL.current.position.y = 0.55 + pointer.y * 0.04
    }
    if (pupilR.current) {
      pupilR.current.position.x = -0.18 + pointer.x * 0.05
      pupilR.current.position.y = 0.55 + pointer.y * 0.04
    }

    if (earL.current) earL.current.rotation.z = Math.sin(t * 1.2) * 0.04
    if (earR.current) earR.current.rotation.z = Math.sin(t * 1.2 + 0.5) * 0.04
  })

  return (
    <group ref={bodyRef} position={[0, -0.25, 0]}>
      {/* Tail */}
      <group ref={tailRef} position={[-0.15, 0.22, -0.5]}>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.25]} />
          <meshPhysicalMaterial color={GOLD} metalness={0.2} roughness={0.4} />
        </mesh>
        <mesh position={[0.02, 0.3, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshPhysicalMaterial color={LGOLD} metalness={0.15} roughness={0.35} />
        </mesh>
      </group>

      {/* Body */}
      <mesh position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.32, 0.28, 0.22, 8, 8]} />
        <meshPhysicalMaterial color={GOLD} metalness={0.25} roughness={0.35} />
      </mesh>

      {/* Chest */}
      <mesh position={[0, 0.05, 0.25]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshPhysicalMaterial
          color={LGOLD}
          metalness={0.2}
          roughness={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.32, 0.3]}>
        <mesh>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshPhysicalMaterial color={GOLD} metalness={0.25} roughness={0.35} />
        </mesh>

        {/* Snout */}
        <mesh position={[0, -0.05, 0.16]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshPhysicalMaterial color={LGOLD} metalness={0.2} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.04, 0.22]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.18, 0.08, 0.15]}>
          <circleGeometry args={[0.035, 10]} />
          <meshBasicMaterial color="#f0efe7" />
        </mesh>
        <mesh ref={pupilL} position={[0.18, 0.08, 0.16]}>
          <circleGeometry args={[0.016, 6]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.18, 0.08, 0.15]}>
          <circleGeometry args={[0.035, 10]} />
          <meshBasicMaterial color="#f0efe7" />
        </mesh>
        <mesh ref={pupilR} position={[-0.18, 0.08, 0.16]}>
          <circleGeometry args={[0.016, 6]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>

        {/* Ears */}
        <mesh
          ref={earL}
          position={[0.12, 0.2, 0.1]}
          rotation={[0.15, -0.2, -0.25]}
        >
          <coneGeometry args={[0.055, 0.12, 6]} />
          <meshPhysicalMaterial color={DGOLD} metalness={0.2} roughness={0.4} />
        </mesh>
        <mesh
          ref={earR}
          position={[-0.12, 0.2, 0.1]}
          rotation={[0.15, 0.2, 0.25]}
        >
          <coneGeometry args={[0.055, 0.12, 6]} />
          <meshPhysicalMaterial color={DGOLD} metalness={0.2} roughness={0.4} />
        </mesh>
      </group>

      {/* Legs */}
      {[
        [0.13, -0.2, 0.2],
        [-0.13, -0.2, 0.2],
        [0.13, -0.2, -0.2],
        [-0.13, -0.2, -0.2],
      ].map((p, i) => (
        <mesh key={i} position={[p[0], p[1], p[2]]}>
          <cylinderGeometry args={[0.035, 0.045, 0.14]} />
          <meshPhysicalMaterial color={GOLD} metalness={0.2} roughness={0.4} />
        </mesh>
      ))}

      {/* Shadow */}
      <mesh position={[0, -0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.3, 16]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.06} />
      </mesh>
    </group>
  )
}

export function PixelPet() {
  const [mounted, setMounted] = useState(false)
  const [scrollProg, setScrollProg] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const onScroll = useCallback(() => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setScrollProg(
      Math.max(0, Math.min(1, (window.innerHeight - r.top) / window.innerHeight))
    )
  }, [])

  useEffect(() => {
    setMounted(true)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [onScroll])

  if (!mounted) {
    return (
      <section
        ref={ref}
        className="relative h-screen w-full overflow-hidden bg-background"
      />
    )
  }

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-background select-none"
    >
      <Canvas
        camera={{ position: [0, 0.2, 2.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[3, 4, 4]} intensity={0.6} />
        <pointLight position={[-3, -2, -3]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.15} color={LGOLD} />
        <Pet scrollProg={scrollProg} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-20">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--primary)]/25 uppercase">
          he sees you &middot; scroll to wag
        </p>
      </div>
    </section>
  )
}
