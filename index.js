const Express=require("express");
const app=Express();
const App=require('./App');
const cors = require('cors');
const path=require('path');
require('dotenv').config();

const _dirname=path.dirname("")
const BulidFolder=path.join(_dirname,"./build")
app.use(Express.static(BulidFolder));
app.use(cors(
{
    origin:"http://localhost:3000"
}
));
app.use(App)









const port = process.env.PORT ;

app.listen(port, console.log( `Server running on port ${port} 🔥`));