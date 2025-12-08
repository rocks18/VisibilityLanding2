import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import BlackHole from './BlackHole'
import Supernova from './Supernova'
import Pulsar from './Pulsar'

// Extend Three.js classes for R3F
extend({ EffectComposer, RenderPass, UnrealBloomPass, OutputPass })

function Bloom({ children }) {
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
    }, 1) // Render priority 1 to ensure it runs after default render

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
    const pulsarGroup = useRef()
    const blackHoleGroup = useRef()
    const [scrollProgress, setScrollProgress] = useState(0)

    useFrame((state, delta) => {
        // Read scroll progress from ref
        const offset = scrollRef.current
        setScrollProgress(offset)

        // --- PHASE 1: STAR & PULSAR (0.0 - 0.5) ---
        if (starGroup.current) {
            // Rotate star
            starGroup.current.rotation.y += delta * 0.5

            // Star Movement (Scroll-driven)
            // Move down and slightly left until Pulsar starts
            if (offset < 0.3) {
                starGroup.current.position.y = -offset * 2
                starGroup.current.position.x = -offset * 0.5
            }

            // Pulsar Jets (0.3 - 0.5)
            if (offset > 0.3 && offset < 0.55) {
                const intensity = (offset - 0.3) * 5 // 0 to 1
                pulsarGroup.current.visible = true
                pulsarGroup.current.scale.setScalar(intensity)
                // Tilt the pulsar jets to the left
                pulsarGroup.current.rotation.z = 0.3

                // Instability
                const scale = 1 + Math.sin(state.clock.elapsedTime * 30) * 0.1 * intensity
                starGroup.current.scale.set(scale, scale, scale)

                if (starMesh.current) {
                    starMesh.current.material.color.setHSL(0.6 - intensity * 0.5, 1, 0.5 + intensity * 0.5) // Blue -> White
                    starMesh.current.material.emissiveIntensity = intensity * 2
                }
            } else if (offset <= 0.3) {
                pulsarGroup.current.visible = false
                starGroup.current.scale.set(1, 1, 1)
                if (starMesh.current) {
                    starMesh.current.material.color.set("#00f3ff")
                    starMesh.current.material.emissiveIntensity = 0
                }
            }

            // Hide star after explosion
            if (offset > 0.55) {
                starGroup.current.visible = false
                pulsarGroup.current.visible = false
            } else {
                starGroup.current.visible = true
            }
        }

        // --- PHASE 2: WHITEOUT EXPLOSION (0.5 - 0.6) ---
        if (offset > 0.5 && offset < 0.6) {
            // Flash White
            scene.background = new THREE.Color("#ffffff")
            setExplosionState(true)
        } else {
            // Fade back to black
            scene.background = new THREE.Color("#000000")
            setExplosionState(false)
        }

        // --- PHASE 3: BLACK HOLE (0.6 - 1.0) ---
        if (blackHoleGroup.current) {
            // Start immediately after/during whiteout to prevent gap
            if (offset > 0.55) {
                blackHoleGroup.current.visible = true
                // Fade in / Scale up
                const appearance = Math.min(1, (offset - 0.55) * 3)
                blackHoleGroup.current.scale.setScalar(appearance)
            } else {
                blackHoleGroup.current.visible = false
            }
        }
    })

    return (
        <>
            {/* PHASE 1: The Star */}
            <group ref={starGroup} position={[0, 0, 0]}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <mesh ref={starMesh} scale={1.5}>
                        <icosahedronGeometry args={[1, 1]} />
                        <meshStandardMaterial color="#00f3ff" wireframe emissive="#00f3ff" emissiveIntensity={0.5} />
                    </mesh>
                    <mesh scale={0.8}>
                        <icosahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.5} />
                    </mesh>
                </Float>
                <group ref={pulsarGroup} visible={false}>
                    <Pulsar />
                </group>
            </group>

            {/* PHASE 2: Supernova Explosion (0.5 - 0.8) */}
            {scrollProgress > 0.45 && scrollProgress < 0.9 && (
                <Supernova progress={scrollProgress} />
            )}

            {/* PHASE 3: Black Hole (0.8 - 1.0) */}
            <group ref={blackHoleGroup} position={[2, -1, 0]} visible={false}>
                <BlackHole />
            </group>

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ffd700" />

            <Bloom />
        </>
    )
}
