import { Box, Typography } from "@mui/material";

function TalentProof({ id, date, title, description, author }) {
	const timeUnits = {
		year: 24 * 60 * 60 * 1000 * 365,
		month: (24 * 60 * 60 * 1000 * 365) / 12,
		day: 24 * 60 * 60 * 1000,
		hour: 60 * 60 * 1000,
		minute: 60 * 1000,
		second: 1000,
	};
	const auto = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

	let getRelativeTime = (date1, date2 = new Date()) => {
		let result = date1 - date2;
		for (let item in timeUnits)
			if (Math.abs(result) > timeUnits[item] || item === "second")
				return auto.format(Math.round(result / timeUnits[item]), item);
	};

	return (
		<>
			<Box
				sx={{
					backgroundСolor: "#fff",
					border: "1px solid #888888",
					borderRadius: "5px",
					padding: "20px",
					marginBottom: "20px",
				}}
			>
				<Typography variant="h6" sx={{ fontWeight: 700 }}>
					{title}
					<Typography sx={{ fontSize: "10px", color: "#888888" }}>
						{getRelativeTime(+new Date(date))}
					</Typography>
					<Typography sx={{ fontSize: "16px" }}>{description}</Typography>
				</Typography>
			</Box>
		</>
	);
}

export { TalentProof };
