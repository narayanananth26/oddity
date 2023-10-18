import Image from "next/image";
import Link from "next/link";

const Logo = ({ width, height }) => {
	return (
		<div className="flex-center">
			<Link href="/" className="relative w-fit h-fit">
				<Image
					src="/assets/logo.png"
					alt="Oddity logo"
					width={width}
					height={height}
					className="transition-transform hover:brightness-75 active:brightness-100"
				/>
			</Link>
		</div>
	);
};

export default Logo;
