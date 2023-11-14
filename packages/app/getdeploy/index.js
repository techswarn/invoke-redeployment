const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const fetch = require("node-fetch");
async function main(event, context) {
  console.log("Log of event and context");
  console.log(event);
  console.log(context);

  const url = "https://api.digitalocean.com/v2/apps";

  //Make sure to add your DO API token, to do so create config.env file in folder /invoke-deploy and add the following line:
  //TOKEN="<Your token>"
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.TOKEN,
    },
  };

  try {
    const response = await fetch(url, options);
    console.log(response.status);
    const jsonResponse = await response.json();
    console.log("JSON response", jsonResponse);
    if (response.status == 200) {
      return {
        body: {
          message: "List of apps",
          details: jsonResponse,
          statusCode: 200,
        },
      };
    } else {
      return {
        body: {
          message: "Failed",
          details: jsonResponse,
          statusCode: 400,
        },
      };
    }
  } catch (err) {
    console.log("ERROR", err);
    return {
      body: {
        message: "Failed",
        statusCode: 500,
      },
    };
  }
}

exports.main = main;
