import type { Review, Service, Media } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ReviewWithRelations = Review & {
  service: Service | null;
  avatar: Media | null;
};

type ReviewCardProps = {
  review: ReviewWithRelations;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="h-full border-border/50 bg-card/70 transition hover:-translate-y-1 hover:shadow-glow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          {review.avatar ? (
            <AvatarImage alt={review.author} src={review.avatar.url} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <CardTitle className="text-lg">{review.author}</CardTitle>
          {review.service ? (
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{review.service.title}</p>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{review.content}</p>
      </CardContent>
    </Card>
  );
}
