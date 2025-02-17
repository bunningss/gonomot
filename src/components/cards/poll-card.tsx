"use client";
import Link from "next/link";
import { Heading } from "../heading";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { PollDocument } from "@/lib/types";
import { errorNotification, successNotification } from "@/utils/toast";
import { updateData } from "@/utils/api-methods";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Icon } from "../icon";

interface TopicCardProps {
  mode: "summary" | "details";
  poll: PollDocument;
}

export function PollCard({ mode, poll }: TopicCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const router = useRouter();

  // calculate time remaining
  const getTimeRemaining = (expirationTime: Date) => {
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
  };

  // update countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = getTimeRemaining(poll.duration);
      setTimeLeft(remainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [poll.duration]);

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
          {new Date(poll.duration) > new Date() && (
            <div className="flex gap-4">
              <Button
                disabled={isLoading || new Date(poll.duration) <= new Date()}
                onClick={() => handleVoting("yes")}
                icon="upvote"
              >
                {poll?.upvotes}
              </Button>
              <Button
                disabled={isLoading || new Date(poll.duration) <= new Date()}
                onClick={() => handleVoting("no")}
                icon="downvote"
              >
                {poll?.downvotes}
              </Button>
            </div>
          )}

          {new Date(poll.duration) <= new Date() && (
            <div className="col-span-2 md:col-span-1 flex items-center justify-between gap-4 bg-secondary p-2 rounded-md md:w-fit">
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
            className={`md:flex justify-center ${
              new Date(poll.duration) <= new Date() ? "hidden" : ""
            }`}
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
