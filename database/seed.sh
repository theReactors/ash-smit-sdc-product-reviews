DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

DATABASE="reviews"
USER="postgres"

OUTPUT="reviews.csv"
FILEPATH="$DIR/$OUTPUT"
# LINES=${1:-10000}

SCHEMA="$DIR/schema.sql"
psql -U $USER < $SCHEMA

node creation.js --output=$FILEPATH

psql -U $USER -d $DATABASE -c "COPY $DATABASE FROM '$FILEPATH' CSV HEADER";
