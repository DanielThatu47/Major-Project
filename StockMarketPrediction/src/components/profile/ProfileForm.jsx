import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileForm = ({ profileData, setProfileData }) => {
 
  
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Implement the update logic, e.g., send updated data to the backend
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      toast({
        title: "Camera Accessed",
        description: "Camera capture feature is ready to use.",
      });
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <Avatar className="w-full h-full border-2 border-gray-200 bg-blue-600 text-white rounded-full">
              <AvatarImage
                src={profileData?.profileImage || ""}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover"
              />
              <AvatarFallback className="flex items-center justify-center w-full h-full bg-blue-500 text-white text-5xl font-bold rounded-full cursor-pointer">
                {profileData?.fullName && profileData.fullName.length > 0 ? profileData.fullName[0].toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={handleCameraCapture}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profileData.fullName}
              onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;