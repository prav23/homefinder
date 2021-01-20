FROM tomcat:9.0.39-jdk14-openjdk

LABEL maintainer=”praveenkumar.anguru@sjsu.edu”

RUN rm -rf /usr/local/tomcat/webapps/*

COPY homefinder-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/homefinder.war

EXPOSE 8080

CMD ["catalina.sh", "run"]