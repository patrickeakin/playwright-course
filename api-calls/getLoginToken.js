import * as nodeFetch from 'node-fetch'

export const getLoginToken = async (username, password) => {
    const response = await nodeFetch('http://localhost:2221/api/login', {
        method: 'post',
        body: JSON.stringify({ "username": username,"password": password }),
        headers: {'Content-Type': 'application/json'},
    })
    if (response.status !== 200) {
        throw new Error('An error occured retrieving the login token. Status: ' + response.status)
    }
    const body = await response.json()
    return body.token
}