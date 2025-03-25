/* eslint-disable import/no-anonymous-default-export */

/** @type {import { "drizzle-kit" }.Config}'*/

export default {
    schema:"./utils/schema.js",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_VCfhcP8IG2mj@ep-super-sun-a5x2t1dd-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
  }
