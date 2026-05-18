import { useEffect, useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function TorusKnot() {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const particles = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.8 + Math.random() * 1.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.x =
      Math.sin(t * 0.08) * 0.08 + pointer.y * 0.25
    groupRef.current.rotation.y = t * 0.12 + pointer.x * 0.25
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0008
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <torusKnotGeometry args={[1.1, 0.38, 160, 20]} />
        <meshPhysicalMaterial
          color="#C49B3C"
          metalness={0.15}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.85}
          envMapIntensity={1.2}
        />
      </mesh>
      <mesh scale={1.015}>
        <torusKnotGeometry args={[1.1, 0.38, 18, 8]} />
        <meshBasicMaterial
          color="#C49B3C"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#C49B3C"
          sizeAttenuation
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export function Scene3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-background" />
    )
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 6, 6]} intensity={0.6} />
        <pointLight position={[-6, -4, -6]} intensity={0.3} />
        <pointLight position={[0, -6, 4]} intensity={0.2} />
        <TorusKnot />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
        <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--primary)]/40 uppercase">
          Playground
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Beyond the code
        </h2>
        <p className="mt-3 max-w-md px-4 text-center font-serif text-sm italic leading-relaxed text-muted-foreground">
          Where design meets dimension — a space for visual experimentation.
        </p>
      </div>
    </section>
  )
}
