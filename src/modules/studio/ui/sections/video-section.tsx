"use client";

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary"

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
    const [data , query] = trpc.studio.getMany.useSuspenseInfiniteQuery({
        limit: DEFAULT_LIMIT,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    })
    return (
        <div>
            {JSON.stringify(data)}
            <InfiniteScroll hasNextPage={query.hasNextPage}
            isFetchingNextPage={query.isFetchingNextPage}
            isManual
            fetchNextPage={query.fetchNextPage} />
        </div>
    )
}