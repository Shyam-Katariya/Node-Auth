// this function handle error
const errorHandler = (err, req, res, next) => {
    const code = err?.statusCode || 500;
    const message = err?.message || 'Internal Server Error';
    res.status(code).json({
        status: code,
        type: 'error',
        message: message,
    });
};

module.exports = errorHandler;
