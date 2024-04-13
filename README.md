# Space Farm Management System

This project is designed to facilitate real-time monitoring and management of plant cultivation in laboratory environments. The system encompasses both frontend and backend components, with the frontend developed using React and Tailwind CSS, while the backend utilizes Spring Boot, MySQL, and Hibernate to ensure robust functionality and data management.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the Repository**: Use Git to clone this repository to your local machine:

    ```bash
    git clone https://github.com/your_username/space-farm-management-system.git
    ```

2. **Navigate to the Project Directory**: Change your current directory to the root directory of the cloned project:


3. **Update Database Configuration**: Open the `application.properties` file located in the `src/main/resources` directory. Update the `spring.datasource.username` and `spring.datasource.password` properties to match your MySQL database credentials.

    ```properties
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```

4. **Run the Application**: Once you've updated the database configuration, you can run the Spring Boot application using Maven:

    ```bash
    mvn spring-boot:run
    ```

5. **Access the Application**: Once the application has started, you can access it by navigating to `http://localhost:8080` in your web browser.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.


## Key Features:

### Cultivation Monitoring and Management
- Enable personnel to monitor ongoing cultivations and manage new experimental crops effectively.
- Store comprehensive information about each cultivation, including start date, type, plant species, cultivation station details, area, required conditions, and responsible personnel data.

### Historical Data Storage
- Maintain a repository of historical information for each cultivation, including harvest data (successful and unsuccessful) and cultivation parameters.

### Stage-based Cultivation
- Divide cultivations into stages (e.g., germination, flowering, fruiting) with detailed information for each stage, such as start dates and specific parameters.

### Multi-user and Multi-cultivation Support
- Allow multiple users to supervise cultivations, and enable each employee to oversee multiple cultivations simultaneously.
- Support cultivation of the same plant species under different conditions and at different stations.

### Reporting Functionality
- Generate insightful reports, including harvests collected within specified periods and detailed information for selected cultivations, including harvest dates, yields, area, and average parameter values.

### Secure Authentication and Authorization
- Implement secure user authentication and authorization mechanisms to ensure data privacy and integrity.

### Responsive Design
- Develop a responsive frontend interface to ensure seamless user experience across devices.
