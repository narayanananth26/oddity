const UnderConstruction = () => {
	return (
		<div className="bg-black flex-center flex-col">
			{Array.from({ length: 100 }, (_, index) => (
				<div
					key={index}
					className="font-oswald uppercase text-5xl text-white hover:text-red-500 "
				>
					Page under construction
				</div>
			))}
		</div>
	);
};

export default UnderConstruction;
