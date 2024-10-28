import {Component} from "react";
import './charList.scss';
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component
{
    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
        charCount: 0,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequestChars();
    }

    onRequestChars = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharactersLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true});
    }

    onCharactersLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({offset, characters, charCount}) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
            charCount: charCount + 9,
        }));
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    setCharId = (id) => {
        this.props.setCharId(id);
    }

    render() {
        const {characters, loading, error, offset, newItemLoading, charEnded, charCount} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <Characters characters={characters} setCharId={this.setCharId} /> : null;

        return (
            <div className="char__list">
                {spinner}
                {content}
                {errorMessage}
                <div className='char__counter'>
                    <div className="inner">Characters: {charCount}</div>
                    <div className="inner">Total: {localStorage.getItem('totalCharacters')}</div>
                </div>
                <button
                    className="button button__main button__long"
                    onClick={() => this.onRequestChars(offset)}
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const Characters = ({characters, setCharId}) => {
    const charList = characters.map(character => {
        return (
            <li className="char__item"
                key={character.id}
                onClick={() => setCharId(character.id)}
            >
                <img src={character.thumbnail} alt={character.thumbnail} style={character.imgStyle}/>
                <div className="char__name">{character.name}</div>
            </li>
        );
    });

    return (
        <ul className="char__grid">
            {charList}
        </ul>
    )
}

export default CharList;