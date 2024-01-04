module.exports = function(app, shopData) {

    app.post('/bookadded', function (req,res) {
        // saving data in database
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
        // execute sql query
        let newrecord = [req.body.name, req.body.price];
        db.query(sqlquery, newrecord, (err, result) => {
          if (err) {
            return console.error(err.message);
          }
          else {
            res.send(' This book is added to database, name: '
                      + req.body.name + ' price '+ req.body.price);
          }
        });
  }); 
  app.get('/list', function(req, res) {
    let sqlquery = "SELECT * FROM books"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./'); 
        }
        let newData = Object.assign({}, shopData, {availableBooks:result});
        console.log(newData)
        res.render("list.ejs", newData)

     });
});

// Add a new route to list bargain books
app.get('/bargainbooks', function(req, res) {
    // Query the database to get books priced less than £20
    let sqlQuery = "SELECT * FROM books WHERE price < 20";
    
    // Execute the SQL query
    db.query(sqlQuery, (err, result) => {
        if (err) {
            return console.error(err.message);
        }
        
        // Render the 'bargainbooks.ejs' page with the list of bargain books
        res.render('bargainbooks.ejs', { books: result, title: 'Bargain Books', heading: 'Bargain Books' });
    });
});

    // Handle our routes
    app.get('/',function(req,res){
        res.render('index.ejs', shopData)
    });
    app.get('/about',function(req,res){
        res.render('about.ejs', shopData);
    });
    app.get('/search',function(req,res){
        res.render("search.ejs", shopData);
    });
    app.get('/search-result', function (req, res) {
        //searching in the database
        res.send("You searched for: " + req.query.keyword);
    });
    app.get('/register', function (req,res) {
        res.render('register.ejs', shopData);                                                                     
    });    
    app.post('/registered', function (req,res) {
        // saving data in database
        res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                                              
    });
    app.get('/search', function (req,res) {
        res.render('list.ejs', shopData);                                                                     
    });
    app.get('/addbook', function (req,res) {
        res.render('addbook.ejs', shopData);                                                                     
    });                                                                                               
    app.post('/bookadded', function (req,res) {
        // saving data in database
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
        // execute sql query
        let newrecord = [req.body.name, req.body.price];
        db.query(sqlquery, newrecord, (err, result) => {
          if (err) {
            return console.error(err.message);
          }
          else {
            res.send(' This book is added to database, name: '
                      + req.body.name + ' price '+ req.body.price);
          }
        });
  });    
}
