# Upsilon-Cryptocurrency-Tracker

My first vanilla JS website that uses the Coin Ranking API to constantly update % change in cryptocurrency prices and provide statistics, as well as sorting data by coin price and
coin name.

Functions:
  -Created various JS functions to calculate the price of each coin to 2 decimal points for easier readability. 
  
  -Optimised the website for smaller screens such as smart phones. 
  
  -Implemented search function to allow the user to search for a coin, regardless of capitalisation.
  
  -Implemented filter function to sort the data based on price.
  
  -Implemented function to change colour of "percentage price change" to indicate positive or negative percentage change or price which is updated every 60 seconds using live data    from the Coin Ranking API.
  
  -Implemented a loading state while the script fetches the data using an animated spinner.
  

The website application is still in testing stages since I am having problems with CORS.

Only paid version of the Coin Ranking API enables CORS. I am using the free testing version, therefore I had to use a CORS proxy which needs to be enabled via the console. 

RECRUITERS:
Please check console logs to enable CORS proxy and view the website with its full functionality.
