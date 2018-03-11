const generateSize = (size, sizeMiddle) => {
    switch (size) {
        case '大':
            return sizeMiddle + 2;

        case '中':
            return sizeMiddle;

        case '小':
            return sizeMiddle - 2;

        default:
            return 0;
    }
};

export default generateSize;
