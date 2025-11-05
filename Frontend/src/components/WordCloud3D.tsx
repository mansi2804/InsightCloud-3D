import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Stars } from '@react-three/drei';
import { Group } from 'three';
import type { KeywordData } from '../types';
import { Tooltip } from './Tooltip3D';

interface WordCloudProps {
    keywords: KeywordData[];
    theme: 'light' | 'dark';
}

// Word component to render individual words
function Word({ word, weight, position }: {
    word: string;
    weight: number;
    position: [number, number, number];
}) {
    const [hovered, setHovered] = useState(false);
    const fontSize = weight * 1.2 * (hovered ? 1.5 : 1); // Consistent size with hover effect
    const color = `hsl(${Math.random() * 360}, 70%, 60%)`; // Colorful words

    return (
        <group>
            <Text
                position={position}
                fontSize={fontSize}
                color={color}
                anchorX="center"
                anchorY="middle"
                fontStyle={hovered ? 'italic' : 'normal'} // Use italic for hover effect
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                {word}
            </Text>
            <Tooltip 
                text={word}
                weight={weight}
                visible={hovered}
                tooltipColor={color} // Pass color as a prop to Tooltip
            />
        </group>
    );
}

// Rotating group of all words
function WordGroup({ keywords }: WordCloudProps) {
    const groupRef = useRef<Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            // Smooth rotation animation
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
            groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {keywords.map((keyword, i) => {
                // Calculate position on a sphere
                const phi = Math.acos(-1 + (2 * i) / keywords.length);
                const theta = Math.sqrt(keywords.length * Math.PI) * phi;
                const radius = 5; // Reduced radius for square layout

                const position: [number, number, number] = [
                    radius * Math.cos(theta) * Math.sin(phi),
                    radius * Math.sin(theta) * Math.sin(phi),
                    radius * Math.cos(phi)
                ];

                return (
                    <Word
                        key={keyword.word}
                        word={keyword.word}
                        weight={keyword.weight}
                        position={position}
                    />
                );
            })}
        </group>
    );
}

export function WordCloud3D({ keywords, theme }: WordCloudProps) {
    const backgroundColor = theme === 'light' ? '#ffffff' : '#000000';

    return (
        <div className="word-cloud" style={{ width: '500px', height: '500px', margin: '0 auto' }}>
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }} style={{ background: backgroundColor }}>
                <ambientLight intensity={0.7} />
                <pointLight position={[10, 10, 10]} />
                <Stars radius={50} depth={10} count={5000} factor={4} fade />
                <WordGroup keywords={keywords} theme={theme} />
                <OrbitControls 
                    enableZoom={true}
                    minDistance={10}
                    maxDistance={20}
                    enablePan={true}
                />
            </Canvas>
        </div>
    );
}