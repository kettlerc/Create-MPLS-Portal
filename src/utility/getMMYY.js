// Little function to convert a datetime block to human time

export default (rawDate) => {
    const date = new Date(rawDate); //likely from sql
    let month = date.getMonth() + 1; // Months are 0 - 11
    month = (month < 10) ? '0' + month : month ; // if single digit, add leading 0
    return `${month}/${date.getDate()}`;
} // End humanReadableTime
