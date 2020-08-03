const HEADERS = { "Content-Type": "application/json" };
const useFetch = async (query, variables = {}, headers = HEADERS) => {
    return fetch("http://127.0.0.1:4000/graphql", {
        method: "POST",
        headers,
        body: JSON.stringify({
            query,
            variables
        })
    })
        .then(response => response.json())
        .catch(err => {
            throw new Error(err);
        });
};

const useFetchMulti = async body => {
    return fetch("http://127.0.0.1:4000/graphql", {
        method: "POST",
        body: body
    })
        .then(response => response.json())
        .catch(err => {
            throw new Error(err);
        });
};
