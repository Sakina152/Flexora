#!/usr/bin/env python3
"""
Database setup script for Flexora Trending Page
This script helps set up the PostgreSQL database for the trending page functionality.
"""

import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
from dotenv import load_dotenv

def create_database():
    """Create the PostgreSQL database and user for Flexora trending page"""
    
    # Database configuration
    DB_NAME = "flexora_trending_db"
    DB_USER = "flexora_user"
    DB_PASSWORD = "flexora_password_2024"
    DB_HOST = "localhost"
    DB_PORT = "5432"
    
    try:
        # Connect to PostgreSQL server
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user="postgres",  # Default PostgreSQL user
            password="postgres"  # Change this to your PostgreSQL password
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Create user if not exists
        print("Creating database user...")
        try:
            cursor.execute(f"CREATE USER {DB_USER} WITH PASSWORD '{DB_PASSWORD}';")
            print(f"User {DB_USER} created successfully")
        except psycopg2.errors.DuplicateObject:
            print(f"User {DB_USER} already exists")
        
        # Create database if not exists
        print("Creating database...")
        try:
            cursor.execute(f"CREATE DATABASE {DB_NAME} OWNER {DB_USER};")
            print(f"Database {DB_NAME} created successfully")
        except psycopg2.errors.DuplicateDatabase:
            print(f"Database {DB_NAME} already exists")
        
        # Grant privileges
        cursor.execute(f"GRANT ALL PRIVILEGES ON DATABASE {DB_NAME} TO {DB_USER};")
        print(f"Privileges granted to {DB_USER}")
        
        cursor.close()
        conn.close()
        
        print("\n✅ Database setup completed successfully!")
        print(f"Database: {DB_NAME}")
        print(f"User: {DB_USER}")
        print(f"Host: {DB_HOST}")
        print(f"Port: {DB_PORT}")
        
        # Create .env file
        create_env_file(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT)
        
    except Exception as e:
        print(f"❌ Error setting up database: {str(e)}")
        print("\nMake sure PostgreSQL is running and you have the correct credentials.")
        print("You may need to modify the connection parameters in this script.")

def create_env_file(db_name, db_user, db_password, db_host, db_port):
    """Create .env file with database configuration"""
    
    env_content = f"""# PostgreSQL Database Configuration
DB_NAME={db_name}
DB_USER={db_user}
DB_PASSWORD={db_password}
DB_HOST={db_host}
DB_PORT={db_port}

# Django Settings
SECRET_KEY=django-insecure-8(^-e9gp&i)(dhlss7r7p=mdo4mc(+ync4wi9+-s+k=r^uib=&
DEBUG=True

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dlpuuekkl
CLOUDINARY_API_KEY=474816865319319
CLOUDINARY_API_SECRET=OqVqRF4FwbBhAEH_xtzSnl2aU28

# JWT Settings
JWT_SECRET_KEY=your-jwt-secret-key-here
JWT_ACCESS_TOKEN_LIFETIME=5
JWT_REFRESH_TOKEN_LIFETIME=1
"""
    
    try:
        with open('.env', 'w') as f:
            f.write(env_content)
        print("\n✅ .env file created successfully!")
    except Exception as e:
        print(f"❌ Error creating .env file: {str(e)}")

def run_migrations():
    """Run Django migrations"""
    print("\nRunning Django migrations...")
    os.system("python manage.py migrate")
    print("✅ Migrations completed!")

def create_superuser():
    """Create a Django superuser"""
    print("\nCreating Django superuser...")
    print("Username: admin")
    print("Email: admin@flexora.com")
    print("Password: admin123")
    os.system("python manage.py createsuperuser --username admin --email admin@flexora.com --noinput")

def populate_sample_data():
    """Populate database with sample trending posts data"""
    print("\nPopulating database with sample data...")
    os.system("python manage.py populate_trending_posts")
    print("✅ Sample data populated!")

if __name__ == "__main__":
    print("🚀 Flexora Trending Page Database Setup")
    print("=" * 50)
    
    # Check if PostgreSQL is installed
    try:
        import psycopg2
        print("✅ PostgreSQL driver (psycopg2) is available")
    except ImportError:
        print("❌ psycopg2 is not installed. Please install it with:")
        print("   pip install psycopg2-binary")
        exit(1)
    
    # Create database
    create_database()
    
    # Run migrations
    run_migrations()
    
    # Create superuser
    create_superuser()
    
    # Populate sample data
    populate_sample_data()
    
    print("\n🎉 Setup completed! You can now run the Django server with:")
    print("   python manage.py runserver")
    print("\nAccess the admin panel at: http://localhost:8000/admin")
    print("Username: admin")
    print("Password: admin123") 