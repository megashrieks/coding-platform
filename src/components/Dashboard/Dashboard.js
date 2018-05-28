import React, { Component, Fragment } from 'react';
import ContestList from './ContestList/ContestList';
import ContestTypes from './ContestTypes/ContestTypes';

class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeParameter: 'all'
        };
        this.types = [
            { title: "All", parameter: "all" },
            { title: "Ongoing", parameter: "ongoing" },
            { title: "Future", parameter: "future" },
            { title: "Mock", parameter: "mock" }, 
        ];
    }
    onActive = (index) => {
        this.setState({ activeParameter: this.types[index].parameter });
    }
    render() {
        return (
            <Fragment>
                <h1>Contests</h1>  
                <ContestTypes
                    types={this.types}
                    onActive = {this.onActive}
                /> 
                <ContestList activeParameter={this.state.activeParameter}/>
            </Fragment>
        )
    }
}
export default Dashboard;