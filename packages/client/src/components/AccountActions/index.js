import React, { useCallback, useState } from 'react';
import { func } from 'prop-types';

import { Form, Button } from 'react-bootstrap';

import { TRANSACTION_TYPES } from '../../constants';

const AccountActions = ({ postTransaction }) => {
    const [transactionType, changeTransactionType] = useState(TRANSACTION_TYPES.CREDIT);
    const [transactionAmount, changeTransactionAmount] = useState(0);

    const handleChangeTransactionType = useCallback(event => changeTransactionType(event.target.value), [changeTransactionType]);
    const handleChangeTransactionAmount = useCallback(event => changeTransactionAmount(event.target.value), [changeTransactionAmount]);


    const handleSubmit = useCallback(event => {
        event.preventDefault();
        postTransaction({ type: transactionType, amount: transactionAmount});
        changeTransactionAmount(0);
    }, [transactionType, transactionAmount, postTransaction, changeTransactionAmount]);

    return <form onSubmit={handleSubmit} className="mt-4">
        <div>Create Transaction</div>
        <Form.Group controlId="transactionType" className="mt-3">
            <Form.Label>Transaction Type</Form.Label>
            <Form.Control as="select" onChange={handleChangeTransactionType}>
                <option>{TRANSACTION_TYPES.CREDIT}</option>
                <option>{TRANSACTION_TYPES.DEBET}</option>
            </Form.Control>
        </Form.Group>
        <Form.Label>Transaction Amount</Form.Label>
        <Form.Control type="number" placeholder="Enter transaction amount..." onChange={handleChangeTransactionAmount} value={transactionAmount}/>
        <Button variant="primary" type="submit" className="mt-3" disabled={!transactionAmount}>
            Create
        </Button>
    </form>;
};

AccountActions.propTypes = {
    postTransaction: func.isRequired,
};

export default AccountActions;