'use strict';

import Koa from 'koa';
import path from 'path';
import koaBody from '../index.js';

const log = console.log;
const app = new Koa();
const port = process.env.PORT || 4290;
const host = 'http://localhost';

app
  .use(koaBody({
    multipart: true,
    formLimit: 15,
    formidable: {
      uploadDir: path.resolve('examples/uploads')
    }
  }))
  .use((ctx) => {
    if (ctx.request.method === 'POST') {
      log(ctx.request.body);
      // => POST body object
      ctx.body = JSON.stringify(ctx.request.body, null, 2);
    }
  })
  .listen(port);


log('Visit %s:%s/ in browser.', host, port);
log();
log('Test with executing this commands:');
log('curl -i %s:%s/whatever -d "name=charlike"', host, port);
log('curl -i %s:%s/whatever -d "name=some-long-name-for-error"', host, port);
log('curl -i %s:%s/whatever -F "source=@%s/avatar.png"', host, port, path.resolve('./examples'));
log();
log('Press CTRL+C to stop...');
