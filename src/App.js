import React from "react";
import DesktopAppBar from "./Components/DesktopAppBar";
import JobList from "./Components/JobList";
import MobileAppBar from "./Components/MobileAppBar";

import Hidden from "@material-ui/core/Hidden";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Jobs: [],
			FilteredJobs: [],
			loading: true,
			location: "",
			experience: "",
			skills: "",
			count: 30
		};
	}

	componentDidMount() {
		this.setState({ loading: true });
		fetch("https://nut-case.s3.amazonaws.com/jobs.json")
			.then(res => {
				return this.handleRes(res);
			})
			.then(data => {
				if (data) {
					this.setState({
						Jobs: data.data,
						FilteredJobs: data.data,
						loading: false
					});
				}
			})
			.catch(error => {
				this.setState({ loading: false });
			});
	}

	handleRes = res => {
		if (res.ok) {
			return res.json();
		}
	};
	render() {
		return (
			<React.Fragment>
				<Hidden smDown>
					<DesktopAppBar
						filterJobs={(location, experience, skills) =>
							this.filterJobs(location, experience, skills)
						}
						count={this.state.FilteredJobs.length}
						location={this.state.location}
						skills={this.state.skills}
						experience={this.state.experience}
					/>
				</Hidden>
				<Hidden mdUp>
					<MobileAppBar
						filterJobs={(location, experience, skills) =>
							this.filterJobs(location, experience, skills)
						}
						count={this.state.FilteredJobs.length}
						location={this.state.location}
						skills={this.state.skills}
						experience={this.state.experience}
					/>
				</Hidden>
				<JobList
					FilteredJobs={this.state.FilteredJobs.slice(0, this.state.count)}
					loadMore={() => this.loadMore()}
					TotalJobs={this.state.FilteredJobs.length}
					loading={this.state.loading}
				/>
			</React.Fragment>
		);
	}

	loadMore = () => {
		let count = this.state.count + 30;
		const maxCount = this.state.FilteredJobs.length;
		if (count > maxCount) {
			count = maxCount;
		}
		this.setState({ count });
	};

	filterJobs = (location, experience, skills) => {
		location = location.toLowerCase().trim();
		experience = experience.toLowerCase().trim();
		skills = skills.toLowerCase().trim();
		this.setState({ loading: true });
		let FilteredJobs = Object.assign(this.state.Jobs, {});
		FilteredJobs = FilteredJobs.filter(function(job) {
			let filt = true;
			if (location !== "") {
				if (
					!job.location
						.trim()
						.toLowerCase()
						.includes(location)
				) {
					filt = false;
				}
			}

			if (filt) {
				if (skills !== "") {
					if (
						!job.skills
							.trim()
							.toLowerCase()
							.includes(skills)
					) {
						filt = false;
					}
				}
			}

			if (filt) {
				if (experience !== "" && parseInt(experience)) {
					experience = parseInt(experience);
					if (job.experience.trim() !== "") {
						const range = job.experience
							.toLowerCase()
							.replace("yrs", "")
							.trim()
							.split("-");
						if (range.length === 1) {
							if (parseInt(range[0].trim()) !== experience) {
								filt = false;
							}
						} else if (
							parseInt(range[0].trim()) > experience ||
							parseInt(range[1].trim()) < experience
						) {
							filt = false;
						}
					} else {
						filt = false;
					}
				}
			}

			return filt;
		});
		this.setState({
			location,
			experience,
			skills,
			count: 30,
			FilteredJobs,
			loading: false
		});
	};
}

export default App;
