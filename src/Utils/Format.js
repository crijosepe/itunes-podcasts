const MS_IN_A_DAY = 24 * 60 * 60 * 1000;

const getFirstElement = array => (array && Array.isArray(array) && array.length ? array[0] : array);

const padNumber = num => `00${num}`.slice(-2);

const parseDuration = (duration) => {
    if (!duration) return '-';

    if (duration.includes(':')) {
        const durationSplit = duration.split(':');
        if (durationSplit.length === 3) {
            return `${60 * parseInt(durationSplit[0], 10) + parseInt(durationSplit[1], 10)}:${padNumber(durationSplit[2])}`;
        }
        return duration;
    }
    const intDuration = parseInt(duration, 10);
    return `${Math.floor(intDuration / 60)}:${padNumber(intDuration % 60)}`;
};

const parseDate = (dateString) => {
    const date = new Date(dateString);
    return `${padNumber(date.getDate())}/${padNumber(date.getMonth() + 1)}/${date.getFullYear()}`;
};

const parseUrl = (episode) => {
    if (episode.enclosure) return getFirstElement(episode.enclosure).$.url;

    return getFirstElement(episode.link);
};

const parseEpisode = (episode, index) => ({
    id: index,
    title: getFirstElement(episode.title),
    description: getFirstElement(episode.description),
    url: parseUrl(episode),
    duration: parseDuration(getFirstElement(episode['itunes:duration'])),
    pubDate: parseDate(getFirstElement(episode.pubDate)),
});

const parseImageUrl = (podcast) => {
    if (podcast.image) return getFirstElement(getFirstElement(podcast.image).url);

    return getFirstElement(podcast['itunes:image']).$.href;
};

const Format = {
    isDateBeforeYesterday: date => (new Date() - new Date(date)) > MS_IN_A_DAY,

    parsePodcast: podcast => ({
        id: podcast.id.attributes['im:id'],
        title: podcast['im:name'].label,
        description: podcast.summary ? podcast.summary.label : 'No description available',
        author: podcast['im:artist'].label,
        imageUrl: getFirstElement(podcast['im:image']).label,
    }),

    parsePodcastDetail: podcast => ({
        title: getFirstElement(podcast.title),
        description: getFirstElement(podcast.description),
        author: getFirstElement(podcast['itunes:author']),
        imageUrl: parseImageUrl(podcast),
        episodes: podcast.item.map(parseEpisode),
    }),
};

export default Format;
