 Introduction
 
This project is a comprehensive loan management system designed to facilitate user registration, login, loan applications, and campaign management. The backend is developed with Spring Boot, and the frontend is built using React. The system also includes an Admin Operations page that allows administrators to assign campaigns to users.

 Requirements
- Java 11 or newer
- Maven 3.6.3 or newer
- Node.js 14.0.0 or newer
- npm 6.0.0 or newer
- Spring Boot 2.5.4 or newer
- React 17.0.2 or newer
- MS SQL Server for database management

 Project Setup

1. Clone the Repository:
   First, clone the project repository to your local machine:
    `git clone https://github.com/your-repo.git`
2. Backend Setup:
   - Navigate to the backend directory:
     
     `cd your-project/backend`
     
   - Install dependencies using Maven:
     Ensure all dependencies are installed:
     
    `mvn install`

   - Configure the database:
     Update the `application.properties` or `application.yml` file with your MS SQL Server connection details:
     properties
     spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=yourDatabase
     spring.datasource.username=yourUsername
     spring.datasource.password=yourPassword
     spring.jpa.hibernate.ddl-auto=update
     
   - Run the backend server:
     Start the Spring Boot application:
     
     `mvn spring-boot:run`
     

3. Frontend Setup:
   - Navigate to the frontend directory:
     
     `cd your-project/frontend`
     
   - Install dependencies using npm:
     Install all required packages:
     
     `npm install`
     
   - Start the React development server:
     Launch the frontend application:
     
     `npm start`
     

 Backend Structure

 1. CampaignService
This service handles all operations related to campaigns.

- Methods:
  - `getAllCampaigns()`: Retrieves a list of all campaigns in the database.
  - `getDistinctCampaignNamesByUserCode(String userCode)`: Fetches distinct campaign names associated with a specific user, identified by their `userCode`.
  - `getCampaignDetailsByTermAndCampaignName(String campaignName, Double termLoan)`: Retrieves detailed information about a campaign based on its name and loan term.
  - `getUserCampaignTerms(String userCode, String campaignName)`: Returns a list of available loan terms for a specific campaign and user.

 2. LoanService
This service manages all loan-related operations, including creating and retrieving loans.

- Methods:
  - `getLoanTableByUserId(String userId)`: Retrieves a list of loans associated with a specific user, identified by their `userId`.
  - `createLoan(Loan loan, String userCode)`: Creates a new loan entry for a user. The method validates the user’s age and ensures that a valid campaign is associated with the loan.
  - `calculateAge(LocalDate birthDate)`: Calculates the user's age based on their birth date to enforce age restrictions on loan applications.

 3. UserCampaignService
This service handles the association between users and campaigns.

- Methods:
  - `getUserCampaignDetails()`: Retrieves detailed information about all user-campaign associations, including user code, company name, and campaign details.
  - `addUserCampaign(UserCampaignRequest request)`: Associates a user with a campaign. The method checks if both the user and the campaign exist before saving the association.
  - `deleteUserCampaign(Long id)`: Removes a user-campaign association by its ID.

 4. UserService
This service manages user-related operations such as registration, login, and user information retrieval.

- Methods:
  - `loginUser(String tcknVkn, String password)`: Authenticates a user based on their TCKN/VKN and password. It returns the user’s code and type upon successful login.
  - `registerUser(User user)`: Registers a new user in the system after checking for duplicate TCKN/VKN and email addresses. It generates a unique `userCode` for the new user.
  - `generateUserCode()`: Generates a unique user code, ensuring that it is not already in use.
  - `getAllUsers()`: Retrieves a list of all registered users.

 Admin Operations

 Admin Operations Page
The Admin Operations page is a special interface within the application that allows administrators to manage user-campaign associations. Here’s what you can do:

- Assign Campaigns to Users:
  - Admins can assign specific campaigns to users by selecting a user and a campaign from dropdown menus. The selected campaign is then associated with the selected user in the `UserCampaign` table.
  - The `addUserCampaign(UserCampaignRequest request)` method in `UserCampaignService` handles this operation. It checks the existence of the user and campaign before saving the association.

- View User-Campaign Associations:
  - Admins can view all user-campaign associations. This is managed by the `getUserCampaignDetails()` method in `UserCampaignService`, which provides a detailed list of associations including user codes, company names, campaign codes, and campaign names.

- Remove Campaigns from Users:
  - Admins can also remove a campaign from a user. This operation is handled by the `deleteUserCampaign(Long id)` method, which deletes the association based on its ID.

 Running and Testing

- Run Backend:
  Ensure the backend is running by using the `mvn spring-boot:run` command in the backend directory.

- Run Frontend:
  Start the frontend using `npm start` in the frontend directory.

- Access the Application:
  Once both servers are running, you can access the application through your browser, typically at `http://localhost:3000` for the frontend.

- Admin Access:
  The Admin Operations page is accessible to users with admin privileges. Here, administrators can manage user-campaign associations.

 Key Points

- Campaign Management: Users can view and interact with various loan campaigns. Admins can assign campaigns to users.
- Loan Application: Users can apply for loans with strict validation on personal data such as age and TCKN/VKN format.
- User Management: The system includes comprehensive user registration and login functionalities with robust security checks to prevent duplicate entries.
- Admin Operations: Administrators have a dedicated interface for managing user-campaign associations, making it easy to assign or remove campaigns for users.

![login-screen](https://github.com/user-attachments/assets/2dfd6cdb-9d64-44b3-b53a-564e5c93037e)
![register-screen](https://github.com/user-attachments/assets/cd022553-e1c8-4939-8ba9-d90871aa94df)
![loan-table-screen](https://github.com/user-attachments/assets/b2bb3055-9056-4974-9b1e-d8b4d1eba339)
![new-application-screen](https://github.com/user-attachments/assets/aa67611a-90a7-4403-9504-0c15de2f6c31)
![admin-operations-screen](https://github.com/user-attachments/assets/2d327597-cf08-4b27-add0-18e10a96d3ea)


