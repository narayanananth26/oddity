import Image from "next/image";
import Link from "next/link";

const Logo = ({ width, height }) => {
	return (
		<Link href="/" className="flex-center">
			<Image
				src="/assets/logo.png"
				alt="Oddity logo"
				width={width}
				height={height}
				className="hover:filter-red-800 hover:"
			/>
		</Link>
	);
};

export default Logo;
