//coinranking36e826d92018331b2aa81434493cbe8174ef7352bdf96fd4

let baseUrl = 'https://api.coinranking.com/v2/coins' // api url
let proxyUrl = 'https://cors-anywhere.herokuapp.com/' //cors proxy
let apiKey = 'coinranking36e826d92018331b2aa81434493cbe8174ef7352bdf96fd4' //api key

function fetchData() {
    const apiLoadingState = document.querySelector('.loading')
    apiLoadingState.classList += ' loading__active' //adds spinner loading state while i fetch api
    fetch(`${proxyUrl}${baseUrl}`, { //${proxyUrl}
        method: 'GET', //get rqst
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${apiKey}`, //use the api key in header
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        if (response.ok) { //if 200
            response.json().then((json) => { //convert to json
                apiLoadingState.classList.remove("loading__active"); //remove loading state since we got the data
                let coinsData = json.data.coins; //make variable w data
                if (coinsData.length > 0) {
                    var cryptoCoin = '' //make empty string
                    //for loop to go through each coin 
                    coinsData.map((coin) => {
                        cryptoCoin += '<tr>'; //add the html to display the coins
                        cryptoCoin += `<td><img class="icons__crypto" src="${coin.iconUrl}"></td>`
                        cryptoCoin += `<td>${coin.rank}</td>`
                        cryptoCoin += `<td>${coin.name}</td>`
                        cryptoCoin += `<td>${priceRound(coin.price)}</td>`
                        cryptoCoin += `<td>${coin.symbol}</td>`
                        cryptoCoin += `<td class="${redGreen(coin.change)}">${changeFilter(coin.change)}%</td>`; "<tr>"
                    })
                    document.getElementById("data").innerHTML = cryptoCoin;
                }
            }
            )
        }
    }).catch((error) => {
        console.log(error) //in case something goes wrong
    });
}

function changeFilter(change) { //add a + to the positive % change in price since by default API only includes negative symbol not positive
    if (change.charAt(0) != '-') {
        return `+${change}`;
    }
    return change; //return it
}

function priceRound(price) { //round to 2 decimal points since api uses like 8 dp
    finalPrice = parseFloat(price);
    return `$${finalPrice.toFixed(2)}`; //return w correct currency exchange
}

function redGreen(change) {  //change colours based on whether change is positive or negative to make it easier for user to spot good investments ;)
    if (change.charAt(0) == '-') {
        return 'red__change'
    }
    return 'green__change'
}

// FILTER FUNCTION
function fetchFilterData(event) { //fetch data again and return the event from the select tag
    const apiLoadingState = document.querySelector('.loading')
    apiLoadingState.classList += ' loading__active'
    fetch(`${proxyUrl}${baseUrl}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${apiKey}`,
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        if (response.ok) {
            response.json().then((json) => {
                apiLoadingState.classList.remove("loading__active");
                let coinsData = json.data.coins;
                let filter = event.target.value
                if (coinsData.length > 0) {
                    var cryptoCoin = ''
                }
                if (filter === "LOW_TO_HIGH") {
                    coinsData.sort((a, b) => (a.price) - (b.price));
                }
                else if (filter === "HIGH_TO_LOW") {
                    coinsData.sort((a, b) => (b.price) - (a.price));
                }
                //for loop to go through each coin 
                coinsData.map((coin) => {
                    cryptoCoin += '<tr>';
                    cryptoCoin += `<td><img class="icons__crypto" src="${coin.iconUrl}"></td>`
                    cryptoCoin += `<td>${coin.rank}</td>`
                    cryptoCoin += `<td>${coin.name}</td>`
                    cryptoCoin += `<td>${priceRound(coin.price)}</td>`
                    cryptoCoin += `<td>${coin.symbol}</td>`
                    cryptoCoin += `<td class="${redGreen(coin.change)}">${changeFilter(coin.change)}%</td>`; "<tr>"
                })
                document.getElementById("data").innerHTML = cryptoCoin;
            }
            )
        }
    }).catch((error) => {
        console.log(error)
    });
}

// SEARCH FUNCTION
function searchData(event) { //refetch data but also include value from input for coin search
    const apiLoadingState = document.querySelector('.loading');
    apiLoadingState.classList += ' loading__active';
    fetch(`${proxyUrl}${baseUrl}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${apiKey}`,
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        if (response.ok) {
            response.json().then((json) => {
                apiLoadingState.classList.remove("loading__active");
                let coinsData = json.data.coins;
                const name = event.target.value;
                if (coinsData.length > 0) {
                    var cryptoCoin = '';
                }
                //for loop to go through each coin and check if the name is included
                coinsData.map((coin) => {
                    let coinName = coin.name.toLowerCase() //make it non-case sensitive since to make everything easier
                    let searchName = name.toLowerCase() //same as above
                    if (coinName.includes(searchName)) { //search for the coin and print out all matching values where the searched string is included in the api coin name
                        cryptoCoin += '<tr>';
                        cryptoCoin += `<td><img class="icons__crypto" src="${coin.iconUrl}"></td>`
                        cryptoCoin += `<td>${coin.rank}</td>`
                        cryptoCoin += `<td>${coin.name}</td>`
                        cryptoCoin += `<td>${priceRound(coin.price)}</td>`
                        cryptoCoin += `<td>${coin.symbol}</td>`
                        cryptoCoin += `<td class="${redGreen(coin.change)}">${changeFilter(coin.change)}%</td>`; "<tr>"
                    }
                })
                document.getElementById("data").innerHTML = cryptoCoin;
            }
            )
        }
    }).catch((error) => {
        console.log(error);
    });
}

fetchData();
