import Image from "next/image";
import Link from "next/link";

const Logo = ({ width, height }) => {
	return (
		<div className="flex-center w-full">
			<Link href="/" className="relative flex-center h-full w-full">
				<Image
					src="/assets/logo.png"
					alt="Oddity logo"
					priority
					width={width}
					height={height}
					className="transition-transform hover:brightness-75 active:brightness-100 h-full w-auto"
				/>
			</Link>
		</div>
	);
};

export default Logo;
