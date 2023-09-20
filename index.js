const Express=require("express");
const app=Express();
const App=require('./App');
const cors = require('cors');

require('dotenv').config();
app.use(cors(
{
    origin:"http://localhost:3000"
}
));
app.use(App)









const port = process.env.PORT ;

app.listen(port, console.log( `Server running on port ${port} 🔥`));