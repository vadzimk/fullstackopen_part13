#!/bin/bash
set -e

createdb -U $POSTGRES_USER -T template0 $DATABASE_NAME