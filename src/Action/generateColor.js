const generateColor = (start, end, range) => {
    let color = (((end - start) * range) + start).toString(16).split('.')[0];
    color = '0'.repeat(2 - color.length) + color;
    return color + color + color;
};

export default generateColor;
