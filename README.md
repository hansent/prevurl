# prevurl

heroku webservice to render website to png images.


## Usage 

three parameters -- url, w(idth), h(eight) -- can be configured via query string, so you can do e.g.:

    http://localhost:5000?url=http://github.com
    
    http://localhost:5000?url=http://github.com&w=800&h=600





This is based on the heroku-phantomjs-to-s3 project by Rafael Torres (https://github.com/rafitorres/heroku-phantomjs-to-s3).
