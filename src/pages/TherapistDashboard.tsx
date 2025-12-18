import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getActivitiesByTherapist, getAllChildrenProgress, getChildProfiles } from '@/db/api';
import type { DBActivity, Profile } from '@/types';
import { Plus, Users, Activity, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TherapistDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<DBActivity[]>([]);
  const [children, setChildren] = useState<Profile[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    if (profile.role !== 'therapist' && profile.role !== 'admin') {
      navigate('/');
      return;
    }

    loadData();
  }, [profile, navigate]);

  const loadData = async () => {
    if (!profile) return;

    setLoading(true);
    const [activitiesData, childrenData, progressData] = await Promise.all([
      getActivitiesByTherapist(profile.id),
      getChildProfiles(),
      getAllChildrenProgress(profile.id)
    ]);

    setActivities(activitiesData);
    setChildren(childrenData);
    setProgress(progressData);
    setLoading(false);
  };

  if (!profile || (profile.role !== 'therapist' && profile.role !== 'admin')) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Therapist Dashboard</h1>
          <p className="text-muted-foreground">Manage activities and track progress</p>
        </div>
        <Button onClick={() => navigate('/activity-builder')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Activity
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.length}</div>
              <p className="text-xs text-muted-foreground">
                Created by you
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Children</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{children.length}</div>
              <p className="text-xs text-muted-foreground">
                Registered in system
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {progress.length > 0
                  ? Math.round(progress.reduce((sum, p) => sum + p.averageScore, 0) / progress.length)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Across all children
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="activities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activities">My Activities</TabsTrigger>
          <TabsTrigger value="children">Children</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Activities</CardTitle>
              <CardDescription>Activities you've created</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : activities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No activities yet. Create your first activity!</p>
                  <Button className="mt-4" onClick={() => navigate('/activity-builder')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Activity
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium">{activity.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {activity.type.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/assign-activity/${activity.id}`)}
                        >
                          Assign
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/activity-progress/${activity.id}`)}
                        >
                          View Progress
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="children" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registered Children</CardTitle>
              <CardDescription>Children who can be assigned activities</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : children.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No children registered yet.</p>
                  <p className="text-sm mt-2">Children need to sign up with a child account.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{child.full_name || child.username}</h3>
                        <p className="text-sm text-muted-foreground">@{child.username}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/child-progress/${child.id}`)}
                      >
                        View Progress
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
              <CardDescription>Track how children are performing</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : progress.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No progress data yet.</p>
                  <p className="text-sm mt-2">Assign activities to children to start tracking progress.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {progress.map((item) => (
                    <div
                      key={item.child?.id}
                      className="p-4 border rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{item.child?.full_name || item.child?.username}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/child-progress/${item.child?.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Assignments</p>
                          <p className="font-medium">{item.totalAssignments}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Completed</p>
                          <p className="font-medium">{item.completedAssignments}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg Score</p>
                          <p className="font-medium">{item.averageScore}%</p>
                        </div>
                      </div>
                      {item.lastActivity && (
                        <p className="text-xs text-muted-foreground">
                          Last activity: {item.lastActivity}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
