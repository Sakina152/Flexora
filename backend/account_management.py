#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import UserProfile

def list_all_users():
    """List all users in the database."""
    users = User.objects.all().order_by('id')
    print(f"\n📋 All Users in Database ({users.count()} total):")
    print("-" * 80)
    print(f"{'ID':<4} {'Username':<20} {'Email':<30} {'Date Joined':<15}")
    print("-" * 80)
    
    for user in users:
        date_joined = user.date_joined.strftime('%Y-%m-%d')
        print(f"{user.id:<4} {user.username:<20} {user.email:<30} {date_joined:<15}")
    
    return users

def delete_specific_user(username):
    """Delete a specific user by username."""
    try:
        user = User.objects.filter(username=username).first()
        
        if not user:
            print(f"❌ User '{username}' not found!")
            return False
        
        print(f"🗑️  Deleting user: {user.username} (ID: {user.id})")
        print(f"   Email: {user.email}")
        print(f"   Date Joined: {user.date_joined}")
        
        # Confirm deletion
        confirm = input(f"\n⚠️  Are you sure you want to delete '{username}'? (yes/no): ")
        
        if confirm.lower() != 'yes':
            print("❌ Deletion cancelled.")
            return False
        
        # Delete the user
        user.delete()
        print(f"✅ Successfully deleted user '{username}'!")
        return True
        
    except Exception as e:
        print(f"❌ Error deleting user: {str(e)}")
        return False

def delete_multiple_users(usernames):
    """Delete multiple users by username."""
    users_to_delete = []
    
    for username in usernames:
        user = User.objects.filter(username=username).first()
        if user:
            users_to_delete.append(user)
        else:
            print(f"⚠️  User '{username}' not found, skipping...")
    
    if not users_to_delete:
        print("❌ No valid users to delete.")
        return False
    
    print(f"\n🗑️  Users to delete ({len(users_to_delete)}):")
    for user in users_to_delete:
        print(f"   - {user.username} (ID: {user.id}, Email: {user.email})")
    
    confirm = input(f"\n⚠️  Are you sure you want to delete {len(users_to_delete)} users? (yes/no): ")
    
    if confirm.lower() != 'yes':
        print("❌ Deletion cancelled.")
        return False
    
    try:
        deleted_count = 0
        for user in users_to_delete:
            user.delete()
            deleted_count += 1
            print(f"✅ Deleted: {user.username}")
        
        print(f"\n✅ Successfully deleted {deleted_count} users!")
        return True
        
    except Exception as e:
        print(f"❌ Error during deletion: {str(e)}")
        return False

def delete_all_except(username_to_keep):
    """Delete all users except the specified one."""
    try:
        user_to_keep = User.objects.filter(username=username_to_keep).first()
        
        if not user_to_keep:
            print(f"❌ User '{username_to_keep}' not found in database!")
            return
        
        print(f"✅ Found user '{username_to_keep}' (ID: {user_to_keep.id})")
        
        users_to_delete = User.objects.exclude(username=username_to_keep)
        total_users = users_to_delete.count()
        
        if total_users == 0:
            print("ℹ️  No other users found to delete.")
            return
        
        print(f"📊 Found {total_users} users to delete:")
        for user in users_to_delete:
            print(f"   - {user.username} (ID: {user.id}, Email: {user.email})")
        
        confirm = input(f"\n⚠️  Are you sure you want to delete {total_users} users? (yes/no): ")
        
        if confirm.lower() != 'yes':
            print("❌ Operation cancelled.")
            return
        
        deleted_count = users_to_delete.delete()[0]
        print(f"✅ Successfully deleted {deleted_count} user(s)!")
        print(f"✅ User '{username_to_keep}' has been preserved.")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")

def quick_delete(username):
    """Quick delete function for command line usage."""
    if delete_specific_user(username):
        print(f"✅ User '{username}' deleted successfully!")
    else:
        print(f"❌ Failed to delete user '{username}'")

def interactive_menu():
    """Interactive menu for account management."""
    while True:
        print("\n" + "=" * 60)
        print("🔧 Account Management Menu")
        print("=" * 60)
        print("1. List all users")
        print("2. Delete specific user")
        print("3. Delete multiple users")
        print("4. Delete all users except one")
        print("5. Exit")
        print("-" * 60)
        
        choice = input("Select an option (1-5): ").strip()
        
        if choice == '1':
            list_all_users()
            
        elif choice == '2':
            username = input("Enter username to delete: ").strip()
            if username:
                delete_specific_user(username)
            else:
                print("❌ Username cannot be empty.")
                
        elif choice == '3':
            print("Enter usernames to delete (separate with commas):")
            usernames_input = input("Usernames: ").strip()
            if usernames_input:
                usernames = [u.strip() for u in usernames_input.split(',') if u.strip()]
                delete_multiple_users(usernames)
            else:
                print("❌ No usernames provided.")
                
        elif choice == '4':
            username_to_keep = input("Enter username to keep (delete all others): ").strip()
            if username_to_keep:
                delete_all_except(username_to_keep)
            else:
                print("❌ Username cannot be empty.")
                
        elif choice == '5':
            print("👋 Goodbye!")
            break
            
        else:
            print("❌ Invalid option. Please select 1-5.")

if __name__ == "__main__":
    print("🔧 Account Management Tool")
    print("=" * 40)
    
    # Check if username provided as command line argument
    if len(sys.argv) > 1:
        username = sys.argv[1]
        print(f"🗑️  Quick delete mode: {username}")
        quick_delete(username)
    else:
        # Interactive mode
        interactive_menu() 