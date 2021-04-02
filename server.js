const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoutes = require('./routes/user.routes');
const ProductRoutes = require('./routes/product.routes');

dotenv.config();

const app = Express();

app.use(BodyParser.json());

app.get('/', (req, res) => res.send('App is working'));
app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);

(async () => {
  await Mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(process.env.PORT);
})();
