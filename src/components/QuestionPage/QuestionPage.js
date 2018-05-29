import React, { Component, Fragment } from 'react';

class QuestionPage extends Component{
    render() {
        return (
            <Fragment>
                QuestionPage  {this.props.match.params.contestId}
            </Fragment>
        );
    }
} 
export default QuestionPage;