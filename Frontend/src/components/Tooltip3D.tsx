import { Text, Billboard } from '@react-three/drei';

interface TooltipProps {
    text: string;
    weight: number;
    visible: boolean;
    tooltipColor?: string; // Added optional tooltipColor prop
}

export function Tooltip({ text, weight, visible, tooltipColor = 'white' }: TooltipProps) {
    if (!visible) return null;

    return (
        <Billboard>
            <Text
                position={[0, 0.6, 0]}
                fontSize={0.3}
                color={tooltipColor} // Use tooltipColor for dynamic coloring
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="black"
                fontWeight="bold" // Make tooltip text bold
            >
                {`${text} (${(weight * 100).toFixed(1)}%)`}
            </Text>
        </Billboard>
    );
}