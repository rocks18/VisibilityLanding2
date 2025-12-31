import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import dashboardScreen from '../assets/dashboard_screen.png'

export default function ServiceGuru3D() {
    const group = useRef()
    const [hovered, setHover] = useState(false)
    const texture = useTexture(dashboardScreen)

    useFrame((state) => {
        if (group.current) {
            // Gentle floating rotation
            group.current.rotation.y = THREE.MathUtils.lerp(
                group.current.rotation.y,
                (state.mouse.x * Math.PI) / 10,
                0.05
            )
            group.current.rotation.x = THREE.MathUtils.lerp(
                group.current.rotation.x,
                (state.mouse.y * Math.PI) / 10,
                0.05
            )
        }
    })

    return (
        <group ref={group} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Main Dashboard Panel */}
                <RoundedBox args={[4, 2.5, 0.1]} radius={0.1} smoothness={4}>
                    <meshPhysicalMaterial
                        color="#f5f5f7" // Apple Silver/White
                        roughness={0.2}
                        metalness={0.1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </RoundedBox>

                {/* Screen Content with Image Texture */}
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[3.8, 2.3]} />
                    <meshBasicMaterial map={texture} toneMapped={false} />
                </mesh>

                {/* Floating Widget 1: Analytics */}
                <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
                    <group position={[2.5, 1, 0.5]}>
                        <RoundedBox args={[1.2, 0.8, 0.05]} radius={0.05} smoothness={4}>
                            <meshPhysicalMaterial color="#ffffff" transmission={0.5} thickness={0.5} roughness={0} />
                        </RoundedBox>
                        <mesh position={[0, 0, 0.03]}>
                            <planeGeometry args={[1, 0.6]} />
                            <meshBasicMaterial color="#007aff" />
                        </mesh>
                    </group>
                </Float>

                {/* Floating Widget 2: Map Pin */}
                <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
                    <group position={[-2.5, -0.5, 0.8]}>
                        <RoundedBox args={[0.8, 0.8, 0.05]} radius={0.05} smoothness={4}>
                            <meshPhysicalMaterial color="#ffffff" transmission={0.5} thickness={0.5} roughness={0} />
                        </RoundedBox>
                        <mesh position={[0, 0, 0.03]}>
                            <circleGeometry args={[0.2, 32]} />
                            <meshBasicMaterial color="#34c759" />
                        </mesh>
                    </group>
                </Float>
            </Float>
        </group>
    )
}
