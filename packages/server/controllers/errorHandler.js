module.exports = (err, req, res, next) => {
    console.log(err)
    const isLocked = err.includes('Locked');
    if (isLocked) {
        res.status(423).send(err);
        return;
    }

    const notEnoughMoney = err.includes('Not enough money');
    if(notEnoughMoney) {
        res.status(403).send(err);
        return;
    }

    res.status(500).json({error: err})
    next();
};