const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoutes = require('./routes/user.routes');
const ProductRoutes = require('./routes/product.routes');
const ErrorOnDelete = require('./middleware/ErrorOnDelete');
const DateValidation = require('./middleware/DateValidation');
const fiftyfifty = require('./middleware/5050');
const Logger = require('./middleware/Logger');
const Error = require('./middleware/Error');

dotenv.config();

const app = Express();

app.use(BodyParser.json());
app.use(ErrorOnDelete);
app.use(DateValidation);
app.use(Logger);
app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);
app.use('/', fiftyfifty);
app.use(Error);

(async () => {
  await Mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(process.env.PORT);
})();
