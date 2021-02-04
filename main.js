let allCountries;

$(() => {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://restcountries.eu/rest/v2/all",
        data: "data",
        success: response => {
            allCountries = response;
        },
        error: () => {
            console.error(`Not found.`);
            alert(`Error! info not found.`);
        }
    });
});

$("#show-all-btn").click(() => {
    $("main").html("").hide().fadeIn(500);
    allCountries.map(country => createCards(country));
    $("#show-all-btn").prop("disabled", true).css("text-decoration", "line-through");
});

function createCards(country) {
    let card = $("<div>")
        .attr({ "id": "card", "class": "card" })
        .css("width", "18rem");
    let cardLink = $("<a>")
        .attr({ "href": country.flag, "target": "_blank" });
    let cardImg = $("<img>")
        .attr({ "id": "cardImg", "class": "card-img-top", "src": country.flag, "alt": "Flag" });
    let cardBody = $("<div>")
        .attr("class", "card-body");
    let cardTitle = $("<div>")
        .attr("class", "card-title")
        .html(country.name);
    let cardInfo = $("<ul>")
        .attr("class", "list-group card-info");
    let topLevelDomain = $("<li>")
        .attr("class", "list-group-item topLevelDomain")
        .html("<strong>Top level domain: </strong>" + country.topLevelDomain);
    let capital = $("<li>")
        .attr("class", "list-group-item capital")
        .html("<strong>Capital: </strong>" + country.capital);
    let currencies = $("<ul>")
        .attr("class", "currencies list-group-item")
        .html("<strong>Currencies: </strong>");
    let borders = $("<li>")
        .attr("class", "list-group-item borders")
        .html("<strong>Borders: </strong>" + country.borders.toString());

    $("main").append(card);
    card.append(cardLink, cardBody);
    cardLink.append(cardImg);
    cardBody.append(cardTitle, cardInfo);
    cardInfo.append(topLevelDomain, capital, currencies, borders);

    country.currencies.map(currency => {
        let allCurrencies = $("<li>").attr("class", "list-group-item")
            .html(currency.symbol + " " + currency.name + " (" + currency.code + ")");
        currencies.append(allCurrencies);
    });
}

$("#search-btn").click(e => {
    e.preventDefault();
    let searchBox = document.getElementById("search-box");
    let userInput = searchBox.value.toUpperCase().trim();

    if (userInput == "") {
        alert("What country are you looking for?");
        return;
    }

    whenUserInputValid(searchBox);
    let found = false;
    allCountries.map(country => {
        if (country.name.toUpperCase().includes(userInput)) {
            $("main").fadeIn("linear").html(createCards(country));
            return found = true;
        }
    });
    if (!found) {
        alert(`"${userInput}" is not found`);
    }
});

function whenUserInputValid(searchBox) {
    $("#show-all-btn").prop("disabled", false).css("text-decoration", "none");
    searchBox.value = "";
    $("main").hide().html("");
}
