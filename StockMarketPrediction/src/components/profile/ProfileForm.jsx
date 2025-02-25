import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, Upload, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileForm = ({ profileData, setProfileData }) => {
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  // Set initial facing mode to 'user' for selfie camera
  const [facingMode, setFacingMode] = useState("user");

  // Function to initialize the camera with the current facing mode
  const initializeCamera = async (mode) => {
    try {
      // Stop any previous stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      const constraints = { video: { facingMode: mode } };
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        await videoRef.current.play();
      }
      setIsCameraOpen(true);
      toast({
        title: "Camera Ready",
        description: "Camera stream is active. Use the toggle to switch cameras if needed.",
      });
    } catch (err) {
      toast({
        title: "Camera Access Denied",
        description: "Grant permissions in browser settings.",
        variant: "destructive",
      });
      setIsCameraOpen(false);
    }
  };

  // Handle camera capture initiation on button click
  const handleCameraCapture = async () => {
    // Initialize the camera with current facing mode
    await initializeCamera(facingMode);
  };

  // Capture the photo from the video feed
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageDataUrl = canvasRef.current.toDataURL("image/png");
      setProfileData((prev) => ({ ...prev, profileImage: imageDataUrl }));
      stopCamera();
      toast({
        title: "Photo Captured",
        description: "Profile picture updated.",
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

  // Toggle between selfie (user) and rear (environment) camera
  const toggleCamera = async () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);
    await initializeCamera(newFacingMode);
    toast({
      title: "Camera Toggled",
      description: `Switched to ${newFacingMode === "user" ? "selfie" : "rear"} camera.`,
    });
  };

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Profile has been successfully updated.",
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
              <Button variant="secondary" onClick={toggleCamera}>
                <RotateCcw className="w-4 h-4" />
                Toggle Camera
              </Button>
              <Button variant="destructive" onClick={stopCamera}>Cancel</Button>
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