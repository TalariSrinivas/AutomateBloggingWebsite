import Parser from 'rss-parser';
const parser = new Parser();

export async function fetchRSS(url) {
    const feed = await parser.parseURL(url);
    return feed.items.map(item => ({
        title: item.title,
        content: item.contentSnippet || item.content || '',
        link: item.link
    }));
}
