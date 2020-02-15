let axios = require("axios");

const api = {
    getUser(username) {
        console.log("Searching systems...")
        return axios.get(`https://api.github.com/users/${username}`)
        .then(data => {return data})
        .catch(err =>console.log(err))
    }
};

module.exports = api;