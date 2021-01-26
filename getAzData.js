const axios = require('axios');
const crawler = require('crawler-request');

const fetchData = async () => {
    try {
        return await axios.get('https://ahmcho.com/covidparser');
    } catch (error) {
        throw new Error('Failed! :',error);
    }
}

const getLink = async () => {
    const link = await fetchData();
    if(link !== ''){
        return link.data
    }
}

exports.getLink = getLink;