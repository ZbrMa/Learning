import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const sslCert = `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUbUog3hQZsU3um5faiZg/tcFpTy8wDQYJKoZIhvcNAQEMBQAwOjE4MDYGA1UEAwwvNmZmNTg2ZGItMjNkZS00Y2ViLWIwZTYtYWMwNzVlNTU4MTAzIFByb2plY3QgQ0EwHhcNMjQwMTI3MTMyNTIyWhcNMzQwMTI0MTMyNTIyWjA6MTgwNgYDVQQDDC82ZmY1ODZkYi0yM2RlLTRjZWItYjBlNi1hYzA3NWU1NTgxMDMgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALHiSbs4YUZfSrYFr3WCYr5CiuKeqHYe4TOyByDibIGeYhGqcgZ5mf+2aBXwrjmsm1xCFzXp8FHPKABMZEDbuYvLK9cR/fuOQdAdf94AXOMPsi55/qSR5GcWV1GD9136dSYVRV3olKZnf2sVKf/VVkSlRhYPGWlBAuraSnMtkLUpibjbZshGISE3xijqXn7ukY4rO0BBK43t0OXTRpXVUEhrgLZW+921Vp3OT4HwBOI9Db3o33TacR+FibmBsHdfLIa5AHsCUmJYF9yiJ+AuhfowksIto/Bta0mLrlQZodnxudu2tSuVhYgRZ9M0qS9Rej6zk7ZBvN/Eo8ZyWqtZTSl5vvYyPmKVSXdZyO5oDqYVf+sX6CClmeZkJFUEP4Bli3wy3sMNep1GrEibFELhGva5TKw1IYDW1K69mHLEur262+o7E33dWZZayP40/bu2Ik5rl/gFNuAyppkXlsVbbMgmGLWqAQWbnFsOoZfTKQpyIV5d7IF1AK8e3Cafwi4DhQIDAQABoz8wPTAdBgNVHQ4EFgQUufkaH3HWgaXTCy9JSaTdcAC3p0UwDwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAFy74l8V8oZsy2lXwNSUw0UPBxg3qzJZBv3fZuC39O2r7I1PcjtXPvPE323n7kNTv7TOxLUNqbLwxwr72AmC9qXi0xPFI8hYyTpVggEgzateospZ/PZBViD0YNRjyxHh4OeolenIU33CD6KnIDNBudX+autPZmGtH9kcMY58/khDiJxvZF9mTGIhWEC16OqHV9o+V5xHNGReucGJ9OxAozEMc8VGHTzrBFgx3s7MijOx5D2r5vvOE70H/zLw4eteL3WwM0gHbzk4MuijyQ/IIv/E5VEIfMAF93cDqd2U8TCUN7ae5MOXm64czDv3e2D8tH38Q1pHuvHUJs/5QKFeDdg7gmZX75+qHkuh5IZTSiS6z5I1Tj3Ig2tbgEqUygUZj3/WodD5EsTxckm0g5bLMH06nAMzC5Q38JJj33uQlJLluC56IpUT72pPjj+Pmwhxiz9kiX6U8ZcU7lMh
-----END CERTIFICATE-----`;

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  queueLimit: 10,
  connectionLimit: 5,
  port: Number(process.env.DB_PORT),
  ssl: {
    ca: sslCert,
    rejectUnauthorized: false,
  },
});
