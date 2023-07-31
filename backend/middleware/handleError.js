import AppError from "../utils/AppError.js"

const notFound = (req, res, next) => {
    next(new AppError(404, "Not found"))
}

const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500
    const message = err.message ? err.message : "Something went wrong"
    res
        .status(statusCode)
        .json(process.env.NODE_ENV != "development" ? { statusCode, message }
            : { statusCode, message, stack: err.stack })
}

export { notFound, handleError }