"use client";

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import Link from "next/link";
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";

export const VideoSection = () => {
 return (
    <Suspense fallback={<p>Loading...</p>} >
        <ErrorBoundary fallback={<p>Error</p>}>
            <VideoSectionSuspence />
        </ErrorBoundary>
    </Suspense>
 )
}

export const VideoSectionSuspence = () => {
    const [videos , query] = trpc.studio.getMany.useSuspenseInfiniteQuery({
        limit: DEFAULT_LIMIT,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    })
    return (
        <div>
            <div className="border-y">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-6 w-[510px]">Video</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Views</TableHead>
                            <TableHead className="text-right">Comments</TableHead>
                            <TableHead className="text-right pr-6">Likes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videos.pages.flatMap((page) => page.items).map((video) => (
                            <Link href={`/studio/videos/${video.id}`} key={video.id} legacyBehavior>
                                 <TableRow  className="cursor-pointer">
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div className="relative aspect-video w-36 shrink-0">
                                              <VideoThumbnail />  
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>visibility</TableCell>
                                    <TableCell>status</TableCell>
                                    <TableCell>date</TableCell>
                                    <TableCell>view</TableCell>
                                    <TableCell>comments</TableCell>
                                    <TableCell>like</TableCell>
                                 </TableRow>
                            </Link>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            <InfiniteScroll hasNextPage={query.hasNextPage}
            isFetchingNextPage={query.isFetchingNextPage}
            isManual
            fetchNextPage={query.fetchNextPage} />
        </div>
    )
}