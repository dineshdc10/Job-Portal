import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import NearMeIcon from "@material-ui/icons/NearMe";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Drawer from "@material-ui/core/Drawer";

import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
const styles = theme => ({
	root: {
		backgroundColor: "#FFFFFF",
		color: "#000000"
	},
	toolbar: {
		backgroundColor: "#263238",
		color: "#FFFFFF"
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	title: {
		flexGrow: 1,
		display: "block",
		textAlign: "center"
	},
	search: {
		display: "block",
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.black, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.black, 0.25)
		},
		margin: theme.spacing(1),
		flexGrow: 1
	},
	Icon: {
		width: theme.spacing(7),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	inputRoot: {
		color: "inherit"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create("width"),
		width: "100%"
	},
	chip: {
		margin: theme.spacing(1)
	},
	button: {
		backgroundColor: "#000000",
		color: "#FFFFFF",
		margin: 10,
		display: "block"
	}
});

class MobileAppBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			top: false,
			location: "",
			experience: "",
			skills: ""
		};
	}
	handleChange = event => {
		let val = event.target.value;
		if (event.target.name === "experience") {
			val = val.substring(0, 2);
		} else if (event.target.name === "location") {
			val = event.target.value.trim().replace(/[^a-zA-Z]+/g, "");
		}
		this.setState({ [event.target.name]: val });
	};

	closeDrawer = () => {
		this.setState({ top: false });
	};
	render() {
		const classes = this.props.classes;

		return (
			<div>
				<AppBar position="fixed" className={classes.root}>
					<Toolbar className={classes.toolbar}>
						<Typography className={classes.title} variant="h6" noWrap>
							Job Search Portal
						</Typography>
						<IconButton
							aria-label="filter"
							style={{ color: "#FFFFFF" }}
							onClick={() => this.setState({ top: true })}
						>
							<FilterListIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Toolbar></Toolbar>
				<Drawer
					className={classes.drawer}
					anchor="top"
					open={this.state.top}
					onClose={() => this.closeDrawer()}
				>
					<div className={classes.search} style={{ marginTop: 20 }}>
						<div className={classes.Icon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Experience.."
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							type="number"
							name="experience"
							value={this.state.experience}
							inputProps={{ "aria-label": "experience" }}
							onChange={event => this.handleChange(event)}
						/>
					</div>
					<div className={classes.search}>
						<div className={classes.Icon}>
							<NearMeIcon />
						</div>
						<InputBase
							placeholder="Locations.."
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							name="location"
							value={this.state.location}
							inputProps={{ "aria-label": "locations", maxLength: 20 }}
							onChange={event => this.handleChange(event)}
						/>
					</div>
					<div className={classes.search}>
						<div className={classes.Icon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Skills.."
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							name="skills"
							value={this.state.skills}
							inputProps={{ "aria-label": "skills", maxLength: 20 }}
							onChange={event => this.handleChange(event)}
						/>
					</div>

					<Button
						variant="contained"
						className={classes.button}
						onClick={() => {
							this.props.filterJobs(
								this.state.location,
								this.state.experience,
								this.state.skills
							);
							this.setState({
								top: false,
								location: "",
								experience: "",
								skills: ""
							});
						}}
					>
						Search
					</Button>
				</Drawer>

				<Grid container>
					<Grid item xs={9}>
						{this.props.location === "" ? (
							<div />
						) : (
							<Chip
								variant="outlined"
								size="small"
								label={this.props.location}
								className={classes.chip}
							/>
						)}
						{this.props.experience === "" ? (
							<div />
						) : (
							<Chip
								variant="outlined"
								size="small"
								label={this.props.experience + " yrs"}
								className={classes.chip}
							/>
						)}
						{this.props.skills === "" ? (
							<div />
						) : (
							<Chip
								variant="outlined"
								size="small"
								label={this.props.skills}
								className={classes.chip}
							/>
						)}
					</Grid>
					<Grid item xs={3}>
						<Typography component="div" align="right">
							<Chip
								variant="outlined"
								size="small"
								label={"Jobs: " + this.props.count}
								className={classes.chip}
							/>
						</Typography>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(MobileAppBar);
