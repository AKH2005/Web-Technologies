const fs = require('fs');

fs.writeFile('sample.txt', 'Hello, this is the first line.\n', (err) => {
    if (err) {
        console.log('Error creating file:', err);
        return;
    }
    console.log('File created successfully.');

    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);
            return;
        }
        console.log('File content after creation:');
        console.log(data);

        fs.appendFile('sample.txt', 'This line is appended.\n', (err) => {
            if (err) {
                console.log('Error appending file:', err);
                return;
            }
            console.log('Data appended successfully.');

            fs.readFile('sample.txt', 'utf8', (err, data) => {
                if (err) {
                    console.log('Error reading updated file:', err);
                    return;
                }
                console.log('File content after appending:');
                console.log(data);

                fs.unlink('sample.txt', (err) => {
                    if (err) {
                        console.log('Error deleting file:', err);
                        return;
                    }
                    console.log('File deleted successfully.');
                });
            });
        });
    });
});