require('./database')
const app= require('./app');

//Starting server
app.listen(app.get('port'),()=> {
    console.log('Server on port',app.get('port'));
});