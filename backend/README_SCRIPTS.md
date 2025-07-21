# Backend Scripts Documentation

## 📁 Merged Scripts

### 🔧 `account_management.py`
**Combined functionality from:** `delete_accounts.py` + `manage_accounts.py`

**Usage:**
```bash
# Interactive mode
python account_management.py

# Quick delete mode
python account_management.py username_to_delete
```

**Features:**
- List all users
- Delete specific user
- Delete multiple users
- Delete all users except one
- Interactive menu system

### 🧪 `test_suite.py`
**Combined functionality from:** `test_username_suggestions.py` + `test_auth.py`

**Usage:**
```bash
python test_suite.py
```

**Features:**
- Test username suggestions functionality
- Test deleted account authentication
- Comprehensive test reporting

## 🗑️ Removed Files
- `delete_accounts.py` - Merged into `account_management.py`
- `manage_accounts.py` - Merged into `account_management.py`
- `test_username_suggestions.py` - Merged into `test_suite.py`
- `test_auth.py` - Merged into `test_suite.py`

## 📝 Notes
- All functionality preserved
- No changes to website functionality
- Cleaner file structure
- Easier maintenance 