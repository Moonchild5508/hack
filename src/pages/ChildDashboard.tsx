import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAssignedActivitiesForChild } from '@/db/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Play, CheckCircle, Clock } from 'lucide-react';

export default function ChildDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    if (profile.role !== 'child') {
      navigate('/');
      return;
    }

    loadAssignments();
  }, [profile, navigate]);

  const loadAssignments = async () => {
    if (!profile) return;

    setLoading(true);
    const data = await getAssignedActivitiesForChild(profile.id);
    setAssignments(data);
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Play className="h-5 w-5 text-primary" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  if (!profile || profile.role !== 'child') {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Activities</h1>
        <p className="text-muted-foreground">Activities assigned to you by your therapist</p>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : assignments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center">
              No activities assigned yet.
            </p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Your therapist will assign activities for you to complete.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => {
            const activity = assignment.activities;
            if (!activity) return null;

            return (
              <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{activity.name}</CardTitle>
                    {getStatusIcon(assignment.status)}
                  </div>
                  <CardDescription className="capitalize">
                    {activity.type.replace('_', ' ')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{getStatusText(assignment.status)}</span>
                  </div>
                  {assignment.due_date && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Due:</span>
                      <span className="font-medium">
                        {new Date(assignment.due_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <Button
                    className="w-full"
                    onClick={() => navigate(`/play-activity/${assignment.id}`)}
                  >
                    {assignment.status === 'completed' ? 'Play Again' : 'Start Activity'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{assignments.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">
                {assignments.filter(a => a.status === 'in_progress').length}
              </p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">
                {assignments.filter(a => a.status === 'completed').length}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
