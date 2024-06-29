import axios from "axios";
import history from "./history";

const handleSuccess = (response) => {
    return response;
};

// const BASE_URL = "https://api-v1.ainurcast.com/";
const BASE_URL = "https://a9b2-2406-7400-61-657c-696b-6002-8e66-d395.ngrok-free.app/";


const handleError = (error) => {
    console.log("error",error)
    if (error) {
        const { status, data } = error;
        const errRes = {
            status,
            data,
        };
        return errRes;
    }
};

const helpers = {};
const methods = ["get", "post", "put", "destroy", "patch"];
methods.forEach((method) => {
    const fn = async (url, data = {}) => {
        const {
            isFormData,
            hasRole,
            external,
            isAuth,
            cancelToken,
            uploadProgress = () => {},
            showUploadProgress = false,
            ...query
        } = data;
        const headers = {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
            "x-csrftoken": Math.random(),
            "Access-Control-Allow-Origin":"*",
        };
        if (!isAuth) {
            headers["SESSION-TOKEN"] = localStorage.getItem("SESSION-TOKEN");
            headers["USER-CODE"] = localStorage.getItem("USER-CODE");
        }

        const verb = method === "destroy" ? "delete" : method;

        let options = {
            method: verb,
            url: external ? url : `${BASE_URL}${url}`,
            headers: external ? {} : headers,
        };

        switch (method) {
            case "get": {
                options.params = query;
                break;
            }
            case "post": {
                if (isFormData) {
                    options.headers["Content-Type"] = "multipart/form-data";
                    options.data = query.formData;
                    options.cancelToken = cancelToken;
                } else {
                    options.headers["Content-Type"] =
                        "application/x-www-form-urlencoded";
                    const slugifiedData = new URLSearchParams(query);
                    options.data = slugifiedData;
                }
                if (showUploadProgress) {
                    options.onUploadProgress = uploadProgress;
                }
                break;
            }
            case "put": {
                options.headers["Content-Type"] =
                    "application/x-www-form-urlencoded";
                const slugifiedData = new URLSearchParams(query);
                options.data = slugifiedData;
                break;
            }
            case "destroy": {
                options.headers["Content-Type"] =
                    "application/x-www-form-urlencoded";
                const slugifiedData = new URLSearchParams(query);
                options.data = slugifiedData;
                break;
            }
            default:
                options.data = query;
        }

        try {
            const response = await axios(options);
            return handleSuccess(response);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.clear();
                // history.push("/auth");
            } else {
                throw handleError(error.response);
            }
        }
    };
    helpers[method] = fn;
});

const {
    get,
    post,
    put,
    destroy, //delete is a reserved word in JS. Hence, using destroy.
    patch,
} = helpers;

export { get, post, put, destroy, patch };

export const isProdURL = () => {
    const prdURLs = ["https://api-v1.ainurcast.com/"];
    return prdURLs.includes(BASE_URL);
};
