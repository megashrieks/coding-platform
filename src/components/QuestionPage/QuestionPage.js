import axios from 'axios';
import React, { Component, Fragment } from 'react';
import QuestionItem from './QuestionItem/QuestionItem';
import './QuestionPage.css';
import Timer from './Timer/Timer';
class QuestionPage extends Component{
    state = {
        data: {},
        once:true
    };
    componentDidMount() {
        let contestId = this.props.match.params.contestId;
        axios.get('http://localhost:5000/api/contests/' + contestId + '/questions')
            .then((data) => {
                if (data.data.length === 0)
                    console.log('no questions');
                else {
                    console.log(data.data);
                    this.setState({
                        data: data.data
                    })
                }
            })
            .catch(err => console.log(err));
        // this.setState({
        //     data: {
        //         contestName:"codex",
        //         timeRemaining: [
        //             0/*days*/,
        //             0/*hours*/,
        //             0/*minutes*/,
        //             5/*seconds*/
        //         ],
        //         questions: [{
        //             title: "n-th fibonacci numbers",
        //             details: "Find the nth fibonacci number",
        //             solved: 'full',
        //             solvedBy: 0,
        //             difficulty:78
        //         }, {
        //             title: "Square",
        //             details: "Find the area of the square",
        //             solved: 'partial',
        //             solvedBy: 108,
        //             difficulty: 5
        //         }, {
        //             title: "pascals triangle",
        //             details: "print the pascal triangle",
        //             solved: 'no',
        //             solvedBy: 10,
        //             difficulty: 20
        //         }]
        //     }
        // })
    }
    render() {
        var questions = this.state.data.questions !== undefined ?
            this.state.data.questions.map((element, index) => {
                
                return (
                    <QuestionItem key={"question" + index} element={element}/>
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
export default QuestionPage;