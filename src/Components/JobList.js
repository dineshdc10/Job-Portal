import React from "react";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

class JobList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			detail: false,
			Job: {}
		};
	}

	hideDetails = () => {
		this.setState({ detail: false, Job: {} });
	};

	render() {
		return (
			<React.Fragment>
				<Container justify="center">
					{this.props.loading ? (
						<Grid container spacing={2} justify="center" alignItems="center">
							<Grid item>
								<Typography component="div">
									Loading....
									<CircularProgress />
								</Typography>
							</Grid>
						</Grid>
					) : (
						<React.Fragment>
							{this.props.FilteredJobs.length === 0 ? (
								<Typography>No jobs matches the search criteria !!</Typography>
							) : (
								<React.Fragment>
									<JobDetails
										open={this.state.detail}
										job={this.state.Job}
										key={this.state.Job._id}
										hideDetails={() => this.hideDetails()}
									/>
									<Grid container spacing={2}>
										{this.props.FilteredJobs.map(job => {
											return (
												<Grid
													item
													xs={12}
													md={4}
													onClick={() => {
														this.setState({ detail: true, Job: job });
													}}
													key={job._id}
												>
													<JobCard job={job} />
												</Grid>
											);
										})}
									</Grid>
									<Grid
										container
										spacing={2}
										justify="center"
										alignItems="center"
									>
										{this.props.FilteredJobs.length < this.props.TotalJobs ? (
											<Grid item>
												<Button
													variant="contained"
													style={{
														backgroundColor: "#263238",
														color: "#FFFFFF"
													}}
													onClick={() => {
														this.props.loadMore();
													}}
												>
													Load More..
												</Button>
											</Grid>
										) : (
											<Grid item style={{ marginTop: 10 }}>
												<Typography>No more jobs!!</Typography>
											</Grid>
										)}
									</Grid>
								</React.Fragment>
							)}
						</React.Fragment>
					)}
				</Container>
			</React.Fragment>
		);
	}
}

export default JobList;
