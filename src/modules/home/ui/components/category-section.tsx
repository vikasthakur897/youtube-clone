"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";

interface CategoriesSectionProps {
  categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
    return(
        <Suspense fallback={<FilterCarousel onSelect={() => {}} data={[]} isLoading />}>
            <ErrorBoundary errorComponent={() => <div>Error loading categories</div>}>
                <CategoriesSectionSuspence categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}

 const CategoriesSectionSuspence = ({ categoryId }: CategoriesSectionProps) => {
    const [categories] = trpc.categories.list.useSuspenseQuery()
    const data = categories.map(({ name, id}) => ({
        value: id,
        label: name,
    }))
  return <FilterCarousel value={categoryId} data={data} onSelect={() => {}} />;
}

export default CategoriesSection;