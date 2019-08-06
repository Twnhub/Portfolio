const fs = require('fs');

let src = process.argv[2];
let dest = process.argv[3];

fs.readFile(src, (err, data) => {
	if (err) throw err;

	fs.writeFile(dest, data, (err) => {
		if (err) throw err;
	});
});