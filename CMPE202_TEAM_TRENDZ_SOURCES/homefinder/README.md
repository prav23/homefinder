### Team Info: 
Team trendz
* Krishnamurthy Thyagarajan
* Mustafa Yesilyurt
* Nakul Gupta
* Praveen Kumar Anguru

### Command-line setup:
```
$ ./gradlew clean
$ ./gradlew --refresh-dependencies
$ ./gradlew build
$ ./gradlew test
```


### Intellij IDE:
* New -> Project from Existing Sources.. -> (choose the base directory)
* Choose defaults, select project SDK 14 (assumes already in your local env)
* Gradle -> Reload All Gradle Projects
* Run -> Edit Configurations -> Add New Configuration -> Tomcat Server -> Local
  <br/>Under 'Server' tab..
  <br/>Name: homefinder_tomcat (or something like it)
  <br/>URL: http://localhost:8080/homefinder/swagger-ui.html
  <br/>Under 'Deployment' tab..
  <br/>Add(+) -> Artifact -> homefinder-0.0.1-SNAPSHOT.war (exploded)
  <br/>Application context: /homefinder
  <br/>Select Apply
* At this point, the app should be buildable and runnable, resulting in loading the swagger page.


### Temporary Info:
To run the current version of the application:
* Create a test database, i.e. CREATE DATABASE testdb
* Execute the SQL/testdata.sql to create a dummy db table and test data.
* From the launched swagger page, select project-resource -> /api/owned -> (specify an ownerId value) -> Execute
<br/> This should query the test db and return the result set.
