import React from 'react';

class EntryFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expense_date: '',
            expense_categ: '',
            expense_sum : '',
            expense_descr: '',
            type_select: '',
            validation: {}
        }
    }

    generateId = () => Math.random().toString(36).substr(2, 10) + this.state.expense_date;

    handleChange = event => {
        const objectUpdate = {};
        objectUpdate[event.target.name] = event.target.value;
        this.setState(objectUpdate);
    };

    applyForm = event => {
        event.preventDefault();
        if (this.state.expense_date &&
            this.state.type_select &&
            this.state.expense_sum &&
            this.props.eventHandler) {
            const result = {};
            result.expense_date = this.state.expense_date;
            result.expense_categ = this.state.expense_categ;
            result.expense_sum = parseFloat(this.state.expense_sum);
            result.expense_descr = this.state.expense_descr;
            result.expense_id = this.generateId();
            if (this.state.type_select === 'expenses') {
                result.expense_sum *= -1;
            }
            this.props.eventHandler(result);
        } else {
            const validation = {};
            validation.expense_date = this.state.expense_date ? 'is-valid' : 'is-invalid';
            validation.type_select = this.state.type_select ? 'is-valid' : 'is-invalid';
            validation.expense_sum = this.state.expense_sum ? 'is-valid' : 'is-invalid';
            this.setState({validation: validation})
        }
    };

    render() {
        const options = [];
        if (this.state.type_select && this.props[this.state.type_select]) {
            for (let i in this.props[this.state.type_select]) {
                options.push(
                    {
                        value: this.props[this.state.type_select][i],
                        key: i
                    }
                );
            }
        }
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="expense_date">Date</label>
                        <input className={"form-control" + (this.state.validation.expense_date ? ' ' + this.state.validation.expense_date : '')}
                               type="date"
                               id="expense_date"
                               value={this.state.expense_date}
                               name="expense_date"
                               onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type_select">Expense/income</label>
                        <select name="type_select"
                                onChange={this.handleChange}
                                className={"form-control" + (this.state.validation.type_select ? ' ' + this.state.validation.type_select : '')}
                                id="type_select"
                                value={this.state.type_select}>
                            <option value="">...</option>
                            <option value="expenses">Expense</option>
                            <option value="incomes">Income</option>
                        </select>
                    </div>
                    {
                        this.state.type_select && this.props[this.state.type_select] &&
                        <div className="form-group flow_selector">
                            <label htmlFor="expense_categ_inside">Group</label>
                            <select name="expense_categ"
                                    className="form-control"
                                    value={this.state.expense_categ}
                                    onChange={this.handleChange}>
                                <option key="def">...</option>
                                {
                                    options.map(item => <option key={item.key} value={item.key}>{item.value}</option>)
                                }
                            </select>
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="expense_sum">$ amount</label>
                        <input className={"form-control" + (this.state.validation.expense_sum ? ' ' + this.state.validation.expense_sum : '')}
                               type="text"
                               id="expense_sum"
                               name="expense_sum"
                               onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expense_descr">Description</label>
                        <input className="form-control"
                               type="text"
                               id="expense_descr"
                               name="expense_descr"
                               onChange={this.handleChange} />
                    </div>
                    <button className="btn btn-success" onClick={this.applyForm}>Add</button>
                </form>
            </div>
        );
    }
}

export default EntryFrom;