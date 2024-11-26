#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

export $(grep -v '^#' "/$SCRIPT_DIR/../.env" | xargs)

# run both sql files in the data folder to populate db
psql $DATABASE_URL -f ../data/embeddings.sql &
psql $DATABASE_URL -f ../data/embeddings2.sql &
