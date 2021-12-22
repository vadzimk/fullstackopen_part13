import {PORT} from './util/config.js'
import express from 'express';
const app = express();
import {Blog} from './models/index.js';



app.listen(PORT, () => {
  console.log('server running on port ', PORT);
});
