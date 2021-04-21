async function postData(url = '', data = {}, headers = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export const postIncome = (income, year) => {
    return postData('/v1/national-insurance', { income }, { 'x-run-date': year });
}