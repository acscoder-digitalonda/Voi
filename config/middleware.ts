 // config/middlewares.js
module.exports = [
  'global::strapi::errors',
  'global::strapi::security',
  'global::strapi::cors',
  'global::strapi::poweredBy',
  'global::strapi::logger',
  'global::strapi::query',
  'global::strapi::body',
  'global::strapi::session',
  'global::strapi::favicon',
  'global::strapi::public',
];

module.exports.settings = {
  cors: {
    enabled: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'https://own-your-vision.vercel.app',
      'https://ownyourvision.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    keepHeaderOnError: true,
  },
};