"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Types } from "mongoose";
import { Heading } from "../heading";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Icon } from "../icon";
import type { PollDocument } from "@/lib/types";
import { errorNotification, successNotification } from "@/utils/toast";
import { updateData } from "@/utils/api-methods";
import { getSession } from "@/utils/auth";
import { PollCardSkeleton } from "../skeletons/poll-card-skeleton";

interface TopicCardProps {
  mode: "summary" | "details";
  poll: PollDocument;
}

export function PollCard({ mode, poll }: TopicCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userId, setUserId] = useState<Types.ObjectId | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const router = useRouter();

  const isExpired = useMemo(
    () => new Date(poll.duration) <= new Date(),
    [poll.duration]
  );

  const getTimeRemaining = useCallback((expirationTime: Date) => {
    const now = new Date();
    const endTime = new Date(expirationTime);
    const timeDiff = endTime.getTime() - now.getTime();

    if (timeDiff <= 0) return "Voting closed";

    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = getTimeRemaining(poll.duration);
      setTimeLeft(remainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [poll.duration, getTimeRemaining]);

  useEffect(() => {
    const fetchUserId = async () => {
      const { payload } = await getSession();
      setUserId(payload?._id as Types.ObjectId);
      setIsLoaded(true);
    };

    fetchUserId();
  }, []);

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

  const upvoted = useMemo(
    () => poll.upvotedUsers?.includes(userId!),
    [poll.upvotedUsers, userId]
  );
  const downvoted = useMemo(
    () => poll.downvotedUsers?.includes(userId!),
    [poll.downvotedUsers, userId]
  );

  if (!isLoaded) {
    return <PollCardSkeleton />;
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <Heading className="first-letter:capitalize">{poll?.title}</Heading>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-2">
        <p
          className={`${
            mode === "summary" ? "line-clamp-4" : ""
          } first-letter:capitalize`}
        >
          {poll?.description}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {!isExpired && (
            <div className="flex gap-4">
              <Button
                disabled={upvoted || downvoted || isLoading}
                className={`${upvoted ? "bg-green-600 text-foreground" : ""}`}
                onClick={() => handleVoting("yes")}
                icon="upvote"
              >
                {poll?.upvotes}
              </Button>
              <Button
                disabled={upvoted || downvoted || isLoading}
                className={`${
                  downvoted ? "bg-destructive text-foreground" : ""
                }`}
                onClick={() => handleVoting("no")}
                icon="downvote"
              >
                {poll?.downvotes}
              </Button>
            </div>
          )}

          {isExpired && (
            <div className="md:text-sm col-span-2 md:col-span-1 flex items-center justify-between gap-4 bg-secondary p-2 rounded-md md:w-fit">
              <div className="flex items-center gap-2 text-green-600">
                <Icon name="thumbsUp" size={18} />
                <span className="font-semibold">{poll.upvotes} in favour</span>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <Icon name="thumbsUp" size={18} />
                <span className="font-semibold">{poll.downvotes} against</span>
              </div>
            </div>
          )}
          <div
            className={`md:flex justify-center ${isExpired ? "hidden" : ""}`}
          >
            <div className="bg-secondary p-2 rounded-md text-center">
              <span className="text-sm text-gray-500">{timeLeft}</span>
            </div>
          </div>

          <div className="flex md:justify-end col-span-2 md:col-span-1">
            {mode === "summary" && (
              <Link href={`/polls/${poll?._id}`} className="w-full md:w-fit">
                <Button icon="details" className="w-full md:w-fit">
                  view details
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
