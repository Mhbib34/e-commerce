import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			console.warn("Unauthorized, skipping...");
			// Optional: redirect to login
			// window.location.href = "/login";
			return Promise.resolve({ data: { cart: [] } }); // Graceful fallback
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
