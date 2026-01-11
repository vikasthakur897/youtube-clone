import Image from "next/image"

export const VideoThumbnail = () => {
    return(
       <div className="relative">
        <div className="relative w-full overflow-hidden rounded-xl aspect-video">
            <Image src="/placeholder.svg" alt="Video thumbnail" fill className="h-full w-full object-cover" />
        </div>
       </div>
    )
}