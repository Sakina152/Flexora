# Frontend Components Documentation

## 📁 Merged Components (Today's Changes)

### 🔧 `Suggestions.tsx`
**Combined functionality from:** `AddressSuggestions.tsx` + `UsernameSuggestions.tsx`

**Usage:**
```tsx
import Suggestions from '../components/Suggestions';

// For Address Suggestions
<Suggestions
  value={address}
  onChange={setAddress}
  placeholder="Enter your address..."
  className="w-full"
  type="address"
/>

// For Username Suggestions
<Suggestions
  value={username}
  onChange={setUsername}
  placeholder="Enter username..."
  className="w-full"
  type="username"
/>
```

**Props:**
- `value: string` - Current input value
- `onChange: (value: string) => void` - Change handler
- `placeholder?: string` - Input placeholder text
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Disable the input
- `type: 'address' | 'username'` - Type of suggestions to show

**Features:**
- **Address Suggestions**: Uses OpenStreetMap Nominatim API
- **Username Suggestions**: Uses backend API for active users
- **Debounced Search**: Address search with 300ms debounce
- **Immediate Search**: Username search on focus
- **Loading States**: Spinner during API calls
- **Error Handling**: Network error display
- **Keyboard Navigation**: Escape key support
- **Clear Button**: X button to clear input
- **Responsive Design**: Mobile-friendly dropdowns

## 🗑️ Removed Files
- `AddressSuggestions.tsx` - Merged into `Suggestions.tsx`
- `UsernameSuggestions.tsx` - Merged into `Suggestions.tsx`

## 📝 Migration Notes

### **Before (Separate Components):**
```tsx
// Address suggestions
import AddressSuggestions from '../components/AddressSuggestions';
<AddressSuggestions value={address} onChange={setAddress} />

// Username suggestions  
import UsernameSuggestions from '../components/UsernameSuggestions';
<UsernameSuggestions value={username} onChange={setUsername} />
```

### **After (Unified Component):**
```tsx
// Single import
import Suggestions from '../components/Suggestions';

// Address suggestions
<Suggestions value={address} onChange={setAddress} type="address" />

// Username suggestions
<Suggestions value={username} onChange={setUsername} type="username" />
```

## ✅ Benefits

#### **Cleaner Codebase:**
- **2 files removed** → **1 merged file**
- **Reduced duplication** of similar logic
- **Easier maintenance**

#### **Consistent UX:**
- **Unified styling** across suggestion types
- **Same interaction patterns**
- **Consistent error handling**

#### **Better Performance:**
- **Shared utilities** and hooks
- **Optimized rendering**
- **Reduced bundle size**

## 🔄 Updated Files
- `Login.tsx` - Now uses `Suggestions` with `type="username"`
- `Signup.tsx` - Now uses `Suggestions` with `type="address"`
- `EditProfile.tsx` - Now uses `Suggestions` with `type="address"`
- `Cart.tsx` - Now uses `Suggestions` with `type="address"`

## 📋 Current Component Structure
```
Flexora/frontend/src/components/
├── Suggestions.tsx          # Unified suggestions component
├── AddressManager.tsx       # Address management
├── Navigation.tsx           # Navigation bar
├── Footer.tsx              # Footer component
├── Hero.tsx                # Hero section
├── FashionStyleQuiz.tsx    # Style quiz
├── LoadingAnimation.tsx    # Loading component
├── PageHero.tsx            # Page hero
├── StyleQuiz.tsx           # Style quiz
├── HeroSection.tsx         # Hero section
└── ui/                     # UI components
```

**All functionality preserved, cleaner structure, better maintainability!** 🎉 