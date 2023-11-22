const EventOdds = ({ odds, className, oddClassName }) => {
	return (
		<div className={className}>
			<span
				className={`${
					odds?.home_team > odds?.away_team
						? "before:content-['-'] text-red-500"
						: "before:content-['+'] text-green-500"
				} ${oddClassName}`}
			>
				{odds?.home_team}
			</span>
			<span className={`before:content-['+'] ${oddClassName}`}>
				{odds?.draw}
			</span>
			<span
				className={`${
					odds?.away_team > odds?.home_team
						? "before:content-['-'] text-red-500"
						: "before:content-['+'] text-green-500"
				} ${oddClassName}`}
			>
				{odds?.away_team}
			</span>
		</div>
	);
};

export default EventOdds;
