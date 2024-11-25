import mysql from "mysql2";

const sslCert = `
-----BEGIN CERTIFICATE-----
  MIIEQTCCAqmgAwIBAgIUbUog3hQZsU3um5faiZg/tcFpTy8wDQYJKoZIhvcNAQEM
  BQAwOjE4MDYGA1UEAwwvNmZmNTg2ZGItMjNkZS00Y2ViLWIwZTYtYWMwNzVlNTU4
  MTAzIFByb2plY3QgQ0EwHhcNMjQwMTI3MTMyNTIyWhcNMzQwMTI0MTMyNTIyWjA6
  MTgwNgYDVQQDDC82ZmY1ODZkYi0yM2RlLTRjZWItYjBlNi1hYzA3NWU1NTgxMDMg
  UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALHiSbs4
  YUZfSrYFr3WCYr5CiuKeqHYe4TOyByDibIGeYhGqcgZ5mf+2aBXwrjmsm1xCFzXp
  8FHPKABMZEDbuYvLK9cR/fuOQdAdf94AXOMPsi55/qSR5GcWV1GD9136dSYVRV3o
  lKZnf2sVKf/VVkSlRhYPGWlBAuraSnMtkLUpibjbZshGISE3xijqXn7ukY4rO0BB
  K43t0OXTRpXVUEhrgLZW+921Vp3OT4HwBOI9Db3o33TacR+FibmBsHdfLIa5AHsC
  UmJYF9yiJ+AuhfowksIto/Bta0mLrlQZodnxudu2tSuVhYgRZ9M0qS9Rej6zk7ZB
  vN/Eo8ZyWqtZTSl5vvYyPmKVSXdZyO5oDqYVf+sX6CClmeZkJFUEP4Bli3wy3sMN
  ep1GrEibFELhGva5TKw1IYDW1K69mHLEur262+o7E33dWZZayP40/bu2Ik5rl/gF
  NuAyppkXlsVbbMgmGLWqAQWbnFsOoZfTKQpyIV5d7IF1AK8e3Cafwi4DhQIDAQAB
  oz8wPTAdBgNVHQ4EFgQUufkaH3HWgaXTCy9JSaTdcAC3p0UwDwYDVR0TBAgwBgEB
  /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAFy74l8V8oZsy2lX
  wNSUw0UPBxg3qzJZBv3fZuC39O2r7I1PcjtXPvPE323n7kNTv7TOxLUNqbLwxwr7
  2AmC9qXi0xPFI8hYyTpVggEgzateospZ/PZBViD0YNRjyxHh4OeolenIU33CD6Kn
  IDNBudX+autPZmGtH9kcMY58/khDiJxvZF9mTGIhWEC16OqHV9o+V5xHNGReucGJ
  9OxAozEMc8VGHTzrBFgx3s7MijOx5D2r5vvOE70H/zLw4eteL3WwM0gHbzk4Muij
  yQ/IIv/E5VEIfMAF93cDqd2U8TCUN7ae5MOXm64czDv3e2D8tH38Q1pHuvHUJs/5
  QKFeDdg7gmZX75+qHkuh5IZTSiS6z5I1Tj3Ig2tbgEqUygUZj3/WodD5EsTxckm0
  g5bLMH06nAMzC5Q38JJj33uQlJLluC56IpUT72pPjj+Pmwhxiz9kiX6U8ZcU7lMh
  yLQRXexpQkf/xGIcY1q0eWreWItBxPjO/4pqA8wGmtrOl4S9yA==
  -----END CERTIFICATE-----
  `;

export const db = mysql.createPool({
  host: "mysql-pokus-pokus.a.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_LudGZ8xqV88TuCDAV4r",
  database: "busking",
  waitForConnections:true,
  queueLimit:10,
  connectionLimit:5,
  port: 27178,
  ssl: {
    ca: sslCert,
    rejectUnauthorized: false,
  },
});

/*export const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.log("chyba při připojení k databázi.", err);
      connectDB();
    } else {
      console.log("připoeno k databázi");
    }
  });
};

export const disconnectDB = () => {
  db.end((err) => {
    if (err) {
      console.log("chyba při odpejní z databáze", err);
    } else {
      console.log("odpojeno z databáze");
    }
  });
};*/
