"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useRef, useState } from "react"
import * as THREE from "three"

/* ---------------- CORE ---------------- */

function Core() {
  const ref = useRef<any>(null)

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.x += 0.002
    ref.current.rotation.y += 0.004
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#ff0000"
        emissive="#ff0000"
        emissiveIntensity={2}
        wireframe
      />
    </mesh>
  )
}

/* ---------------- STARFIELD ---------------- */

function StarField({ count, spread, depth = 0 }: any) {
  const ref = useRef<any>(null)
  const { camera } = useThree()

  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * spread
    positions[i3 + 1] = (Math.random() - 0.5) * spread
    positions[i3 + 2] = (Math.random() - 0.5) * spread
  }

  useFrame(() => {
    if (!ref.current) return
    ref.current.position.x = camera.position.x * depth
    ref.current.position.y = camera.position.y * depth
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.2}
        sizeAttenuation
        depthWrite={false}
        color="white"
      />
    </points>
  )
}

/* ---------------- ORBIT RING ---------------- */

function OrbitRing({ radius }: any) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 128]} />
      <meshBasicMaterial
        color="white"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* ---------------- NEBULA ---------------- */

function Nebula() {
  const ref = useRef<any>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005
    }
  })

  return (
    <mesh ref={ref} scale={500}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        color="#1a0033"
        side={THREE.BackSide}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

/* ---------------- PLANET ---------------- */

function Planet({
  distance,
  size,
  speed,
  color,
  name,
  onSelect,
  isSelected,
}: any) {
  const ref = useRef<any>(null)
  const group = useRef<any>(null)

  const [hover, setHover] = useState(false)
  const angleRef = useRef(Math.random() * Math.PI * 2)
  const frozenPosition = useRef<THREE.Vector3 | null>(null)

  useFrame((_, delta) => {
    if (!group.current || !ref.current) return

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
    }

    ref.current.rotation.y += 0.01

    const targetScale = hover || isSelected ? 1.25 : 1
    ref.current.scale.x += (targetScale - ref.current.scale.x) * 0.1
    ref.current.scale.y += (targetScale - ref.current.scale.y) * 0.1
    ref.current.scale.z += (targetScale - ref.current.scale.z) * 0.1
  })

  return (
    <group ref={group}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation()
          onSelect?.(group.current)
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
          emissiveIntensity={isSelected ? 1.4 : hover ? 1 : 0.4}
        />
      </mesh>

      <mesh scale={1.6}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

/* ---------------- PLANET SYSTEM ---------------- */

function PlanetSystem({ openModule, selectedPlanet }: any) {
  return (
    <>
      <OrbitRing radius={10} />
      <OrbitRing radius={14} />
      <OrbitRing radius={18} />
      <OrbitRing radius={22} />

      <Planet
        name="Behavioral Mapping"
        distance={10}
        size={0.7}
        speed={1}
        color="#00e5ff"
        isSelected={selectedPlanet?.name === "Behavioral Mapping"}
        onSelect={(planetGroup: any) =>
          openModule(planetGroup, "Behavioral Mapping")
        }
      />

      <Planet
        name="Intent Recognition"
        distance={14}
        size={0.9}
        speed={0.7}
        color="#ffae00"
        isSelected={selectedPlanet?.name === "Intent Recognition"}
        onSelect={(planetGroup: any) =>
          openModule(planetGroup, "Intent Recognition")
        }
      />

      <Planet
        name="Predictive Layer"
        distance={18}
        size={1.1}
        speed={0.5}
        color="#7cff00"
        isSelected={selectedPlanet?.name === "Predictive Layer"}
        onSelect={(planetGroup: any) =>
          openModule(planetGroup, "Predictive Layer")
        }
      />

      <Planet
        name="Cognitive Engine"
        distance={22}
        size={1.3}
        speed={0.3}
        color="#ff4d6d"
        isSelected={selectedPlanet?.name === "Cognitive Engine"}
        onSelect={(planetGroup: any) =>
          openModule(planetGroup, "Cognitive Engine")
        }
      />
    </>
  )
}

/* ---------------- CAMERA WATCHER ---------------- */

function CameraWatcher({ setZoom }: any) {
  const { camera } = useThree()

  useFrame(() => {
    setZoom(camera.position.z)
  })

  return null
}

/* ---------------- CAMERA FOLLOW ---------------- */

function CameraFollow({ selectedPlanet }: any) {
  const { camera } = useThree()

  useFrame(() => {
    if (!selectedPlanet?.group?.current) return

    const p = selectedPlanet.group.current.position
    const desired = new THREE.Vector3(p.x + 3, p.y + 2, p.z + 5)

    camera.position.lerp(desired, 0.06)
    camera.lookAt(p)
  })

  return null
}

/* ---------------- MAIN PAGE ---------------- */

export default function Home() {
  const [zoom, setZoom] = useState(8)
  const [selectedPlanet, setSelectedPlanet] = useState<any>(null)

  const openModule = (planetGroup: any, name: string) => {
    setSelectedPlanet({
      group: planetGroup,
      name,
    })
  }

  const returnToSystem = () => {
    setSelectedPlanet(null)
    document.body.style.cursor = "default"
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "#02010a",
        position: "relative",
      }}
    >
      {/* PROMETHEUS TITLE */}

      <div
        style={{
          position: "absolute",
          top: "40%",
          width: "100%",
          textAlign: "center",
          color: "white",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            letterSpacing: "6px",
          }}
        >
          Prometheus
        </div>

        <div
          style={{
            fontSize: "1.5rem",
            marginTop: "10px",
            color: "#1eff00",
            letterSpacing: "2px",
          }}
        >
          Behavioral-Intent Intelligence Framework
        </div>
      </div>

      {/* RETURN BUTTON */}

      {selectedPlanet && (
        <button
          onClick={returnToSystem}
          style={{
            position: "absolute",
            top: "30px",
            right: "30px",
            zIndex: 20,
            background: "rgba(0,0,0,0.75)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Return to System
        </button>
      )}

      {/* MODULE LABEL */}

      {selectedPlanet && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.7)",
            padding: "16px 24px",
            borderRadius: "10px",
            color: "white",
            zIndex: 20,
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {selectedPlanet.name}
        </div>
      )}

      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
        }}
        onPointerMissed={() => {
          if (selectedPlanet) returnToSystem()
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        <CameraWatcher setZoom={setZoom} />
        <CameraFollow selectedPlanet={selectedPlanet} />

        <Nebula />

        <StarField count={12000} spread={150} depth={0.02} />
        <StarField count={8000} spread={300} depth={0.01} />
        <StarField count={5000} spread={500} depth={0.005} />

        <PlanetSystem
          openModule={openModule}
          selectedPlanet={selectedPlanet}
        />

        <Core />

        <OrbitControls
          enableZoom={!selectedPlanet}
          enablePan={false}
          minDistance={1}
          maxDistance={300}
        />
      </Canvas>
    </div>
  )
}