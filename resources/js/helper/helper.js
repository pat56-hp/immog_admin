const getDate = (data) => {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return (
        day +
        "/" +
        month +
        "/" +
        year +
        " à " +
        date.toLocaleTimeString().slice(0, 5)
    );
};

const getFormattedDate = (data) => {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return year + "-" + month + "-" + day;
};

const showFile = (file, onSetPrevent) => {
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            onSetPrevent(reader.result);
        };

        reader.readAsDataURL(file);
    } else {
        onSetPrevent(null);
    }
};

export { getDate, showFile, getFormattedDate };
