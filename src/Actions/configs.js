export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().authR.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};