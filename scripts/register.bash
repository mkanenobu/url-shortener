#!/usr/bin/env bash

curl -X POST -H "Content-Type: application/json" -d '{"longUrl":"https://example.com/2"}' http://localhost:8800/api/v1/data/shorten