import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Eye, Pin, Lock } from "lucide-react"
import Link from "next/link"
import type { ThreadWithRelations } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface ThreadListProps {
  threads: ThreadWithRelations[]
  showCategory?: boolean
}

export function ThreadList({ threads, showCategory = true }: ThreadListProps) {
  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <Card key={thread.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {thread.isPinned && <Pin className="h-4 w-4 text-primary" />}
                  {thread.isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                  {showCategory && <Badge variant="outline">{thread.forumCategory.name}</Badge>}
                </div>
                <Link href={`/forum/threads/${thread.slug}`}>
                  <CardTitle className="hover:text-primary transition-colors line-clamp-2">{thread.title}</CardTitle>
                </Link>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={thread.author.avatarUrl || undefined} />
                      <AvatarFallback className="text-xs">
                        {thread.author.username?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{thread.author.username}</span>
                  </div>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(thread.createdAt))} ago</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{thread._count.posts}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{thread.viewCount}</span>
                  </div>
                </div>
                {thread.posts[0] && (
                  <div className="text-right">
                    <div className="text-xs">Last reply by</div>
                    <div className="font-medium">{thread.posts[0].author.username}</div>
                    <div className="text-xs">{formatDistanceToNow(new Date(thread.posts[0].createdAt))} ago</div>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
