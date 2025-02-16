import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";

export function Comment() {
  return (
    <Card>
      <CardContent className="p-2">
        <div className="flex items-center gap-4 mb-2">
          <Avatar>
            <AvatarImage src="https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid">
            <span className="text-sm">AnanaB</span>
            <span className="text-xs">3 hours ago</span>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum magnam
          sunt iusto adipisci tenetur eos quia obcaecati quaerat tempore maxime
          eveniet, fugiat, fuga in, exercitationem voluptatibus magni facilis
          error iste aspernatur vitae voluptate temporibus nihil. Modi
          consequatur error natus voluptatum?
        </p>
      </CardContent>
    </Card>
  );
}
