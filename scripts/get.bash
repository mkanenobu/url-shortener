#!/usr/bin/env bash

token="1mOJICXYDuc" # https://example.com/1
token="1mOMY2yQIp2" # https://example.com/2
curl -X GET "http://localhost:8800/api/v1/${token}"
