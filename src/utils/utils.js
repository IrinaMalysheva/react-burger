export function checkResponse(resp) {
    if (resp.ok) {
        return resp.json();
    } else {
        return Promise.reject("Error on fetch(): " + resp.status)
    }
}