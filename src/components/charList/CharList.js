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
        limit: 9,
        offset: 210,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars();
    }

    updateChars = () => {
        this.marvelService.getAllCharacters(this.limit, this.offset)
            .then(this.onCharactersLoaded)
            .catch(this.onError);
    }

    onCharactersLoaded = (characters) => {
        this.setState({
            characters,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    render() {
        const {characters, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <Characters characters={characters}/> : null;

        return (
            <div className="char__list">
                {spinner}
                {content}
                {errorMessage}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const Characters = ({characters}) => {
    const charList = characters.map((character, id) => {
        return (
            <li className="char__item" key={id}>
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