// this file handles the api calls to our backend
// functions require an api endpoint a token and a doc


// create a record
const createOne = (endpoint, token, doc) => {

    console.log(doc)
    return fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(doc)
    })
    .then(httpResponse => {
        if (!httpResponse.ok) {
            throw new Error(`Error with POST at ${endpoint}`)
        }
        return httpResponse.json()
    })
    .catch(err => {
        throw err
    })
}

// get all
const getAll = (endpoint) => {


    return fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(httpResponse => {

            if (!httpResponse.ok) {
                throw new Error(`Error with GET at ${endpoint}`)
            }
            return httpResponse.json()

        })
        .catch(err => {
            throw err
        })
}
// get one
const getOne = () => {

}
// patch one
const patchOne = (endpoint, doc) => {


    return fetch(endpoint, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(doc)
    })
        .then(httpResponse => {

            if (!httpResponse.ok) {
                throw new Error(`Error with PATCH at ${endpoint}`)
            }
            return httpResponse.json()
        })
        .catch(err => {
            throw err
        })
}
// update one
const updateOne = (endpoint, doc) => {

    return fetch(endpoint, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(doc)
    })
        .then(httpResponse => {
            if (!httpResponse.ok) {
                throw new Error(`Error with PUT at ${endpoint}`)
            }
            return httpResponse.json()
        })
        .catch(err => {
            throw err
        })

}
// delete one
const deleteOne = (endpoint) => {

    return fetch(endpoint, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(httpResponse => {

            if (!httpResponse.ok) {
                throw new Error(`Error with DELETE at ${endpoint}`)
            }
            return httpResponse.json()

        })
        .catch(err => {
            throw err
        })
}

export { createOne, getAll, getOne, updateOne, patchOne, deleteOne }