#!/bin/sh
# wait-for-it.sh

host=$(echo $1 | cut -d: -f1)
port=$(echo $1 | cut -d: -f2)

echo "Waiting for $host on port $port..."

until nc -z $host $port; do
  echo "Waiting for $host:$port..."
  sleep 1
done

echo "$host:$port is up - executing command"