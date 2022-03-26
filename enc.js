const fs = require("fs");
const readline = require("readline");
const os = require("os");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  crlfDelay: Infinity,
});

const defaultHandler = (err) => {
  if (err) {
    throw new Error(err);
  }
};

if (fs.existsSync("output.txt")) {
  fs.truncate("output.txt", 0, defaultHandler);
}

rl.on("line", (line) => {
  const data = Buffer.from(line).toString("hex") + os.EOL;
  const options = { flag: "a+" };
  fs.writeFileSync("output.txt", data, options, defaultHandler);
  rl.close();
});

const rlOutput = readline.createInterface({
  input: fs.createReadStream("output.txt"),
  crlfDelay: Infinity,
});

if (fs.existsSync("result.txt")) {
  fs.truncate("result.txt", 0, defaultHandler);
}

rlOutput.on("line", (line) => {
  const data = Buffer.from(line, "hex").toString("utf8") + os.EOL;
  const options = { flag: "a+" };
  fs.writeFileSync("result.txt", data, options, defaultHandler);
  rl.close();
});
