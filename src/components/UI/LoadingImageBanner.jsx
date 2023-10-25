import Skeleton from "@mui/material/Skeleton";

const LoadingImageBanner = () => {
	return (
		<section className="w-screen h-screen relative overflow-hidden">
			<div className="absolute inset-0">
				<Skeleton
					variant="rectangular"
					width={6000}
					height={4000}
					sx={{ bgcolor: "#fef2f2" }}
					animation="wave"
				/>
			</div>

			<div className="flex flex-col flex-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2 w-full">
				<Skeleton
					width={400}
					height={40}
					sx={{ bgcolor: "#fecaca" }}
					animation="wave"
				/>
				<Skeleton
					width={600}
					height={100}
					sx={{ bgcolor: "#fecaca" }}
					animation="wave"
				/>
				<div className="flex-center gap-5">
					<Skeleton
						width={100}
						height={20}
						sx={{ bgcolor: "#fecaca" }}
						animation="wave"
					/>
					<Skeleton
						width={100}
						height={20}
						sx={{ bgcolor: "#fecaca" }}
						animation="wave"
					/>
				</div>
				<Skeleton
					width={200}
					height={20}
					sx={{ bgcolor: "#fecaca" }}
					animation="wave"
				/>
			</div>
			<div
				className={`flex-center absolute bottom-0 left-0 transform translate-x-1/4 -translate-y-1/2 px-6 py-3`}
			>
				<Skeleton
					width={400}
					height={100}
					sx={{ bgcolor: "#fecaca" }}
					animation="wave"
				/>
			</div>
		</section>
	);
};

export default LoadingImageBanner;
