import json
import psycopg2
import os
from urllib.parse import urlparse
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Load JSON data
with open('data_entries.json') as f:
    data_entries = json.load(f)

# Get the DATABASE_URL from environment variables
DATABASE_URL = os.getenv('DATABASE_URL')

if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable not set")

# Parse the URL into components
result = urlparse(DATABASE_URL)

# Extract the components
username = result.username
password = result.password
database = result.path[1:]
hostname = result.hostname
port = result.port

# Connect to Heroku PostgreSQL
conn = psycopg2.connect(
    dbname=database,
    user=username,
    password=password,
    host=hostname,
    port=port
)
cur = conn.cursor()

# Insert data into the table
for entry in data_entries:
    cur.execute(
        """
        INSERT INTO data_entries (id, data_category, record_count, fields)
        VALUES (%s, %s, %s, %s)
        """,
        (entry['id'], entry['data category'], entry['Record count'], entry['fields'])
    )

# Commit the transaction and close the connection
conn.commit()
cur.close()
conn.close()
