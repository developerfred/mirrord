import assert from "assert";
import { lookup } from "dns/promises";
const https = require('node:https');

console.log(">> test_remote_remote_dns_lookup_google");

lookup("google.com")
  .then((resolved) => {
    console.log(">> resolved ", resolved);

    assert(
      resolved.address !== "255.127.0.0",
      ">> Trying to resolve google.com failed with an invalid address ",
      resolved
    );

    const req = https.request("https://google.com", (res) => {
      res.on('data', (d) => {
        process.exit(0);
      });
    });

    req.on('error', (fail) => {
      console.error(">> failed with ", fail);
      process.exit(-1);
    });
    req.end();
  })
  .catch((fail) => {
    console.error(">> failed with ", fail);

    process.exit(-1);
  });
