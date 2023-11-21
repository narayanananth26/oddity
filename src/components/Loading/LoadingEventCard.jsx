import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

function LoadingSkeleton() {
	return (
		<Card sx={{ maxWidth: 345, m: 2 }}>
			<div className="flex-center gap-10 pt-10 p-5">
				<Skeleton
					animation="wave"
					variant="circular"
					width={100}
					height={100}
				/>
				<Skeleton
					animation="wave"
					variant="circular"
					width={100}
					height={100}
				/>
			</div>

			<CardContent>
				<React.Fragment>
					<Skeleton
						animation="wave"
						height={10}
						style={{ marginBottom: 6 }}
					/>
					<Skeleton animation="wave" height={10} width="80%" />
				</React.Fragment>
			</CardContent>
		</Card>
	);
}

LoadingSkeleton.propTypes = {
	loading: PropTypes.bool,
};

export default function LoadingEventCard() {
	return (
		<div>
			<LoadingSkeleton />
		</div>
	);
}
