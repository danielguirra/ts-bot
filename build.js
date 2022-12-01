const { exec } = require("child_process");

const fs = require("fs");

const dir = "./dist";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
exec("npx tsc", (f) => {
  if (f) console.log(f.message);
  else console.log("Build Ok");
});
