import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

type User = {
  username: string;
  website: string;
  affiliation: string;
  country: string;
};

export const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Users
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Affiliation</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.username}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.website}</TableCell>
              <TableCell>{user.affiliation}</TableCell>
              <TableCell>{user.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
