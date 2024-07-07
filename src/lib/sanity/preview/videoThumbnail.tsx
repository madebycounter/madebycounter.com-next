export default function videoThumbnail(playbackId: string) {
    return playbackId ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={`https://image.mux.com/${playbackId}/thumbnail.jpg?width=200&height=200&fit_mode=crop`}
            alt=""
        />
    ) : undefined;
}
