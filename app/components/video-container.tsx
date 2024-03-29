export default function VideoContainer({ src, title }) {
  return (
    <div className="relative mb-8 aspect-video">
      <iframe
        src={src}
        title={title}
        className="absolute w-full h-full top-0 pt-4"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
