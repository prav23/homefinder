#!/bin/bash
cp ../build/libs/homefinder-0.0.1-SNAPSHOT.war .
docker build -t homefinder .
docker login
docker tag homefinder panguru/homefinder
docker push panguru/homefinder