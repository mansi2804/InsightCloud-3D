import { Text, Billboard } from '@react-three/drei';

interface TooltipProps {
    text: string;
    weight: number;
    visible: boolean;
}

export function Tooltip({ text, weight, visible }: TooltipProps) {
    if (!visible) return null;

    return (
        <Billboard>
            <Text
                position={[0, 0.6, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="black"
            >
                {`${text} (${(weight * 100).toFixed(1)}%)`}
            </Text>
        </Billboard>
    );
}