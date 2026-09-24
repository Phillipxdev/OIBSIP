const form = document.getElementById("converterForm");

const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");

const errorMessage = document.getElementById("errorMessage");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const inputValue = temperatureInput.value.trim();

    errorMessage.textContent = "";


    if (inputValue === "") {

        showError("Please enter a temperature.");

        return;
    }


    if (isNaN(inputValue)) {

        showError("Please enter a valid numeric value.");

        return;
    }


    const temperature = Number(inputValue);

    const selectedUnit = unitSelect.value;


    let celsius;
    let fahrenheit;
    let kelvin;


    if (selectedUnit === "celsius") {

        if (temperature < -273.15) {

            showError(
                "Temperature cannot be below absolute zero (-273.15°C)."
            );

            return;
        }

        celsius = temperature;

        fahrenheit = (celsius * 9 / 5) + 32;

        kelvin = celsius + 273.15;
    }


    else if (selectedUnit === "fahrenheit") {

        if (temperature < -459.67) {

            showError(
                "Temperature cannot be below absolute zero (-459.67°F)."
            );

            return;
        }

        fahrenheit = temperature;

        celsius = (fahrenheit - 32) * 5 / 9;

        kelvin = celsius + 273.15;
    }


    else if (selectedUnit === "kelvin") {

        if (temperature < 0) {

            showError(
                "Kelvin cannot be below absolute zero (0 K)."
            );

            return;
        }

        kelvin = temperature;

        celsius = kelvin - 273.15;

        fahrenheit = (celsius * 9 / 5) + 32;
    }


    displayResults(
        celsius,
        fahrenheit,
        kelvin
    );

});


function displayResults(celsius, fahrenheit, kelvin) {

    celsiusResult.textContent =
        `${celsius.toFixed(2)} °C`;

    fahrenheitResult.textContent =
        `${fahrenheit.toFixed(2)} °F`;

    kelvinResult.textContent =
        `${kelvin.toFixed(2)} K`;
}


function showError(message) {

    errorMessage.textContent = message;

    celsiusResult.textContent = "-- °C";

    fahrenheitResult.textContent = "-- °F";

    kelvinResult.textContent = "-- K";
}