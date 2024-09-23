import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../AuthContext";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";

type Challenge = {
  id: string;
  name: string;
  description: string;
  url: string;
  points: number;
  author: string;
  flag: string | null;
  solved: boolean;
};

type CategoryChallenges = {
  category: string;
  challenges: Challenge[];
};

export const Challenges: React.FC = () => {
  const [categories, setCategories] = useState<CategoryChallenges[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [flagInput, setFlagInput] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const { user } = useAuth(); // Get the current user (including isAdmin)

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/challenges/read", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCategories(data.challenges);
        } else {
          console.error("Failed to fetch challenges");
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  const openDialog = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setFlagInput("");
    setSubmissionStatus(null); // Reset status for new challenge
  };

  const handleFlagSubmission = async () => {
    if (!selectedChallenge) return;
    if (!flagInput || !flagInput.trim()) return;
    if (submissionStatus === "correct") return;

    try {
      const response = await fetch(
        `http://localhost:8787/api/challenges/submit/${selectedChallenge.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ flag: flagInput }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (data.submission.isCorrect) {
          setSubmissionStatus("correct");
          setCategories((prevCategories) =>
            prevCategories.map((category) => ({
              ...category,
              challenges: category.challenges.map((challenge) =>
                challenge.id === selectedChallenge.id
                  ? { ...challenge, solved: true }
                  : challenge,
              ),
            })),
          );
        } else if (data.submission.error === "max_limit_reached") {
          setSubmissionStatus("max_limit");
        } else {
          setSubmissionStatus("incorrect");
        }
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Error submitting flag:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Challenges
      </h1>

      {categories.map((category) => (
        <div key={category.category} className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            {category.category}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {category.challenges.map((challenge) => (
              <Dialog key={challenge.id}>
                <DialogTrigger asChild>
                  <Card
                    className={`cursor-pointer border-none text-center shadow-custom transition-shadow duration-300 hover:shadow-hover-custom dark:hover:shadow-dark-hover ${
                      challenge.solved ? "bg-green-400 dark:bg-green-600" : "dark:bg-zinc-700"
                    }`}
                    onClick={() => openDialog(challenge)}
                  >
                    <CardHeader>
                      <CardTitle>{challenge.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{challenge.points} points</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{selectedChallenge?.name}</DialogTitle>
                    <DialogDescription>
                      <p>{selectedChallenge?.description}</p>
                      <p>
                        <strong>Points:</strong> {selectedChallenge?.points}
                      </p>
                      <p>
                        <strong>Author:</strong> {selectedChallenge?.author}
                      </p>
                      <p>
                        <strong>Challenge Link:</strong> {selectedChallenge?.url}
                      </p>
                      {user?.isAdmin && (
                        <>
                          <p>
                            <strong>Flag:</strong> {selectedChallenge?.flag}
                          </p>
                          <div className="my-4">
                            <Button asChild>
                              <Link to={`/admin/challenges/edit?id=${selectedChallenge?.id}`}>
                                Edit Challenge
                              </Link>
                            </Button>
                          </div>
                        </>
                      )}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Hide flag input and button for admins */}
                  {!user?.isAdmin && (
                    <>
                      <Input
                        type="text"
                        placeholder="Enter flag"
                        value={flagInput}
                        onChange={(e) => setFlagInput(e.target.value)}
                      />
                      {submissionStatus && (
                        <Alert
                          variant={
                            submissionStatus === "correct"
                              ? "default"
                              : submissionStatus === "max_limit"
                              ? "destructive"
                              : "destructive"
                          }
                        >
                          <AlertTitle className="font-bold">
                            {submissionStatus === "correct"
                              ? "Correct!"
                              : submissionStatus === "max_limit"
                              ? "Maximum Limit Reached!"
                              : "Error!"}
                          </AlertTitle>
                          <AlertDescription>
                            {submissionStatus === "correct"
                              ? "You have successfully solved the challenge."
                              : submissionStatus === "max_limit"
                              ? "You have reached the maximum submission limit for this challenge."
                              : "An error occurred while submitting the flag."}
                          </AlertDescription>
                        </Alert>
                      )}
                      <DialogFooter>
                        <Button onClick={handleFlagSubmission}>
                          Submit Flag
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
