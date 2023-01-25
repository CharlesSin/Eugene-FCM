const express = require("express");
const request = require("request");
const router = express.Router();

router.get("/", (req, res) => {
  // const IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const IP = "59.127.117.100";

  request.get(
    `http://ip-api.com/json/${IP}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,reverse,mobile,proxy,hosting,query`,
    (err, response, body) => {
      if (err) res.status(500).json({ data: err });
      const data = JSON.parse(body);
      if (data.status == "success") {
        res.status(202).json({ data: data });
      } else {
        res.status(203).json({ data: data.message });
      }
    }
  );
});

module.exports = router;
