import { supabase } from './supabase';
import type { Profile, DBActivity, Assignment, ActivityResponse, UserRole, ParentChildLink } from '@/types';

// Profile operations
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating profile:', error);
    return null;
  }
  return data;
}

export async function getAllProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function getChildProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'child')
    .order('username', { ascending: true });

  if (error) {
    console.error('Error fetching child profiles:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function updateUserRole(userId: string, role: UserRole): Promise<boolean> {
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user role:', error);
    return false;
  }
  return true;
}

// Activity operations
export async function createActivity(activity: Omit<DBActivity, 'id' | 'created_at' | 'updated_at'>): Promise<DBActivity | null> {
  const { data, error } = await supabase
    .from('activities')
    .insert(activity)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating activity:', error);
    return null;
  }
  return data;
}

export async function getActivitiesByTherapist(therapistId: string): Promise<DBActivity[]> {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('therapist_id', therapistId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function getActivity(activityId: string): Promise<DBActivity | null> {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('id', activityId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching activity:', error);
    return null;
  }
  return data;
}

export async function updateActivity(activityId: string, updates: Partial<DBActivity>): Promise<DBActivity | null> {
  const { data, error } = await supabase
    .from('activities')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', activityId)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating activity:', error);
    return null;
  }
  return data;
}

export async function deleteActivity(activityId: string): Promise<boolean> {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', activityId);

  if (error) {
    console.error('Error deleting activity:', error);
    return false;
  }
  return true;
}

// Assignment operations
export async function createAssignment(assignment: Omit<Assignment, 'id' | 'assigned_at'>): Promise<Assignment | null> {
  const { data, error } = await supabase
    .from('assignments')
    .insert(assignment)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating assignment:', error);
    return null;
  }
  return data;
}

export async function getAssignmentsByChild(childId: string): Promise<Assignment[]> {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('child_id', childId)
    .order('assigned_at', { ascending: false });

  if (error) {
    console.error('Error fetching assignments:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function getAssignmentsByTherapist(therapistId: string): Promise<Assignment[]> {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('therapist_id', therapistId)
    .order('assigned_at', { ascending: false });

  if (error) {
    console.error('Error fetching assignments:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function getAssignmentsByActivity(activityId: string): Promise<Assignment[]> {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('activity_id', activityId)
    .order('assigned_at', { ascending: false });

  if (error) {
    console.error('Error fetching assignments:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function updateAssignmentStatus(assignmentId: string, status: string): Promise<boolean> {
  const { error } = await supabase
    .from('assignments')
    .update({ status })
    .eq('id', assignmentId);

  if (error) {
    console.error('Error updating assignment status:', error);
    return false;
  }
  return true;
}

export async function deleteAssignment(assignmentId: string): Promise<boolean> {
  const { error } = await supabase
    .from('assignments')
    .delete()
    .eq('id', assignmentId);

  if (error) {
    console.error('Error deleting assignment:', error);
    return false;
  }
  return true;
}

// Activity response operations
export async function createActivityResponse(response: Omit<ActivityResponse, 'id' | 'completed_at'>): Promise<ActivityResponse | null> {
  const { data, error } = await supabase
    .from('activity_responses')
    .insert(response)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating activity response:', error);
    return null;
  }
  return data;
}

export async function getResponsesByChild(childId: string): Promise<ActivityResponse[]> {
  const { data, error } = await supabase
    .from('activity_responses')
    .select('*')
    .eq('child_id', childId)
    .order('completed_at', { ascending: false });

  if (error) {
    console.error('Error fetching responses:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function getResponsesByActivity(activityId: string): Promise<ActivityResponse[]> {
  const { data, error } = await supabase
    .from('activity_responses')
    .select('*')
    .eq('activity_id', activityId)
    .order('completed_at', { ascending: false });

  if (error) {
    console.error('Error fetching responses:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function getResponsesByAssignment(assignmentId: string): Promise<ActivityResponse[]> {
  const { data, error} = await supabase
    .from('activity_responses')
    .select('*')
    .eq('assignment_id', assignmentId)
    .order('completed_at', { ascending: false });

  if (error) {
    console.error('Error fetching responses:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

// Get activities assigned to a child with full details
export async function getAssignedActivitiesForChild(childId: string) {
  const { data, error } = await supabase
    .from('assignments')
    .select(`
      *,
      activities (*)
    `)
    .eq('child_id', childId)
    .order('assigned_at', { ascending: false });

  if (error) {
    console.error('Error fetching assigned activities:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

// Get progress for a specific child
export async function getChildProgress(childId: string, therapistId: string) {
  const assignments = await getAssignmentsByChild(childId);
  const responses = await getResponsesByChild(childId);

  const completedAssignments = assignments.filter(a => a.status === 'completed').length;
  const totalScore = responses.reduce((sum, r) => sum + r.score, 0);
  const totalQuestions = responses.reduce((sum, r) => sum + r.total_questions, 0);
  const averageScore = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;

  const lastResponse = responses[0];
  const lastActivity = lastResponse ? await getActivity(lastResponse.activity_id) : null;

  return {
    totalAssignments: assignments.length,
    completedAssignments,
    averageScore: Math.round(averageScore),
    lastActivity: lastActivity?.name || null,
    responses
  };
}

// Get progress for all children of a therapist
export async function getAllChildrenProgress(therapistId: string) {
  const assignments = await getAssignmentsByTherapist(therapistId);
  const childIds = [...new Set(assignments.map(a => a.child_id))];

  const progressData = await Promise.all(
    childIds.map(async (childId) => {
      const child = await getProfile(childId);
      const progress = await getChildProgress(childId, therapistId);
      return {
        child,
        ...progress
      };
    })
  );

  return progressData.filter(p => p.child !== null);
}

// Parent-child link operations
export async function createParentChildLink(parentId: string, childId: string, therapistId: string): Promise<ParentChildLink | null> {
  const { data, error } = await supabase
    .from('parent_child_links')
    .insert({
      parent_id: parentId,
      child_id: childId,
      created_by_therapist_id: therapistId
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating parent-child link:', error);
    return null;
  }
  return data;
}

export async function getParentChildLinks(parentId: string): Promise<ParentChildLink[]> {
  const { data, error } = await supabase
    .from('parent_child_links')
    .select('*')
    .eq('parent_id', parentId);

  if (error) {
    console.error('Error fetching parent-child links:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function getChildrenForParent(parentId: string): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('parent_child_links')
    .select('child_id')
    .eq('parent_id', parentId);

  if (error || !data) {
    console.error('Error fetching children for parent:', error);
    return [];
  }

  const childIds = data.map(link => link.child_id);
  if (childIds.length === 0) return [];

  const children = await Promise.all(childIds.map(id => getProfile(id)));
  return children.filter(child => child !== null) as Profile[];
}

export async function getParentsForChild(childId: string): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('parent_child_links')
    .select('parent_id')
    .eq('child_id', childId);

  if (error || !data) {
    console.error('Error fetching parents for child:', error);
    return [];
  }

  const parentIds = data.map(link => link.parent_id);
  if (parentIds.length === 0) return [];

  const parents = await Promise.all(parentIds.map(id => getProfile(id)));
  return parents.filter(parent => parent !== null) as Profile[];
}

export async function deleteParentChildLink(linkId: string): Promise<boolean> {
  const { error } = await supabase
    .from('parent_child_links')
    .delete()
    .eq('id', linkId);

  if (error) {
    console.error('Error deleting parent-child link:', error);
    return false;
  }
  return true;
}

// Create user account (for therapists to create child/parent accounts)
export async function createUserAccount(username: string, password: string, fullName: string, role: UserRole): Promise<{ success: boolean; userId?: string; error?: string }> {
  try {
    const email = `${username}@miaoda.com`;
    
    // Get current session to restore later
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: fullName
        },
        emailRedirectTo: undefined
      }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('User creation failed');

    const newUserId = authData.user.id;

    // Restore the therapist's session if it was replaced
    if (currentSession && authData.session) {
      await supabase.auth.setSession({
        access_token: currentSession.access_token,
        refresh_token: currentSession.refresh_token
      });
    }

    // Wait a moment for trigger to create profile
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update role and full_name using RPC function
    const { data: rpcData, error: rpcError } = await supabase.rpc('update_user_role', {
      user_id: newUserId,
      new_role: role,
      new_full_name: fullName
    });

    if (rpcError) {
      console.error('Error updating via RPC:', rpcError);
      throw new Error(`Profile created but role update failed: ${rpcError.message}`);
    }

    return { success: true, userId: newUserId };
  } catch (error: any) {
    console.error('Error creating user account:', error);
    return { success: false, error: error.message };
  }
}

