import axios from 'axios';
import React, { Component, Fragment } from 'react';

class QuestionPage extends Component{
    state = {
        data:[]
    };
    componentDidMount() {
        let contestId = this.props.match.params.contestId;
        axios.get('http://localhost:5000/api/contests/'+contestId+'/questions')
            .then((data) => {
                console.log(data.data);
                if(data.data.length == 0) 
                    console.log('no questions');
                else 
                    this.setState({data:data.data})
            })
            .catch(err => console.log(err));
    }
    render() {
        var questions = this.state.data.map((element, index) => {
            return <li key={index}>{element.title}</li>
        });
        return (
            <Fragment>
                Questions:
                {questions}
            </Fragment>
        );
    }
} 
export default QuestionPage;