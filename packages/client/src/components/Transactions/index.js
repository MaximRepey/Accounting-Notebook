import React from 'react';

import { Accordion, Card } from 'react-bootstrap';

import { propTypes, TRANSACTION_TYPES } from '../../constants';

const Transactions = ({ transactions }) => transactions.length ?
    (
        <>
            <div className="mt-4">History:</div>
            <Accordion className="mt-3">
                {transactions.map((transaction, idx) => (
                    <Card key={transaction.type+transaction.amout+idx}>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey={idx}
                            className='d-flex justify-content-between'
                            style={{
                                background: transaction.type === TRANSACTION_TYPES.CREDIT ? '#00c392' : '#f1335c',
                                color: '#FFF'
                            }}
                        >
                            <div>
                                TransactionType: {transaction.type}
                            </div>
                            <div>
                                Amount: {transaction.amount}
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={idx}>
                            <Card.Body>Date: {transaction.createdAt}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
        </>
    )
    :
    null;

Transactions.propTypes = {
    transactions: propTypes.transactions,
};

export default Transactions;