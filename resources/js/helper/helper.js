const getDate = (data) => {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return day + "/" + month + "/" + year;
};

const blurFocusedElement = () => {
    if (
        typeof document !== "undefined" &&
        document.activeElement instanceof HTMLElement
    ) {
        document.activeElement.blur();
    }
};

export { getDate, blurFocusedElement };
