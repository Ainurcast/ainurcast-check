import moment from "moment";

const commonData = {
    formatDate: (date, format) => {
        return moment(date || new Date()).format(format || "DD MMM YYYY");
    },
    uploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        const loader = document.querySelector(".custom-loader");
        loader.style.width = `${percent}%`;
    },
    isIpad: window.matchMedia("(min-width:768px) and (max-width: 1024px)").matches,
    isMobPhone: window.matchMedia("(min-width:320px) and (max-width: 767px)").matches,
};

export default commonData;
