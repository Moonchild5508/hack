import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getActivity, getChildProfiles, createAssignment, getAssignmentsByActivity } from '@/db/api';
import type { DBActivity, Profile } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';

export default function AssignActivity() {
  const { activityId } = useParams<{ activityId: string }>();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activity, setActivity] = useState<DBActivity | null>(null);
  const [children, setChildren] = useState<Profile[]>([]);
  const [assignedChildren, setAssignedChildren] = useState<Set<string>>(new Set());
  const [selectedChildren, setSelectedChildren] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!profile || !activityId) return;
    loadData();
  }, [profile, activityId]);

  const loadData = async () => {
    if (!profile || !activityId) return;

    setLoading(true);
    const [activityData, childrenData, assignments] = await Promise.all([
      getActivity(activityId),
      getChildProfiles(),
      getAssignmentsByActivity(activityId)
    ]);

    setActivity(activityData);
    setChildren(childrenData);
    setAssignedChildren(new Set(assignments.map(a => a.child_id)));
    setLoading(false);
  };

  const handleToggleChild = (childId: string) => {
    const newSelected = new Set(selectedChildren);
    if (newSelected.has(childId)) {
      newSelected.delete(childId);
    } else {
      newSelected.add(childId);
    }
    setSelectedChildren(newSelected);
  };

  const handleAssign = async () => {
    if (!profile || !activityId || selectedChildren.size === 0) return;

    setSubmitting(true);

    const promises = Array.from(selectedChildren).map(childId =>
      createAssignment({
        activity_id: activityId,
        child_id: childId,
        therapist_id: profile.id,
        status: 'assigned',
        due_date: null
      })
    );

    await Promise.all(promises);

    toast({
      title: 'Success',
      description: `Activity assigned to ${selectedChildren.size} ${selectedChildren.size === 1 ? 'child' : 'children'}`
    });

    setSubmitting(false);
    navigate('/therapist-dashboard');
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Skeleton className="h-8 w-64 mb-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Activity not found</p>
            <Button className="mt-4" onClick={() => navigate('/therapist-dashboard')}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/therapist-dashboard')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div>
        <h1 className="text-3xl font-bold">Assign Activity</h1>
        <p className="text-muted-foreground">Select children to assign this activity to</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{activity.name}</CardTitle>
          <CardDescription className="capitalize">
            {activity.type.replace('_', ' ')} activity
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Children</CardTitle>
          <CardDescription>
            Choose which children should receive this activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No children registered yet.</p>
              <p className="text-sm mt-2">Children need to sign up with a child account.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {children.map((child) => {
                const isAssigned = assignedChildren.has(child.id);
                const isSelected = selectedChildren.has(child.id);

                return (
                  <div
                    key={child.id}
                    className="flex items-center space-x-3 p-4 border rounded-lg"
                  >
                    <Checkbox
                      id={child.id}
                      checked={isSelected}
                      onCheckedChange={() => handleToggleChild(child.id)}
                      disabled={isAssigned}
                    />
                    <Label
                      htmlFor={child.id}
                      className="flex-1 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{child.full_name || child.username}</p>
                        <p className="text-sm text-muted-foreground">@{child.username}</p>
                      </div>
                    </Label>
                    {isAssigned && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        Already assigned
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {children.length > 0 && (
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => navigate('/therapist-dashboard')}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={selectedChildren.size === 0 || submitting}
          >
            {submitting ? 'Assigning...' : `Assign to ${selectedChildren.size} ${selectedChildren.size === 1 ? 'Child' : 'Children'}`}
          </Button>
        </div>
      )}
    </div>
  );
}
