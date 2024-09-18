import React, { useEffect, useState } from "react";

import { useAuth } from "../AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  rollNo?: string;
  instituteName?: string;
}

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [rollNo, setRollNo] = useState("");
  const [instituteName, setInstituteName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:8787/api/users/${user.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
          if (response.ok) {
            const data = await response.json();
            setProfile(data);
            setRollNo(data.rollNo || "");
            setInstituteName(data.instituteName || "");
          } else {
            console.error("Failed to fetch profile");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        const response = await fetch(
          `http://localhost:8787/api/users/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ rollNo, instituteName }),
          },
        );
        if (response.ok) {
          const updatedProfile = await response.json();
          setProfile(updatedProfile);
          alert("Profile updated successfully!");
        } else {
          console.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mx-auto mt-8 w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Name
            </label>
            <Input value={profile.name} disabled />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <Input value={profile.email} disabled />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="rollNo"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Roll No (optional)
            </label>
            <Input
              id="rollNo"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter your roll number"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="instituteName"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Institute Name (optional)
            </label>
            <Input
              id="instituteName"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              placeholder="Enter your institute name"
            />
          </div>
          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
