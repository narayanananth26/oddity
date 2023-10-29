const BannerContent = ({ h1, h2, h3, h4 }) => {
	return (
		<div className="flex flex-col flex-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2 w-full">
			<h2 className="text-xl text-white uppercase font-bold">{h2}</h2>
			<h1 className="text-center text-7xl uppercase text-red-500 font-bold">
				{h1}
			</h1>
			<h3 className="flex-center gap-5 text-base text-white uppercase font-bold">
				{h3}
			</h3>
			<h4 className="flex-center gap-2 text-base text-white uppercase font-bold">
				{h4}
			</h4>
		</div>
	);
};

export default BannerContent;
