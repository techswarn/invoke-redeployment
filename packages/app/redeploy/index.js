const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const fetch = require("node-fetch");
async function main(event, context) {
  console.log(event);
  console.log(context);

  // This is API endpoint URL
  // https://api.digitalocean.com/v2/apps/{app_id}/deployments
  // Make sure to change the app_id
  const url =
    "https://api.digitalocean.com/v2/apps/133d2328-7376-4766-b1cf-db72a9924aca111/deployments";

  const data = {
    force_build: false,
  };
  //Make sure to add your DO API token, to do so create config.env file in folder /invoke-deploy and add the following line:
  //TOKEN="<Your token>"
  const options = {
    method: "POST",
    body: JSON.stringify(data),
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
          message: "Redeployment initiated",
          details: jsonResponse,
          statusCode: 200,
        },
      };
    } else {
      return {
        body: {
          message: "Redeployment failed",
          details: jsonResponse,
          statusCode: 400,
        },
      };
    }
  } catch (err) {
    console.log("ERROR", err);
    return {
      body: {
        message: "Redeployment failed",
        statusCode: 500,
      },
    };
  }
}

exports.main = main;
