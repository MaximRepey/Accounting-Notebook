import { arrayOf, shape, string, number } from 'prop-types';
export const SERVER_URL = 'http://localhost:5000';

export const propTypes = {
    transactions: arrayOf(
        shape({
            type: string.isRequired,
            amount: number.isRequired,
            createdAt: string.isRequired,
        })
    )
};

export const TRANSACTION_TYPES = {
    CREDIT: 'Credit',
    DEBET: 'Debet',
}