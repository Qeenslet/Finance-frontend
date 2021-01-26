import React, {Component} from 'react'
import Entry from "./Elements/Entry";
import Entries from "./Elements/Entries";
import Modal from "./Elements/Modal";
import EntryForm from "./Elements/EntryForm";
import StatInfo from "./Elements/StatInfo";
import './bootstrap.css';

class FinanceApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
          entries: [],
          statistics: {},
          showModal: false,
          date: new Date()
        };
    }
    async componentDidMount() {
        this.recieveData();
    }

    deleteAction = async (id) => {
        const today = new Date();
        let deletedDay = today.toISOString().split('T')[0];
        const data = {};
        data.expense_id = id;
        data.delete_day = deletedDay;
        let d = this.prepareCommand('DEL', data);

        const key = await this.saveEntry(d);
        if (key) {
            this.recieveData();
        }
    };

    roundAndFormat = float => {
        if (float < 0) float *= -1;
        return '$' + this.justRound(float);
    };

    justRound = number => (Math.round(number * 100) / 100).toFixed(2);

    changeMonth = date => {
        this.setState({
            date: date
        }, () => {
            this.recieveData();
        });

    };

    render () {
        let balance = 0;
        const entries = [];
        const inflows = {};
        const outflows = {};
        for (let i in this.state.entries) {
            const one = this.state.entries[i];
            entries.push(one);
            let s = parseFloat(one.expense_sum);
            if (s < 0) {
                if (!outflows[one.expense_categ]) {
                    outflows[one.expense_categ] = 0;
                }
                outflows[one.expense_categ] += s * -1;
            } else {
                if (!inflows[one.expense_categ]) {
                    inflows[one.expense_categ] = 0;
                }
                inflows[one.expense_categ] += s;
            }
            balance += s;
        }
        return (
            <div className="row">
                <div className="col-md-6">
                    <StatInfo
                        format={this.roundAndFormat}
                        balance={balance}
                        ins={inflows}
                        incomes={this.props.params.incomes}
                        outs={outflows}
                        outflows={this.props.params.expenses}
                        date={this.state.date}
                        changeMonth={this.changeMonth}
                        statistics={this.state.statistics}
                    />
                </div>
                <div className="col-md-6">
                    <Entries newElement={this.showModal}>
                        {
                            entries.map((item, key) => <Entry key={key}
                                                                entry={item}
                                                                incomes={this.props.params.incomes}
                                                                expenses={this.props.params.expenses}
                                                                handler={this.deleteAction}
                                                                format={this.roundAndFormat}/>)
                        }
                    </Entries>
                </div>
                <Modal header="Add entry" onClose={this.showModal} show={this.state.show}>
                    <EntryForm expenses={this.props.params.expenses}
                               incomes={this.props.params.incomes}
                               eventHandler={this.saveAndUpdate}/>
                </Modal>
            </div>
        );
    }

    async getData (date) {
        let apiString = this.props.params.uri + '/entries/' + this.getMonthYearString(date);
        const reqHeaders = this.getHeaders();
        return fetch(apiString, {
            headers: reqHeaders,
            credentials: 'omit',
            method: 'GET'
        }).then(response => response.json());
    }

    getStatistics = date => {
        let apiString = this.props.params.uri + '/average/' + this.getMonthYearString(date);
        const reqHeaders = this.getHeaders();
        return fetch(apiString, {
            headers: reqHeaders,
            credentials: 'omit',
            method: 'GET'
        }).then(response => response.json());
    };

    showModal = () => {
        this.setState({
            show: !this.state.show
        })
    };

    getMonthYearString = date => {
        let m = date.getMonth() + 1;
        if (m < 10) m = '0' + m;
        let y = date.getFullYear();
        return  m + '-' + y;
    };


    async saveEntry(d) {
        let apiString = this.props.params.uri + "/operations";
        const headers = this.getHeaders();
        return fetch(apiString, {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: d
        }).then(response => {
            return response.json()
        });
    }

    saveAndUpdate = async data => {
        this.showModal();
        let d = this.prepareCommand('ADD', data);
        const key = await this.saveEntry(d);
        if (key) {
            this.recieveData();
        }
    };

    getHeaders = () => {
        let apiKey = this.props.params.key;
        const reqHeaders = new Headers();
        reqHeaders.append('Finance-Key', apiKey);
        reqHeaders.append('Content-Type', 'application/json');
        return reqHeaders;
    };

    async recieveData() {
        const data = await this.getData(this.state.date);
        let entries = [];
        if (data.entries && data.entries.real) {
            entries = data.entries.real;
        }
        const statics = await this.getStatistics(this.state.date);
        const statData = statics.average ? statics.average : {};
        this.setState({
            entries: entries,
            statistics: statData
        });
    }

    prepareCommand = (action, data) => {
        const array = [];
        const operation = {};
        operation.command = action;
        operation.operation_data = JSON.stringify(data);
        array.push(operation);
        return JSON.stringify(array);
    }



}
export default FinanceApp;