import React, { Component } from "react"
import User from "../interfaces/user.interface"

interface SearchState {
  error: boolean
  pokemon: Pokemon
}

interface Pokemon {
  error: boolean
  name: string
  numberOfAbbilities: number
  baseExperiance: number
  imageUrl: string
}
class PokemonSearch extends Component<User, SearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>
  constructor(props: User) {
    super(props)
    this.state = {
      error: false,
      pokemon: null
    }
    this.pokemonRef = React.createRef()
  }
  onSearchClick = () => {
    const inputValue = this.pokemonRef.current.value
    fetch(`htpps://pokeapi.co/api/2/pokemon/${inputValue}`).then(res => {
      if (res.status !== 200) {
        this.setState({ error: true })
        return
      }
      res.json().then(data => {
        this.setState({
          error: false,
          pokemon: {
            name: data.name,
            numberOfAbbilities: data.abilities.length,
            baseExperiance: data.base_experiance,
            imageUrl: data.sprites.front_default
          }
        })
      })
    })
  }
  render() {
    const { name: userName, numberOfPokemons } = this.props
    const { error, pokemon } = this.state
    let resultMarkup

    if (error) {
      resultMarkup = <p>Pokemon not found, please try again.</p>
    } else if (this.state.pokemon) {
      resultMarkup = (
        <div>
          <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
          <p>
            {pokemon.name} has {pokemon.numberOfAbbilities} abilities and{" "}
            {pokemon.baseExperiance} base experiance points
          </p>
        </div>
      )
    }
    return (
      <div>
        <p>
          User {userName}{" "}
          {numberOfPokemons && <span>han {numberOfPokemons} pokemons</span>}
        </p>
        <input type="text" ref={this.pokemonRef} />
        <button onClick={this.onSearchClick} className="my-button">
          Search
        </button>
        {resultMarkup}
      </div>
    )
  }
}

export default PokemonSearch
