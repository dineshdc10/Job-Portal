import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import AppBar from "@material-ui/core/AppBar";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	card: { flexRow: 1 },
	appBar: {
		position: "relative",
		backgroundColor: "#263238"
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	}
}));

export default function JobDetails(props) {
	const classes = useStyles();

	return (
		<Dialog
			fullScreen
			open={props.open}
			onClose={() => props.hideDetails()}
			TransitionComponent={Transition}
		>
			<AppBar className={classes.appBar}>
				<Toolbar component="div">
					<IconButton
						edge="start"
						color="inherit"
						onClick={() => props.hideDetails()}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title} noWrap>
						{props.job.title}
					</Typography>
					<Button
						color="inherit"
						onClick={() => (window.location = props.job.applylink)}
					>
						Apply
					</Button>
				</Toolbar>
			</AppBar>
			<Container style={{ marginTop: 10 }}>
				<Card className={classes.card} id={props.job._id}>
					<CardHeader
						subheader={
							<Grid container spacing={0}>
								<Grid item xs={12}>
									{props.job.companyname}
								</Grid>
								<Grid item xs={12}>
									<Typography>
										Location :{" "}
										{props.job.location === "" ? "N.A." : props.job.location}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography>
										Experience :{" "}
										{props.job.experience === ""
											? "N.A."
											: props.job.experience}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography>{props.job.type}</Typography>
								</Grid>
							</Grid>
						}
					/>
					<CardContent>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<Typography variant="body1">
									<b>Skills :</b>{" "}
									{props.job.skills === "" ? "N.A." : props.job.skills}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="body1">
									<b>Job Description : </b>
									{props.job.jd === "" ? "N.A." : props.job.jd}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="body1">
									<b>Source : </b>
									{props.job.source === "" ? "N.A." : props.job.source}
								</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Container>
		</Dialog>
	);
}
