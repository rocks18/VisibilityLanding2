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
            // Clamp mouse values to prevent extreme rotations
            const mouseX = THREE.MathUtils.clamp(state.mouse.x, -1, 1)
            const mouseY = THREE.MathUtils.clamp(state.mouse.y, -1, 1)

            group.current.rotation.y = THREE.MathUtils.lerp(
                group.current.rotation.y,
                (mouseX * Math.PI) / 20,
                0.05
            )
            group.current.rotation.x = THREE.MathUtils.lerp(
                group.current.rotation.x,
                (mouseY * Math.PI) / 20,
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
            </Float>
        </group>
    )
}
