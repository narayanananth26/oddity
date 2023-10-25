import Image from "next/image";
import Link from "next/link";

const Logo = () => {
	return (
		<div className="flex-center w-full">
			<Link href="/" className="absolute flex-center h-full">
				<Image
					src="/assets/oddity-logo.svg"
					alt="Oddity logo"
					priority
					width="0"
					height="0"
					className="transition-transform hover:brightness-75 active:brightness-100 h-full w-auto"
				/>
			</Link>
		</div>
	);
};

export default Logo;
