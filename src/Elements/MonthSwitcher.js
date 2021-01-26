import React from "react";

export default class MonthSwitcher extends React.Component {
    monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    style = {
        cursor: "pointer"
    };

    convertToDate = () => {
      let month = this.monthes[this.props.date.getMonth()];
      return month + ' ' + this.props.date.getFullYear();
    };

    addMonth = () => {
        let month = this.props.date.getMonth();
        month++;
        const date = this.createDateObject();
        if (month > 11) {
            date.setFullYear(this.props.date.getFullYear() + 1);
            month = 0;
        }
        date.setMonth(month);
        this.applyLastDay(date);
        this.props.act(date);
    };

    subtractMonth = () => {
        let month = this.props.date.getMonth();
        month--;
        const date = this.createDateObject();
        if (month < 0) {
            date.setFullYear(this.props.date.getFullYear() - 1);
            month = 11;
        }
        date.setMonth(month);
        this.applyLastDay(date);
        this.props.act(date);
    };

    createDateObject = () => new Date(this.props.date.getFullYear(),
                                      this.props.date.getMonth(),
                                      2);
    applyLastDay = date => {
        const today = new Date();
        let day;
        if (today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()) {
            day = today.getDate();
        } else {
            day = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        }
        date.setDate(day);
    };


    render () {
        return (
            <h4 className="card-title text-center">
                <span style={this.style} onClick={this.subtractMonth}>
                    {'< '}
                </span>
                <span>
                    {this.convertToDate()}
                </span>
                <span style={this.style} onClick={this.addMonth}>
                    {' >'}
                </span>
            </h4>
        );
    }
}