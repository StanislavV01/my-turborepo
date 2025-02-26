import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://min-api.cryptocompare.com',
	timeout: 10000,
	headers: {
		"Content-type":"application/json; charset=UTF-8",
		'authorization': `Apikey ${process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY || ''}`,
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			const status = error.response.status;
			if (status === 429) {
				console.error('Rate limit exceeded for CryptoCompare API');
			} else if (status === 401 || status === 403) {
				console.error('Unauthorized: Invalid or missing API key');
			} else {
				console.error('Response error:', error.response.data);
			}
		} else if (error.request) {
			console.error('Request error:', error.request);
		} else {
			console.error('Error:', error.message);
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
