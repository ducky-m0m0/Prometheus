"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

/* ---------------- MODULE DATA ---------------- */

const MODULES = [
  {
    name: "Behavioral Mapping",
    role: "Behavioral baseline and drift detection",
    description:
      "Maps real user behavior over time and detects subtle routine drift before security signals appear.",
    detects: [
      "Sequence deviations in trusted workflows",
      "Changes in timing, hesitation, and action rhythm",
      "Privilege use that drifts from historical behavior",
    ],
    matters:
      "This layer identifies the earliest signs that normal human-system interaction is beginning to shift in ways traditional controls ignore.",
    signals: ["Access timing", "Sequence anomalies", "Hesitation patterns"],
    distance: 15,
    size: 0.7,
    speed: 0.5,
    color: "#00e5ff",
  },
  {
    name: "Intent Recognition",
    role: "Intent-to-action alignment modeling",
    description:
      "Infers user intent and detects when system actions diverge from it. Authorization does not equal alignment.",
    detects: [
      "Actions that no longer match expected task flow",
      "Permission use without goal continuity",
      "Behavior that appears valid but intent-misaligned",
    ],
    matters:
      "This is where Prometheus distinguishes permission from true alignment and identifies when unknown consent begins emerging inside trusted systems.",
    signals: ["Historical purpose", "Action continuity", "Permission context"],
    distance: 18,
    size: 0.9,
    speed: 0.4,
    color: "#ffae00",
  },
  {
    name: "Predictive Layer",
    role: "Pre-incident condition forecasting",
    description:
      "Identifies conditions where human decisions degrade under pressure and forecasts pre-incident risk windows.",
    detects: [
      "Accumulating drift under time pressure",
      "Context patterns associated with degraded judgment",
      "Emerging breach-likelihood windows before compromise",
    ],
    matters:
      "This layer turns behavioral and intent signals into forward-looking risk, showing when a legitimate user is becoming a likely breach path.",
    signals: ["Workload pressure", "Urgency patterns", "Decision degradation"],
    distance: 21,
    size: 1.1,
    speed: 0.3,
    color: "#7cff00",
  },
  {
    name: "Cognitive Engine",
    role: "Consent alignment inference engine",
    description:
      "Fuses behavioral, contextual, and system signals to model consent alignment and detect consent drift.",
    detects: [
      "Consent degradation across time and context",
      "Misalignment between inferred intent and exercised permissions",
      "The moment trusted interaction begins becoming breach-enabling",
    ],
    matters:
      "This is the reasoning core of Prometheus. It synthesizes behavioral, contextual, and system signals into a dynamic model of consent alignment.",
    signals: ["Intent proxies", "Context pressure", "System affordances"],
    distance: 25,
    size: 1.3,
    speed: 0.2,
    color: "#ff4d6d",
  },
]

type SelectedPlanetState = {
  group: THREE.Group
  name: string
  role: string
  description: string
  detects: string[]
  matters: string
  signals: string[]
  color: string
} | null

/* ---------------- PRELOADER ---------------- */

function Preloader({
  visible,
  progress,
}: {
  visible: boolean
  progress: number
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at center, rgba(8,12,26,0.98) 0%, rgba(2,3,10,1) 55%, rgba(0,0,0,1) 100%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.9s ease",
      }}
    >
      <div
        style={{
          width: "min(560px, 82vw)",
          textAlign: "center",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.8rem)",
            fontWeight: 700,
            letterSpacing: "10px",
            textTransform: "uppercase",
            textShadow: "0 0 28px rgba(255,0,0,0.18)",
            marginBottom: "22px",
          }}
        >
          Prometheus
        </div>

        <div
          style={{
            fontSize: "0.9rem",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.68)",
            marginBottom: "24px",
          }}
        >
          Initializing Pre-Breach Intelligence
        </div>

        <div
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, rgba(255,40,40,0.9) 0%, rgba(137,255,115,0.95) 100%)",
              boxShadow:
                "0 0 18px rgba(255,60,60,0.35), 0 0 28px rgba(137,255,115,0.18)",
              transition: "width 0.18s linear",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "14px",
            fontSize: "0.86rem",
            color: "rgba(255,255,255,0.62)",
            letterSpacing: "2px",
          }}
        >
          {progress}%
        </div>
      </div>
    </div>
  )
}

/* ---------------- LIVE SIMULATION ---------------- */

function SimulationTerminal({ isMobile }: { isMobile: boolean }) {
  const [logs, setLogs] = useState<string[]>([])
  const [runKey, setRunKey] = useState(0)
  const timersRef = useRef<number[]>([])

  const events = useMemo(
    () => [
      "08:42 — User login matched baseline profile",
      "09:10 — Behavioral drift detected in workflow timing",
      "09:14 — Intent mismatch increasing across privilege path",
      "09:18 — Consent alignment score dropping below safe range",
      "09:22 — HIGH RISK: pre-breach condition detected",
    ],
    []
  )

  useEffect(() => {
    // clear any old timers before starting a new run
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
    setLogs([])

    events.forEach((event, index) => {
      const timer = window.setTimeout(() => {
        setLogs((prev) => [...prev, event])
      }, 900 * (index + 1))

      timersRef.current.push(timer)
    })

    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer))
      timersRef.current = []
    }
  }, [events, runKey])

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(8,10,18,0.82) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 14px 40px rgba(0,0,0,0.22)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "12px 14px" : "14px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "999px",
              background: "#ff4d4d",
            }}
          />
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "999px",
              background: "#ffbf47",
            }}
          />
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "999px",
              background: "#4dff88",
            }}
          />
        </div>

        <div
          style={{
            fontSize: isMobile ? "0.72rem" : "0.78rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.52)",
          }}
        >
          Live Simulation
        </div>

        <button
          onClick={() => setRunKey((k) => k + 1)}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "white",
            borderRadius: "10px",
            padding: isMobile ? "8px 10px" : "8px 12px",
            fontSize: isMobile ? "0.72rem" : "0.78rem",
            cursor: "pointer",
          }}
        >
          Replay
        </button>
      </div>

      <div
        style={{
          padding: isMobile ? "16px 14px" : "20px 20px",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: isMobile ? "0.8rem" : "0.92rem",
          lineHeight: 1.8,
          minHeight: isMobile ? "220px" : "260px",
          color: "#d7f5dd",
        }}
      >
        {logs.length === 0 && (
          <div style={{ color: "rgba(255,255,255,0.38)" }}>
            Booting simulation...
          </div>
        )}

        {logs.map((log, i) => (
          <div
            key={`${i}-${log}`}
            style={{
              marginBottom: "8px",
              color: log.includes("HIGH RISK")
                ? "#ff8080"
                : log.includes("dropping")
                ? "#ffd580"
                : "#d6f7de",
            }}
          >
            {">"} {log}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- CORE ---------------- */

function Core({ bootPhase }: { bootPhase: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (ref.current) {
      ref.current.rotation.x += 0.0012
      ref.current.rotation.y += 0.0035

      const targetScale = bootPhase >= 2 ? 1 : bootPhase === 1 ? 0.72 : 0.4
      ref.current.scale.x += (targetScale - ref.current.scale.x) * 0.06
      ref.current.scale.y += (targetScale - ref.current.scale.y) * 0.06
      ref.current.scale.z += (targetScale - ref.current.scale.z) * 0.06
    }

    if (haloRef.current) {
      const pulse = 1 + Math.sin(t * 1.8) * 0.05
      const targetScale =
        bootPhase >= 2 ? 1 * pulse : bootPhase === 1 ? 0.55 * pulse : 0.2

      haloRef.current.scale.setScalar(
        THREE.MathUtils.lerp(haloRef.current.scale.x, targetScale, 0.08)
      )
    }
  })

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#ff1a1a"
          emissive="#8a0000"
          emissiveIntensity={1.2}
          wireframe
        />
      </mesh>

      <mesh ref={haloRef}>
        <sphereGeometry args={[2.45, 64, 64]} />
        <meshBasicMaterial color="#ff2a2a" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

/* ---------------- STARFIELD ---------------- */

function StarField({
  count,
  spread,
  depth = 0,
  size = 0.22,
}: {
  count: number
  spread: number
  depth?: number
  size?: number
}) {
  const ref = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const { camera } = useThree()

  const lastCameraPos = useRef(new THREE.Vector3())
  const motionStrength = useRef(0)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      arr[i3] = (Math.random() - 0.5) * spread
      arr[i3 + 1] = (Math.random() - 0.5) * spread
      arr[i3 + 2] = (Math.random() - 0.5) * spread
    }
    return arr
  }, [count, spread])

  useEffect(() => {
    lastCameraPos.current.copy(camera.position)
  }, [camera])

  useFrame(() => {
    if (!ref.current || !materialRef.current) return

    ref.current.position.x = camera.position.x * depth
    ref.current.position.y = camera.position.y * depth

    const distanceMoved = camera.position.distanceTo(lastCameraPos.current)
    const movementBoost = Math.min(distanceMoved * 18, 1)
    motionStrength.current += (movementBoost - motionStrength.current) * 0.08

    const targetOpacity =
      0.16 + size * 0.35 + motionStrength.current * (0.55 + size * 0.35)
    const targetSize = size + motionStrength.current * 0.08

    materialRef.current.opacity +=
      (targetOpacity - materialRef.current.opacity) * 0.08

    materialRef.current.size +=
      (targetSize - materialRef.current.size) * 0.08

    lastCameraPos.current.copy(camera.position)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        ref={materialRef}
        size={size}
        sizeAttenuation
        depthWrite={false}
        color="white"
        transparent
        opacity={0.28}
      />
    </points>
  )
}

/* ---------------- ORBIT RING ---------------- */

function OrbitRing({ radius, speed = 0.03 }: { radius: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.getElapsedTime() * speed
  })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.045, radius + 0.045, 128]} />
      <meshBasicMaterial
        color="white"
        transparent
        opacity={0.18}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* ---------------- NEBULA ---------------- */

function Nebula() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.00035
      ref.current.rotation.z += 0.00008
    }
  })

  return (
    <mesh ref={ref} scale={500}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        color="#140022"
        side={THREE.BackSide}
        transparent
        opacity={0.72}
      />
    </mesh>
  )
}

/* ---------------- DEEP SPACE BACKGROUND ---------------- */

function DeepSpaceBackground() {
  const { camera } = useThree()

  const bandMainRef = useRef<THREE.Points>(null)
  const bandDustRef = useRef<THREE.Points>(null)
  const galaxyARef = useRef<THREE.Points>(null)
  const galaxyBRef = useRef<THREE.Points>(null)
  const streaksRef = useRef<THREE.Points>(null)

  const bandMainMat = useRef<THREE.PointsMaterial>(null)
  const bandDustMat = useRef<THREE.PointsMaterial>(null)
  const galaxyAMat = useRef<THREE.PointsMaterial>(null)
  const galaxyBMat = useRef<THREE.PointsMaterial>(null)
  const streaksMat = useRef<THREE.PointsMaterial>(null)

  const bandMain = useMemo(() => {
    const count = 42000
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = (Math.random() - 0.5) * 2200
      const curve = Math.sin(x * 0.0028) * 90
      const thickness = (Math.random() - 0.5) * 130
      const z = -520 + (Math.random() - 0.5) * 70

      arr[i3] = x
      arr[i3 + 1] = curve + thickness
      arr[i3 + 2] = z
    }

    return arr
  }, [])

  const bandDust = useMemo(() => {
    const count = 28000
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = (Math.random() - 0.5) * 2400
      const curve = Math.sin(x * 0.0026) * 110
      const thickness = (Math.random() - 0.5) * 220
      const z = -620 + (Math.random() - 0.5) * 110

      arr[i3] = x
      arr[i3 + 1] = curve + thickness
      arr[i3 + 2] = z
    }

    return arr
  }, [])

  const galaxyA = useMemo(() => {
    const count = 16000
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const arm = Math.floor(Math.random() * 3)
      const radius = Math.pow(Math.random(), 0.58) * 170
      const angle =
        Math.random() * Math.PI * 2 + radius * 0.05 + arm * 2.094

      arr[i3] = Math.cos(angle) * radius + 520
      arr[i3 + 1] = Math.sin(angle) * radius * 0.42 + 180
      arr[i3 + 2] = -700 + (Math.random() - 0.5) * 50
    }

    return arr
  }, [])

  const galaxyB = useMemo(() => {
    const count = 12000
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const arm = Math.floor(Math.random() * 2)
      const radius = Math.pow(Math.random(), 0.62) * 130
      const angle = Math.random() * Math.PI * 2 - radius * 0.06 + arm * Math.PI

      arr[i3] = Math.cos(angle) * radius - 560
      arr[i3 + 1] = Math.sin(angle) * radius * 0.38 - 190
      arr[i3 + 2] = -760 + (Math.random() - 0.5) * 50
    }

    return arr
  }, [])

  const streaks = useMemo(() => {
    const count = 18000
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = (Math.random() - 0.5) * 2600
      const y = (Math.random() - 0.5) * 1200
      const z = -850 + (Math.random() - 0.5) * 80

      arr[i3] = x
      arr[i3 + 1] = y
      arr[i3 + 2] = z
    }

    return arr
  }, [])

  useFrame((state) => {
    const zoom = camera.position.length()

    let fade = 0
    if (zoom > 150) {
      fade = Math.pow(Math.min((zoom - 150) / 40, 1), 1.2)
    }

    const lerpSpeed = 0.08

    if (bandMainMat.current) {
      const targetOpacity = fade * 0.7
      const targetSize = 1.2 + fade * 0.7

      bandMainMat.current.opacity +=
        (targetOpacity - bandMainMat.current.opacity) * lerpSpeed
      bandMainMat.current.size +=
        (targetSize - bandMainMat.current.size) * lerpSpeed
    }

    if (bandDustMat.current) {
      const targetOpacity = fade * 0.4
      const targetSize = 1.8 + fade * 0.7

      bandDustMat.current.opacity +=
        (targetOpacity - bandDustMat.current.opacity) * lerpSpeed
      bandDustMat.current.size +=
        (targetSize - bandDustMat.current.size) * lerpSpeed
    }

    if (galaxyAMat.current) {
      const targetOpacity = fade * 0.9
      const targetSize = 1.5 + fade * 0.8

      galaxyAMat.current.opacity +=
        (targetOpacity - galaxyAMat.current.opacity) * lerpSpeed
      galaxyAMat.current.size +=
        (targetSize - galaxyAMat.current.size) * lerpSpeed
    }

    if (galaxyBMat.current) {
      const targetOpacity = fade * 0.75
      const targetSize = 1.35 + fade * 0.7

      galaxyBMat.current.opacity +=
        (targetOpacity - galaxyBMat.current.opacity) * lerpSpeed
      galaxyBMat.current.size +=
        (targetSize - galaxyBMat.current.size) * lerpSpeed
    }

    if (streaksMat.current) {
      const targetOpacity = fade * 0.28
      const targetSize = 0.75 + fade * 0.28

      streaksMat.current.opacity +=
        (targetOpacity - streaksMat.current.opacity) * lerpSpeed
      streaksMat.current.size +=
        (targetSize - streaksMat.current.size) * lerpSpeed
    }

    if (bandMainRef.current) {
      bandMainRef.current.rotation.z = -0.32
      bandMainRef.current.rotation.y = state.clock.getElapsedTime() * 0.0009
    }

    if (bandDustRef.current) {
      bandDustRef.current.rotation.z = -0.28
      bandDustRef.current.rotation.y = -state.clock.getElapsedTime() * 0.0006
    }

    if (galaxyARef.current) {
      galaxyARef.current.rotation.z = 0.25
      galaxyARef.current.rotation.y = state.clock.getElapsedTime() * 0.0012
    }

    if (galaxyBRef.current) {
      galaxyBRef.current.rotation.z = -0.22
      galaxyBRef.current.rotation.y = -state.clock.getElapsedTime() * 0.001
    }

    if (streaksRef.current) {
      streaksRef.current.rotation.z = 0.06
    }
  })

  return (
    <>
      <points ref={streaksRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[streaks, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={streaksMat}
          color="#d7e5ff"
          size={0.42}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <points ref={bandMainRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[bandMain, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={bandMainMat}
          color="#efe7ff"
          size={0.72}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <points ref={bandDustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[bandDust, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={bandDustMat}
          color="#bba9ff"
          size={1.15}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <points ref={galaxyARef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[galaxyA, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={galaxyAMat}
          color="#ffe6b0"
          size={0.9}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <points ref={galaxyBRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[galaxyB, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={galaxyBMat}
          color="#bed8ff"
          size={0.82}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </>
  )
}

/* ---------------- IDLE CAMERA MOTION ---------------- */

function IdleCameraMotion({ active }: { active: boolean }) {
  const { camera } = useThree()
  const baseRadius = useRef<number | null>(null)

  useFrame((state) => {
    if (!active) {
      baseRadius.current = null
      return
    }

    const t = state.clock.getElapsedTime()

    if (baseRadius.current === null) {
      baseRadius.current = camera.position.length()
    }

    const radius = baseRadius.current
    const angle = t * 0.08

    const targetX = Math.sin(angle) * Math.min(radius * 0.08, 12)
    const targetY = Math.cos(angle * 1.2) * Math.min(radius * 0.035, 6)
    const targetZ = Math.sqrt(
      Math.max(radius * radius - targetX * targetX - targetY * targetY, 25)
    )

    camera.position.x += (targetX - camera.position.x) * 0.01
    camera.position.y += (targetY - camera.position.y) * 0.01
    camera.position.z += (targetZ - camera.position.z) * 0.01
  })

  return null
}

/* ---------------- PLANET ---------------- */

type PlanetProps = {
  distance: number
  size: number
  speed: number
  color: string
  name: string
  onSelect: (planetGroup: THREE.Group, name: string) => void
  isSelected: boolean
}

function Planet({
  distance,
  size,
  speed,
  color,
  name,
  onSelect,
  isSelected,
}: PlanetProps) {
  const ref = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const group = useRef<THREE.Group>(null)

  const [hover, setHover] = useState(false)
  const angleRef = useRef(Math.random() * Math.PI * 2)
  const frozenPosition = useRef<THREE.Vector3 | null>(null)
  const bobOffset = useRef(Math.random() * Math.PI * 2)

  useFrame((state, delta) => {
    if (!group.current || !ref.current || !glowRef.current) return

    const t = state.clock.getElapsedTime()

    if (isSelected) {
      if (!frozenPosition.current) {
        frozenPosition.current = group.current.position.clone()
      }
      group.current.position.copy(frozenPosition.current)
    } else {
      frozenPosition.current = null
      angleRef.current += delta * speed
      group.current.position.x = Math.cos(angleRef.current) * distance
      group.current.position.z = Math.sin(angleRef.current) * distance
      group.current.position.y = Math.sin(t * 1.2 + bobOffset.current) * 0.18
    }

    ref.current.rotation.y += 0.01
    glowRef.current.rotation.y -= 0.004

    const targetScale = hover || isSelected ? 1.22 : 1
    ref.current.scale.x += (targetScale - ref.current.scale.x) * 0.1
    ref.current.scale.y += (targetScale - ref.current.scale.y) * 0.1
    ref.current.scale.z += (targetScale - ref.current.scale.z) * 0.1

    const glowScale = hover || isSelected ? 1.95 : 1.6
    glowRef.current.scale.x += (glowScale - glowRef.current.scale.x) * 0.08
    glowRef.current.scale.y += (glowScale - glowRef.current.scale.y) * 0.08
    glowRef.current.scale.z += (glowScale - glowRef.current.scale.z) * 0.08
  })

  return (
    <group ref={group}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation()
          if (group.current) onSelect(group.current, name)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          setHover(false)
          document.body.style.cursor = "default"
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 1.5 : hover ? 1.1 : 0.45}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      <mesh ref={glowRef} scale={1.6}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.14} />
      </mesh>
    </group>
  )
}

/* ---------------- PLANET SYSTEM ---------------- */

function PlanetSystem({
  openModule,
  selectedPlanet,
  bootPhase,
}: {
  openModule: (
    planetGroup: THREE.Group,
    module: {
      name: string
      role: string
      description: string
      detects: string[]
      matters: string
      signals: string[]
      color: string
    }
  ) => void
  selectedPlanet: SelectedPlanetState
  bootPhase: number
}) {
  if (bootPhase < 3) return null

  return (
    <>
      <OrbitRing radius={15} speed={0.03} />
      <OrbitRing radius={18} speed={-0.02} />
      <OrbitRing radius={21} speed={0.018} />
      <OrbitRing radius={25} speed={-0.014} />

      {MODULES.map((module) => (
        <Planet
          key={module.name}
          name={module.name}
          distance={module.distance}
          size={module.size}
          speed={module.speed}
          color={module.color}
          isSelected={selectedPlanet?.name === module.name}
          onSelect={(planetGroup) =>
            openModule(planetGroup, {
              name: module.name,
              role: module.role,
              description: module.description,
              detects: module.detects,
              matters: module.matters,
              signals: module.signals,
              color: module.color,
            })
          }
        />
      ))}
    </>
  )
}

/* ---------------- CAMERA FOLLOW ---------------- */

function CameraFollow({ selectedPlanet }: { selectedPlanet: SelectedPlanetState }) {
  const { camera } = useThree()

  useFrame(() => {
    if (!selectedPlanet?.group) return

    const p = selectedPlanet.group.position
    const desired = new THREE.Vector3(p.x + 3.2, p.y + 2.1, p.z + 5.4)

    camera.position.lerp(desired, 0.055)
    camera.lookAt(p)
  })

  return null
}

/* ---------------- MAIN PAGE ---------------- */

export default function Home() {
  const [selectedPlanet, setSelectedPlanet] = useState<SelectedPlanetState>(null)
  const [userInteracting, setUserInteracting] = useState(false)
  const [hasUserTakenControl, setHasUserTakenControl] = useState(false)
  const [bootPhase, setBootPhase] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showPreloader, setShowPreloader] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    return () => {
      document.body.style.cursor = "default"
    }
  }, [])

  useEffect(() => {
    const updateMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    updateMobile()
    window.addEventListener("resize", updateMobile)

    return () => window.removeEventListener("resize", updateMobile)
  }, [])

  useEffect(() => {
    let progress = 0

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 6
      if (progress >= 100) {
        progress = 100
        setLoadingProgress(100)
        clearInterval(interval)

        setTimeout(() => {
          setShowPreloader(false)
          setBootPhase(1)
        }, 350)

        setTimeout(() => setBootPhase(2), 1000)
        setTimeout(() => setBootPhase(3), 1800)
      } else {
        setLoadingProgress(progress)
      }
    }, 110)

    return () => clearInterval(interval)
  }, [])

  const openModule = (
    planetGroup: THREE.Group,
    module: {
      name: string
      role: string
      description: string
      detects: string[]
      matters: string
      signals: string[]
      color: string
    }
  ) => {
    setSelectedPlanet({
      group: planetGroup,
      name: module.name,
      role: module.role,
      description: module.description,
      detects: module.detects,
      matters: module.matters,
      signals: module.signals,
      color: module.color,
    })
  }

  const returnToSystem = () => {
    setSelectedPlanet(null)
    document.body.style.cursor = "default"
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "white",
        background:
          "radial-gradient(circle at 50% 8%, rgba(20,30,80,0.22) 0%, rgba(5,8,22,0.16) 22%, rgba(2,1,10,1) 58%, rgba(0,0,0,1) 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "22%",
            left: "-8%",
            width: "42vw",
            height: "42vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(90,110,255,0.12) 0%, rgba(90,110,255,0.04) 35%, rgba(0,0,0,0) 72%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "52%",
            right: "-12%",
            width: "46vw",
            height: "46vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(170,90,255,0.10) 0%, rgba(170,90,255,0.035) 34%, rgba(0,0,0,0) 72%)",
            filter: "blur(46px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            left: "18%",
            width: "34vw",
            height: "34vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(70,150,255,0.08) 0%, rgba(70,150,255,0.025) 38%, rgba(0,0,0,0) 74%)",
            filter: "blur(44px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.22,
            backgroundImage: `
              radial-gradient(circle at 12% 18%, rgba(255,255,255,0.8) 0 1px, transparent 1.5px),
              radial-gradient(circle at 24% 62%, rgba(255,255,255,0.75) 0 1px, transparent 1.5px),
              radial-gradient(circle at 38% 28%, rgba(255,255,255,0.8) 0 1px, transparent 1.5px),
              radial-gradient(circle at 52% 74%, rgba(255,255,255,0.7) 0 1px, transparent 1.5px),
              radial-gradient(circle at 68% 36%, rgba(255,255,255,0.85) 0 1px, transparent 1.5px),
              radial-gradient(circle at 78% 58%, rgba(255,255,255,0.8) 0 1px, transparent 1.5px),
              radial-gradient(circle at 88% 18%, rgba(255,255,255,0.8) 0 1px, transparent 1.5px),
              radial-gradient(circle at 16% 86%, rgba(255,255,255,0.75) 0 1px, transparent 1.5px),
              radial-gradient(circle at 58% 10%, rgba(255,255,255,0.7) 0 1px, transparent 1.5px),
              radial-gradient(circle at 92% 82%, rgba(255,255,255,0.8) 0 1px, transparent 1.5px)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "520px 520px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "18%",
            left: "-10%",
            width: "130%",
            height: "38%",
            transform: "rotate(-12deg)",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(210,220,255,0.03) 20%, rgba(230,210,255,0.06) 48%, rgba(210,220,255,0.03) 76%, rgba(255,255,255,0) 100%)",
            filter: "blur(30px)",
            opacity: 0.7,
          }}
        />
      </div>

      <div
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
          background:
            "radial-gradient(circle at center, #050816 0%, #02010a 45%, #000000 100%)",
        }}
      >
        <Preloader visible={showPreloader} progress={loadingProgress} />

        <div
          style={{
            position: "absolute",
            top: isMobile ? "18px" : "30px",
            left: isMobile ? "18px" : "34px",
            color: "white",
            zIndex: 20,
            letterSpacing: isMobile ? "1.8px" : "3px",
            fontSize: isMobile ? "0.68rem" : "0.95rem",
            maxWidth: isMobile ? "70vw" : "none",
            lineHeight: 1.4,
            opacity: bootPhase < 2 ? 0 : selectedPlanet ? 0.35 : 0.8,
            transform: bootPhase < 2 ? "translateY(-10px)" : "translateY(0)",
            transition: "all 0.7s ease",
          }}
        >
          PROMETHEUS // PRE-BREACH INTELLIGENCE
        </div>

        <div
          style={{
            position: "absolute",
            top: selectedPlanet
              ? isMobile
                ? "9%"
                : "10%"
              : bootPhase < 2
              ? isMobile
                ? "39%"
                : "42%"
              : isMobile
              ? "34%"
              : "38%",
            left: "50%",
            transform: selectedPlanet
              ? "translateX(-50%) scale(0.96)"
              : bootPhase === 0
              ? "translateX(-50%) scale(0.94)"
              : "translateX(-50%) scale(1)",
            width: isMobile ? "92vw" : "min(1200px, 92vw)",
            textAlign: "center",
            color: "white",
            zIndex: 10,
            pointerEvents: "none",
            transition: "all 0.7s ease",
            opacity: bootPhase === 0 ? 0 : selectedPlanet ? 0.18 : 1,
          }}
        >
          <div
            style={{
              fontSize: isMobile
                ? "clamp(2.3rem, 12vw, 3.8rem)"
                : "clamp(3.5rem, 8vw, 7rem)",
              fontWeight: 700,
              letterSpacing: isMobile ? "3px" : "8px",
              textTransform: "uppercase",
              textShadow: "0 0 28px rgba(255,0,0,0.18)",
              opacity: bootPhase >= 1 ? 1 : 0,
              transform: bootPhase >= 1 ? "translateY(0)" : "translateY(18px)",
              transition: "all 0.9s ease",
              lineHeight: 1,
            }}
          >
            Prometheus
          </div>

          <div
            style={{
              fontSize: isMobile ? "0.8rem" : "clamp(1rem, 2vw, 1.4rem)",
              marginTop: isMobile ? "14px" : "18px",
              color: "#89ff73",
              letterSpacing: isMobile ? "1.2px" : "2.5px",
              textTransform: "uppercase",
              padding: isMobile ? "0 6px" : "0",
              lineHeight: isMobile ? 1.6 : 1.4,
              opacity: bootPhase >= 2 ? 1 : 0,
              transform: bootPhase >= 2 ? "translateY(0)" : "translateY(14px)",
              transition: "all 0.9s ease",
            }}
          >
            Detecting when trusted users begin becoming the breach path
          </div>
        </div>

        {!selectedPlanet && bootPhase >= 3 && (
          <div
            style={{
              position: "absolute",
              bottom: isMobile ? "18px" : "34px",
              left: isMobile ? "18px" : "34px",
              right: isMobile ? "18px" : "auto",
              zIndex: 20,
              color: "rgba(255,255,255,0.72)",
              maxWidth: isMobile ? "unset" : "420px",
              fontSize: isMobile ? "0.82rem" : "0.95rem",
              lineHeight: 1.55,
              transition: "opacity 0.4s ease",
            }}
          >
            Prometheus models consent drift inside trusted systems by tracking
            behavioral deviation, intent misalignment, and pre-incident pressure
            signals.
          </div>
        )}

        {selectedPlanet && (
          <button
            onClick={returnToSystem}
            style={{
              position: "absolute",
              top: isMobile ? "16px" : "30px",
              right: isMobile ? "16px" : "30px",
              zIndex: 30,
              background: "rgba(0,0,0,0.72)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: isMobile ? "9px" : "10px",
              padding: isMobile ? "10px 14px" : "12px 18px",
              fontSize: isMobile ? "0.85rem" : "1rem",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              letterSpacing: "0.5px",
              transition: "all 0.25s ease",
            }}
          >
            Return to System
          </button>
        )}

        {selectedPlanet && (
          <div
            style={{
              position: "absolute",
              bottom: isMobile ? "16px" : "34px",
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? "92vw" : "min(980px, 92vw)",
              background: "rgba(0,0,0,0.62)",
              padding: isMobile ? "18px 16px" : "24px 26px",
              borderRadius: isMobile ? "14px" : "16px",
              maxHeight: isMobile ? "48vh" : "none",
              overflowY: isMobile ? "auto" : "visible",
              color: "white",
              zIndex: 25,
              border: "1px solid rgba(255,255,255,0.16)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 0 40px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "999px",
                  background: selectedPlanet.color,
                  boxShadow: `0 0 16px ${selectedPlanet.color}`,
                  flexShrink: 0,
                }}
              />

              <div
                style={{
                  fontSize: isMobile ? "1.02rem" : "1.25rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                {selectedPlanet.name}
              </div>
            </div>

            <div
              style={{
                fontSize: isMobile ? "0.78rem" : "0.92rem",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.56)",
                marginBottom: isMobile ? "12px" : "16px",
                lineHeight: 1.5,
              }}
            >
              {selectedPlanet.role}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr 1fr",
                gap: isMobile ? "16px" : "22px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "1.2px",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "10px",
                  }}
                >
                  Overview
                </div>

                <div
                  style={{
                    fontSize: "0.98rem",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.84)",
                    marginBottom: "14px",
                  }}
                >
                  {selectedPlanet.description}
                </div>

                <div
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  {selectedPlanet.matters}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "1.2px",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "10px",
                  }}
                >
                  Detects
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {selectedPlanet.detects.map((item) => (
                    <div
                      key={item}
                      style={{
                        fontSize: "0.94rem",
                        lineHeight: 1.5,
                        color: "rgba(255,255,255,0.82)",
                        paddingLeft: "14px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "0.45em",
                          width: "6px",
                          height: "6px",
                          borderRadius: "999px",
                          background: selectedPlanet.color,
                          boxShadow: `0 0 10px ${selectedPlanet.color}`,
                        }}
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "1.2px",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "10px",
                  }}
                >
                  Signal Classes
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {selectedPlanet.signals.map((item) => (
                    <div
                      key={item}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.14)",
                        background: "rgba(255,255,255,0.04)",
                        fontSize: "0.88rem",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false }}
          camera={{
            position: isMobile ? [0, 0, 24] : [0, 0, 32],
            fov: 60,
          }}
          onPointerMissed={() => {
            if (selectedPlanet) returnToSystem()
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-12, -8, -10]} intensity={0.5} color="#4d79ff" />
          <pointLight position={[0, 0, 0]} intensity={1.6} color="#ff2a2a" />

          <IdleCameraMotion
            active={!selectedPlanet && !userInteracting && !hasUserTakenControl}
          />
          <CameraFollow selectedPlanet={selectedPlanet} />

          <Nebula />
          {!isMobile && <DeepSpaceBackground />}

          <StarField
            count={isMobile ? 4000 : 12000}
            spread={150}
            depth={0.01}
            size={0.2}
          />
          <StarField
            count={isMobile ? 2500 : 8000}
            spread={300}
            depth={0.005}
            size={0.24}
          />
          <StarField
            count={isMobile ? 1500 : 5000}
            spread={500}
            depth={0.001}
            size={0.28}
          />

          <PlanetSystem
            openModule={openModule}
            selectedPlanet={selectedPlanet}
            bootPhase={bootPhase}
          />

          <Core bootPhase={bootPhase} />

          <OrbitControls
            onStart={() => {
              setUserInteracting(true)
              setHasUserTakenControl(true)
            }}
            onEnd={() => setUserInteracting(false)}
            enableZoom={!selectedPlanet}
            enablePan={!isMobile}
            minDistance={isMobile ? 10 : 5}
            maxDistance={isMobile ? 120 : 400}
            enableDamping
            dampingFactor={0.05}
            autoRotate={
              !isMobile &&
              !selectedPlanet &&
              !userInteracting &&
              !hasUserTakenControl
            }
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? "26px 6vw 20px" : "42px 8vw 36px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(240px, 1fr))",
            gap: isMobile ? "12px" : "16px",
          }}
        >
          {[
            {
              kicker: "What It Is",
              title: "A pre-breach intelligence framework",
              text: "Prometheus models when trusted human-system interaction begins drifting toward breach-enabling behavior.",
            },
            {
              kicker: "What It Detects",
              title: "Consent drift before compromise",
              text: "It identifies behavioral deviation, intent misalignment, and decision degradation before technical compromise becomes visible.",
            },
            {
              kicker: "Why It Matters",
              title: "Authorization is not alignment",
              text: "Just because a user can do something does not mean that action still aligns with their actual intent under pressure.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "22px",
                backdropFilter: "blur(14px)",
                boxShadow: "0 14px 36px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "0.82rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.48)",
                  marginBottom: "10px",
                }}
              >
                {item.kicker}
              </div>

              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  fontSize: "0.96rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.74)",
                }}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? "72px 6vw 56px" : "72px 8vw 80px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "0.9rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.46)",
              marginBottom: "14px",
            }}
          >
            What Prometheus Is
          </div>

          <div
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: "980px",
              marginBottom: "22px",
            }}
          >
            Prometheus models when legitimate users begin becoming the breach
            path.
          </div>

          <div
            style={{
              maxWidth: "980px",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.76)",
            }}
          >
            Prometheus is a behavioral-intent intelligence framework that
            detects when the alignment between human intent and system action
            begins to degrade inside trusted environments. Instead of asking
            whether an action is merely allowed, it asks whether that action
            still makes sense under current conditions of stress, ambiguity,
            urgency, and cognitive drift.
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? "12px 6vw 54px" : "20px 8vw 90px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          {[
            {
              title: "Why Current Security Fails",
              text: "Most systems detect breaches after compromise. They assume users are rational, intent is stable, and behavior equals consent. Reality does not cooperate.",
            },
            {
              title: "Prometheus Insight",
              text: "Breaches begin when human intent and system actions drift out of alignment inside trusted workflows. That gap forms before traditional security tools react.",
            },
            {
              title: "Security Outcome",
              text: "Prometheus surfaces pre-breach conditions before technical compromise by measuring behavioral drift, intent mismatch, and consent degradation over time.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "26px",
                backdropFilter: "blur(14px)",
                boxShadow: "0 14px 40px rgba(0,0,0,0.22)",
              }}
            >
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  fontSize: "0.98rem",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.74)",
                }}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? "12px 6vw 54px" : "10px 8vw 90px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
            gap: isMobile ? "18px" : "28px",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.9rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.46)",
                marginBottom: "14px",
              }}
            >
              Live Simulation
            </div>

            <div
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "18px",
                maxWidth: "760px",
              }}
            >
              A demo that shows risk forming before the breach lands.
            </div>

            <div
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.76)",
                maxWidth: "760px",
                marginBottom: "20px",
              }}
            >
              This simulation illustrates the Prometheus thesis: the risky moment
              is not the compromise itself, but the sequence of behavioral and
              intent changes that make compromise likely. Even as a demo, it
              shows the operational story a CISO needs to understand.
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: "12px",
              }}
            >
              {[
                "Baseline matched",
                "Drift detected",
                "Risk escalated before compromise",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "0.9rem",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <SimulationTerminal isMobile={isMobile} />
        </div>
      </section>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? "12px 6vw 70px" : "20px 8vw 110px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "0.9rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.46)",
              marginBottom: "14px",
            }}
          >
            How Prometheus Works
          </div>

          <div
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "20px",
              maxWidth: "880px",
            }}
          >
            Behavior → Intent → Context → Consent Score → Risk Flag
          </div>

          <div
            style={{
              maxWidth: "920px",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.76)",
              marginBottom: "30px",
            }}
          >
            Prometheus does not rely on mind-reading or surveillance theater. It
            correlates behavior, inferred task continuity, contextual pressure,
            and system interaction to estimate whether a user’s actions still
            align with their original intent under current conditions.
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              {
                title: "Behavioral Layer",
                text: "Tracks user patterns like access timing, sequence flow, hesitation, reversals, and rhythm.",
              },
              {
                title: "Intent Modeling",
                text: "Infers whether the user’s current action path still matches expected task continuity and goal progression.",
              },
              {
                title: "Context Engine",
                text: "Weights pressure signals such as urgency, workload, ambiguity, and friction tolerance.",
              },
              {
                title: "Consent Score",
                text: "Combines all layers into a dynamic consent alignment score that drives a pre-breach risk flag.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "18px",
                  padding: "22px",
                  backdropFilter: "blur(14px)",
                }}
              >
                <div
                  style={{
                    fontSize: "1.02rem",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    fontSize: "0.96rem",
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.74)",
                  }}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? "12px 6vw 70px" : "20px 8vw 110px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "0.9rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.46)",
              marginBottom: "14px",
            }}
          >
            The Four Layers
          </div>

          <div
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "28px",
              maxWidth: "880px",
            }}
          >
            A layered model for consent alignment, human drift, and pre-incident
            risk.
          </div>

          <div
            style={{
              display: "grid",
              gap: "16px",
            }}
          >
            {MODULES.map((module) => (
              <div
                key={module.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "220px 1fr",
                  gap: isMobile ? "10px" : "22px",
                  alignItems: "start",
                  padding: "22px 0",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "999px",
                        background: module.color,
                        boxShadow: `0 0 14px ${module.color}`,
                        flexShrink: 0,
                      }}
                    />

                    <div
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                      }}
                    >
                      {module.name}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "0.88rem",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.6,
                    }}
                  >
                    {module.role}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "0.98rem",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.76)",
                  }}
                >
                  {module.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? "10px 6vw 90px" : "10px 8vw 130px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
            gap: isMobile ? "18px" : "32px",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.9rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.46)",
                marginBottom: "14px",
              }}
            >
              Why It Matters
            </div>

            <div
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "18px",
              }}
            >
              Every major breach eventually reveals the same uncomfortable fact.
            </div>

            <div
              style={{
                fontSize: "1.02rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.76)",
                maxWidth: "760px",
                marginBottom: "18px",
              }}
            >
              A legitimate user did something they should not have. Prometheus
              exists to answer the harder question: why did it make sense to
              them at the time? By modeling the gap between authorization and
              true consent alignment, it identifies human-system drift before
              technical compromise becomes visible.
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: "14px",
              }}
            >
              {[
                "Detect risk before compromise",
                "Reduce phishing and insider attack success",
                "Surface high-risk sessions earlier",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "0.9rem",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "22px",
              padding: "26px",
              backdropFilter: "blur(14px)",
              boxShadow: "0 14px 40px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "14px",
              }}
            >
              Prometheus Thesis
            </div>

            <div
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.82)",
                marginBottom: "18px",
              }}
            >
              Prometheus detects when trusted interaction begins becoming
              breach-enabling by modeling consent as a dynamic alignment between
              human intent, cognition, context, and system action.
            </div>

            <div
              style={{
                fontSize: "0.94rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Execution protects this idea better than premature patent theater.
              A working demo, a clear use-case, and a technical breakdown turn
              Prometheus from philosophy into asset.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}