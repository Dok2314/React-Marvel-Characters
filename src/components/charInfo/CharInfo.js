import {Component} from "react";
import './charInfo.scss';
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component
{
    state = {
        character: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id !== prevProps.id) {
            this.loadChar();
        }
    }

    loadChar = () => {
        this.onCharLoading();
        this.marvelService.getCharacter(this.props.id)
            .then(this.onCharLoaded)
            .catch(this.onError);
        this.foo.bar = 0;
    }

    onCharLoaded = (character) => {
        this.setState(({
            character,
            loading: false
        }));
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCharLoading = () => {
        this.setState(({
            loading: true
        }));
    }

    render() {
        const {character, loading, error} = this.state;

        const skeleton = character || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !character) ? <CharacterView character={character} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const CharacterView = ({character}) => {
    const {name, description, thumbnail, homepage, wiki, imgStyle, comics} = character;

    const comicsList = comics.slice(0, 10).map((item, id) => (
        <li className="char__comics-item" key={id}>
            {item.name}
        </li>
    ));

    let noComics = null;
    if (comicsList.length === 0) {
        noComics = 'There are no comics for this character.'
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {noComics ?? comicsList}
            </ul>
        </>
    )
}

export default CharInfo;