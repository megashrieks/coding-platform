import React, { Component } from 'react';
import axios from 'axios';

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

        //////////////////////

        axios.get('http://localhost:5000/api/contests')
        .then((data) => this.setState({data: data.data}))
        .catch((err) => console.log(err));
        

        //////////////////
        // this.setState({
        //     data: [
        //         {
        //             title: "November Challenge",
        //             type: "ongoing",
        //             details: "Monthly challenge in this site for November",
        //             additionalDetails: "This contest is in progress",
        //             linkId:"1"
        //         }, {
        //             title: "October Challenge",
        //             type: "mock",
        //             details: "Monthly challenge in this site for October",
        //             additionalDetails: "This contest has already ended",
        //             linkId: "2"
        //         }, {
        //             title: "December Challenge",
        //             type: "future",
        //             details: "Monthly challenge in this site for December",
        //             additionalDetails: "This contest will start on december",
        //             linkId: "3"
        //         }, {
        //             title: "Codex 2k18 Challenge",
        //             type: "ongoing",
        //             details: "Coding Challenge for all the good programmers out there",
        //             additionalDetails: "This contest is in progress",
        //             linkId: "4"
        //         }
        //     ]
        // });
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
                    key={element._id}
                />
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