function baseHandler(controller) {
    return async (req, res, next) => {
        try {

            const response = await controller(req, res, next);
            return res.send({
                result: 'SUCCESS',
                data: response
            });

        } catch(err) {

            return res.status(err.code || 500).send({
                result: 'ERROR',
                error: err.message,
                data: null
            })

        }
    }
}

module.exports = baseHandler;