const Button = ({ onClick, style, children }) => {
	let btnStyle = "";

	if (style === "primary")
		btnStyle =
			"uppercase bg-red-600 rounded-lg py-1 hover:bg-red-800 text-white active:bg-red-600 text-xl mt-5";
	else if (style === "secondary")
		btnStyle =
			"uppercase bg-red-600 rounded-lg py-1 hover:bg-red-800 text-white active:bg-red-600 text-xl mt-5";

	return (
		<button onClick={onClick} className={btnStyle}>
			{children}
		</button>
	);
};

export default Button;
