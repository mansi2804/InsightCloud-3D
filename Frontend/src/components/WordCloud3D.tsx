import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { Group } from 'three';
import type { KeywordData } from '../types';

interface WordCloudProps {
    keywords: KeywordData[];
}

// Word component to render individual words
function Word({ word, weight, position, rotation }: {
    word: string;
    weight: number;
    position: [number, number, number];
    rotation: [number, number, number];
}) {
    const fontSize = weight * 0.5; // Scale font size based on weight
    const color = `hsl(${210 + weight * 60}, ${70 + weight * 30}%, ${50 + weight * 20}%)`;
    
    return (
        <Text
            position={position}
            rotation={rotation}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
        >
            {word}
        </Text>
    );
}

// Rotating group of all words
function WordGroup({ keywords }: WordCloudProps) {
    const groupRef = useRef<Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            // Gentle rotation animation
            groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
            groupRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.3) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {keywords.map((keyword, i) => {
                // Calculate position on a sphere
                const phi = Math.acos(-1 + (2 * i) / keywords.length);
                const theta = Math.sqrt(keywords.length * Math.PI) * phi;
                const radius = 5; // Adjust this to change the size of the sphere

                const position: [number, number, number] = [
                    radius * Math.cos(theta) * Math.sin(phi),
                    radius * Math.sin(theta) * Math.sin(phi),
                    radius * Math.cos(phi)
                ];

                // Random rotation for each word
                const rotation: [number, number, number] = [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                ];

                return (
                    <Word
                        key={keyword.word}
                        word={keyword.word}
                        weight={keyword.weight}
                        position={position}
                        rotation={rotation}
                    />
                );
            })}
        </group>
    );
}

export function WordCloud3D({ keywords }: WordCloudProps) {
    return (
        <div className="word-cloud">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <WordGroup keywords={keywords} />
                <OrbitControls 
                    enableZoom={true}
                    minDistance={10}
                    maxDistance={20}
                    enablePan={false}
                />
            </Canvas>
        </div>
    );
}