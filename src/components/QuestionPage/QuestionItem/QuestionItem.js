import React, { Component } from 'react';
import './QuestionItem.css';
class QuestionItem extends Component{
    render() {
        let status = "";
        console.log(this.props);
        switch (this.props.element.solved) {
            case "full": status = "solved";
                break;
            case "partial": status = "partially solved";
                break;
            case "no": status = "not solved"
                break;
            default: status = "not attempted"
        }
        return (
            <div className={"question " + this.props.element.solved}>
                <div className="question-title">
                    {this.props.element.title}
                    <div className="question-status">{status}</div>
                </div>
                <div className="info">
                    <div className="item">
                        difficulty : <span>{this.props.element.difficulty}%</span>
                    </div>
                    <div className="item">
                        solved by : <span>{this.props.element.solvedBy} contestants</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default QuestionItem;