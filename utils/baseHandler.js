function baseHandler(controller) {
    return async (req, res) => {
        try {

            const response = await controller(req, res);
            return res.send({
                result: 'SUCCESS',
                data: response
            });

        } catch(err) {

            return res.send({
                result: 'ERROR',
                error: err.message,
                data: null
            })

        }
    }
}

module.exports = baseHandler;