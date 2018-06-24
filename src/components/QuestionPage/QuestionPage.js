import React, { Component, Fragment } from "react";
import ReactMarkdown from "react-markdown";
import EditorComponent from "./EditorComponent/EditorComponent";
import axios from "axios";
import "./QuestionPage.css";
class QuestionPage extends Component {
	state = {
		data: {}
	};
	componentDidMount() {
		let { contestId, questionId } = this.props.match.params;
		axios
			.get(
				"http://localhost:5000/api/contests/" +
					contestId +
					"/questions/" +
					questionId
			)
			.then(data => {
				console.log(data.data.data);
				this.setState({
					data: data.data.data
				});
			})
			.catch(err => console.log(err));
		// this.setState({
		//     data: {
		//         title: "The pascals triangle",
		//         details: `# lets get to it
		//             given n print the pascals triangle on the stdout stream
		//         `,
		//         additionalDetails:"test case 1 is obvious but looking at test case 2 ...blah blah...",
		//         testCases: [
		//             `5\n7`,
		//             `6`
		//         ],
		//         testCaseResults: [
		//             `some pascal triangle here`,
		//             `another pascal triangle here`,
		//             `and another one just for fun`
		//         ]
		//     }
		// })
	}
	render() {
		let testCases =
			this.state.data.test_cases &&
			this.state.data.test_cases.map((element, index) => {
				return (
					<Fragment key={"case" + index}>
						{element}
						<br />
					</Fragment>
				);
            });
		let testCaseResults =
			this.state.data.test_case_results &&
			this.state.data.test_case_results.map((element, index) => {
				return (
					<Fragment key={"caseresult" + index}>
						{element}
						<br />
					</Fragment>
				);
			});
		return (
			<Fragment>
				<h1>
					{this.state.data.title || "Loading question details..."}
				</h1>
				<ReactMarkdown source={this.state.data.details} skipHtml />
                {!!(testCases && testCases.length) && <div className="test">
					<div className="tr">
						<div className="tc">Test cases</div>
						<div className="tc">Results</div>
					</div>
					<div className="test-data">{testCases}</div>
					<div className="test-result">{testCaseResults}</div>
				</div>}
				<EditorComponent />
			</Fragment>
		);
	}
}
export default QuestionPage;
