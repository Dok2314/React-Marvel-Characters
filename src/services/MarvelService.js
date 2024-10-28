class MarvelService
{
    _endpoint = 'https://gateway.marvel.com:443/v1/public/characters';
    _apiKey = 'apikey=61eded8d06dc102d00b9364a046b780f';
    _baseOffset = 210;
    _baseLimit = 9;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset, limit = this._baseLimit) => {
        const res = await this.getResource(`${this._endpoint}?limit=${limit}&offset=${offset}&${this._apiKey}`);
        localStorage.setItem('totalCharacters', res.data.total);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._endpoint}/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (character) => {
        const description = character.description
            ? character.description.length > 50
                ? character.description.slice(0, 150) + '...'
                : character.description
            : 'Description not available';

        const thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        const imgStyle = { 'objectFit': thumbnail.includes("image_not_available") ? 'contain' : 'cover' };

        return {
            id: character.id,
            name: character.name,
            description: description,
            thumbnail: thumbnail,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            imgStyle: imgStyle,
            comics: character.comics.items,
        };
    }
}

export default MarvelService;