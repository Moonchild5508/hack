/*
# Add RPC Function for Updating User Roles

## Purpose
Allow therapists to update user roles and full names when creating child/parent accounts.
This function runs with SECURITY DEFINER to bypass RLS policies.

## Function
- `update_user_role(user_id, new_role, new_full_name)`
  - Updates role and full_name for a user
  - Only callable by therapists and admins
  - Returns success boolean

## Security
- Function checks if caller is therapist or admin
- Prevents non-therapists from updating roles
- Uses SECURITY DEFINER to bypass RLS
*/

-- Create RPC function to update user role and full name
CREATE OR REPLACE FUNCTION update_user_role(
  user_id uuid,
  new_role user_role,
  new_full_name text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if caller is therapist or admin
  IF NOT (is_therapist(auth.uid()) OR is_admin(auth.uid())) THEN
    RAISE EXCEPTION 'Only therapists and admins can update user roles';
  END IF;

  -- Update the profile
  UPDATE profiles
  SET 
    role = new_role,
    full_name = COALESCE(new_full_name, full_name),
    updated_at = now()
  WHERE id = user_id;

  RETURN FOUND;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_user_role(uuid, user_role, text) TO authenticated;