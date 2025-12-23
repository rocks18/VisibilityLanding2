import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, ScrollControls, Scroll, Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
    const scroll = useScroll()
    const group = useRef()
    const particles = useRef()

    useFrame((state, delta) => {
        // Rotate the entire group based on scroll
        const r1 = scroll.range(0, 1 / 4)
        const r2 = scroll.range(1 / 4, 1 / 4)
        const r3 = scroll.range(2 / 4, 1 / 4)

        if (group.current) {
            group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -scroll.offset * Math.PI * 2, 4, delta)
            group.current.position.z = THREE.MathUtils.damp(group.current.position.z, scroll.offset * 5, 4, delta)
        }

        if (particles.current) {
            particles.current.rotation.y += delta * 0.05
            particles.current.rotation.x += delta * 0.02
        }
    })

    return (
        <>
            <group ref={group}>
                {/* Main Hero Object */}
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <mesh position={[2, 0, 0]} scale={1.5}>
                        <icosahedronGeometry args={[1, 1]} />
                        <meshStandardMaterial color="#00f3ff" wireframe />
                    </mesh>
                </Float>

                {/* Secondary Object for Services */}
                <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
                    <mesh position={[-2, -4, -2]} scale={1}>
                        <octahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial color="#bc13fe" wireframe />
                    </mesh>
                </Float>

                {/* Tertiary Object for Tech Stack */}
                <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
                    <mesh position={[2, -8, 0]} scale={1.2}>
                        <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
                        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.5} />
                    </mesh>
                </Float>
            </group>

            <group ref={particles}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </group>

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#bc13fe" />
        </>
    )
}

export default function Experience({ children }) {
    const [pages, setPages] = useState(6.2)

    useFrame(() => {
        const path = window.location.pathname
        if (path === '/service-guru') {
            if (pages !== 2.9) setPages(2.9)
        } else {
            if (pages !== 9.5) setPages(9.5)
        }
    })

    return (
        <ScrollControls pages={pages} damping={0.3}>
            <Scene />
            <Scroll html style={{ width: '100%' }}>
                {children}
            </Scroll>
        </ScrollControls>
    )
}

