import { Heading } from "../heading";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

export function PostCard() {
  return (
    <Card>
      <CardHeader>
        <Heading>Should we eat rice?</Heading>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="line-clamp-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, totam
          magni. Expedita autem assumenda unde adipisci deleniti vitae. Ad quod
          quos obcaecati a asperiores est quo iure optio atque facilis, nemo
          fugit ullam non eligendi fuga, architecto provident veniam sapiente
          tempore ipsam. Fugiat laboriosam libero cum dolores blanditiis
          obcaecati maxime. Architecto esse reprehenderit temporibus debitis
          saepe exercitationem ipsum impedit error deserunt omnis. Sit eum
          eveniet error tenetur quibusdam nisi porro incidunt sequi! A accusamus
          atque velit labore sapiente, doloremque et iste repellat! Dolor
          quaerat aspernatur obcaecati architecto tempora corrupti omnis,
          corporis libero delectus, inventore officiis adipisci est? Similique
          dolores saepe libero, fugiat ut exercitationem obcaecati, harum
          blanditiis minus adipisci quaerat iure eveniet deleniti facere et quae
          distinctio! Ipsam non nobis vero ad, blanditiis impedit assumenda
          deleniti ut nesciunt. Delectus dolores blanditiis debitis, ipsum
          voluptates fuga accusantium ipsam eius quaerat porro distinctio
          obcaecati maiores, autem unde? Ratione, quaerat nostrum error ut ullam
          doloribus perspiciatis ad laborum aperiam nihil sequi enim impedit
          tempora expedita quisquam sed officiis porro assumenda maxime
          blanditiis, dignissimos cupiditate, beatae magnam? Reiciendis quia
          laborum quisquam pariatur asperiores ex expedita, numquam voluptatem
          nam nesciunt, voluptas eius? Ex qui nihil perspiciatis dolorem
          asperiores fugit, maxime rem distinctio a ut. Ipsum ea veniam culpa
          quos provident dolorum ad quisquam modi iste similique? Quo aut
          aliquam deleniti ad doloremque. Sit quisquam velit fugiat quas numquam
          incidunt iste expedita minima neque. Necessitatibus, quisquam dolor!
          Incidunt architecto voluptatum, ipsam a deserunt minima ipsum quidem
          tempora quisquam, quam officia molestias aliquam earum dolor
          repudiandae aperiam. Aut, expedita officia culpa cupiditate optio ea
          recusandae! Hic perferendis, at accusamus, ad consequatur consectetur
          aliquam ab architecto illum iste excepturi maxime tempore sint saepe
          ex mollitia quo quis reiciendis, atque fugiat est. Placeat, blanditiis
          fuga sequi delectus accusantium est minima maiores inventore magni
          dolores sed corporis necessitatibus aperiam nisi?
        </p>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Button icon="upvote">29</Button>
            <Button icon="downvote">12</Button>
          </div>
          <Button icon="details">view details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
