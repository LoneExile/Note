#!/bin/bash

docker build -t loneexile/note_app:latest .
docker push loneexile/note_app:latest
