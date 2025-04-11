import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save } from "lucide-react";
import { toast } from "sonner";

const ProfileInformation: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);

  // Mock user data
  const [userData, setUserData] = React.useState({
    name: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    bio: "Frontend developer passionate about UX/UI design and web development",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast("Profile updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt={userData.name}
          />
          <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-medium">{userData.name}</h3>
          <p className="text-sm text-muted-foreground">{userData.email}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <Save size={18} /> : <Edit size={18} />}
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            defaultValue={userData.name}
            disabled={!isEditing}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            defaultValue={userData.username}
            disabled={!isEditing}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            defaultValue={userData.email}
            disabled={!isEditing}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Tell us about yourself"
            defaultValue={userData.bio}
            disabled={!isEditing}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          />
        </div>

        {isEditing && (
          <Button onClick={handleSave} className="w-full md:w-auto">
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileInformation;
