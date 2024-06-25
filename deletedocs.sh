#!/bin/bash

for id in $(sanity documents query "*[_type=='gallery'] {_id}" | jq -r '.[] | ._id'); do
    sanity documents delete "$id"
done