import React from 'react';
import '../bootstrap.css';


function Entry(props) {
    const dateO = new Date(props.entry.expense_date + ' 13:00:00');
    let categName;
    if (props.entry.expense_sum < 0){
        categName = props.expenses[props.entry.expense_categ] ? props.expenses[props.entry.expense_categ] : 'Undefined';
    } else {
        categName = props.incomes[props.entry.expense_categ] ? props.incomes[props.entry.expense_categ] : 'Undefined';
    }
    const styling = {color: ''};
    if (props.entry.expense_sum > 0) {
        styling.color = 'green';
    }
    else {
        styling.color = 'red';
    }
    return (
        <tr>
            <td>{dateO.toDateString()}</td>
            <td>{categName}</td>
            <td>{props.entry.expense_descr ? props.entry.expense_descr : '--'}</td>
            <td><span style={styling}>{props.format(props.entry.expense_sum)}</span></td>
            <td><button className="btn btn-danger" onClick={() => props.handler(props.entry.expense_id)}>X</button></td>
        </tr>
    );
}

export default Entry;