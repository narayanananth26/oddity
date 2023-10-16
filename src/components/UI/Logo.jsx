import Image from "next/image";
import Link from "next/link";

const Logo = ({ width, height }) => {
	return (
		<Link href="/" className="flex-center relative">
			<Image
				src="/assets/logo.png"
				alt="Oddity logo"
				width={width}
				height={height}
				className="transition-transform hover:brightness-75 active:brightness-100"
			/>
		</Link>
	);
};

export default Logo;
