# Account Creation Error - Fixed

## Problem
When therapists tried to create child or parent accounts, they encountered errors. The account creation process was failing.

## Root Causes

### 1. Session Replacement Issue
When using `supabase.auth.signUp()` from the client side, Supabase automatically logs in the newly created user. This was logging out the therapist who was creating the account.

**Solution:** Save the therapist's session before creating the new account, then restore it immediately after.

### 2. Role Update Permission Issue
After creating a user account, the system tried to update the user's role from the default 'therapist' to 'child' or 'parent'. However, Row Level Security (RLS) policies prevented this update because:
- The therapist doesn't have permission to update other users' profiles directly
- The newly created user's profile might not exist yet when the update is attempted

**Solution:** Created a secure RPC function `update_user_role()` that runs with elevated privileges (SECURITY DEFINER) and can update any user's role when called by a therapist or admin.

### 3. Timing Issue
The profile creation trigger runs asynchronously, so sometimes the profile didn't exist yet when we tried to update it.

**Solution:** Added a 1-second delay after account creation to ensure the trigger has time to create the profile before updating it.

## What Was Fixed

### 1. New RPC Function
Created `update_user_role(user_id, new_role, new_full_name)` function that:
- Checks if the caller is a therapist or admin
- Updates the user's role and full name with elevated privileges
- Bypasses RLS policies safely

### 2. Updated createUserAccount Function
The function now:
1. Saves the current therapist's session
2. Creates the new user account
3. Restores the therapist's session (prevents logout)
4. Waits 1 second for profile creation
5. Uses the RPC function to update role and full name
6. Returns success or detailed error message

### 3. Better Error Handling
- More descriptive error messages
- Console logging for debugging
- Graceful fallback if updates fail

## How to Use

### Creating Child/Parent Accounts

1. **Login as Therapist**
   - Make sure you're logged in as a therapist or admin

2. **Navigate to Manage Users**
   - Click "Manage Users" in the header
   - Or go to `/manage-users`

3. **Create Account**
   - Click "Create Account" button
   - Select account type (Child or Parent)
   - Enter full name
   - Enter username (no spaces, letters and numbers only)
   - Click "Generate" for automatic password or enter your own
   - Click "Create Account"

4. **Success**
   - You'll see a success message
   - Login credentials will be displayed
   - Copy these credentials to share with the user
   - You'll remain logged in as therapist

### Troubleshooting

**Still getting errors?**

1. **Check Username**
   - Must be unique (not already taken)
   - No spaces or special characters
   - Letters and numbers only

2. **Check Password**
   - Must be at least 6 characters
   - Use the "Generate" button for valid passwords

3. **Check Your Role**
   - Only therapists and admins can create accounts
   - Check your role in the user menu

4. **Check Browser Console**
   - Open browser developer tools (F12)
   - Look at Console tab for detailed error messages
   - Share these with your administrator

**Account created but wrong role?**

1. **Admin Can Fix**
   - Go to Admin Panel
   - Find the user
   - Change their role using the dropdown

2. **Or Delete and Recreate**
   - Contact admin to delete the account
   - Create it again with correct role

## Technical Details

### Database Migration
File: `supabase/migrations/00004_add_update_user_role_rpc.sql`

Created RPC function with:
- SECURITY DEFINER privilege
- Permission check for therapist/admin
- Safe role and full_name update

### API Function
File: `src/db/api.ts`

Updated `createUserAccount()` function with:
- Session preservation
- Timing delay for trigger
- RPC-based role update
- Better error handling

### Security
- Only therapists and admins can call the RPC function
- Function validates caller permissions
- Session restoration prevents unauthorized access
- RLS policies still protect other data

## Testing

To verify the fix works:

1. **Test Child Account Creation**
   ```
   - Login as therapist
   - Create child account
   - Verify success message
   - Check you're still logged in as therapist
   - Verify child can login with provided credentials
   ```

2. **Test Parent Account Creation**
   ```
   - Login as therapist
   - Create parent account
   - Verify success message
   - Link parent to a child
   - Verify parent can login and see child
   ```

3. **Test Role Assignment**
   ```
   - Create a child account
   - Login as admin
   - Check Admin Panel
   - Verify user has 'child' role
   ```

## Additional Notes

### Why This Approach?

**Alternative approaches considered:**

1. **Edge Function**: Would require server-side deployment and admin API keys
2. **Service Role Key**: Would expose admin credentials in client code (security risk)
3. **Direct Profile Creation**: Would bypass Supabase Auth system (not recommended)

**Chosen approach (RPC with SECURITY DEFINER):**
- ✅ Secure (no exposed credentials)
- ✅ Works client-side
- ✅ Maintains auth system integrity
- ✅ Easy to maintain and debug

### Future Improvements

Possible enhancements:
1. Batch account creation (CSV import)
2. Email notifications to new users
3. Password reset functionality
4. Account activation workflow
5. Audit log for account creation

## Support

If you continue to experience issues:
1. Check this guide first
2. Review browser console for errors
3. Verify your role and permissions
4. Contact your system administrator
5. Provide error messages and steps to reproduce
