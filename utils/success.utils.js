const successCommonWithData = (res, code, data, message) => {
    return res.status(code).send({
        status: code,
        type: 'Success',
        data: data,
        message: message,
    });
};

const successCommon = (res, code, message) => {
    return res.status(code).send({
        status: code,
        type: 'Success',
        message: message,
    });
};

module.exports = {
    successCommon,
    successCommonWithData,
}