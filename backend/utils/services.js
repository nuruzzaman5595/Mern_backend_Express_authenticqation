export const asyncHandler = (handler) => (req, res, next) => {
	Promise.resolve(handler(req, res, next)).catch(next);
};

export const getRequiredEnv = (name) => {
	const value = process.env[name];

	if (!value) {
		throw new Error(`${name} is not configured`);
	}

	return value;
};
