import { useState, useEffect } from 'react';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileForm from '../components/profile/ProfileForm';
import NotificationsSection from '../components/profile/NotificationsSection';
import BillingSection from '../components/profile/BillingSection';
import SettingsSection from '../components/profile/SettingsSection';
import { Card, CardContent } from '../components/ui/card';
import { fetchUser } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { ring } from 'ldrs';

ring.register();

const UserProfile = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    profileImage: null,
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUser(token);
        if (data.success) {
          setProfileData({
            fullName: data.user.name,
            email: data.user.email,
            phone: data.user.phone || '',
            bio: data.user.bio || '',
            profileImage: data.user.profileImage || null,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileForm profileData={profileData} setProfileData={setProfileData} />;
      case 'notifications':
        return <NotificationsSection notifications={notifications} setNotifications={setNotifications} />;
      case 'billing':
        return <BillingSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">This section is under development.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="container mx-auto py-6 px-2 md:px-4 relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <l-ring size="103" stroke="4" speed="1" color="black"></l-ring>
        </div>
      )}
      <div className={`${loading ? "blur-sm pointer-events-none" : ""} flex flex-col md:flex-row gap-4 md:gap-6`}>
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserProfile;
