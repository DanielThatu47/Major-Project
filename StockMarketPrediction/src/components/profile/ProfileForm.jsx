import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileForm = ({ profileData, setProfileData }) => {
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  // Handle image upload from file input
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle camera access and capture
  const handleCameraCapture = async () => {
    try {
      // Check for camera access permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      toast({
        title: "Camera Ready",
        description: "You can now capture a photo.",
      });
    } catch (err) {
      toast({
        title: "Camera Access Denied",
        description: "Please grant camera permissions in your browser settings.",
        variant: "destructive",
      });
    }
  };

  // Capture the photo from video feed
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageDataUrl = canvasRef.current.toDataURL("image/png");
      setProfileData((prev) => ({ ...prev, profileImage: imageDataUrl }));
      stopCamera();
      toast({
        title: "Photo Captured",
        description: "Your new profile picture has been set.",
      });
    }
  };

  // Stop the camera stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
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
                {profileData?.fullName ? profileData.fullName[0].toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 flex gap-2">
              <Button size="icon" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="secondary" onClick={handleCameraCapture}>
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* Camera Capture Section */}
        {isCameraOpen && (
          <div className="flex flex-col items-center space-y-4">
            <video ref={videoRef} autoPlay className="w-64 h-48 rounded-lg border" />
            <canvas ref={canvasRef} width="256" height="192" className="hidden" />
            <div className="flex gap-4">
              <Button variant="primary" onClick={capturePhoto}>Capture Photo</Button>
              <Button variant="secondary" onClick={stopCamera}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profileData.fullName}
              onChange={(e) => setProfileData((prev) => ({ ...prev, fullName: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={profileData.phone}
              onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;