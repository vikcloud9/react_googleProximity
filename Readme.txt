STEPS to run:
1) Install npm and node js
2) open a bash command, cd to the 'reactApp' folder
3) npm start
4) the app runs at http://localhost:8080/
5) ctrl + c to stop webpack server

Note: Few things that I would like to use in this app:
1) Replace xhttp with fetch api 

2) I used refresh token to get the access token, since I did not want to go to the oauth consent screen everytime we need a access token.
There are other ways that dont use refresh token:

a) use google api, gapi-client library,
b) or use oauth2.0 endpoint:
    .) send request to oauth service endpoint : 'https://accounts.google.com/o/oauth2/v2/auth', 
    .) by doing a GET request with parameters: {'client_id': YOUR_CLIENT_ID,
                  'redirect_uri': YOUR_REDIRECT_URI,
                  'scope': 'https://www.googleapis.com/auth/userlocation.beacon.registry',
                  'state': 'try_sample_request',
                  'include_granted_scopes': 'true',
                  'response_type': 'token'};

    .) response is: the access token that can be got from the #fragment of the REDIRECT_URI (eg. https://oauth2.example.com/callback#access_token=4/P7q7W91&token_type=Bearer&expires_in=3600), after the user passes the oauth consent screen. 
    .) the access token can then be used to authenticate the beacon registration.
