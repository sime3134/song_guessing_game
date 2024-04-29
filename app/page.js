import getLyricsForTrackId from "./actions.js";
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

export default async function Home({ searchParams }) {
  const country = searchParams?.country || "US";
  const trackList = await getTopTracks(country);

  const firstLyrics = await getLyricsForTrackId(trackList[0].track.track_id);
  const lyricsInRows = firstLyrics.split("\n");

  if (firstLyrics)
    return <HomeView trackList={trackList} firstLyrics={lyricsInRows} />;
}
