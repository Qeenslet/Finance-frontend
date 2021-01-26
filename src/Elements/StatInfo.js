import React from "react";
import '../bootstrap.css';
import Balance from "./Balance";
import Category from "./Category";
import MonthSwitcher from "./MonthSwitcher";
import StatCompare from "./StatCompare";

export default class StatInfo extends React.Component {

    roundAndFormat = value => this.props.format(value);


    render () {
        const incomes = [];
        const spents = [];
        let income = 0;
        let spent = 0;
        let historicIn = 0;
        let historicOut = 0;
        let d = this.props.date.getDate();
        if (this.props.ins && this.props.incomes) {
            for (let i in this.props.ins) {
                const one = {};
                if (this.props.statistics[i] && this.props.statistics[i][d]) {
                    one.average = this.props.statistics[i][d];
                } else {
                    one.average = 0;
                }
                if (this.props.incomes[i]) {
                    one.categName = this.props.incomes[i];
                } else {
                    one.categName = 'Undefined';
                }
                one.balance = this.roundAndFormat(this.props.ins[i]);
                one.pure = this.props.ins[i];
                income += parseFloat(this.props.ins[i]);
                incomes.push(one);
            }
        }
        if (this.props.outs && this.props.outflows) {
            for (let i in this.props.outs) {
                const one = {};
                if (this.props.statistics[i] && this.props.statistics[i][d]) {
                    one.average = this.props.statistics[i][d];
                } else {
                    one.average = 0;
                }
                if (this.props.outflows[i]) {
                    one.categName = this.props.outflows[i];
                } else {
                    one.categName = 'Undefined';
                }
                one.balance = this.roundAndFormat(this.props.outs[i]);
                one.pure = this.props.outs[i];
                spent -= parseFloat(this.props.outs[i]);
                spents.push(one);
            }
        }
        for (let key in this.props.statistics) {
            if (key in this.props.incomes) {
                historicIn += this.props.statistics[key][d];
            }
            if (key in this.props.outflows) {
                historicOut += this.props.statistics[key][d];
            }
        }
        incomes.sort((a, b) => (a.pure > b.pure) ? -1 : 1);
        spents.sort((a, b) => (a.pure > b.pure) ? -1 : 1);
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title text-center">
                        Month's balance is: <Balance balance={this.props.balance} format={this.roundAndFormat}/>
                    </h4>
                </div>
                <div className="card-body">
                    <MonthSwitcher date={this.props.date} act={this.props.changeMonth}/>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">{String.fromCharCode(8678)}<br/>
                                        <Balance balance={spent} format={this.roundAndFormat}/>&nbsp;
                                        <StatCompare value={(spent/(historicOut/100)) - 100}
                                                     context="out"/>
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        {
                                            spents.map((one, key) => <Category key={key} entry={one} context="out"/>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">{String.fromCharCode(8680)}<br/>
                                        <Balance balance={income} format={this.roundAndFormat}/>&nbsp;
                                        <StatCompare value={(income/(historicIn/100)) - 100}
                                                     context="in"/>
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        {
                                            incomes.map((one, key) => <Category key={key} entry={one} context="in"/>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}