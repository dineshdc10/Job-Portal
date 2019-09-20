import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
	card: { flexRow: 1 },
	cardAction: {
		display: "block",
		textAlign: "initial"
	},
	chip: {
		color: "#b71c1c",
		borderColor: "#b71c1c"
	},
	expire: {
		margin: theme.spacing(1)
	}
}));

export default function JobCard(props) {
	const classes = useStyles();
	return (
		<Card className={classes.card} id={props.job._id}>
			<CardActionArea className={classes.cardAction}>
				<CardContent>
					<Grid container>
						<Grid item xs={9} md={9}>
							<Grid container spacing={0} wrap="nowrap">
								<Grid item zeroMinWidth>
									<Typography variant="subtitle2" noWrap>
										{props.job.title}
									</Typography>
								</Grid>
							</Grid>
							<Grid container spacing={0}>
								<Grid container spacing={0} wrap="nowrap">
									<Grid item xs zeroMinWidth>
										<Typography variant="body1" color="textSecondary" noWrap>
											{props.job.companyname}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={0} wrap="nowrap">
									<Grid item xs zeroMinWidth>
										<Typography variant="body1" color="textSecondary" noWrap>
											{props.job.location}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={0} wrap="nowrap">
									<Grid item xs zeroMinWidth>
										<Typography variant="body1" color="textSecondary" noWrap>
											{props.job.type}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={3} md={3}>
							<Button
								component="div"
								variant="contained"
								className={classes.button}
								style={{ backgroundColor: "#263238", color: "#FFFFFF" }}
								onClick={() => {
									window.location = props.job.applylink;
								}}
							>
								Apply
							</Button>
						</Grid>
					</Grid>

					<Grid container spacing={0} style={{ marginTop: "20px" }}>
						<Grid item xs={12} md={12}>
							<Typography variant="body1" noWrap>
								Skills : {props.job.skills === "" ? "N.A." : props.job.skills}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body1" noWrap>
								Experience :{" "}
								{props.job.experience === "" ? "N.A." : props.job.experience}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions disableSpacing>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							{props.job.created === "" ? (
								""
							) : (
								<React.Fragment>
									<Divider></Divider>
									<div className={classes.expire}>
										<Typography variant="inherit" align="justify">
											{props.job.created}
										</Typography>
									</div>
								</React.Fragment>
							)}
						</Grid>
						<Grid item xs={4}>
							{props.job.enddate === "" ? (
								""
							) : new Date(props.job.enddate) < new Date() ? (
								<div className={classes.expire}>
									<Chip
										label="Expired"
										className={classes.chip}
										variant="outlined"
									/>
								</div>
							) : (
								<div></div>
							)}
						</Grid>
					</Grid>
				</CardActions>
			</CardActionArea>
		</Card>
	);
}
