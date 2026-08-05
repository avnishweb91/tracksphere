FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src src
RUN mvn -q -DskipTests package
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S tracksphere && adduser -S tracksphere -G tracksphere
COPY --from=build /app/target/*.jar app.jar
USER tracksphere
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
