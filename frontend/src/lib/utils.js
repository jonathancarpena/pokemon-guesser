export const shuffleArray = (array) => {

    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;

}


export function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    hours = hours % 24;

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }


    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
        seconds,
    )}`
}

export function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
