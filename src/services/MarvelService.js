class MarvelService
{
    _endpoint = 'https://gateway.marvel.com:443/v1/public/characters';
    _apikey = 'apikey=61eded8d06dc102d00b9364a046b780f';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (limit = 9, offset = 210) => {
        const res = await this.getResource(`${this._endpoint}?limit=${limit}&offset=${offset}&${this._apikey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._endpoint}/${id}?${this._apikey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (character) => {
        const description = character.description
            ? character.description.length > 50
                ? character.description.slice(0, 150) + '...'
                : character.description
            : 'Description not available';

        return {
            name: character.name,
            description: description,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
        }
    }
}

export default MarvelService;