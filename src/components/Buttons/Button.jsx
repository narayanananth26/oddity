const Button = ({ onClick, type, style, children, disabled }) => {
	let btnStyle = "";

	if (style === "primary")
		btnStyle =
			"flex-center gap-2 uppercase bg-red-500 rounded-lg h-10 hover:bg-red-800 text-red-50 active:bg-red-500 text-xl p-3";
	else if (style === "secondary")
		btnStyle =
			"flex-center gap-2 border border-slate-400 rounded-lg h-10 bg-red-50 text-black hover:bg-slate-100 hover:border-slate-300 text-xl active:bg-white active:border-slate-400";

	// "flex-center gap-2 border border-slate-400 rounded-lg  px-10 hover:bg-slate-100 hover:border-white text-xl active:bg-white active:border-slate-400"

	return (
		<button
			type={type || "button"}
			onClick={onClick}
			className={btnStyle}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
