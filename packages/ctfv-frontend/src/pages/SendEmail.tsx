import { getBackendURL } from "../lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../AuthContext";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const SendEmail = () => {
  const [resendStatus, setResendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [error, setError] = useState<string>("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const initialEmailSentRef = useRef(false);

  const handleResendEmail = useCallback(async () => {
    setResendStatus("sending");
    try {
      const response = await fetch(
        getBackendURL() + "/api/users/auth/send-verify-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user?.email }),
        },
      );

      if (response.ok) {
        setResendStatus("sent");
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to resend verification email");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setResendStatus("error");
      setError(err.message);
    }
  }, [user?.email]);

  useEffect(() => {
    if (user?.emailVerified) {
      navigate("/");
    } else if (!initialEmailSentRef.current && user?.email) {
      handleResendEmail();
      initialEmailSentRef.current = true;
    }
  }, [user?.email, user?.emailVerified, navigate, handleResendEmail]);

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Card className="mx-auto mt-8 w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Verify Your Email
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-center">
          We've sent a verification email to <strong>{user.email}</strong>.
          Please check your inbox and click the verification link to complete
          your registration.
        </p>
        {resendStatus === "sent" && (
          <Alert className="mb-4">
            <AlertDescription>
              Verification email has been resent. Please check your inbox.
            </AlertDescription>
          </Alert>
        )}
        {resendStatus === "error" && (
          <Alert className="mb-4" variant="destructive">
            <AlertDescription>
              Failed to resend verification email. Please try again later.
              Error: {error}
            </AlertDescription>
          </Alert>
        )}
        <Button
          onClick={handleResendEmail}
          disabled={resendStatus === "sending"}
          className="w-full"
        >
          {resendStatus === "sending"
            ? "Sending..."
            : "Resend Verification Email"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SendEmail;
