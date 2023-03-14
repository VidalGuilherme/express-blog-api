const soma = (req, resp) => {
    const soma = 100 + 1;

    resp.json(soma);
};


module.exports = {soma};