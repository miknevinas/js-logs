Node.js Log File REST API Example
=============================================

This project demonstrates a basic REST API that parses data from log files of varying sizes.
The acceptance criteria is accomplished as follows:

1. The project contains a README, which you, dear reader, are currently reading.
2. The Express API exposes one endpoint, '/logs', which returns the log data.
3. The lines returned are presented with the newest lines first, at the top of the list.
4. The endpoint accepts the file name, text match and number of entires query parameters.
5. The service handles large files while remaining performant.
6. The project is limited to a few dependencies that are already built into Node.
7. (Bonus) The project includes a UI for ease of use.


Data is returned in this format:

```
{
    total: 10,
    lines: [...]
}
```

The sample log files are found in the '/var/log' directory. Each file ranges
from 200 KB to 1.5 GB in size.

## Initial setup

Download the log files from this [Google Drive link](https://drive.google.com/file/d/1rY35FmXErrzENVToQU--hBWRGnqiJw9d/view?usp=sharing) and extract
them to /var/log.

## Run the application

```bash
$ npm install
$ npm run start
```

## Using the application

- The UI can be accessed at http://localhost:3000/. Several inputs are provided to query the API.
- A Postman collection is also provided in the project. This contains various test queries,
including a few failure state queries.