import HomeView from "./components/HomeView.js";

async function getTopTracks(country) {
  const response = await fetch(
    `https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=e897c43680faf0f22debd33edab6ae34&chart_name=top&page=1&page_size=10&country=${country}&f_has_lyrics=1`,
    {
      method: "GET",
    }
  );

  const tracks = await response.json();
  return tracks.message.body.track_list;
}

async function getLyricsForTrackId(id) {
  const response = await fetch(
    `https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=e897c43680faf0f22debd33edab6ae34&track_id=${id}`,
    {
      method: "GET",
    }
  );

  const lyrics = await response.json();
  return lyrics.message.body.lyrics.lyrics_body;
}

export default async function Home({ searchParams }) {
  const country = searchParams?.country || "US";
  const trackList = await getTopTracks(country);

  const firstLyrics = await getLyricsForTrackId(trackList[0].track.track_id);
  const lyricsInRows = firstLyrics.split("\n");

  if (firstLyrics)
    return <HomeView trackList={trackList} firstLyrics={lyricsInRows} />;
}
