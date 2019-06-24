import React, { Component } from "react"
import User from "../interfaces/user.interface"

class PokemonSearch extends Component<User> {
  render() {
    const { name, numberOfPokemons } = this.props
    return (
      <div>
        <p>
          User {name}{" "}
          {numberOfPokemons && <span>han {numberOfPokemons} pokemons</span>}
        </p>
      </div>
    )
  }
}

export default PokemonSearch
