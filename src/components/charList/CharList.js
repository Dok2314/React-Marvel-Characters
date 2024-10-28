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
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars();
    }

    updateChars = () => {
        this.marvelService.getAllCharacters()
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

    setCharId = (id) => {
        this.props.setCharId(id);
    }

    render() {
        const {characters, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <Characters characters={characters} setCharId={this.setCharId} /> : null;

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