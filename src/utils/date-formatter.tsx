// Function to format the date as dd/MM/yyyy
function formatDate(date: string) {
    const dateObj = new Date(date);
    let day = String(dateObj.getDate()).padStart(2, '0');
    let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    let year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
}

export default formatDate;
