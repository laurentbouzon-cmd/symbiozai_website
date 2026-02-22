"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial } from "@react-three/drei"
import { Suspense } from "react"

// Formes 3D pour chaque type d'icône
function ZapShape() {
  return (
    <mesh>
      <coneGeometry args={[0.4, 1, 4]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        chromaticAberration={0.2}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.2}
        temporalDistortion={0.1}
        color="#00e5ff"
      />
    </mesh>
  )
}

function MessageShape() {
  return (
    <mesh>
      <boxGeometry args={[0.9, 0.7, 0.3]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        chromaticAberration={0.2}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.2}
        temporalDistortion={0.1}
        color="#00e5ff"
      />
    </mesh>
  )
}

function ChartShape() {
  return (
    <group>
      <mesh position={[-0.3, -0.2, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.7, 0.2]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[0.3, 0.1, 0]}>
        <boxGeometry args={[0.2, 0.9, 0.2]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
    </group>
  )
}

function DatabaseShape() {
  return (
    <group>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
    </group>
  )
}

function TargetShape() {
  return (
    <group>
      <mesh>
        <torusGeometry args={[0.4, 0.08, 8, 32]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh>
        <torusGeometry args={[0.2, 0.06, 8, 32]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
    </group>
  )
}

function RefreshShape() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.35, 0.1, 8, 32, Math.PI * 1.5]} />
      <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
    </mesh>
  )
}

function UsersShape() {
  return (
    <group>
      <mesh position={[-0.25, 0.1, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[0.25, 0.1, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[-0.25, -0.25, 0]}>
        <capsuleGeometry args={[0.15, 0.2, 4, 8]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[0.25, -0.25, 0]}>
        <capsuleGeometry args={[0.15, 0.2, 4, 8]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
    </group>
  )
}

function FileShape() {
  return (
    <mesh>
      <boxGeometry args={[0.6, 0.8, 0.1]} />
      <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
    </mesh>
  )
}

function CalendarShape() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.7, 0.6, 0.15]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[-0.2, 0.35, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[0.2, 0.35, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
    </group>
  )
}

function BellShape() {
  return (
    <group>
      <mesh position={[0, 0.1, 0]}>
        <coneGeometry args={[0.35, 0.6, 16]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
    </group>
  )
}

function ChromeShape() {
  return (
    <mesh>
      <sphereGeometry args={[0.4, 16, 16]} />
      <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
    </mesh>
  )
}

function BotShape() {
  return (
    <group>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.6, 0.5, 0.4]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[-0.15, 0.2, 0.25]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.15, 0.2, 0.25]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
    </group>
  )
}

function SparklesShape() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.2]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[-0.25, -0.15, 0]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.12]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
      <mesh position={[0.25, -0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.15]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.2} color="#00e5ff" />
      </mesh>
    </group>
  )
}

const iconShapes: Record<string, React.FC> = {
  zap: ZapShape,
  message: MessageShape,
  chart: ChartShape,
  database: DatabaseShape,
  target: TargetShape,
  refresh: RefreshShape,
  users: UsersShape,
  file: FileShape,
  calendar: CalendarShape,
  bell: BellShape,
  chrome: ChromeShape,
  bot: BotShape,
  sparkles: SparklesShape,
}

interface Icon3DProps {
  type: keyof typeof iconShapes
  size?: number
}

export function Icon3D({ type, size = 48 }: Icon3DProps) {
  const ShapeComponent = iconShapes[type] || ZapShape

  return (
    <div style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#00e5ff" />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <ShapeComponent />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  )
}
