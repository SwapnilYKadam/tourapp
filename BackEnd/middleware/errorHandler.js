export const errorHandler = (err, req, res, next) => {
    console.log(res.statusCode);
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

// export const notFound = (err, req, res, next) => {
//     console.log(req.originalUrl);

//     const error = new Error(`Not found - ${req.originalUrl}`)
//     res.status(404)
//     next(error)
// }