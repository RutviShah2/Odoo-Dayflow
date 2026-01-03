import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  Calendar,
  Edit2,
  Save,
  X,
  FileText,
  Download,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
    });
  };

  const handleCancel = () => {
    setFormData({
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header Card */}
        <div className="relative overflow-hidden bg-card rounded-2xl shadow-card border border-border/50">
          <div className="h-32 bg-gradient-primary" />
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
              <Avatar className="w-32 h-32 border-4 border-card shadow-lg">
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 pb-2">
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground">{user.designation}</p>
              </div>
              <Button
                variant={isEditing ? 'outline' : 'default'}
                onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="personal" className="rounded-lg">Personal Info</TabsTrigger>
            <TabsTrigger value="job" className="rounded-lg">Job Details</TabsTrigger>
            <TabsTrigger value="documents" className="rounded-lg">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <h2 className="text-lg font-semibold mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Full Name</Label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Email Address</Label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{user.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      value={formData.phone}
                      onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                      className="h-12"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{user.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Address</Label>
                  {isEditing ? (
                    <Input
                      value={formData.address}
                      onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter address"
                      className="h-12"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{user.address || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="job" className="mt-6">
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <h2 className="text-lg font-semibold mb-6">Job Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Employee ID</Label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{user.employeeId}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Department</Label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{user.department}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Designation</Label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{user.designation}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Joining Date</Label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">
                      {format(new Date(user.joiningDate), 'd MMMM yyyy')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Role</Label>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium capitalize px-2 py-0.5 rounded-full bg-primary/10 text-primary text-sm">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <h2 className="text-lg font-semibold mb-6">Documents</h2>
              <div className="space-y-4">
                {[
                  { name: 'Offer Letter', date: user.joiningDate },
                  { name: 'ID Proof', date: user.joiningDate },
                  { name: 'Address Proof', date: user.joiningDate },
                ].map(doc => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded on {format(new Date(doc.date), 'd MMM yyyy')}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
