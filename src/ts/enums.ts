enum StatusError {
  'error401' = 401, // Access token is missing or invalid
  'error403' = 403, // Incorrect e-mail or password
  'error404' = 404, // Settings/User's word/Statistics not found
  'error417' = 417, // User are alrady registered
  'error422' = 422, // Incorrect e-mail or password
}

export default StatusError;
