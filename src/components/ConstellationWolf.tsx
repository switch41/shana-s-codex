import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface Star {
  pos: THREE.Vector3
  target: THREE.Vector3
  connections: number[]
}

const STARS: { x: number; y: number; conn: number[] }[] = [
  { x: 0.55, y: 0.54, conn: [1] },
  { x: 0.45, y: 0.40, conn: [0, 2, 11] },
  { x: 0.28, y: 0.36, conn: [1, 3, 7] },
  { x: 0.15, y: 0.34, conn: [2, 4] },
  { x: 0.05, y: 0.32, conn: [3, 5, 6] },
  { x: 0.00, y: 0.56, conn: [6] },
  { x: -0.06, y: 0.30, conn: [4, 5, 7] },
  { x: -0.16, y: 0.22, conn: [6, 8] },
  { x: -0.22, y: 0.04, conn: [7, 9] },
  { x: -0.18, y: -0.18, conn: [8, 10, 11] },
  { x: 0.08, y: -0.32, conn: [9] },
  { x: 0.06, y: -0.08, conn: [9, 10, 12, 14] },
  { x: 0.32, y: 0.18, conn: [13, 14] },
  { x: 0.44, y: 0.24, conn: [1, 12] },
  { x: 0.22, y: 0.22, conn: [11, 12, 15] },
  { x: 0.12, y: 0.14, conn: [14] },
]

const BG_PARTICLES = 600

function Wolf({ scrollProg }: { scrollProg: number }) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const bgRef = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const stars = useMemo(() => {
    return STARS.map((s) => ({
      pos: new THREE.Vector3(s.x, s.y, (Math.random() - 0.5) * 0.15),
      target: new THREE.Vector3(s.x, s.y, (Math.random() - 0.5) * 0.15),
      connections: s.conn,
    }))
  }, [])

  const starPositions = useMemo(() => {
    const arr = new Float32Array(STARS.length * 3)
    stars.forEach((s, i) => {
      arr[i * 3] = s.pos.x
      arr[i * 3 + 1] = s.pos.y
      arr[i * 3 + 2] = s.pos.z
    })
    return arr
  }, [stars])

  const lineVertices = useMemo(() => {
    const pairs: number[] = []
    const added = new Set<string>()
    STARS.forEach((s, i) => {
      s.conn.forEach((j) => {
        const key = Math.min(i, j) + "-" + Math.max(i, j)
        if (!added.has(key)) {
          added.add(key)
          pairs.push(s.x, s.y, 0, STARS[j].x, STARS[j].y, 0)
        }
      })
    })
    return new Float32Array(pairs)
  }, [])

  const bgPositions = useMemo(() => {
    const arr = new Float32Array(BG_PARTICLES * 3)
    for (let i = 0; i < BG_PARTICLES; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = 0.4 + Math.random() * 1.2
      arr[i * 3] = Math.cos(theta) * r
      arr[i * 3 + 1] = Math.sin(theta) * r * 0.8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5
    }
    return arr
  }, [])

  const [offsets, setOffsets] = useState(() =>
    stars.map(() => new THREE.Vector3())
  )

  const dissolveRef = useRef(0)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    const targetDissolve = scrollProg * 1.2
    dissolveRef.current += (targetDissolve - dissolveRef.current) * 0.03
    const d = dissolveRef.current

    const pos = starPositions
    stars.forEach((s, i) => {
      const angle = Math.atan2(s.target.y, s.target.x)
      const driftX = Math.sin(t * 0.5 + i) * 0.02
      const driftY = Math.cos(t * 0.7 + i * 1.3) * 0.02
      const mouseX = pointer.x * (0.05 + d * 0.15)
      const mouseY = pointer.y * (0.05 + d * 0.15)
      const scatter = d * 0.6

      pos[i * 3] =
        s.target.x +
        driftX +
        mouseX +
        Math.sin(t * 0.3 + i * 2) * scatter
      pos[i * 3 + 1] =
        s.target.y +
        driftY +
        mouseY +
        Math.cos(t * 0.4 + i * 1.7) * scatter
      pos[i * 3 + 2] =
        s.target.z +
        Math.sin(t * 0.2 + i * 0.5) * d * 0.3
    })

    if (pointsRef.current) {
      const geom = pointsRef.current.geometry as THREE.BufferGeometry
      geom.attributes.position.needsUpdate = true
      geom.computeBoundingSphere()
    }

    if (linesRef.current) {
      const lv = lineVertices
      const positions = linesRef.current.geometry.attributes.position
        .array as Float32Array
      for (let i = 0; i < positions.length / 3; i++) {
        const vi = i % STARS.length
        const starIdx = i < STARS.length ? i : i - STARS.length
        const scatter = d * 0.5
        const mouseX = pointer.x * (0.04 + d * 0.1)
        const mouseY = pointer.y * (0.04 + d * 0.1)
        positions[i * 3] =
          lv[i * 3] +
          Math.sin(t * 0.3 + starIdx * 1.2) * scatter +
          mouseX
        positions[i * 3 + 1] =
          lv[i * 3 + 1] +
          Math.cos(t * 0.4 + starIdx * 0.8) * scatter +
          mouseY
        positions[i * 3 + 2] = Math.sin(t * 0.2 + starIdx) * d * 0.2
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (bgRef.current) {
      const bgPos = bgRef.current.geometry.attributes.position
        .array as Float32Array
      for (let i = 0; i < BG_PARTICLES; i++) {
        const baseX = bgPositions[i * 3]
        const baseY = bgPositions[i * 3 + 1]
        const baseZ = bgPositions[i * 3 + 2]
        const dist = Math.sqrt(baseX * baseX + baseY * baseY)
        const scatterPull = d * 0.3
        bgPos[i * 3] =
          baseX +
          Math.sin(t * 0.2 + i) * 0.01 +
          (baseX / Math.max(dist, 0.1)) * scatterPull
        bgPos[i * 3 + 1] =
          baseY +
          Math.cos(t * 0.25 + i * 1.1) * 0.01 +
          (baseY / Math.max(dist, 0.1)) * scatterPull
        bgPos[i * 3 + 2] = baseZ + Math.sin(t * 0.15 + i * 0.7) * 0.02
      }
      bgRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Background stars */}
      <points ref={bgRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={BG_PARTICLES}
            array={bgPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.012}
          color="#C49B3C"
          sizeAttenuation
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Constellation lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lineVertices.length / 3}
            array={lineVertices}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#C49B3C"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Star nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={STARS.length}
            array={starPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#C49B3C"
          sizeAttenuation
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Inner glow dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={STARS.length}
            array={starPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#fff5e0"
          sizeAttenuation
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export function ConstellationWolf() {
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
        camera={{ position: [0, 0.05, 2.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Wolf scrollProg={scrollProg} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-20">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--primary)]/25 uppercase">
          the spirit wolf &middot; move to stir the stars
        </p>
      </div>
    </section>
  )
}
