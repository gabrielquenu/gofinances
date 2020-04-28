# Gofinaces

  ![](gofinances.gif)

## Description 📄

  Gofinances is an app made with Node.JS and ReactJS. It receives financial transactions data from a CSV file and return the    balance of it. Also the application shows the history of incomes and outcomes transactions. All data is stored in a Postgres database and loaded from the same database. 
  
## Installation 📦

  First of all, clone the repository to your machine:
  
  ~ git clone https://github.com/gabrielquenu/gofinances
  
  Then open the front-end folder in terminal and install the dependencies running yarn:
  
  ~ yarn
  
  Do the same to the back-end folder.
  
  You need to turn on a Postgres database and configure it in ormconfig.json in the back-end folder now. 
  
  Also in the back-end file, run the migrations to create the database tables:
  
  ~ yarn typeorm migration:run
  
  All you need to do now is run the front-end and the back-end.
  
  In the back-end file, run:
  
  ~ yarn dev:server
  
  In the front-end file, run:
  
  ~ yarn start
  
  The app will open automatically. If it doesn't, go to the browser and access:
  
  localhost:3000
  
## Usage 🔧
  
  To import data, go to the top-right option "Importar". There you can upload a CSV file and load the data. The CSV needs to formatted like this: 
    
    title             type            value           category
    title-string      type-string     value-number    catgory-string    
 
The data will be loaded and you'll be redirected immediately. 
    
## License 📝

   MIT License

   Copyright (c) 2020 Gabriel Queiroz Nunes
  

  
  
  
  
  
  
