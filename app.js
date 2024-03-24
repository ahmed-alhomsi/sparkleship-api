require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

//connect DB
const connectDB = require('./db/connect')

//routers
const authRouter = require('./routes/auth')
const scholarshipRouter = require('./routes/scholarships')
const authenticateUser = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages
// app.set('trust proxy', 1) // if your app is behind a proxy (on heruko etc...)
// app.use(rateLimiter({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit to 100 requests in WindowMs
// }))
app.use(xss())
app.use(helmet())
app.use(cors())



// routes
app.use('/api/auth', authRouter)
app.use('/api/scholarships', authenticateUser, scholarshipRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
