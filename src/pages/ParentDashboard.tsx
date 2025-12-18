import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getChildrenForParent, getChildProgress } from '@/db/api';
import type { Profile } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, TrendingUp, CheckCircle } from 'lucide-react';

export default function ParentDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [children, setChildren] = useState<Profile[]>([]);
  const [childrenProgress, setChildrenProgress] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    if (profile.role !== 'parent') {
      navigate('/');
      return;
    }

    loadData();
  }, [profile, navigate]);

  const loadData = async () => {
    if (!profile) return;

    setLoading(true);
    const childrenData = await getChildrenForParent(profile.id);
    setChildren(childrenData);

    // Load progress for each child
    const progressData: Record<string, any> = {};
    for (const child of childrenData) {
      const progress = await getChildProgress(child.id, profile.id);
      progressData[child.id] = progress;
    }
    setChildrenProgress(progressData);

    setLoading(false);
  };

  if (!profile || profile.role !== 'parent') {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <p className="text-muted-foreground">View your children's progress</p>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : children.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No children linked to your account yet.
            </p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Contact your therapist to link your child's account.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {children.map((child) => {
            const progress = childrenProgress[child.id] || {};
            return (
              <Card key={child.id}>
                <CardHeader>
                  <CardTitle>{child.full_name || child.username}</CardTitle>
                  <CardDescription>@{child.username}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-bold">{progress.totalAssignments || 0}</p>
                      <p className="text-xs text-muted-foreground">Assignments</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-2xl font-bold text-green-500">
                        {progress.completedAssignments || 0}
                      </p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        {progress.averageScore || 0}%
                      </p>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                    </div>
                  </div>
                  {progress.lastActivity && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Last activity: <span className="font-medium">{progress.lastActivity}</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
