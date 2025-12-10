import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import BlackHole from './BlackHole'
import DysonSwarm from './DysonSwarm'
import StarField from './StarField'

// Extend Three.js classes for R3F
extend({ EffectComposer, RenderPass, UnrealBloomPass, OutputPass })

function Bloom() {
    const { gl, camera, scene, size } = useThree()
    const composer = useRef()

    useEffect(() => {
        if (composer.current) {
            composer.current.setSize(size.width, size.height)
        }
    }, [size])

    useFrame(() => {
        if (composer.current) {
            composer.current.render()
        }
    }, 1)

    return (
        <>
            <effectComposer ref={composer} args={[gl]}>
                <renderPass attach="passes-0" args={[scene, camera]} />
                <unrealBloomPass attach="passes-1" args={[new THREE.Vector2(size.width, size.height), 1.5, 0.4, 0.85]} threshold={1} strength={1.5} radius={0.4} />
                <outputPass attach="passes-2" />
            </effectComposer>
        </>
    )
}

export default function Experience({ setExplosionState, scrollRef }) {
    const { scene } = useThree()
    const starGroup = useRef()
    const starMesh = useRef()
    const blackHoleGroup = useRef()
    const [scrollProgress, setScrollProgress] = useState(0)

    useFrame((state, delta) => {
        const offset = scrollRef.current
        setScrollProgress(offset)

        // --- PHASE 1: STAR & DYSON SWARM (0.0 - 0.7) ---
        if (starGroup.current) {
            // Rotate star
            starGroup.current.rotation.y += delta * 0.2

            // Star Movement (Scroll-driven)
            if (offset < 0.3) {
                starGroup.current.position.y = -offset * 2
                starGroup.current.position.x = -offset * 0.5
            }

            // Star Dimming during Eclipse (0.6 - 0.7)
            if (offset > 0.6 && offset < 0.7) {
                const dim = 1 - (offset - 0.6) * 10 // 1 -> 0
                if (starMesh.current) {
                    starMesh.current.material.emissiveIntensity = dim * 0.5
                    starMesh.current.material.opacity = dim
                }
            }

            // Hide star after Eclipse
            if (offset > 0.7) {
                starGroup.current.visible = false
            } else {
                starGroup.current.visible = true
            }
        }

        // --- PHASE 2: THE ECLIPSE (0.6 - 0.7) ---
        // Instead of whiteout, we go PITCH BLACK
        if (offset > 0.65 && offset < 0.75) {
            // Ensure background is pure black
            scene.background = new THREE.Color("#000000")
            // We can use setExplosionState to trigger UI changes if needed, 
            // but for Eclipse, standard dark mode is usually fine.
            // Let's keep it false to maintain white text.
            setExplosionState(false)
        } else {
            // Fade back to black if not in eclipse
            scene.background = new THREE.Color("#000000")
        }

        // --- PHASE 3: BLACK HOLE (0.7 - 1.0) ---
        if (blackHoleGroup.current) {
            if (offset > 0.7) {
                blackHoleGroup.current.visible = true
                // Reveal
                const appearance = Math.min(1, (offset - 0.7) * 5)
                blackHoleGroup.current.scale.setScalar(appearance)
            } else {
                blackHoleGroup.current.visible = false
            }
        }
    })

    return (
        <>
            {/* PHASE 1: The Star & Swarm */}
            <group ref={starGroup} position={[0, 0, 0]}>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <mesh ref={starMesh} scale={1.5}>
                        <icosahedronGeometry args={[1, 1]} />
                        <meshStandardMaterial color="#00f3ff" wireframe emissive="#00f3ff" emissiveIntensity={0.5} transparent />
                    </mesh>
                    <mesh scale={0.8}>
                        <icosahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.3} />
                    </mesh>
                </Float>

                {/* The Dyson Swarm */}
                <DysonSwarm progress={scrollProgress} />
            </group>

            {/* PHASE 3: Black Hole */}
            <group ref={blackHoleGroup} position={[2, -1, 0]} visible={false}>
                <BlackHole />
            </group>

            <StarField />

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />

            <Bloom />
        </>
    )
}
