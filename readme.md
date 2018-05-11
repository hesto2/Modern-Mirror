# Modern Mirror
## Description
There have been multiple times in my development career where I've just needed something to serve a very specific response. Usually because the actual server I'd be requesting from doesn't have a sandbox, or it is currently unavailble for a variety of reasons. Enter Modern Mirror. Modern Mirror let's you quickly "Mock" a server by dropping files in a directory that contain the content you want to be returned.

## Installation
`npm install -g modern-mirror`

## Usage
To start the server run `modern-mirror`

Modern Mirror accepts the following arguments:
- `-p --port` the port that Modern Mirror should run on (defaults to `3000`)
- `-d --route-directory` the directory that Modern Mirror should use for its routes (defaults to `~/modern-mirror-routes`)

### Simple Route Example
- Start the server with `modern-mirror`
- Place a file titled `test.json` in the `~/modern-mirror-routes/` directory or whatever directory you specified with `-d`/`--route-directory`
- Make any kind of request (Modern Mirror doesn't care if it is a GET, POST, PUT, etc.) to `localhost:3000/test`
- The response should be the contents of the `test.json` file you created earlier

### Nested Route Example
Proper REST apis don't operate right off of the domain. Most urls will look like this: `localhost:3000/api/customers/1?firstName=hesto2`. To support this kind of url, you will need to do the following:
- Create a folder in your routes folder titled `api`
- In the `api` folder, create another folder titled `customers`
- In the customers folder place a file titled `1.json`, or if you wanted to be more specific you can do `1?firstName=hesto2.json`

### Query Params
If you don't want to include the query params in the file name, Modern Mirror will return the content of the first file matching `customer*`. Having the query params in the file name will allow you to return different responses if your app makes requests with varying params.
