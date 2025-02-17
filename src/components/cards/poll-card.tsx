"use client";
import Link from "next/link";
import { Heading } from "../heading";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { PollDocument } from "@/lib/types";
import { errorNotification, successNotification } from "@/utils/toast";
import { updateData } from "@/utils/api-methods";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TopicCardProps {
  mode: "summary" | "details";
  poll: PollDocument;
}

export function PollCard({ mode, poll }: TopicCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleVoting = async (vote: string) => {
    try {
      setIsLoading(true);
      const { error, response } = await updateData(`vote/${poll._id}`, {
        vote,
      });
      if (error) return errorNotification(response.msg);

      router.refresh();
      successNotification(response.msg);
    } catch (error) {
      console.error((error as Error).message);
      errorNotification("Failed to cast vote.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Heading className="first-letter:capitalize">{poll?.title}</Heading>
      </CardHeader>
      <CardContent className="space-y-2">
        <p
          className={`${
            mode === "summary" ? "line-clamp-4" : ""
          } first-letter:capitalize`}
        >
          {poll?.description}
        </p>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Button
              disabled={isLoading}
              onClick={() => handleVoting("yes")}
              icon="upvote"
            >
              {poll?.upvotes}
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => handleVoting("no")}
              icon="downvote"
            >
              {poll?.downvotes}
            </Button>
          </div>
          {mode === "summary" && (
            <Link href={`/polls/${poll?._id}`}>
              <Button icon="details">view details</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
