"use server";

export default async function getLyricsForTrackId(id) {
  const response = await fetch(
    `https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=e897c43680faf0f22debd33edab6ae34&track_id=${id}`,
    {
      method: "GET",
    }
  );

  const lyrics = await response.json();
  return lyrics.message.body.lyrics.lyrics_body;
}
