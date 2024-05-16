1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies
```bash
npm install
```
4. Set the environment variables
```bash
Make sure to update the .env file with the required configuration settings as per .env.example
```
5. Run the Application   Make sure to update the .env file with the required configuration settings as per .env.example
```bash
npm run dev
```
6. Retrieve the content of the `template.html` file and save it in the `template` field of the `postertemplates` table within the MongoDB database named `shay`. Obtain the generated ID from the database after saving the template. Subsequently, update the generated ID in the frontend's `.env` file under the variable `REACT_APP_TEMPLATE_ID`.
