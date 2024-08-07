import { IonSkeletonText } from "@ionic/react";

interface SkeletonTextProps {
    height?: number | string;
}

const SkeletonText: React.FC<SkeletonTextProps> = ({ height }) => {
	return (
		<IonSkeletonText animated={true} style={{ height: height ?? 15 }} />
	)
}

export default SkeletonText;