import axios from 'axios';
import React, { Component, Fragment } from 'react';
import './ContestPage.css';
import QuestionItem from './QuestionItem/QuestionItem';
import Timer from './Timer/Timer';
class ContestPage extends Component{
    state = {
        data: {},
        once:true
    };
    unmounted = false;
    componentDidMount() {
        let contestId = this.props.match.params.contestId;
        axios.get('http://localhost:5000/api/contests/' + contestId + '/questions')
            .then((data) => {
                console.log(data.data.data);
                if (data.data.data.length === 0)
                    console.log('no questions');
                    /*TODO handle this in the component*/
                else {
                    !this.unmounted && this.setState({
                        data: data.data.data
                    })
                }
            })
            .catch(err => console.log(err));
    }
    componentWillUnmount() {
        this.unmounted = true;
    }
    render() {
        var questions = this.state.data.questions !== undefined ?
            this.state.data.questions.map((element, index) => {
                return (
                    <QuestionItem
                        key={"question" + index}
                        element={element}
                        contestId={this.props.match.params}/>
                )
            }):null;
        return (
            <Fragment>
                <h1>
                    {this.state.data.contestName || "Loading contest details.."}
                </h1>
                {this.state.data.timeRemaining && <Timer timer={this.state.data.timeRemaining} />}
                <div className="questions-container">
                    {questions}
                </div>
            </Fragment>
        );
    }
} 
export default ContestPage;