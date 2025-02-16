import { Comment } from "./cards/comment";
import { Heading } from "./heading";

export function TopicComments() {
  return (
    <section className="border rounded-md p-4">
      <Heading>Comments</Heading>

      <div className="mt-8 space-y-8">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </section>
  );
}
