import React, { Component } from 'react';
import ContestItem from '../ContestItem/ContestItem';
import './ContestList.css';
class ContestList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    }
    componentDidMount() {
        // Get Data from remote server here
        // possibly from '/contests'
        // or using graphql
        // currently i'm using mock data

        this.setState({
            data: [
                {
                    title: "November Challenge",
                    type: "ongoing",
                    details: "Monthly challenge in this site for November",
                    additionalDetails: "This contest is in progress"
                }, {
                    title: "October Challenge",
                    type: "mock",
                    details: "Monthly challenge in this site for October",
                    additionalDetails: "This contest has already ended"
                }, {
                    title: "December Challenge",
                    type: "future",
                    details: "Monthly challenge in this site for December",
                    additionalDetails: "This contest will start on december"
                }, {
                    title: "Codex 2k18 Challenge",
                    type: "ongoing",
                    details: "Coding Challenge for all the good programmers out there",
                    additionalDetails: "This contest is in progress"
                }
            ]
        });
    }
    render() {
        let contestListElements = this.state.data.map((element, index) => {
            if (this.props.activeParameter !== element.type &&
                this.props.activeParameter !== 'all')
                return null;
            return (
                <ContestItem
                    {...element}
                    index={index}
                    key={"contest" + index}/>
            );
        });
        return (
            <div className="contest-list">
                {contestListElements}
            </div>
        );
    }
}
export default ContestList;