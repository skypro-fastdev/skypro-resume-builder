
/**
 * Возвращает дату, которая на случайное количество дней меньше текущей даты.
 *
 * @param {number} daysAgoMin - Минимальное количество дней назад от текущей даты.
 * @param {number} daysAgoMax - Максимальное количество дней назад от текущей даты.
 * @returns {Date} Дата, соответствующая случайному количеству дней назад от текущей даты.
 */
function getDateRandomDaysAgo(daysAgoMin, daysAgoMax) {
    const randomDaysAgo = Math.floor(Math.random() * (daysAgoMax - daysAgoMin + 1)) + daysAgoMin;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - randomDaysAgo);

    return currentDate
}


/**
 * Форматирует дату в строку в формате ГГГГ-ММ-ДД.
 *
 * @param {Date} date - Дата, которую необходимо форматировать.
 * @returns {string} Строка, представляющая дату в формате ГГГГ-ММ-ДД.
 */
function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


/**
 * Парсит строку даты в формате ГГГГ-ММ-ДД в объект Date.
 *
 * @param {string} dateString - Строка, представляющая дату в формате ГГГГ-ММ-ДД.
 * @returns {Date} Объект Date, соответствующий указанной строке даты.
 */
function parseDate(dateString) {
    return new Date(dateString);
}

function ruDate(date){
    return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric'})
}
