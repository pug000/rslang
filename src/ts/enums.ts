enum ServerResponses {
  'response200' = 200, // Successful
  'response204' = 204, // The user word has been deleted
  'error401' = 401, // Access token is missing or invalid
  'error402' = 402, // getWords Access token is missing or invalid
  'error403' = 403, // Incorrect e-mail or password / Access token is missing, expired or invalid
  'error404' = 404, // Settings/User's word/Statistics not found
  'error417' = 417, // User/word are already registered
  'error422' = 422, // Incorrect e-mail or password
}

export default ServerResponses;
