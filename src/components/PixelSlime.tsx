import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const CUBE = 0.13
const GRID = 11
const HALF = Math.floor(GRID / 2)

function generateSlime() {
  const positions: number[] = []
  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      for (let z = 0; z < GRID; z++) {
        const nx = (x - HALF + 0.5) / HALF
        const ny = (y + 0.5) / GRID
        const nz = (z - HALF + 0.5) / HALF
        const hd = Math.sqrt(nx * nx + nz * nz)
        const r = 0.9 * Math.sin(ny * Math.PI * 0.78)
        if (hd <= r && ny < 0.82) {
          positions.push(
            (x - HALF + 0.5) * CUBE,
            (y + 0.5) * CUBE,
            (z - HALF + 0.5) * CUBE
          )
        }
      }
    }
  }
  return positions
}

const dummy = new THREE.Object3D()

function SlimeBody({ squish }: { squish: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const pos = useMemo(() => generateSlime(), [])
  const count = pos.length / 3

  const colors = useMemo(() => {
    const c = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const y = pos[i * 3 + 1]
      const t = Math.min(y / (GRID * CUBE), 1)
      const gold = new THREE.Color("#C49B3C").lerp(
        new THREE.Color("#e8c46a"),
        t
      )
      gold.toArray(c, i * 3)
    }
    return c
  }, [pos, count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const s = 1 + squish

    for (let i = 0; i < count; i++) {
      const px = pos[i * 3]
      const py = pos[i * 3 + 1]
      const pz = pos[i * 3 + 2]

      const wobble = Math.sin(t * 1.2 + px * 2 + pz * 2 + py * 3) * 0.03
      const squash = squish * Math.max(0, 1 - py / (GRID * CUBE * 0.8))

      dummy.position.set(px, py * s + wobble - squash * 0.5, pz)
      dummy.scale.setScalar(0.85 + Math.sin(t + px * 3 + pz * 3) * 0.08)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[CUBE * 0.9, CUBE * 0.9, CUBE * 0.9]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </boxGeometry>
      <meshPhysicalMaterial
        metalness={0.1}
        roughness={0.15}
        clearcoat={0.4}
        vertexColors
        transparent
        opacity={0.92}
      />
    </instancedMesh>
  )
}

function Eyes() {
  const leftPupil = useRef<THREE.Mesh>(null)
  const rightPupil = useRef<THREE.Mesh>(null)
  const { pointer } = useThree()

  useFrame(() => {
    if (leftPupil.current) {
      leftPupil.current.position.x = 0.12 + pointer.x * 0.06
      leftPupil.current.position.y = 0.32 + pointer.y * 0.06
    }
    if (rightPupil.current) {
      rightPupil.current.position.x = -0.12 + pointer.x * 0.06
      rightPupil.current.position.y = 0.32 + pointer.y * 0.06
    }
  })

  return (
    <group position={[0, 0.76, 0.28]}>
      {/* Left eye white */}
      <mesh position={[0.16, 0.1, 0]}>
        <circleGeometry args={[0.055, 12]} />
        <meshBasicMaterial color="#f0efe7" />
      </mesh>
      {/* Left pupil */}
      <mesh ref={leftPupil} position={[0.12, 0.1, 0.01]}>
        <circleGeometry args={[0.025, 8]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      {/* Right eye white */}
      <mesh position={[-0.16, 0.1, 0]}>
        <circleGeometry args={[0.055, 12]} />
        <meshBasicMaterial color="#f0efe7" />
      </mesh>
      {/* Right pupil */}
      <mesh ref={rightPupil} position={[-0.12, 0.1, 0.01]}>
        <circleGeometry args={[0.025, 8]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      {/* Mouth */}
      <mesh position={[0, -0.06, 0.01]}>
        <circleGeometry args={[0.04, 8]} />
        <meshBasicMaterial color="#1a1a1a" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function Slime({ scrollProg }: { scrollProg: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const squishRef = useRef(0)
  const { pointer } = useThree()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    groupRef.current.position.y = Math.sin(t * 0.6) * 0.06
    groupRef.current.rotation.x = pointer.y * 0.08
    groupRef.current.rotation.y = pointer.x * 0.12

    const targetSquish = scrollProg * 0.15
    squishRef.current += (targetSquish - squishRef.current) * 0.05

    groupRef.current.scale.y = 1 - squishRef.current
    groupRef.current.scale.x = 1 + squishRef.current * 0.5
    groupRef.current.scale.z = 1 + squishRef.current * 0.5
  })

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <SlimeBody squish={0} />
      <Eyes />
      {/* Shadow */}
      <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 16]} />
        <meshBasicMaterial
          color="#C49B3C"
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  )
}

export function PixelSlime() {
  const [mounted, setMounted] = useState(false)
  const [scrollProg, setScrollProg] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const onScroll = useCallback(() => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setScrollProg(
      Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight))
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
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-background"
      />
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background select-none"
    >
      <Canvas
        camera={{ position: [0, 0.4, 3.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 4, 4]} intensity={0.7} />
        <pointLight position={[-3, -2, -3]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.2} color="#e8c46a" />
        <Slime scrollProg={scrollProg} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-16">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--primary)]/25 uppercase">
          poke me &middot; scroll to squish
        </p>
      </div>
    </section>
  )
}
