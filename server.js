const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoutes = require('./routes/user.routes');
const ProductRoutes = require('./routes/product.routes');
const ErrorOnDelete = require('./middleware/ErrorOnDelete');

dotenv.config();

const app = Express();

app.use(BodyParser.json());
app.use('/', ErrorOnDelete);
app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);
app.get('/', (request, response) => response.send('App is working'));

(async () => {
  await Mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(process.env.PORT);
})();
