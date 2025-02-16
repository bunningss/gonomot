import Link from "next/link";
import { Heading } from "../heading";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { PollDocument } from "@/lib/types";

interface TopicCardProps {
  mode: "summary" | "details";
  poll: PollDocument;
}

export function PollCard({ mode, poll }: TopicCardProps) {
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
            <Button icon="upvote">{poll?.upvotes}</Button>
            <Button icon="downvote">{poll?.downvotes}</Button>
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
