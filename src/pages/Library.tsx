import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trash2, Eye, ArrowLeft } from 'lucide-react';
import { getActivities, getAACBoards, getSchedules, deleteActivity, deleteAACBoard, deleteSchedule } from '@/lib/storage';
import type { Activity, AACBoard, VisualSchedule } from '@/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function Library() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [aacBoards, setAACBoards] = useState<AACBoard[]>([]);
  const [schedules, setSchedules] = useState<VisualSchedule[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setActivities(getActivities());
    setAACBoards(getAACBoards());
    setSchedules(getSchedules());
  };

  const handleDeleteActivity = (id: string) => {
    deleteActivity(id);
    loadData();
  };

  const handleDeleteBoard = (id: string) => {
    deleteAACBoard(id);
    loadData();
  };

  const handleDeleteSchedule = (id: string) => {
    deleteSchedule(id);
    loadData();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl xl:text-4xl font-bold mb-2">My Library</h1>
            <p className="text-muted-foreground">
              View and manage all your created activities, AAC boards, and visual schedules
            </p>
          </div>

          <Tabs defaultValue="activities" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="activities">
                Activities ({activities.length})
              </TabsTrigger>
              <TabsTrigger value="aac">
                AAC Boards ({aacBoards.length})
              </TabsTrigger>
              <TabsTrigger value="schedules">
                Schedules ({schedules.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activities">
              {activities.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">No activities created yet</p>
                    <Link to="/activity-builder">
                      <Button>Create Your First Activity</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {activities.map((activity) => (
                    <Card key={activity.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{activity.name}</CardTitle>
                            <CardDescription className="mt-1">
                              Created {formatDate(activity.createdAt)}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" className="capitalize">
                            {activity.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Link to={`/activity-builder?id=${activity.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              View/Edit
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Activity?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the activity "{activity.name}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteActivity(activity.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="aac">
              {aacBoards.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">No AAC boards created yet</p>
                    <Link to="/aac-builder">
                      <Button>Create Your First AAC Board</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {aacBoards.map((board) => (
                    <Card key={board.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{board.name}</CardTitle>
                            <CardDescription className="mt-1">
                              Created {formatDate(board.createdAt)}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">{board.gridSize}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Link to={`/aac-builder?id=${board.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              View/Edit
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete AAC Board?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the board "{board.name}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteBoard(board.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="schedules">
              {schedules.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">No schedules created yet</p>
                    <Link to="/schedule-builder">
                      <Button>Create Your First Schedule</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {schedules.map((schedule) => (
                    <Card key={schedule.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{schedule.name}</CardTitle>
                            <CardDescription className="mt-1">
                              Created {formatDate(schedule.createdAt)}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">{schedule.steps.length} steps</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Link to={`/schedule-builder?id=${schedule.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              View/Edit
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Schedule?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the schedule "{schedule.name}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteSchedule(schedule.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
