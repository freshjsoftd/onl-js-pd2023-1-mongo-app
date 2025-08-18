const { PAGINATION_SCHEMA } = require('../utils/validationSchemas');

module.exports.paginate = async (req, res, next) => {
	const { page, result } = req.query;

  const defaultPagination = {
		limit: 5,
		offset: 0,
	};

	const pagination = {
		limit: result ?? 5,
		offset: (page - 1) * result || 0,
	};

	try {
		if (await PAGINATION_SCHEMA.isValid(pagination)) {
      // console.log('YES')
			req.pagination = pagination;
		} else {
      // console.log('NO')
			req.pagination = defaultPagination;
		}
		next();
	} catch (error) {
		console.log(error.message);
		next(error);
	}
};
