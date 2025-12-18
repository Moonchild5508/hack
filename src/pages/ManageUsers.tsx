import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { createUserAccount, getChildProfiles, getAllProfiles, createParentChildLink, getParentChildLinks } from '@/db/api';
import type { Profile, UserRole } from '@/types';
import { UserPlus, Users, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ManageUsers() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [children, setChildren] = useState<Profile[]>([]);
  const [parents, setParents] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  // Create user form
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('child');

  // Link parent-child form
  const [selectedParent, setSelectedParent] = useState('');
  const [selectedChild, setSelectedChild] = useState('');

  useEffect(() => {
    if (!profile) return;
    if (profile.role !== 'therapist' && profile.role !== 'admin') {
      navigate('/');
      return;
    }
    loadData();
  }, [profile, navigate]);

  const loadData = async () => {
    setLoading(true);
    const [childrenData, allUsers] = await Promise.all([
      getChildProfiles(),
      getAllProfiles()
    ]);
    
    setChildren(childrenData);
    setParents(allUsers.filter(u => u.role === 'parent'));
    setLoading(false);
  };

  const handleCreateUser = async () => {
    if (!profile) return;

    if (!newUsername || !newPassword || !newFullName) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_]+$/.test(newUsername)) {
      toast({
        title: 'Invalid Username',
        description: 'Username can only contain letters, numbers, and underscores',
        variant: 'destructive'
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive'
      });
      return;
    }

    setCreating(true);
    const result = await createUserAccount(newUsername, newPassword, newFullName, newRole);
    setCreating(false);

    if (result.success) {
      toast({
        title: 'Success! 🎉',
        description: `${newRole === 'child' ? 'Child' : 'Parent'} account created successfully`,
      });
      
      // Show credentials in a more prominent way
      setTimeout(() => {
        toast({
          title: '📋 Login Credentials',
          description: `Username: ${newUsername}\nPassword: ${newPassword}\n\nPlease save these and share with the ${newRole}.`,
          duration: 15000
        });
      }, 500);

      setShowCreateDialog(false);
      setNewUsername('');
      setNewPassword('');
      setNewFullName('');
      setNewRole('child');
      loadData();
    } else {
      let errorMessage = result.error || 'Failed to create account';
      
      // Provide more helpful error messages
      if (errorMessage.includes('duplicate') || errorMessage.includes('unique')) {
        errorMessage = 'This username is already taken. Please choose a different username.';
      } else if (errorMessage.includes('password')) {
        errorMessage = 'Password must be at least 6 characters long.';
      }
      
      toast({
        title: 'Error Creating Account',
        description: errorMessage,
        variant: 'destructive',
        duration: 7000
      });
    }
  };

  const handleLinkParentChild = async () => {
    if (!profile || !selectedParent || !selectedChild) {
      toast({
        title: 'Error',
        description: 'Please select both parent and child',
        variant: 'destructive'
      });
      return;
    }

    const link = await createParentChildLink(selectedParent, selectedChild, profile.id);
    
    if (link) {
      toast({
        title: 'Success',
        description: 'Parent and child linked successfully'
      });
      setShowLinkDialog(false);
      setSelectedParent('');
      setSelectedChild('');
    } else {
      toast({
        title: 'Error',
        description: 'Failed to link parent and child',
        variant: 'destructive'
      });
    }
  };

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };

  if (!profile || (profile.role !== 'therapist' && profile.role !== 'admin')) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/therapist-dashboard')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-muted-foreground">Create and manage child and parent accounts</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Create Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Account</DialogTitle>
                <DialogDescription>
                  Create a child or parent account. You'll receive login credentials to share.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <Select value={newRole} onValueChange={(value) => setNewRole(value as UserRole)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="child">Child/Patient</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    placeholder="Enter full name"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input
                    placeholder="Enter username (letters, numbers, underscore only)"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Only letters, numbers, and underscores. No spaces.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button type="button" variant="outline" onClick={generatePassword}>
                      Generate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Save these credentials to share with the user
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateUser} disabled={creating}>
                    {creating ? 'Creating...' : 'Create Account'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <LinkIcon className="mr-2 h-4 w-4" />
                Link Parent to Child
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Link Parent to Child</DialogTitle>
                <DialogDescription>
                  Connect a parent account to a child account so parents can view their child's progress.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Parent</Label>
                  <Select value={selectedParent} onValueChange={setSelectedParent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a parent" />
                    </SelectTrigger>
                    <SelectContent>
                      {parents.map(parent => (
                        <SelectItem key={parent.id} value={parent.id}>
                          {parent.full_name || parent.username}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Select Child</Label>
                  <Select value={selectedChild} onValueChange={setSelectedChild}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a child" />
                    </SelectTrigger>
                    <SelectContent>
                      {children.map(child => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.full_name || child.username}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleLinkParentChild}>
                    Link Accounts
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="children" className="space-y-4">
        <TabsList>
          <TabsTrigger value="children">Children ({children.length})</TabsTrigger>
          <TabsTrigger value="parents">Parents ({parents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="children">
          <Card>
            <CardHeader>
              <CardTitle>Child Accounts</CardTitle>
              <CardDescription>Children/patients you've created</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : children.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No child accounts yet</p>
                  <p className="text-sm mt-1">Create a child account to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {children.map(child => (
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

        <TabsContent value="parents">
          <Card>
            <CardHeader>
              <CardTitle>Parent Accounts</CardTitle>
              <CardDescription>Parents you've created</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : parents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No parent accounts yet</p>
                  <p className="text-sm mt-1">Create a parent account to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {parents.map(parent => (
                    <div
                      key={parent.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{parent.full_name || parent.username}</h3>
                        <p className="text-sm text-muted-foreground">@{parent.username}</p>
                      </div>
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
