## Front-end Challenge for vhs lab

#### Live url : https://explore-block.web.app
# Features

 - Block Tab 
    - live ethereum blocks information with auto refresh 
    - By clicking on `Number Of Txn` you can see transaction belong to that block with Amount, Sender, Receiver info etc.
    - Sort based on latest block, Age, Gas Price and Gas Used
    - Age column will show you live age.
    - Double click on Block, Miner it will copy content to your clipboard

 - Transaction Tab
    - List of all transaction belong to latest block
    - Filters provide you different ways to filter data with different criteria
    - Export data quick and easy with out depended on server 
    - Export data also supports filter
    - Double click on Txn Hash,From,To,Amount(In Ether) will copy content to your clipboard
    
# Library used
 - Ether.js
 - Material UI
 - React Redux
 - Type Script
 
# Technical points
 - Design is fully responsive 
 - Used Type Script 
 - Theme based UI
 - Dynamic columns and feature configuration based on files
 - Dynamic component 

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine. 
## Available Scripts

Dependency Installation:

`npm install`  

You need browser with meta mask to load the website

`Install meta mask from https://metamask.io/download`

In the project directory, you can run:

To Start Server:

`npm start`  

Default App will be available at `localhost:3000/'

To Build:

`npm run build`  
