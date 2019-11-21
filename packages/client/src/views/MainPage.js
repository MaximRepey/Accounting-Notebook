import React, { Component } from 'react';

import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import AccountInfo from '../components/AccountInfo';
import AccountActions from '../components/AccountActions';
import Transactions from '../components/Transactions';

import { SERVER_URL } from '../constants';

import './style.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            isLoading: false,
            error: ''
        };
    }

    componentDidMount() {
        this.fetchTransactions();
    }

    fetchTransactions = () => {
        this.setState({ isLoading: true, error: '' });
        fetch(`${SERVER_URL}/api/transactions`)
            .then((res) => {
                if(res.status === 200) {
                    return res.json();
                } else {
                    res.text().then(error => this.setState({ error }))
                }
            })
            .then(transactions => this.setState({ transactions }))
            .catch(error => this.setState({ error }))
            .finally(() =>  this.setState({ isLoading: false }));
    };

    postTransaction = transaction => {
        this.setState({ isLoading: true, error: '' });
        fetch(`${SERVER_URL}/api/transactions`,
            {
                method: 'POST',
                body: JSON.stringify(transaction),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                if(res.status === 200) {
                    this.fetchTransactions()
                } else {
                    res.text().then(error => this.setState({ error }))
                }
            })
            .finally(() =>  this.setState({ isLoading: false }));
    };

    render() {
        const { transactions, isLoading, error } = this.state;
        return (
            <Container className="MainPageWrapper">
                {error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                )}
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8}>
                        <Header />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8}>
                        <AccountInfo transactions={transactions} />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8}>
                        <AccountActions postTransaction={this.postTransaction} />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8}>
                        <Transactions transactions={transactions} />
                    </Col>
                </Row>
                {isLoading && (
                    <div className="MainPageSpinnerWrapper">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                )}
            </Container>
        )
    }
};

export default MainPage;