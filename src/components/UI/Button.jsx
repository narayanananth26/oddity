const Button = ({ onClick, style, children }) => {
	let btnStyle = "";

	if (style === "primary")
		btnStyle =
			"flex-center gap-2 uppercase bg-red-600 rounded-lg py-1 hover:bg-red-800 text-white active:bg-red-600 text-xl mt-5";
	else if (style === "secondary")
		btnStyle =
			"flex-center gap-2 border border-slate-400 rounded-lg hover:bg-slate-100 hover:border-white text-xl active:bg-white active:border-slate-400";

	// "flex-center gap-2 border border-slate-400 rounded-lg  px-10 hover:bg-slate-100 hover:border-white text-xl active:bg-white active:border-slate-400"

	return (
		<button onClick={onClick} className={btnStyle}>
			{children}
		</button>
	);
};

export default Button;
