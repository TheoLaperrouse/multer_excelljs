#!/bin/bash

num_requests=10
times=()

for i in $(seq 1 $num_requests); do
    t=$( { time -p curl -F "file=@./test.xlsx" http://localhost:3000/upload 2>&1 >/dev/null; } 2>&1 | awk '/^real/ {print $2}' )
    echo "Requête $i complétée en $t secondes"
    times+=($t)
done

total_time=0
for t in ${times[@]}; do
    total_time=$(echo "$total_time + $t" | tr ',' '.' | bc -l)
done
avg_time=$(echo "$total_time / $num_requests" | tr ',' '.' | bc -l)

echo "Temps moyen: $avg_time secondes"