import React, { useMemo } from 'react';

import { propTypes, TRANSACTION_TYPES } from '../../constants';

const AccountInfo = ({ transactions }) => {
    const accountAmount = useMemo(() =>
        transactions
            .reduce((acc, val) => val.type === TRANSACTION_TYPES.CREDIT ? acc + val.amount : acc - val.amount, 0),
        [transactions]
    );

    return <div className="text-center mt-3">Your Account Amount: {accountAmount}</div>
};

AccountInfo.propTypes = {
    transactions: propTypes.transactions,
};

export default AccountInfo;