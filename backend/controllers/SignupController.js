/**
 * User registration route handler.
 *
 * This endpoint will handle new user registration once the logic is implemented.
 * Expected behavior includes validating input data (e.g., email, password),
 * checking for existing accounts, hashing the password, and saving the new user to the database.
 *
 * Note: This is currently a placeholder and does not register users..
 *
 * @param {import('express').Request} req - Express request object, expected to contain user registration data in the body.
 * @param {import('express').Response} res - Express response object, used to send status and data back to the client.
 * @returns {void} Sends a response indicating the route is active.
 */

export default function signup(req, res){
  return res.send('/signup')
}